import Footer from "../components/footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ContactImg from "../assets/d.png";
import ContactForm from "../components/contactform";

function Contact() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg={ContactImg}
        title="Contact"
        text="Contact us to learn more about our environmental website and how we can work together to make a positive impact on the environment. You can reach us through our contact form or email, and our team will get back to you as soon as possible. Let's work together towards a sustainable future!"
        btnClass="none"
      />
      <ContactForm />
      <Footer />
    </>
  );
}
export default Contact;
