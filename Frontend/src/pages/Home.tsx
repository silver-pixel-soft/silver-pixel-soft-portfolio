import {
  Hero,
  About,
  Service,
  Work,
  Pricing,
  Contact,
} from '../components/sections/index.ts'

const Home = () => {
  return (
    <div className='w-full'>
      <Hero />
      <About />
      <Service />
      <Work />
      <Pricing />
      <Contact />
    </div>
  )
}

export default Home