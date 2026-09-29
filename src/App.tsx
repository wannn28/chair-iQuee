import { useState } from 'react'
import { DEFAULT_COLOR, type ChairColor } from './colors'
import { Viewer } from './Viewer'
import { Swatches } from './Swatches'
import './App.css'

function App() {
  const [activeColor, setActiveColor] = useState<ChairColor>(DEFAULT_COLOR)

  return (
    <div className="page">
      <p className="demo-label">Demo</p>
      <main className="stage">
        <div className="viewer">
          <Viewer color={activeColor.hex} />
        </div>
        <Swatches active={activeColor} onSelect={setActiveColor} />
      </main>
    </div>
  )
}

export default App
