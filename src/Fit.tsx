import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

type FitProps = {
  children: ReactNode
  /** Multiplier over the minimum framing distance; >1 leaves empty space. */
  margin?: number
}

/** Frames perspective camera on children so the subject fills the view with margin. */
export function Fit({ children, margin = 1.55 }: FitProps) {
  const group = useRef<THREE.Group>(null)
  const { camera, controls, size } = useThree()

  useLayoutEffect(() => {
    const root = group.current
    if (!root) return

    const box = new THREE.Box3().setFromObject(root)
    if (box.isEmpty()) return

    const center = box.getCenter(new THREE.Vector3())
    const sphere = box.getBoundingSphere(new THREE.Sphere())
    const persp = camera as THREE.PerspectiveCamera
    const fov = THREE.MathUtils.degToRad(persp.fov)
    const fitHeight = sphere.radius / Math.sin(fov / 2)
    const fitWidth = fitHeight / persp.aspect
    const distance = margin * Math.max(fitHeight, fitWidth)

    const direction = new THREE.Vector3(0.72, 0.48, 1).normalize()
    persp.position.copy(center).addScaledVector(direction, distance)
    persp.near = distance / 100
    persp.far = distance * 100
    persp.lookAt(center)
    persp.updateProjectionMatrix()

    const orbit = controls as
      | { target: THREE.Vector3; update: () => void }
      | null
      | undefined
    if (orbit?.target) {
      orbit.target.copy(center)
      orbit.update()
    }
  }, [camera, controls, size, margin])

  return <group ref={group}>{children}</group>
}
