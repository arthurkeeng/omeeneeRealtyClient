import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/authContext";
import app from "../../../axiosInstance";
import { Navigate, useNavigate } from "react-router-dom";
import CloudinaryUploadWidget from "../../utils/widgetUpload/CloudinaryUploadWidget";
function ProfileUpdatePage() {
  const {currentUser , updateUser} = useContext(AuthContext);
  const [avatar , setAvatar] = useState([])
  const [user , setUser] = useState({})
  const [message , setMessage] = useState("")
  const [isLoading , setIsLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = async(e) =>{
    const name = e.target.name ;
    const value = e.target.value

    setUser({...user , [name] : value});
  }
  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
      setIsLoading(true)
      const {data} = await app.patch(`/api/users/${currentUser._id}` , {...user, avatar: avatar[0]})
      updateUser(data)
      setMessage("User Info updated")
      navigate("/profile")
    } catch (error) {
      console.log("something happened")
      setMessage("Failed to update Info")
    }
    finally{
      setTimeout(()=>{setMessage("")} , 6000)
      setIsLoading(false)
    }
  }
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <span>{message}</span>
          <button type="submit" disabled = {isLoading}>Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || "/noAvatar.png"} alt="" className="avatar" />
        <CloudinaryUploadWidget uwConfig={{
          cloudName : "dkglp8l4m",
          uploadPreset : "OmeeneeUpload",
          multipleFiles : false , 
          maxImageFileSize : 2000000,
          folder : "avatars"
        }}
          setState = {setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
