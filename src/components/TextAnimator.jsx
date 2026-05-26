'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export default function TextAnimator() {
  useEffect(() => {
    // Small delay so DOM is fully painted
    const timer = setTimeout(() => {

      // Target every heading + any element you tag with data-animate
      const elements = document.querySelectorAll(
        'h1, h2, h3, [data-animate="letters"]'
      )

      elements.forEach((el) => {
        // Split into individual characters
        const split = new SplitType(el, { types: 'chars, words' })

        // Set initial state — letters above, invisible
        gsap.set(split.chars, {
          y: -80,
          opacity: 0,
          rotateX: 60,
          filter: 'blur(6px)',
        })

        // Animate in when element enters viewport — and STAYS
        gsap.to(split.chars, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 0.7,
          ease: 'power4.out',
          stagger: 0.03,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',   // fires when element is near viewport
            toggleActions: 'play none none none', // plays ONCE, never reverses
          },
        })
      })

    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return null  // invisible — just runs the animation engine
}