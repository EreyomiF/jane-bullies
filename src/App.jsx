import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Pricing from './components/Pricing.jsx'
import Gallery from './components/Gallery.jsx'
import SketchToLogo from './components/SketchToLogo.jsx'
import Process from './components/Process.jsx'
import OrderForm from './components/OrderForm.jsx'
import FAQ from './components/FAQ.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  // Lets a pricing card pre-select the service in the order form
  const [selectedService, setSelectedService] = useState('breeding')

  const chooseService = (id) => {
    setSelectedService(id)
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Pricing onChoose={chooseService} />
        <Gallery />
        <SketchToLogo />
        <Process />
        <OrderForm selected={selectedService} onSelect={setSelectedService} />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
