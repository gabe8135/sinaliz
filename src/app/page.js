import Hero from "./components/hero";
import Testimonials from "./components/testimonials";
import About from "./components/about";
import Projects from "./components/projects";
import Contact from "./components/contact";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-[#F4F6F8] via-[#E7EDF1] to-white min-h-screen">
      <Hero />
      <Projects />
      <Testimonials />
      <About />
      <Contact />
    </main>
  );
}
