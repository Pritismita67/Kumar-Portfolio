import HeroSplit from '@/components/HeroSplit'
import Tech from '@/components/Tech'
import Security from '@/components/Security'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      {/* Split hero: photo + expertise — HOME ONLY */}
      <HeroSplit />

      <Tech />
      <Security />
      <Testimonials />
      <Footer />
    </>
  )
}