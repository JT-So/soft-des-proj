import { useEffect, useState } from "react";
import "./Navbar.css";
import { MenuItems } from "./MenuItems";
import { Link, useNavigate} from "react-router-dom";
import { UserAuth } from "../AuthContext";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Navbar = () => {
  const [checkUser, setCheckUser] = useState(0)
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const userCollectionRef = collection(db, "Users");
  const { googleSignIn, user, userName, logOut } = UserAuth();

  const handleClick = () => {
    setClicked(true);
  }

  const handleSignOut = async () => {
    try {
        await logOut()
    } catch (error) {
        console.log(error)
    }
}

  const handleGoogleSignIn = async () => {
    try {
        await googleSignIn()
    } catch (error){
        console.log(error)
    }
  }

  const createUser = async () => {
    try {
        const userData = await getDocs(userCollectionRef);
        userData.docs.forEach(async (doc) => {
            console.log(doc.data().email)
            if (doc.data().email !== user?.email){
                setCheckUser(1)
            }
        })
        if (checkUser === 1) {
            console.log("creating")
            await addDoc(userCollectionRef, {
                name: user?.displayName,
                email: user?.email
            })
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    if (user != null) {
        if (userName === "administrator") {
            console.log("admining")
            navigate('/admin');
        }
        else {
            console.log("boarding")
            createUser()
        }
    }

  }, [user])

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
          {user ? <Link className="nav-links" to="/board" style={{display: "flex"}}>
            Board
          </Link> : <Link className="nav-links" to="/board" style={{display: "none"}}>
            Board
          </Link>}
        </li>
        <li>
          {user ? <Link className="nav-links-mobile" onClick={handleSignOut}>
            Sign Out
          </Link> : <Link className="nav-links-mobile" onClick={handleGoogleSignIn}>
            Sign In
          </Link>}
        </li>
      </ul>
    </nav>
  );
};


export default Navbar;
