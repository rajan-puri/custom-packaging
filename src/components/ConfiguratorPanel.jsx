import { useRef } from 'react'
import { ARTWORK_COLORS, FINISHES, PACKAGE_TYPES, SAMPLE_DESIGNS, SIZES, getPackage, normalizeForPackage } from '../config/catalog.js'
import { OptionGroup } from './OptionGroup.jsx'
import { CloseIcon, UploadIcon } from './Icons.jsx'

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'application/pdf']
const MAX_SIZE = 10 * 1024 * 1024

export function ConfiguratorPanel({ config, setConfig, upload, setUpload, uploadError, setUploadError }) {
  const inputRef = useRef(null)
  const packageInfo = getPackage(config.packageType)
  const update = (key, value) => setConfig((current) => ({ ...current, [key]: value }))
  const handlePackage = (packageId) => setConfig((current) => normalizeForPackage(current, packageId))

  function handleFile(file) {
    setUploadError('')
    if (!file) return
    if (!ACCEPTED_TYPES.includes(file.type)) return setUploadError('Choose a PNG, JPG or PDF file.')
    if (file.size > MAX_SIZE) return setUploadError('Artwork must be 10 MB or smaller.')
    if (upload?.url) URL.revokeObjectURL(upload.url)
    setUpload({ name: file.name, type: file.type, size: file.size, url: URL.createObjectURL(file) })
  }

  function removeUpload() {
    if (upload?.url) URL.revokeObjectURL(upload.url)
    setUpload(null)
    setUploadError('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <section className="config-panel" aria-labelledby="customise-title">
      <div className="panel-intro"><p className="section-kicker">01 / Configure</p><h2 id="customise-title">Build your format</h2><p>Choose the structure, feel and artwork direction for your first concept.</p></div>
      <OptionGroup legend="Package type" options={PACKAGE_TYPES} value={config.packageType} onChange={handlePackage} />
      <OptionGroup legend="Pack size" helper="Wipes per pack" compact options={SIZES.map((size) => ({ id: size, name: `${size}` }))} value={config.size} onChange={(value) => update('size', value)} />
      <OptionGroup legend="Material" options={packageInfo.materials} value={config.material} onChange={(value) => update('material', value)} />
      <OptionGroup legend="Finish" compact options={FINISHES} value={config.finish} onChange={(value) => update('finish', value)} />
      <OptionGroup legend="Closure" helper={`Options for ${packageInfo.name}`} options={packageInfo.closures} value={config.closure} onChange={(value) => update('closure', value)} />

      <fieldset className="option-group">
        <legend className="option-heading"><span className="option-title">Artwork colour</span><span>{ARTWORK_COLORS.find((color) => color.value === config.artworkColor)?.name ?? 'Custom'}</span></legend>
        <div className="swatches">
          {ARTWORK_COLORS.map((color) => (
            <button type="button" className={config.artworkColor === color.value ? 'is-selected' : ''} style={{ '--swatch': color.value }} aria-label={`${color.name} artwork colour`} aria-pressed={config.artworkColor === color.value} onClick={() => update('artworkColor', color.value)} key={color.value}>
              {config.artworkColor === color.value && <span><span className="sr-only">Selected</span></span>}
            </button>
          ))}
          <label className="custom-colour"><span>Custom</span><input aria-label="Choose a custom artwork colour" type="color" value={config.artworkColor} onChange={(event) => update('artworkColor', event.target.value)} /></label>
        </div>
      </fieldset>

      <OptionGroup legend="Sample design" compact options={SAMPLE_DESIGNS} value={config.sampleDesign} onChange={(value) => update('sampleDesign', value)} />

      <fieldset className="option-group">
        <legend className="option-heading"><span className="option-title">Custom artwork</span><span>PNG, JPG or PDF · max 10 MB</span></legend>
        {!upload ? (
          <label className={`upload-zone ${uploadError ? 'has-error' : ''}`}><UploadIcon /><span><strong>Choose artwork</strong><small>Images are fitted and clipped to the print area</small></span><input ref={inputRef} type="file" accept=".png,.jpg,.jpeg,.pdf,image/png,image/jpeg,application/pdf" onChange={(event) => handleFile(event.target.files?.[0])} /></label>
        ) : (
          <div className="upload-file"><div><strong>{upload.name}</strong><small>{(upload.size / 1024 / 1024).toFixed(1)} MB · {upload.type === 'application/pdf' ? 'PDF accepted' : 'Preview active'}</small></div><button type="button" onClick={removeUpload} aria-label="Remove uploaded artwork"><CloseIcon /></button></div>
        )}
        {uploadError && <p className="field-error" role="alert">{uploadError}</p>}
        {upload && upload.type !== 'application/pdf' && <label className="scale-control"><span>Artwork scale <output>{config.artworkScale}%</output></span><input type="range" min="70" max="160" value={config.artworkScale} onChange={(event) => update('artworkScale', Number(event.target.value))} /></label>}
      </fieldset>
    </section>
  )
}
