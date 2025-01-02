import Navbar from "./components/Navbar";
import Quiz from "./Quiz/page";
import Footer from "./components/Footer";
import HeroSection from "./components/Hero";
import Testimonials from "./components/Testimonial";
import AboutUs from "./components/About";
export default function Home() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <Testimonials/>
    <AboutUs/>
    <Footer/>
    </>
    
  );
}
