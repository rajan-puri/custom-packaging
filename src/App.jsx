import { useMemo, useState } from 'react'
import { ConfiguratorPanel } from './components/ConfiguratorPanel.jsx'
import { LeafMark } from './components/Icons.jsx'
import { ProductPreview } from './components/ProductPreview.jsx'
import { QuoteDialog } from './components/QuoteDialog.jsx'
import { SummaryPanel } from './components/SummaryPanel.jsx'
import { DEFAULT_CONFIG } from './config/catalog.js'
import { calculatePrice } from './config/pricing.js'

export default function App() {
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [upload, setUpload] = useState(null)
  const [uploadError, setUploadError] = useState('')
  const [quoteOpen, setQuoteOpen] = useState(false)
  const price = useMemo(() => calculatePrice(config), [config])

  function reset() {
    if (upload?.url) URL.revokeObjectURL(upload.url)
    setConfig(DEFAULT_CONFIG)
    setUpload(null)
    setUploadError('')
  }

  return (
    <>
      <a className="skip-link" href="#configurator">Skip to configurator</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Packform home"><LeafMark /><span>PACKFORM</span></a>
        <p>Custom wet wipes packaging</p>
        <a href="#configurator">Configure <span aria-hidden="true">↓</span></a>
      </header>
      <main id="top">
        <section className="hero">
          <p className="section-kicker">Packaging, composed for your brand</p>
          <h1>From blank pack to<br /><span>branded shelf presence.</span></h1>
          <div className="hero-support"><p>Build a tailored wet wipes pack, explore visual directions and prepare a production enquiry—all in one considered workflow.</p><span>Concept preview · Illustrative pricing</span></div>
        </section>
        <div className="configurator" id="configurator">
          <ConfiguratorPanel config={config} setConfig={setConfig} upload={upload} setUpload={setUpload} uploadError={uploadError} setUploadError={setUploadError} />
          <ProductPreview config={config} upload={upload} />
          <SummaryPanel config={config} price={price} onQuantity={(quantity) => setConfig((current) => ({ ...current, quantity }))} onReset={reset} onQuote={() => setQuoteOpen(true)} />
        </div>
      </main>
      <footer><span>PACKFORM / CONCEPT STUDIO</span><p>Built for early-stage packaging exploration.</p></footer>
      <QuoteDialog open={quoteOpen} onClose={() => setQuoteOpen(false)} config={config} upload={upload} />
    </>
  )
}
