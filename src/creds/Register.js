import { useState } from 'react';
import './RegisterStyles.css'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase";
import { Link, useNavigate} from "react-router-dom";
import Footer from '../components/footer';
import Navbar from '../components/Navbar';
const Register = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      console.log("Registered");
      console.log(userCredential);
    })
    .then(navToLogin())
    .catch((error) => {
      console.log(error);
    })
  };
  const navToLogin = () => {
    navigate('/login');
  }


  return (
    <>
      <Navbar />
      <div className='center-form'>
      <form onSubmit={handleRegister} className='registerForm'>
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
        <button type="submit"> Register </button>
        <button type="button" onClick={navToLogin}>Cancel</button>
      </form>
      </div>
      <Footer />
    </>
  );
}

export default Register;