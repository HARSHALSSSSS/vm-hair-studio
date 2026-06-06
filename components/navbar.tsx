'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 pt-4 sm:pt-6 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Floating Glass Navbar - subtle and smooth */}
        <div className={`${scrolled ? 'bg-background/95 shadow-lg' : 'bg-background/70'} backdrop-blur-md border border-border/50 rounded-2xl transition-all duration-500`}>
          <div className="px-6 sm:px-8 py-3">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <a
                href="#home"
                className="flex items-center space-x-3 group"
              >
                <img 
                  src="/images/logo.jpeg" 
                  alt="Viraaj Mhalaskar Hair Studio" 
                  className="h-10 w-10 rounded-full object-cover border border-primary/30 group-hover:border-primary transition-all duration-300"
                />
                <div className="hidden sm:flex flex-col">
                  <span className="text-foreground font-medium tracking-wide">VM Hair Studio</span>
                  <span className="text-muted-foreground text-xs tracking-wider">Premium Styling</span>
                </div>
              </a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg transition-all duration-300 hover:bg-muted/50 font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* CTA Button */}
              <div className="hidden md:flex items-center">
                <a
                  href="#contact"
                  className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Book Now
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors duration-300"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-4 pt-4 border-t border-border/50"
              >
                <div className="flex flex-col space-y-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors duration-300 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href="#contact"
                    className="bg-primary text-primary-foreground px-4 py-3 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-300 mx-2 text-center mt-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Book Now
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
