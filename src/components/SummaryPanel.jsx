import { QUANTITIES, getPackage } from '../config/catalog.js'
import { ArrowIcon } from './Icons.jsx'

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export function SummaryPanel({ config, price, onQuantity, onReset, onQuote }) {
  const packageInfo = getPackage(config.packageType)
  return (
    <aside className="summary-panel" aria-labelledby="summary-title">
      <div className="summary-topline"><p className="section-kicker">02 / Estimate</p><button type="button" onClick={onReset}>Reset</button></div>
      <h2 id="summary-title">Configuration</h2>
      <dl className="summary-list">
        <div><dt>Format</dt><dd>{packageInfo.name}</dd></div>
        <div><dt>Size</dt><dd>{config.size} wipes</dd></div>
        <div><dt>Material</dt><dd>{config.material}</dd></div>
        <div><dt>Finish</dt><dd>{config.finish}</dd></div>
        <div><dt>Closure</dt><dd>{config.closure}</dd></div>
      </dl>
      <div className="quantity-block">
        <label htmlFor="quantity">Quantity</label>
        <div className="quantity-presets">
          {QUANTITIES.map((quantity) => <button type="button" className={config.quantity === quantity ? 'is-selected' : ''} aria-pressed={config.quantity === quantity} onClick={() => onQuantity(quantity)} key={quantity}>{quantity >= 1000 ? `${quantity / 1000}k` : quantity}</button>)}
        </div>
        <input id="quantity" type="number" min="1000" step="500" value={config.quantity} onChange={(event) => onQuantity(Math.max(1000, Number(event.target.value) || 1000))} />
      </div>
      <div className="price-block">
        <div className="price-label"><span>Illustrative estimate</span><small>{price.tier.label} volume tier</small></div>
        <div className="unit-price"><strong>{money.format(price.unitPrice)}</strong><span>per pack</span></div>
        <div className="total-price"><span>Estimated total</span><strong>{money.format(price.total)}</strong></div>
      </div>
      <p className="price-note">Sample pricing only. Freight, tooling, taxes and prepress are not included.</p>
      <button type="button" className="primary-button" onClick={onQuote}>Request a quote <ArrowIcon /></button>
      <p className="response-note">A packaging specialist typically replies within 1–2 business days.</p>
    </aside>
  )
}
