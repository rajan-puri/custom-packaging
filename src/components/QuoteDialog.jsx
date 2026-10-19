import { useEffect, useRef, useState } from 'react'
import { getPackage } from '../config/catalog.js'
import { CheckIcon, CloseIcon } from './Icons.jsx'

const EMPTY_FORM = { name: '', company: '', email: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Enter your name.'
  if (!form.company.trim()) errors.company = 'Enter your company name.'
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Enter a valid email address.'
  return errors
}

export function QuoteDialog({ open, onClose, config, upload }) {
  const dialogRef = useRef(null)
  const errorRef = useRef(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [prepared, setPrepared] = useState(false)
  const packageInfo = getPackage(config.packageType)

  useEffect(() => {
    const dialog = dialogRef.current
    if (open && dialog && !dialog.open) dialog.showModal()
    if (!open && dialog?.open) dialog.close()
  }, [open])

  function close() {
    setPrepared(false)
    setErrors({})
    onClose()
  }

  function onSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => errorRef.current?.focus())
      return
    }
    setPrepared(true)
  }

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: '' }))
  }

  return (
    <dialog ref={dialogRef} className="quote-dialog" onCancel={(event) => { event.preventDefault(); close() }}>
      <button type="button" className="dialog-close" onClick={close} aria-label="Close quote form"><CloseIcon /></button>
      {prepared ? (
        <div className="confirmation-state" aria-live="polite">
          <span className="confirmation-check"><CheckIcon /></span>
          <p className="section-kicker">Request prepared</p>
          <h2>Your configuration is ready.</h2>
          <p>No request has been sent because this demo has no submission endpoint. Connect a CRM, email service or API before using this flow in production.</p>
          <button type="button" className="primary-button" onClick={close}>Return to configurator</button>
        </div>
      ) : (
        <form method="dialog" onSubmit={onSubmit} noValidate>
          <input type="hidden" name="quantity" value={config.quantity} />
          <input type="hidden" name="selectedConfiguration" value={`${packageInfo.name}; ${config.size} wipes; ${config.material}; ${config.finish}; ${config.closure}`} />
          <p className="section-kicker">Quote details</p>
          <h2>Tell us where to follow up.</h2>
          <p className="dialog-intro">Review your details and prepare a request. This demo will not send your information.</p>
          {Object.values(errors).some(Boolean) && <div className="error-summary" role="alert" tabIndex="-1" ref={errorRef}><strong>Please fix the highlighted fields.</strong></div>}
          <div className="form-grid">
            <label htmlFor="quote-name">Name<input id="quote-name" name="name" required autoComplete="name" value={form.name} onBlur={() => { if (!form.name.trim()) setErrors((current) => ({ ...current, name: 'Enter your name.' })) }} onChange={(event) => update('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name && <small id="name-error">{errors.name}</small>}</label>
            <label htmlFor="quote-company">Company<input id="quote-company" name="company" required autoComplete="organization" value={form.company} onBlur={() => { if (!form.company.trim()) setErrors((current) => ({ ...current, company: 'Enter your company name.' })) }} onChange={(event) => update('company', event.target.value)} aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? 'company-error' : undefined} />{errors.company && <small id="company-error">{errors.company}</small>}</label>
            <label className="full-field" htmlFor="quote-email">Work email<input id="quote-email" name="email" required autoComplete="email" type="email" value={form.email} onBlur={() => { if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) setErrors((current) => ({ ...current, email: 'Enter a valid email address.' })) }} onChange={(event) => update('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />{errors.email && <small id="email-error">{errors.email}</small>}</label>
          </div>
          <div className="quote-configuration">
            <h3>Selected configuration</h3>
            <dl>
              <div><dt>Product</dt><dd>{packageInfo.name}, {config.size} wipes</dd></div>
              <div><dt>Material</dt><dd>{config.material}, {config.finish}</dd></div>
              <div><dt>Closure</dt><dd>{config.closure}</dd></div>
              <div><dt>Quantity</dt><dd>{config.quantity.toLocaleString()} packs</dd></div>
              <div><dt>Artwork</dt><dd>{upload?.name ?? 'Sample design'}</dd></div>
            </dl>
          </div>
          <button type="submit" className="primary-button">Prepare quote request</button>
        </form>
      )}
    </dialog>
  )
}
