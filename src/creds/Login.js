import { useState } from 'react';
import './LoginStyles.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase";
import { Link, useNavigate} from "react-router-dom";
import Footer from '../components/footer';
import Navbar from '../components/Navbar';
const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("IsAuth", true);
    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      console.log("LOGGED IN")
      console.log(userCredential);
      localStorage.setItem("IsAuth", true);
    })
    .then(navigate('/'))
    .catch((error) => {
      console.log(error);
    })
  };
  const navToRegister = () => {
    navigate('/register');
  }


  return (
    <>
      <Navbar />
      <div className='center-form'>
        <form onSubmit={handleLogin} className='loginForm'>
          <input 
            type="email" 
            placeholder="Email" 
            onChange={(e)=> setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={(e)=> setPass(e.target.value)}
          />
          <button type="submit" > LOGIN </button>
          <button onClick={navToRegister} className='registerBtn'> Register</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Login;