import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Suspense, useState } from 'react'
import { Chair } from './Chair'
import { CHAIR_COLORS, DEFAULT_COLOR, type ChairColor } from './colors'
import './App.css'

function Viewer({ color }: { color: string }) {
  return (
    <Canvas
      className="viewer-canvas"
      camera={{ position: [2.4, 1.6, 2.8], fov: 35 }}
      gl={{ antialias: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#e8e4dc']} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 3]} intensity={1.25} />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} />
      <Suspense fallback={null}>
        <Chair color={color} />
      </Suspense>
      <ContactShadows
        position={[0, -0.55, 0]}
        opacity={0.35}
        scale={8}
        blur={2.2}
        far={3}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        target={[0, 0.15, 0]}
      />
    </Canvas>
  )
}

function SwatchRow({
  active,
  onSelect,
}: {
  active: ChairColor
  onSelect: (color: ChairColor) => void
}) {
  return (
    <div className="swatch-row" role="listbox" aria-label="Chair color">
      {CHAIR_COLORS.map((color) => {
        const isActive = color.name === active.name
        return (
          <div className="swatch-item" key={color.name}>
            <button
              type="button"
              role="option"
              aria-selected={isActive}
              aria-label={color.name}
              className={`swatch${isActive ? ' is-active' : ''}`}
              style={{ backgroundColor: color.hex }}
              onClick={() => onSelect(color)}
            />
            {isActive ? <span className="swatch-name">{color.name}</span> : null}
          </div>
        )
      })}
    </div>
  )
}

export default function App() {
  const [active, setActive] = useState<ChairColor>(DEFAULT_COLOR)

  return (
    <div className="page">
      <p className="demo-label">Demo</p>
      <main className="stage">
        <div className="viewer">
          <Viewer color={active.hex} />
        </div>
        <SwatchRow active={active} onSelect={setActive} />
      </main>
    </div>
  )
}
