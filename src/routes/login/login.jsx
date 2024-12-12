import { useContext, useState } from "react";
import "./login.scss";
import app from "../../../axiosInstance";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function Login() {
  const [error , setError] = useState("")
  const [isLoading , setIsLoading] = useState(false)
  const {updateUser} = useContext(AuthContext)
  
  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    setIsLoading(true)
    e.preventDefault()
    const formData = new FormData(e.target);
    const username = formData.get("username")
    const password = formData.get("password")
    try {
    const {data} = await app.post("/api/auth/login" , {username , password})
      updateUser(data)
      console.log(data)
      localStorage.setItem("user" , JSON.stringify(data))
    navigate("/")
      
    } catch (error) {
      console.log(error)
      setError("Failed to login")
      setTimeout(()=> setError("") , 6000)
    }
    finally{
      setIsLoading(false)
    }
  
  }

 
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button >Login</button>
          {error && ( <span>
            {error}
          </span>)}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
      
    </div>
  );
}

export default Login;
