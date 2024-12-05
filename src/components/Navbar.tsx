import { useState, useEffect } from 'react'
import { Menu, X, Fish } from 'lucide-react'

// Updated navigation to only include sections that exist in the page
const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'Benefits', href: '#benefits' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY <= 20 || window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const navHeight = 64; // Height of navbar (16 * 4 = 64px)
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setMobileMenuOpen(false)
    }
  }

  const handleGetStarted = () => {
    const pricingSection = document.querySelector('#pricing')
    if (pricingSection) {
      const navHeight = 64;
      const elementPosition = pricingSection.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Fish className={`h-8 w-8 ${scrolled ? 'text-teal-600' : 'text-white'}`} />
            <span className={`text-xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              GrowFeed
            </span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`${
                  scrolled 
                    ? 'text-gray-600 hover:text-teal-600' 
                    : 'text-gray-100 hover:text-white'
                } transition-colors relative group`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
            <button 
              onClick={handleGetStarted}
              className="btn-primary ml-4 shadow-lg hover:shadow-teal-500/20"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`${scrolled ? 'text-gray-600' : 'text-white'} hover:text-teal-500`}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 bg-white rounded-lg shadow-xl mt-2">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full px-4 py-2 text-left text-gray-600 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors"
              >
                {item.name}
              </button>
            ))}
            <div className="px-4 pt-2">
              <button 
                onClick={handleGetStarted}
                className="btn-primary w-full"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}