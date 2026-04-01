'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  Float, 
  PerspectiveCamera, 
  MeshDistortMaterial, 
  MeshWobbleMaterial, 
  Stars, 
  Sparkles,
  Grid
} from '@react-three/drei'
import * as THREE from 'three'

function MatrixCore() {
  const meshRef = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial 
        color="#0ea5e9" 
        wireframe 
        transparent 
        opacity={0.3} 
        emissive="#0ea5e9" 
        emissiveIntensity={2}
      />
    </mesh>
  )
}

function ReconstructionObject({ position, args, color }: { position: [number, number, number], args: any, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.position.y = position[1] + Math.sin(t + position[0]) * 0.1
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} castShadow>
        <boxGeometry args={args} />
        <MeshWobbleMaterial 
          color={color} 
          factor={0.1} 
          speed={1} 
          metalness={0.9} 
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Голографический контур */}
      <mesh position={position}>
        <boxGeometry args={[args[0] + 0.05, args[1] + 0.05, args[2] + 0.05]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.2} />
      </mesh>
    </Float>
  )
}

function DataStream() {
  const points = useMemo(() => {
    const p = new Float32Array(300 * 3)
    for (let i = 0; i < 300; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10
      p[i * 3 + 1] = (Math.random() - 0.5) * 5
      p[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return p
  }, [])

  const ref = useRef<THREE.Points>(null!)
  useFrame((state) => {
    ref.current.position.y = (state.clock.getElapsedTime() * 0.5) % 5
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={points.length / 3} 
          array={points} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#0ea5e9" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default function GarageScene() {
  return (
    <div className="w-full h-full bg-black">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 7]} />
        
        {/* Освещение */}
        <ambientLight intensity={0.2} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={2} 
          castShadow 
          color="#0ea5e9"
        />
        <pointLight position={[-5, 5, -5]} intensity={1} color="#a855f7" />
        <rectAreaLight
          width={15}
          height={15}
          intensity={5}
          position={[0, 0, -5]}
          color="#0ea5e9"
        />

        {/* Эффекты окружения */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={200} scale={10} size={1} speed={0.5} color="#0ea5e9" />
        
        {/* Центральное ядро-матрица */}
        <MatrixCore />

        {/* Объекты гаража (символические формы машин/мотоциклов) */}
        <ReconstructionObject position={[-2.5, -0.5, 1]} args={[2, 0.8, 4]} color="#333" /> {/* Машина */}
        <ReconstructionObject position={[2.5, -1, 2]} args={[0.5, 1.2, 2]} color="#444" /> {/* Мотоцикл */}
        
        {/* Потоки данных */}
        <DataStream />

        {/* Сетка пола (Neon Grid) */}
        <Grid 
          infiniteGrid 
          fadeDistance={20} 
          sectionColor="#0ea5e9" 
          cellColor="#a855f7" 
          sectionThickness={1.5} 
          position={[0, -2, 0]} 
        />

        <fog attach="fog" args={["#000", 5, 15]} />
      </Canvas>
    </div>
  )
}
