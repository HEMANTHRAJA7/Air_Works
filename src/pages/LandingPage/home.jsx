import Navbar from "../../components/landingPageComponents/navbar";
import Service from "../../components/landingPageComponents/service";
import Line from "../../components/landingPageComponents/line";
import Footer from "../../components/landingPageComponents/footer";
import Hero from "../../components/landingPageComponents/hero";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4">
        <Line />
        <Service />
        <Footer />
      </div>
    </main>
  );
}
