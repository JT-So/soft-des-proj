import Footer from "../components/footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ServiceImg from "../assets/c.png";
import Services from "../components/Services";

function Service() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg={ServiceImg}
        title="Service"
        btnClass="none"
      />
      <Services />
      <Footer />
    </>
  );
}
export default Service;
