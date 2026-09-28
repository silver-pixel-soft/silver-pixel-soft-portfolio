import {
  Hero,
  About,
  Service,
  Process,
  Work,
  Testimonials,
  Pricing,
  Contact,
} from "../components/sections/index.ts";

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <About />
      <Service />
      <Process />
      <Work />
      <Testimonials />
      <Pricing />
      <Contact />
    </div>
  );
};

export default Home;