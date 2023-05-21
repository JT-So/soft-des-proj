import "./HeroStyles.css";
import { UserAuth } from "../AuthContext";
import { db } from "../firebase";
import { Link, useNavigate} from "react-router-dom";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

function Hero(props) {
  const [checkUser, setCheckUser] = useState(0)
  const navigate = useNavigate();
  const userCollectionRef = collection(db, "Users");
  const { googleSignIn, user, userName, logOut } = UserAuth();
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
            if (checkUser === 1) {
                console.log("creating")
                await addDoc(userCollectionRef, {
                    name: user?.displayName,
                    email: user?.email
                }).then(()=>setCheckUser(0))
            }
        })
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
    <>
      <div className={props.cName}>
        <img alt="HerpImg" src={props.heroImg} />
        <div className="hero-text">
          <h1> {props.title} </h1>
          <p> {props.text} </p>
          <button onClick={handleGoogleSignIn} className={props.btnClass}>
            {props.buttonText}
          </button>
        </div>
      </div>
    </>
  );
}
export default Hero;
