import { useContext, useEffect, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useNotificationStore } from "../chat/notificationStore.js";

function Navbar() {
  
  const [open, setOpen] = useState(false);
  const {currentUser} = useContext(AuthContext)
  const fetch = useNotificationStore(state => state.fetch)
  const number = useNotificationStore(state => state.number)

  if(currentUser){
    fetch()
  }
  

  console.log(number);
  
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>OmeeNee Realty</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser !== null ? (
          <div className="user authDiv">
        {/* {user ? ( */}
            <img
              src={currentUser.avatar || "/noAvatar.png"}
              // src= "/noAvatar.png"
            />
            <span>{currentUser.username.slice(0,6)}</span>
            <Link to="/profile" className="profile">
              <div className="notification">{number}</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <div className="authDiv">
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </div>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          {currentUser !== null ? 
          <Link to="/profile" className="profile">
              <span>Profile</span>
            </Link>
            :  <><a href="/login">Sign in</a>
            <a href="/register">Sign up</a>
          </>
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
