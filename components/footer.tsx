'use client'

import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="bg-foreground text-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/images/logo.jpeg" 
                alt="Viraaj Mhalaskar Hair Studio" 
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="font-light tracking-wide">Viraaj Mhalaskar</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Premium hair design and beauty services by Viraaj Mhalaskar.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-light text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/60">
              {['Services', 'Team', 'Book Now', 'About'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-light text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-white/60">
              {['Cuts & Styling', 'Color', 'Treatments', 'Bridal'].map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </motion.div>

          {/* Follow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-light text-white mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {['Instagram', 'Facebook', 'Pinterest'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors"
                  aria-label={social}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0z" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>&copy; 2024 Viraaj Mhalaskar Hair Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
