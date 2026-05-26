'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LenisProvider({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Initialize Lenis with premium cinematic settings
    const lenis = new Lenis({
      duration: 1.4,           // Longer = more floaty/cinematic
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,    // Slightly slower = premium feel
      touchMultiplier: 1.8,
      infinite: false,
    })

    lenisRef.current = lenis

    // 🔑 Connect Lenis to GSAP's ticker — this is the magic link
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0) // Prevents GSAP lag spikes

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return <>{children}</>
}