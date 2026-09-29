import { useLayoutEffect, useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import type { Group } from 'three'

type ChairProps = {
  color: string
}

export function Chair({ color }: ChairProps) {
  const group = useRef<Group>(null)
  const { scene } = useGLTF('/models/chair.glb')
  const cloned = useMemo(() => scene.clone(true), [scene])
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        roughness: 0.55,
        metalness: 0.05,
      }),
    [],
  )

  useLayoutEffect(() => {
    material.color.set(color)
  }, [color, material])

  useLayoutEffect(() => {
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.material = material
        mesh.castShadow = true
        mesh.receiveShadow = true
      }
    })
  }, [cloned, material])

  return (
    <group ref={group} dispose={null}>
      <primitive object={cloned} scale={2.4} position={[0, -0.55, 0]} />
    </group>
  )
}

useGLTF.preload('/models/chair.glb')
