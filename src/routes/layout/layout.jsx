import "./layout.scss";
import Navbar from "../../components/navbar/Navbar"
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext, useEffect } from "react";

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  );
}
function RequireAuthentication() {
  const {currentUser} = useContext(AuthContext) 
  return (<>
  {currentUser == null ? (<Navigate to="/login"/>) :  (<div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </div>)}</>
  );
}

export {Layout , RequireAuthentication};
