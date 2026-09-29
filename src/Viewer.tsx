import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import { Chair } from './Chair'

type ViewerProps = {
  color: string
}

export function Viewer({ color }: ViewerProps) {
  return (
    <Canvas
      className="viewer-canvas"
      camera={{ position: [2.2, 1.6, 2.8], fov: 35 }}
      gl={{ antialias: true }}
      shadows
    >
      <color attach="background" args={['#d8dde4']} />
      <ambientLight intensity={0.65} />
      <directionalLight
        castShadow
        position={[4, 8, 3]}
        intensity={1.25}
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 4, -2]} intensity={0.35} />
      <Suspense fallback={null}>
        <Chair color={color} />
      </Suspense>
      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.35}
        scale={8}
        blur={2.4}
        far={4}
      />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.05}
        minDistance={2.2}
        maxDistance={6}
        target={[0, 0.55, 0]}
      />
    </Canvas>
  )
}
