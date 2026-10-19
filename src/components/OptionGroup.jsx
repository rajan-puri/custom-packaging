import { CheckIcon } from './Icons.jsx'

export function OptionGroup({ legend, helper, options, value, onChange, compact = false }) {
  return (
    <fieldset className="option-group">
      <legend className="option-heading"><span className="option-title">{legend}</span>{helper && <span>{helper}</span>}</legend>
      <div className={`option-grid ${compact ? 'option-grid--compact' : ''}`}>
        {options.map((option) => {
          const item = typeof option === 'string' ? { id: option, name: option } : option
          const selected = value === item.id
          return (
            <button type="button" className={`option-button ${selected ? 'is-selected' : ''}`} aria-pressed={selected} onClick={() => onChange(item.id)} key={item.id}>
              <span><strong>{item.name}</strong>{item.description && <small>{item.description}</small>}</span>
              {selected && <CheckIcon />}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
