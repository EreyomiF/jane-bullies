import { useEffect, useState } from 'react'
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
import ThankYou from './components/ThankYou.jsx'

export default function App() {
  // Lets a pricing card pre-select the service in the order form
  const [selectedService, setSelectedService] = useState('breeding')
  // When an order is sent, show the full-page thank-you screen
  const [completedOrder, setCompletedOrder] = useState(null)

  // Menu links (#pricing, #work, …) on the thank-you page take the visitor back to that section
  useEffect(() => {
    if (!completedOrder) return
    const onHash = () => {
      const id = window.location.hash.slice(1)
      setCompletedOrder(null)
      setTimeout(() => document.getElementById(id)?.scrollIntoView(), 50)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [completedOrder])

  const chooseService = (id) => {
    setSelectedService(id)
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })
  }

  if (completedOrder) {
    return (
      <>
        <Navbar />
        <main>
          <ThankYou
            order={completedOrder}
            onBack={() => {
              setCompletedOrder(null)
              window.history.replaceState(null, '', window.location.pathname)
              window.scrollTo({ top: 0 })
            }}
          />
        </main>
        <Footer />
      </>
    )
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
        <OrderForm selected={selectedService} onSelect={setSelectedService} onSent={setCompletedOrder} />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
