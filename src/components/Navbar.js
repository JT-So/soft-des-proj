import { Component, useEffect, useState } from "react";
import "./Navbar.css";
import { MenuItems } from "./MenuItems";
import { Link, useNavigate} from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [isAuth, setIsAuth] = useState(localStorage.getItem("IsAuth"))
  const navigate = useNavigate();
  const handleClick = () => {
    setClicked(true);
  }
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
      const listen = onAuthStateChanged(auth, (user) => {
        console.log("AuthChanged")
        setIsAuth(localStorage.getItem("IsAuth"))
        if (user) {
          if (isAuth == "true") {
            setAuthUser(user);
          }
          else {
            setAuthUser(null);
          }
        }
        else {
            setAuthUser(null);
        }
      })
      return()=>{
        listen();
      }

  }, []);

  const userSignOut = (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      console.log('Signed out')
      localStorage.setItem("IsAuth", false);
    })
    .then(navigate('/login'))
    .catch(error => console.log(error))
  }
  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo"> Enviro Solutions </h1>

      <div className="menu-icons" onClick={handleClick}>
        <i
          className={clicked ? "fas fa-times" : "fas fa-bars"}
        ></i>
      </div>

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link className={item.cName} to={item.url}>
                <i className={item.icons}></i>
                {item.title}
              </Link>
            </li>
          );
        })}
        <li>
          {authUser ? <Link className="nav-links" to="/board" style={{display: "flex"}}>
            Board
          </Link> : <Link className="nav-links" to="/board" style={{display: "none"}}>
            Board
          </Link>}
        </li>
        <li>
          {authUser ? <Link className="nav-links-mobile" onClick={userSignOut}>
            Sign out
          </Link> : <Link className="nav-links-mobile" to="/login">
            Sign Up
          </Link>}
        </li>
      </ul>
    </nav>
  );
};


export default Navbar;
