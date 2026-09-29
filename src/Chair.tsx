import { useEffect, useMemo } from 'react'
import { useGLTF, Center } from '@react-three/drei'
import * as THREE from 'three'

type ChairProps = {
  color: string
}

export function Chair({ color }: ChairProps) {
  const { scene } = useGLTF('/models/chair.glb')
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

  return (
    <Center>
      <primitive object={clone} />
    </Center>
  )
}

useGLTF.preload('/models/chair.glb')
