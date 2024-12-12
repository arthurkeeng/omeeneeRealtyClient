import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";import app from "../../../axiosInstance";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import {Suspense ,  useContext} from "react";
import { AuthContext } from "../../context/authContext";

function ProfilePage() {
  const data = useLoaderData()
  
  const {updateUser , currentUser} = useContext(AuthContext)

  const {userPosts , userSavedPosts} = data.posts
   const filteredForPosts = userSavedPosts.map(savedPost=> savedPost.post)

  
  const navigate = useNavigate()

  const logout = async() =>{
    try {
      const res = app.post("/api/auth/logout");
      updateUser(null)
      navigate("/")
      
    } catch (error) {
      console.log(error)
    }

  }
  return (<div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
            <button>Update Profile
            </button></Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "/noAvatar.png"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={logout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/addpost">
            
            <button>Create New Post</button>
            </Link>
          </div>
          {/* <List data={userPosts}/> */}
          <Suspense fallback = {<p>Loading...</p>}>
            <Await
            resolve = {userPosts}
            errorElement = {<p>Error Loading Chats</p>}>
              {(chats )=><List data = {chats}/> }
          

            </Await>
          </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback = {<p>Loading...</p>}>
            <Await
            resolve = {filteredForPosts}
            errorElement = {<p>Error Loading Chats</p>}>
              {(filtered )=><List data = {filtered}/> }
          

            </Await>
          </Suspense>
          {/* <List data={filteredForPosts}/> */}
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper"> 
          <Suspense fallback = {<p>Loading...</p>}>
            <Await
            resolve = {data.chats}
            errorElement = {<p>Error Loading Chats</p>}>
              {(chats )=><Chat data = {chats}/> }
          

            </Await>
          </Suspense>
        </div>
      </div>
    </div>)
    
  
}

export default ProfilePage;
