import Home1 from "../components/Home1";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import HomeImg from "../assets/a.png";
import Footer from "../components/footer";
import { UserAuth } from "../AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {


  return (
    <>
      <Navbar />
      <Hero
        cName="hero"
        heroImg={HomeImg}
        title="We're Here to Help"
        text="Report any issues or feedback you have for us."
        buttonText="Get Started"
        url="/login"
        btnClass="show"
      />
      <Home1 />
      <Footer />
    </>
  );
}
export default Home;
