import { Canvas, useThree } from '@react-three/fiber'
import { Center, ContactShadows, OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'

type ViewerProps = {
  color: string
}

type ChairProps = {
  color: string
}

function frameObject(
  camera: THREE.Camera,
  controls: { target: THREE.Vector3; update: () => void } | null,
  box: THREE.Box3,
  margin: number,
) {
  const center = box.getCenter(new THREE.Vector3())
  const sphere = box.getBoundingSphere(new THREE.Sphere())
  const persp = camera as THREE.PerspectiveCamera
  const fov = THREE.MathUtils.degToRad(persp.fov)
  const fitHeight = sphere.radius / Math.sin(fov / 2)
  const fitWidth = fitHeight / Math.max(persp.aspect, 0.0001)
  const distance = margin * Math.max(fitHeight, fitWidth)

  const direction = new THREE.Vector3(0.7, 0.45, 1).normalize()
  persp.position.copy(center).addScaledVector(direction, distance)
  persp.near = Math.max(distance / 100, 0.01)
  persp.far = distance * 100
  persp.lookAt(center)
  persp.updateProjectionMatrix()

  if (controls?.target) {
    controls.target.copy(center)
    controls.update()
  }
}

function Chair({ color }: ChairProps) {
  const { scene } = useGLTF('/models/chair.glb')
  const { camera, controls } = useThree()
  const [shadowY, setShadowY] = useState(-0.24)

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.55,
        metalness: 0.05,
      }),
    [],
  )

  const clone = useMemo(() => {
    const root = scene.clone(true)
    root.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true
        mesh.material = material
      }
    })
    return root
  }, [scene, material])

  useEffect(() => {
    material.color.set(color)
  }, [color, material])

  const onCentered = useCallback(
    ({ width, height, depth }: { width: number; height: number; depth: number }) => {
      const orbit = controls as
        | { target: THREE.Vector3; update: () => void }
        | null
      const box = new THREE.Box3(
        new THREE.Vector3(-width / 2, -height / 2, -depth / 2),
        new THREE.Vector3(width / 2, height / 2, depth / 2),
      )
      setShadowY(-height / 2)
      frameObject(camera, orbit, box, 1.4)
    },
    [camera, controls],
  )

  return (
    <>
      <Center onCentered={onCentered}>
        <primitive object={clone} />
      </Center>
      <ContactShadows
        position={[0, shadowY, 0]}
        opacity={0.3}
        scale={4}
        blur={2.5}
        far={2}
      />
    </>
  )
}

useGLTF.preload('/models/chair.glb')

export function Viewer({ color }: ViewerProps) {
  return (
    <Canvas
      className="viewer-canvas"
      camera={{ position: [1.5, 1.1, 2], fov: 35 }}
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
        <Chair color={color} />
      </Suspense>
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
