'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { pricingData } from '@/lib/pricing-data'

interface PricingModalProps {
  isOpen: boolean
  onClose: () => void
  category: {
    id: string
    name: string
    subcategories: string[]
  } | null
  getCategoryLabel: (id: string) => string
  renderPrice: (item: any) => string
}

const getCategoryLabel = (categoryId: string) => {
  const labels: Record<string, string> = {
    men_haircut: "Men's Haircut",
    women_haircut: "Women's Haircut",
    hair_styling: 'Hair Styling',
    men_hair_color: "Men's Hair Color",
    women_hair_color: "Women's Hair Color",
    men_treatments: "Men's Treatments",
    women_treatments: "Women's Treatments",
    skin_services: 'Skin Services',
    men_waxing: "Men's Waxing",
    women_waxing: "Women's Waxing",
    threading: 'Threading',
    nail_services: 'Nail Services',
    semi_permanent: 'Semi-Permanent',
  }
  return labels[categoryId] || categoryId
}

export function PricingModal({ isOpen, onClose, category }: PricingModalProps) {
  if (!category) return null

  const renderPrice = (item: any) => {
    if (item.price) return `₹${item.price}`
    if (item.range) return `₹${item.range}`
    if (item.short && item.medium && item.long) {
      return `₹${item.short} - ₹${item.long}`
    }
    if (item.shoulder && item.below && item.waist) {
      return `₹${item.shoulder} - ₹${item.waist}`
    }
    if (item.without_art && item.with_art) {
      return `₹${item.without_art} - ₹${item.with_art}`
    }
    if (item.brand) return `₹${item.short} - ₹${item.long}`
    if (item['2inch'] && item['3inch'] && item['4inch']) {
      return `₹${item['2inch']} - ₹${item['4inch']}`
    }
    return 'Custom Quote'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-xl shadow-xl max-w-2xl w-full max-h-[85dvh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-border px-4 sm:px-8 py-4 sm:py-6 flex justify-between items-start sm:items-center gap-4">
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-3xl font-light text-foreground">
                    {category.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Complete pricing details
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 min-h-11 min-w-11 shrink-0 flex items-center justify-center hover:bg-muted rounded-lg transition-colors text-foreground/60 hover:text-foreground"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-8 space-y-8">
                {category.subcategories.map((subcatId) => {
                  const items = pricingData[subcatId as keyof typeof pricingData] as any[]
                  return (
                    <motion.div
                      key={subcatId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-sm sm:text-base font-medium text-foreground uppercase tracking-widest mb-5 opacity-70">
                        {getCategoryLabel(subcatId)}
                      </h3>
                      <div className="space-y-3 ml-2">
                        {items.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-start py-2 border-b border-border/30 last:border-0"
                          >
                            <span className="text-sm text-foreground/80 flex-1 sm:pr-4">
                              {item.service || item.brand || ''}
                              {item.brand && item.short && (
                                <span className="text-xs text-muted-foreground ml-2 block">
                                  (₹{item.short}–{item.long})
                                </span>
                              )}
                            </span>
                            <span className="font-light text-primary sm:ml-3 shrink-0 text-sm">
                              {renderPrice(item)}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                      {category.subcategories.indexOf(subcatId) < category.subcategories.length - 1 && (
                        <div className="mt-6 pt-6 border-t border-border/50" />
                      )}
                    </motion.div>
                  )
                })}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white border-t border-border px-6 sm:px-8 py-4">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="block w-full text-center bg-primary text-primary-foreground px-6 py-3 rounded-lg font-light hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Book Now
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
