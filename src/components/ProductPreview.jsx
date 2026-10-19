import { getPackage, SAMPLE_DESIGNS } from '../config/catalog.js'
import { LeafMark } from './Icons.jsx'

export function ProductPreview({ config, upload }) {
  const packageInfo = getPackage(config.packageType)
  const sample = SAMPLE_DESIGNS.find((item) => item.id === config.sampleDesign) ?? SAMPLE_DESIGNS[0]
  const isImageUpload = upload?.url && upload.type !== 'application/pdf'

  return (
    <section className="preview-panel" aria-labelledby="preview-title">
      <div className="preview-heading">
        <div><p className="section-kicker">Live composition</p><h2 id="preview-title">Your pack, taking shape</h2></div>
        <span className="preview-status"><i /> Preview</span>
      </div>
      <div className={`product-stage product-stage--${config.packageType}`}>
        <div className="stage-grid" aria-hidden="true" />
        <div className="product-composite">
          <div className={`artwork-layer artwork-layer--${config.packageType} artwork-layer--${sample.id}`} style={{ '--art-color': config.artworkColor }}>
            {isImageUpload ? (
              <img src={upload.url} alt="" className="uploaded-artwork" style={{ transform: `scale(${config.artworkScale / 100})` }} />
            ) : (
              <div className="sample-artwork">
                <span className="sample-mark"><LeafMark /></span>
                <span className="sample-copy"><small>{sample.eyebrow}</small><strong>{sample.title}</strong><em>{config.size} wipes</em></span>
              </div>
            )}
          </div>
          <img className="product-image" src={packageInfo.image} width="1536" height="1024" alt={`Blank ${packageInfo.name} packaging mockup with configurable artwork overlay`} />
        </div>
        <div className="stage-caption"><span>{packageInfo.name}</span><span>{config.size} wipes</span><span>{config.finish}</span></div>
      </div>
      <p className="preview-disclaimer">
        Visual concept only — colours, print position and proportions are not a manufacturing proof.
        {upload?.type === 'application/pdf' && ' Your PDF is accepted, but cannot be rasterised in this browser preview.'}
      </p>
    </section>
  )
}
