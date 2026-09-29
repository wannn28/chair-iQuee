import { Canvas } from '@react-three/fiber'
import { Bounds, ContactShadows, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import { Chair } from './Chair'

type ViewerProps = {
  color: string
}

export function Viewer({ color }: ViewerProps) {
  return (
    <Canvas
      className="viewer-canvas"
      camera={{ position: [2.8, 2.1, 3.6], fov: 35 }}
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
        <Bounds fit clip observe margin={1.35}>
          <Chair color={color} />
        </Bounds>
      </Suspense>
      <ContactShadows
        position={[0, -0.24, 0]}
        opacity={0.32}
        scale={6}
        blur={2.6}
        far={2}
      />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  )
}
