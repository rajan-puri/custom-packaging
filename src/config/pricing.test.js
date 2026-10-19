import { describe, expect, it } from 'vitest'
import { DEFAULT_CONFIG } from './catalog.js'
import { calculatePrice } from './pricing.js'

describe('illustrative pricing', () => {
  it('reduces unit price at higher quantity tiers', () => {
    const low = calculatePrice({ ...DEFAULT_CONFIG, quantity: 1000 })
    const high = calculatePrice({ ...DEFAULT_CONFIG, quantity: 25000 })
    expect(high.unitPrice).toBeLessThan(low.unitPrice)
  })

  it('keeps total aligned with unit price and quantity', () => {
    const quote = calculatePrice(DEFAULT_CONFIG)
    expect(quote.total).toBe(quote.unitPrice * DEFAULT_CONFIG.quantity)
  })
})
