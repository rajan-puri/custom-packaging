export const PACKAGE_TYPES = [
  { id: 'flow', name: 'Flow Pack', description: 'Compact pillow pouch', image: '/mockups/flow-pack.png', closures: ['Peel label', 'Resealable label'], materials: ['Standard PE film', 'Recycled-content film', 'Plant-based film'] },
  { id: 'travel', name: 'Travel Pack', description: 'Portable flip-top pack', image: '/mockups/travel-pack.png', closures: ['Resealable label', 'Slim flip-top'], materials: ['Standard PE film', 'Recycled-content film', 'Plant-based film'] },
  { id: 'refill', name: 'Refill Pack', description: 'Large flexible pouch', image: '/mockups/refill-pack.png', closures: ['Resealable label', 'Wide flip-top'], materials: ['Standard PE film', 'Recycled-content film', 'Plant-based film'] },
  { id: 'tub', name: 'Tub', description: 'Rigid reusable format', image: '/mockups/tub.png', closures: ['Hinged lid', 'Push-button lid'], materials: ['Standard PP', 'Recycled-content PP'] },
]

export const SIZES = [10, 20, 50]
export const FINISHES = ['Matte', 'Soft-touch matte', 'Gloss']
export const ARTWORK_COLORS = [
  { name: 'Forest', value: '#1f5748' },
  { name: 'Terracotta', value: '#a94f37' },
  { name: 'Oat', value: '#c7a978' },
  { name: 'Ink', value: '#27333a' },
  { name: 'Cloud', value: '#d9dfd7' },
]
export const SAMPLE_DESIGNS = [
  { id: 'botanical', name: 'Botanical', eyebrow: 'PLANT BASED', title: 'Everyday clean' },
  { id: 'clinical', name: 'Clinical', eyebrow: 'DERM TESTED', title: 'Pure care' },
  { id: 'minimal', name: 'Minimal', eyebrow: 'ESSENTIALS', title: 'Clean / simple' },
]
export const QUANTITIES = [1000, 5000, 10000, 25000]
export const DEFAULT_CONFIG = { packageType: 'flow', size: 20, material: 'Standard PE film', finish: 'Matte', closure: 'Peel label', artworkColor: '#1f5748', sampleDesign: 'botanical', quantity: 5000, artworkScale: 100 }

export function getPackage(packageId) {
  return PACKAGE_TYPES.find((item) => item.id === packageId) ?? PACKAGE_TYPES[0]
}

export function normalizeForPackage(config, packageId) {
  const nextPackage = getPackage(packageId)
  return {
    ...config,
    packageType: packageId,
    material: nextPackage.materials.includes(config.material) ? config.material : nextPackage.materials[0],
    closure: nextPackage.closures[0],
  }
}
