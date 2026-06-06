'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface PricingEditorProps {
  items: any[]
  categoryId: string
  onUpdate: (index: number, item: any) => void
}

export function PricingEditor({ items, categoryId, onUpdate }: PricingEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const getPriceFields = (item: any) => {
    const fields: { key: string; label: string }[] = []

    if (item.price !== undefined) fields.push({ key: 'price', label: 'Price' })
    if (item.range !== undefined) fields.push({ key: 'range', label: 'Range' })
    if (item.short !== undefined) fields.push({ key: 'short', label: 'Short' })
    if (item.medium !== undefined) fields.push({ key: 'medium', label: 'Medium' })
    if (item.long !== undefined) fields.push({ key: 'long', label: 'Long' })
    if (item.shoulder !== undefined) fields.push({ key: 'shoulder', label: 'Shoulder' })
    if (item.below !== undefined) fields.push({ key: 'below', label: 'Below' })
    if (item.waist !== undefined) fields.push({ key: 'waist', label: 'Waist' })
    if (item.without_art !== undefined) fields.push({ key: 'without_art', label: 'Without Art' })
    if (item.with_art !== undefined) fields.push({ key: 'with_art', label: 'With Art' })
    if (item['2inch'] !== undefined) fields.push({ key: '2inch', label: '2 inch' })
    if (item['3inch'] !== undefined) fields.push({ key: '3inch', label: '3 inch' })
    if (item['4inch'] !== undefined) fields.push({ key: '4inch', label: '4 inch' })

    return fields
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-lg overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Service</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Pricing</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => {
              const isEditing = editingIndex === idx
              const priceFields = getPriceFields(item)

              return (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-border hover:bg-background transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-foreground font-light">
                    {item.service || item.brand || ''}
                  </td>
                  <td className="px-6 py-4">
                    {isEditing ? (
                      <div className="space-y-2">
                        {priceFields.map((field) => (
                          <div key={field.key} className="flex items-center gap-2">
                            <label className="text-xs text-muted-foreground w-20">{field.label}:</label>
                            <input
                              type="number"
                              min="0"
                              value={item[field.key]}
                              onChange={(e) => {
                                const newItem = { ...item }
                                newItem[field.key] = parseInt(e.target.value) || 0
                                onUpdate(idx, newItem)
                              }}
                              className="w-24 px-2 py-1 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        {priceFields.map((field) => (
                          <div key={field.key}>
                            {field.label}: ₹{item[field.key]}
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-right space-x-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="text-primary hover:text-primary/70 transition-colors duration-200 font-light"
                        >
                          Done
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditingIndex(idx)}
                        className="text-primary hover:text-primary/70 transition-colors duration-200 font-light"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
