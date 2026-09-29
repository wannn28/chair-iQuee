import { CHAIR_COLORS, type ChairColor } from './colors'

type SwatchesProps = {
  active: ChairColor
  onSelect: (color: ChairColor) => void
}

export function Swatches({ active, onSelect }: SwatchesProps) {
  return (
    <div className="swatches" role="listbox" aria-label="Chair color">
      {CHAIR_COLORS.map((color) => {
        const isActive = color.name === active.name
        return (
          <div key={color.name} className="swatch-item">
            <button
              type="button"
              role="option"
              aria-selected={isActive}
              aria-label={color.name}
              className={`swatch${isActive ? ' is-active' : ''}`}
              style={{ backgroundColor: color.hex }}
              onClick={() => onSelect(color)}
            />
            {isActive ? (
              <span className="swatch-name" aria-live="polite">
                {color.name}
              </span>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
