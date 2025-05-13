import Navbar from "../components/navbar"
import Service from "../components/service"
import Line from "../components/line"
import Footer from "../components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center">Welcome to Our Website</h1>
        <p className="text-center mt-4 text-lg">Scroll down to see the navbar in action</p>

        {/* Placeholder sections to demonstrate scrolling */}
        {["feature", "workflow", "pricing", "testimonial"].map((section) => (
          <section
            key={section}
            id={section}
            className="min-h-[80vh] flex items-center justify-center mt-10 bg-gray-100 rounded-lg"
          >
            <h2 className="text-3xl font-bold capitalize">{section} Section</h2>
          </section>
        ))}
        <Line />
        <Service />
        <Footer />
      </div>
    </main>
  )
}
