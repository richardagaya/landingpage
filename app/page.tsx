import Navbar from "./components/Navbar";
import Quiz from "./Quiz/page";
import Footer from "./components/Footer";
import HeroSection from "./components/Hero";
import Testimonials from "./components/Testimonial";
export default function Home() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <Testimonials/>
    <Footer/>
    </>
    
  );
}
