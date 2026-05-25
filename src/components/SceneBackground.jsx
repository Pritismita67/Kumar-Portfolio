'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ── Per-star sizzle offsets ───────────────────────────────────────────────────
// Each star gets a unique phase & frequency so they flicker independently
function useSizzleOffsets(count) {
  return useMemo(() => {
    const phases = new Float32Array(count)
    const freqs  = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      phases[i] = Math.random() * Math.PI * 2
      freqs[i]  = 1.8 + Math.random() * 4.0   // 1.8–5.8 Hz flicker
    }
    return { phases, freqs }
  }, [count])
}

// ── Twinkling stars ───────────────────────────────────────────────────────────
function Stars() {
  const count = 2500
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i*3]   = (Math.random() - 0.5) * 140
      arr[i*3+1] = (Math.random() - 0.5) * 90
      arr[i*3+2] = (Math.random() - 0.5) * 60 - 10
    }
    return arr
  }, [])

  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime()
      ref.current.rotation.y = t * 0.006
      ref.current.rotation.x = Math.sin(t * 0.003) * 0.03
      // Sizzle: rapid size pulse layered on slow drift
      const sizzle = 0.08 + Math.abs(Math.sin(t * 7.3)) * 0.04 + Math.abs(Math.sin(t * 13.1)) * 0.02
      ref.current.material.size = sizzle
      ref.current.material.opacity = 0.75 + Math.sin(t * 5.5) * 0.15
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.10}
        sizeAttenuation
        depthWrite={false}
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Slightly larger, bluer shimmer layer for glow depth
function GlowStars() {
  const count = 600
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i*3]   = (Math.random() - 0.5) * 120
      arr[i*3+1] = (Math.random() - 0.5) * 80
      arr[i*3+2] = (Math.random() - 0.5) * 50 - 10
    }
    return arr
  }, [])

  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.y = t * 0.005
      // Sizzle: two overlapping high-freq pulses
      const sizzle = 0.15 + Math.abs(Math.sin(t * 9.1)) * 0.07 + Math.abs(Math.sin(t * 17.3 + 1.1)) * 0.04
      ref.current.material.size = sizzle
      ref.current.material.opacity = 0.45 + Math.sin(t * 6.2 + 1.2) * 0.30
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#c0d8ff"
        size={0.18}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Warm shimmer stars (purple/gold tint)
function WarmStars() {
  const count = 300
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i*3]   = (Math.random() - 0.5) * 110
      arr[i*3+1] = (Math.random() - 0.5) * 75
      arr[i*3+2] = (Math.random() - 0.5) * 45 - 10
    }
    return arr
  }, [])

  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.y = t * 0.007
      // Sizzle: harsh crackle via abs(sin) at high freq
      const sizzle = 0.10 + Math.abs(Math.sin(t * 11.7 + 2.5)) * 0.06 + Math.abs(Math.sin(t * 19.3)) * 0.03
      ref.current.material.size = sizzle
      ref.current.material.opacity = 0.25 + Math.abs(Math.sin(t * 8.2 + 2.5)) * 0.35
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#e0c8ff"
        size={0.14}
        sizeAttenuation
        depthWrite={false}
        opacity={0.45}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// ── Extra sizzle "spark" layer — tiny intense bright dots ─────────────────────
function SparkStars() {
  const count = 180
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i*3]   = (Math.random() - 0.5) * 130
      arr[i*3+1] = (Math.random() - 0.5) * 85
      arr[i*3+2] = (Math.random() - 0.5) * 55 - 8
    }
    return arr
  }, [])

  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ref.current) {
      // Rapid chaotic flicker — feels like electric sizzle
      const s = Math.abs(Math.sin(t * 23.0)) * Math.abs(Math.cos(t * 17.5 + 0.8))
      ref.current.material.size = 0.05 + s * 0.22
      ref.current.material.opacity = 0.0 + s * 1.0
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#fffde0"
        size={0.12}
        sizeAttenuation
        depthWrite={false}
        opacity={0.0}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// ── Shooting star ─────────────────────────────────────────────────────────────
function ShootingStar({ index }) {
  const meshRef  = useRef()
  const trailRef = useRef()
  const glowRef  = useRef()

  const params = useRef(generateParams(index * 0.5))   // stagger within ~3 s

  function generateParams(initialDelay) {
    return {
      startX:  (Math.random() - 0.3) * 60,
      startY:  10 + Math.random() * 20,
      startZ:  -5 - Math.random() * 8,
      angle:   -(0.3 + Math.random() * 0.4),
      speed:   22 + Math.random() * 16,
      length:  2.8 + Math.random() * 3.5,
      delay:   initialDelay ?? (Math.random() * 0.8),  // first burst in < 3 s
      life:    0,
    }
  }

  useFrame(({ clock }, delta) => {
    const p = params.current
    const t = clock.getElapsedTime()

    if (t < p.delay) return

    p.life += delta

    const duration = p.length / (p.speed * 0.1)
    const progress = p.life / duration

    if (progress > 1.2) {
      // Respawn quickly — 1–3 s gap so the sky stays lively
      params.current = generateParams()
      params.current.delay = t + 1.0 + Math.random() * 2.0
      params.current.life  = 0
      return
    }

    const dist = p.life * p.speed * 0.1
    const x = p.startX + Math.cos(p.angle) * dist
    const y = p.startY + Math.sin(p.angle) * dist

    const fade = progress < 0.1
      ? progress / 0.1
      : progress > 0.75
        ? 1 - (progress - 0.75) / 0.45
        : 1

    if (meshRef.current) {
      meshRef.current.position.set(x, y, p.startZ)
      meshRef.current.material.opacity = fade * 1.0
      // Sizzle the head size slightly
      meshRef.current.scale.setScalar(1 + Math.abs(Math.sin(t * 28)) * 0.4)
    }
    if (glowRef.current) {
      glowRef.current.position.set(x, y, p.startZ)
      glowRef.current.material.opacity = fade * 0.35
    }
    if (trailRef.current) {
      const tx = x - Math.cos(p.angle) * p.length
      const ty = y - Math.sin(p.angle) * p.length
      trailRef.current.position.set((x + tx) / 2, (y + ty) / 2, p.startZ)
      trailRef.current.rotation.z = p.angle
      trailRef.current.material.opacity = fade * 0.65
    }
  })

  return (
    <group>
      {/* Outer soft glow halo */}
      <mesh ref={glowRef} position={[0, 999, 0]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshBasicMaterial
          color="#a0c8ff"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Glowing head */}
      <mesh ref={meshRef} position={[0, 999, 0]}>
        <sphereGeometry args={[0.065, 8, 8]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Trail */}
      <mesh ref={trailRef} position={[0, 999, 0]}>
        <planeGeometry args={[4.0, 0.026]} />
        <meshBasicMaterial
          color="#c8e0ff"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

function ShootingStars() {
  // 8 concurrent shooting stars — ensures multiple visible within any 3-second window
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <ShootingStar key={i} index={i} />
      ))}
    </>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function SceneBackground() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      background: '#02010a',
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 18], fov: 60 }}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
        }}
        style={{ background: '#02010a' }}
      >
        <Stars />
        <GlowStars />
        <WarmStars />
        <SparkStars />
        <ShootingStars />
      </Canvas>
    </div>
  )
}