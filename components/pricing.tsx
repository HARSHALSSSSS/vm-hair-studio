'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { pricingData, pricingCategories } from '@/lib/pricing-data'
import { containerVariants, itemVariants, staggeredParagraphVariants, paragraphLineVariants } from '@/lib/animations'

export function Pricing() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('men_haircut')

  const renderPriceDisplay = (item: any) => {
    if (item.price) {
      return <span className="font-semibold text-primary">₹{item.price}</span>
    }
    if (item.range) {
      return <span className="font-semibold text-primary">₹{item.range}</span>
    }
    if (item.short && item.medium && item.long) {
      return (
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="text-muted-foreground">Short: <span className="font-semibold text-primary">₹{item.short}</span></span>
          <span className="text-muted-foreground">Med: <span className="font-semibold text-primary">₹{item.medium}</span></span>
          <span className="text-muted-foreground">Long: <span className="font-semibold text-primary">₹{item.long}</span></span>
        </div>
      )
    }
    if (item.shoulder && item.below && item.waist) {
      return (
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="text-muted-foreground">Shoulder: <span className="font-semibold text-primary">₹{item.shoulder}</span></span>
          <span className="text-muted-foreground">Below: <span className="font-semibold text-primary">₹{item.below}</span></span>
          <span className="text-muted-foreground">Waist: <span className="font-semibold text-primary">₹{item.waist}</span></span>
        </div>
      )
    }
    if (item['2inch'] && item['3inch'] && item['4inch']) {
      return (
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="text-muted-foreground">2&quot;: <span className="font-semibold text-primary">₹{item['2inch']}</span></span>
          <span className="text-muted-foreground">3&quot;: <span className="font-semibold text-primary">₹{item['3inch']}</span></span>
          <span className="text-muted-foreground">4&quot;: <span className="font-semibold text-primary">₹{item['4inch']}</span></span>
        </div>
      )
    }
    if (item.without_art && item.with_art) {
      return (
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="text-muted-foreground">No Art: <span className="font-semibold text-primary">₹{item.without_art}</span></span>
          <span className="text-muted-foreground">With Art: <span className="font-semibold text-primary">₹{item.with_art}</span></span>
        </div>
      )
    }
    if (item.brand) {
      return <span className="text-muted-foreground italic">{item.brand}</span>
    }
    return null
  }

  return (
    <section id="pricing" className="py-20 sm:py-32 bg-white relative section-overlap">
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
            Complete Pricing
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            variants={paragraphLineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Transparent pricing across all our premium services. Explore our complete menu with detailed options and pricing.
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-nowrap overflow-x-auto snap-x gap-2 mb-12 justify-start sm:justify-center pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {pricingCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setExpandedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
                expandedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Pricing Content */}
        <motion.div
          className="bg-background rounded-2xl p-4 sm:p-8 lg:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {expandedCategory && (
            <motion.div
              key={expandedCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {/* Category Title */}
              <h3 className="text-2xl sm:text-3xl font-light text-foreground mb-8">
                {pricingCategories.find(c => c.id === expandedCategory)?.label}
              </h3>

              {/* Pricing Items */}
              <motion.div
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {(pricingData as any)[expandedCategory].map((item: any, idx: number) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-300 border border-border/50"
                  >
                    <div className="mb-3 sm:mb-0">
                      <p className="font-medium text-foreground">
                        {item.service || item.brand}
                      </p>
                    </div>
                    <div className="flex items-center justify-start sm:justify-end">
                      {renderPriceDisplay(item)}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Footer Note */}
        <motion.p
          className="text-center text-sm text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Prices are subject to change. For the latest pricing and special offers, please contact us or book an appointment.
        </motion.p>
      </div>
    </section>
  )
}
