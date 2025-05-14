import Navbar from "../components/navbar";
import Service from "../components/service";
import Line from "../components/line";
import Footer from "../components/footer";
import Hero from "../components/hero";

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
