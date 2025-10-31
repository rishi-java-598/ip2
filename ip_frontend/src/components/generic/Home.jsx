
import Header from "./Header";
import Hero from "./Hero";
import Stats from "./Stats";
import WhyChoose from "./WhyChoose";
import Membership from "./Membership";
import Footer from "./Footer";
import Navs from "./Navs";
// import Navbar from "./HamMenu";











export default function Home() {
  return (
    <>
    <div id="inroot">
      <Header />
      <Hero />
      {/* <Navbar/> */}
      {/* <div style={{ width: "90%", height: "80vh", margin: "5vh auto", borderRadius: "50px", backgroundImage: "url(/images/bigimg1.png)", backgroundPosition: "center", backgroundSize: "cover" }}></div> */}
      <Stats />
      <WhyChoose />
      <Membership />
      </div>
      <Footer />
    </>
  );
}
