'use client'

import { motion } from 'framer-motion'
import { fadeInUp, slideInLeft, slideInRight, sectionOverlapVariants, staggeredParagraphVariants, paragraphLineVariants } from '@/lib/animations'
import { TextReveal } from './text-reveal'
import { useState } from 'react'

const web3formsAccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || ''

const serviceLabels: Record<string, string> = {
  cut: 'Precision Cut',
  color: 'Color Service',
  styling: 'Styling & Blowout',
  treatment: 'Hair Treatment',
  bridal: 'Bridal Service',
  grooming: "Men's Grooming",
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!web3formsAccessKey) {
      setError('Email service is not configured yet. Please contact the studio directly.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3formsAccessKey,
          subject: 'New Appointment Request - VM Hair Studio',
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          service: formData.service
            ? serviceLabels[formData.service] || formData.service
            : 'Not selected',
          date: formData.date || 'Not provided',
          time: formData.time || 'Not provided',
          message: formData.message || 'No additional comments',
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to send appointment request.')
      }

      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: '',
      })
      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    } catch (err) {
      console.error('Email send failed:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to send appointment request. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-32 bg-white relative section-overlap">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl sm:text-5xl font-light text-foreground mb-4 tracking-tight"
            variants={staggeredParagraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Get in Touch
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            variants={paragraphLineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Ready to transform your look? Book an appointment or reach out with
            any questions.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-light text-foreground mb-8">
                Contact Information
              </h3>

              {[
                {
                  icon: '📍',
                  label: 'Location',
                  value: 'VM Hair Studio, Pune',
                  link: 'https://www.google.com/maps/place/VM+Hair+Studio/@18.7330265,73.6756973,17z/data=!4m6!3m5!1s0x3bc2b11a33260547:0xe151a686fb88a0e7!8m2!3d18.7330255!4d73.6756909!16s%2Fg%2F11v3csfbps?hl=en&entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D',
                },
                {
                  icon: '📞',
                  label: 'Phone',
                  value: '+91 751 721 8071',
                  link: 'tel:+917517218071',
                },
                {
                  icon: '✉️',
                  label: 'Email',
                  value: 'hello@vmhairstudio.com',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 mb-6"
                >
                  <div className="text-2xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">
                      {item.label}
                    </p>
                    {'link' in item ? (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-primary transition-colors underline underline-offset-2"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-foreground">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-border">
              <h4 className="text-lg font-light text-foreground mb-4">
                Hours of Operation
              </h4>
              <div className="space-y-2 text-foreground/70">
                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                  <span>Saturday</span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                  <span>Sunday</span>
                  <span>By Appointment</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div {...slideInRight}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="">Select a Service</option>
                <option value="cut">Precision Cut</option>
                <option value="color">Color Service</option>
                <option value="styling">Styling & Blowout</option>
                <option value="treatment">Hair Treatment</option>
                <option value="bridal">Bridal Service</option>
                <option value="grooming">Men's Grooming</option>
              </select>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <textarea
                name="message"
                placeholder="Any special requests or comments?"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              />

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm text-red-600 font-light"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: loading || submitted ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitted || loading}
                className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 disabled:opacity-50"
              >
                {submitted ? '✓ Request Received' : loading ? 'Sending...' : 'Book Appointment'}
              </motion.button>

              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm text-green-600 font-light"
                >
                  Thank you! We&apos;ll confirm your appointment shortly.
                </motion.p>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
