import Home1 from "../components/Home1";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import HomeImg from "../assets/a.png";
import Footer from "../components/footer";
import { UserAuth } from "../AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Board from "../components/Board";

function Home() {
  const { googleSignIn, user, userName, logOut } = UserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user != null) {
        if (userName === "administrator") {
            console.log("admining")
            navigate('/admin');
        }
        else {
            console.log("boarding")
        }
    }

  }, [user])

  return (
    <>
      <Navbar />
      {user ? null : <Hero
        cName="hero"
        heroImg={HomeImg}
        title="We're Here to Help"
        text="Report any issues or feedback you have for us."
        buttonText="Get Started"
        btnClass="show"
      />}
      {user ? <Board/> : <Home1/>}
      <Footer />
    </>
  );
}
export default Home;
