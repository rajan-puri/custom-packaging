const PACKAGE_BASE = { flow: 0.42, travel: 0.57, refill: 0.72, tub: 1.18 }
const SIZE_ADD = { 10: 0, 20: 0.11, 50: 0.29 }
const MATERIAL_ADD = { 'Standard PE film': 0, 'Recycled-content film': 0.08, 'Plant-based film': 0.13, 'Standard PP': 0.18, 'Recycled-content PP': 0.28 }
const FINISH_ADD = { Matte: 0.04, 'Soft-touch matte': 0.1, Gloss: 0.06 }
const CLOSURE_ADD = { 'Peel label': 0, 'Resealable label': 0.04, 'Slim flip-top': 0.15, 'Wide flip-top': 0.2, 'Hinged lid': 0.16, 'Push-button lid': 0.29 }

export const PRICING_TIERS = [
  { min: 25000, multiplier: 0.72, label: '25k+' },
  { min: 10000, multiplier: 0.82, label: '10k+' },
  { min: 5000, multiplier: 0.9, label: '5k+' },
  { min: 1000, multiplier: 1, label: '1k+' },
]

export function calculatePrice(config) {
  const tier = PRICING_TIERS.find((item) => config.quantity >= item.min) ?? PRICING_TIERS.at(-1)
  const unit = (PACKAGE_BASE[config.packageType] + SIZE_ADD[config.size] + MATERIAL_ADD[config.material] + FINISH_ADD[config.finish] + CLOSURE_ADD[config.closure]) * tier.multiplier
  const unitPrice = Math.round(unit * 100) / 100
  return { unitPrice, total: unitPrice * config.quantity, tier }
}
