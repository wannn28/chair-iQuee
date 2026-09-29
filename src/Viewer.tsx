import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import { Chair } from './Chair'
import { Fit } from './Fit'

type ViewerProps = {
  color: string
}

export function Viewer({ color }: ViewerProps) {
  return (
    <Canvas
      className="viewer-canvas"
      camera={{ position: [2, 1.5, 2.5], fov: 35 }}
      gl={{ antialias: true }}
      shadows
    >
      <color attach="background" args={['#d8dde4']} />
      <ambientLight intensity={0.7} />
      <directionalLight
        castShadow
        position={[5, 9, 4]}
        intensity={1.3}
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 5, -2]} intensity={0.4} />
      <Suspense fallback={null}>
        <Fit margin={1.5}>
          <Chair color={color} />
        </Fit>
      </Suspense>
      <ContactShadows
        position={[0, -0.24, 0]}
        opacity={0.3}
        scale={4}
        blur={2.5}
        far={2}
      />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
  )
}
