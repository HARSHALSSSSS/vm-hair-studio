'use client'

import { motion } from 'framer-motion'
import { containerVariants, itemVariants, staggeredParagraphVariants, paragraphLineVariants } from '@/lib/animations'

const membershipTiers = [
  {
    name: 'Haircut Discount',
    discount: '20%',
    description: 'Exclusive discount on all haircut services',
    features: ['Precision cuts', 'Expert stylists', 'Premium experience'],
  },
  {
    name: 'All Services Discount',
    discount: '10%',
    description: 'Discount across our complete service menu',
    features: ['Color services', 'Treatments', 'Styling packages'],
    highlighted: false,
  },
  {
    name: 'Combo Offer',
    discount: '30%',
    description: 'Premium discount on packages above ₹10,000',
    features: ['Complete transformations', 'Multiple services', 'Best value'],
    condition: 'Above ₹10,000',
    highlighted: true,
  },
]

export function Membership() {
  return (
    <section id="membership" className="py-20 sm:py-32 bg-background relative section-overlap">
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
            Membership Benefits
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            variants={paragraphLineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Unlock exclusive discounts and premium benefits with our membership tiers.
          </motion.p>
        </motion.div>

        {/* Mobile Cards */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {membershipTiers.map((tier, idx) => (
            <motion.div
              key={idx}
              className={`rounded-xl border border-border bg-white p-5 shadow-sm ${
                tier.highlighted ? 'border-accent/40 bg-accent/5' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-medium text-foreground">{tier.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-accent shrink-0">{tier.discount}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tier.features.map((feature, fidx) => (
                  <span
                    key={fidx}
                    className="inline-block px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              {tier.condition && (
                <p className="text-xs text-accent font-semibold mt-3">✓ {tier.condition}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Desktop Comparison Table */}
        <motion.div
          className="hidden md:block overflow-x-auto rounded-xl border border-border bg-white shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          viewport={{ once: true }}
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-4 text-left text-sm font-medium text-foreground">
                  Membership Tier
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-foreground">
                  Discount
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-foreground">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {membershipTiers.map((tier, idx) => (
                <motion.tr
                  key={idx}
                  className={`border-b border-border transition-colors duration-300 hover:bg-secondary/50 ${
                    tier.highlighted ? 'bg-accent/5' : ''
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ backgroundColor: 'rgba(184, 165, 150, 0.08)' }}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium text-foreground">{tier.name}</p>
                        <p className="text-sm text-muted-foreground">{tier.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <motion.div
                      className="inline-block"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-2xl font-bold text-accent">{tier.discount}</span>
                    </motion.div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {tier.features.map((feature, fidx) => (
                          <motion.span
                            key={fidx}
                            className="inline-block px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: fidx * 0.05 }}
                            viewport={{ once: true }}
                          >
                            {feature}
                          </motion.span>
                        ))}
                      </div>
                      {tier.condition && (
                        <motion.p
                          className="text-xs text-accent font-semibold mt-3"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          viewport={{ once: true }}
                        >
                          ✓ {tier.condition}
                        </motion.p>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-6">
            Ready to enjoy exclusive member benefits?
          </p>
          <motion.a
            href="#contact"
            className="inline-block bg-accent text-accent-foreground px-8 py-4 rounded-lg font-medium hover:bg-accent/90 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Join as Member Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
