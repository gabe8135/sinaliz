import Hero from "./components/hero";
import Testimonials from "./components/testimonials";
import About from "./components/about";
import Projects from "./components/projects";
import Contact from "./components/contact";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-blue-50 via-purple-50 to-white min-h-screen">
      <Hero />
      <Projects />
      <Testimonials />
      <About />
      <Contact />
    </main>
  );
}
