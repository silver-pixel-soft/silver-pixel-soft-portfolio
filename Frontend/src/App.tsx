import { useEffect, useState, useRef } from "react";
import { Home } from "./pages/index.ts"
import { Header, Footer } from './components/layouts/index.ts'
import Lenis from 'lenis';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { CustomCursor } from './components/ui/CustomCursor.tsx';
import { Preloader } from './components/ui/Preloader.tsx';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      // @ts-ignore
      smoothTouch: false,
      touchMultiplier: 2,
    })
    
    lenisRef.current = lenis;

    // Stop scrolling initially while loading
    if (isLoading) {
      lenis.stop();
    }

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (!isLoading && lenisRef.current) {
      lenisRef.current.start();
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <CustomCursor />
      <Header />
      <Home />
      <Footer />
    </div>
  )
}

export default App