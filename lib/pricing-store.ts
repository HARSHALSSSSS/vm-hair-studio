// Pricing data management with local storage persistence

import { pricingData as defaultPricingData } from './pricing-data'

const PRICING_STORAGE_KEY = 'salon_pricing'

export interface PriceItem {
  [key: string]: any
}

export const pricingStore = {
  // Get all pricing data
  getAllPricing: () => {
    if (typeof window === 'undefined') return defaultPricingData

    try {
      const data = localStorage.getItem(PRICING_STORAGE_KEY)
      return data ? JSON.parse(data) : defaultPricingData
    } catch {
      return defaultPricingData
    }
  },

  // Get pricing by category
  getPricingByCategory: (category: string): PriceItem[] => {
    const allPricing = pricingStore.getAllPricing()
    return allPricing[category as keyof typeof defaultPricingData] || []
  },

  // Update pricing item
  updatePrice: (category: string, itemIndex: number, newPrice: any) => {
    if (typeof window === 'undefined') return

    const allPricing = pricingStore.getAllPricing()
    if (allPricing[category] && allPricing[category][itemIndex]) {
      allPricing[category][itemIndex] = newPrice
      localStorage.setItem(PRICING_STORAGE_KEY, JSON.stringify(allPricing))
    }
  },

  // Reset to defaults
  resetToDefaults: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(PRICING_STORAGE_KEY)
    }
  },
}
