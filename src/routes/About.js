import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import AboutImg from "../assets/b.png";
import Footer from "../components/footer";
import AboutUs from "../components/AboutUs";
function About() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg={AboutImg}
        title="About Us"
        text=""
        btnClass="none"
      />
      <AboutUs />
      <Footer />
    </>
  );
}
export default About;
