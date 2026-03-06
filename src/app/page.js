import Hero from "./components/hero";
import DeferredAbout from "./components/DeferredAbout";
import DeferredProjects from "./components/DeferredProjects";
import DeferredContact from "./components/DeferredContact";
import DeferredTestimonials from "./components/DeferredTestimonials";

export const dynamic = "force-static";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-[#F4F6F8] via-[#E7EDF1] to-white min-h-screen">
      <Hero />
      <DeferredProjects />
      <DeferredTestimonials />
      <DeferredAbout />
      <DeferredContact />
    </main>
  );
}
