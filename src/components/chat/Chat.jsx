import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/authContext";
import app from "../../../axiosInstance";
import { format } from "timeago.js";
import { SocketContext } from "../../context/socketContext";
import { useNotificationStore } from "./notificationStore";


function Chat({ data }) {
  const { currentUser } = useContext(AuthContext);
  const [chats, setChats] = useState({});
  const [chat, setChat] = useState(null);
  const [sender, setSender] = useState("");
  const { socket } = useContext(SocketContext);
  const decrease = useNotificationStore(state => state.decrease)

  const messageEndRef = useRef()

  useEffect(()=>{ 
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  } , [chats])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");

    try {
      if (!text) return;
      const { data } = await app.post(`api/messages/${chats._id}`, { text });
      setChats((prev) => ({ ...prev, messages: [...prev.messages, data] }));
      e.target.reset();
      const [receiver] = chats.users.filter(
        (user) => user._id !== currentUser._id
      );
      console.log('from chat' , receiver);
      
      socket.emit("sendMessage" ,{
        userId : receiver._id,
        data 
      } )
    } catch (error) {
      console.log("there was an error sending the message");
    }
  };

  const handleOpen = async (id) => {
    try {
      const { data } = await app.get(`api/chats/${id}`);
      const [messageOwner] = data.users.filter(
        (user) => user._id !== currentUser._id
      );
      setSender(messageOwner);
      setChats(data);
      decrease()
    } catch (error) {
      console.log("An error occured in fetching chat");
    }
    setChat(!chat);
  };

  useEffect(()=>{
    const read = async() =>{
       await app.post(`/api/read/${chats._id}`)
    }
    if(socket && chats){
      socket.on("getMessage",(data)=>{
        if(chats._id == data.chat){
          setChats(prev => ({...prev , messages:[...prev.messages , data]}))
          read()
        }
      })
    }
    return () => socket.off("getMessage")
  },[socket , chats])


  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {data.map((chat) => {
          const [receiver] = chat.users.filter(
            (user) => user._id !== currentUser._id
          );
          return (
            <div
              key={chat._id}
              style={{
                backgroundColor: chat.seenBy.includes(currentUser._id) || chats?._id === chat._id
                  ? "white"
                  : "rgba(255, 255, 0, 0.2)",
              }}
              className="message"
              onClick={() => handleOpen(chat._id)}
            >
              <img src={receiver.avatar || "/noAvatar.png"} alt="" />
              <span>{receiver.username}</span>
              <p>{chat.lastMessage}</p>
            </div>
          );
        })}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={sender.avatar} alt="" />
              {sender.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chats.messages &&
              chats.messages.map((message) => {
                return (
                  <div
                    key={message._id}
                    className="chatMessage"
                    style={{
                      alignSelf:
                        message.user === currentUser._id
                          ? "flex-end"
                          : "flex-start",
                      textAlign:
                        message.user === currentUser._id ? "right" : "left",
                    }}
                  >
                    <p>{message.text}</p>
                    <span>{format(message.createdAt)}</span>
                  </div>
                );
              })}
              <div ref={messageEndRef}></div>
          </div>
          <form className="bottom" onSubmit={handleSubmit}>
            <textarea name="text"></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
