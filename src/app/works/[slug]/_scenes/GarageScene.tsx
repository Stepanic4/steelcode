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
  Grid,
  Text,
  ContactShadows
} from '@react-three/drei'
import * as THREE from 'three'

function MatrixCore() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const innerRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.3
    meshRef.current.rotation.y = t * 0.5
    innerRef.current.rotation.y = -t * 0.8
    innerRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05)
  })

  return (
    <group>
      {/* Внешняя сфера-портал */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial 
          color="#0ea5e9" 
          wireframe 
          transparent 
          opacity={0.4} 
          emissive="#0ea5e9" 
          emissiveIntensity={5}
        />
      </mesh>
      {/* Внутреннее ядро с эффектом искажения */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <MeshDistortMaterial 
          color="#0ea5e9" 
          speed={2} 
          distort={0.4} 
          radius={1}
          emissive="#0ea5e9"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
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

function DataWaterfall() {
  const group = useRef<THREE.Group>(null!)
  const words = ["PROJECT DETAILS", "CASE STUDY // 2024", "RECONSTRUCTION", "VINTAGE", "SYSTEM", "GARAGE", "DATA"];
  
  const elements = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      position: [(Math.random() - 0.5) * 15, Math.random() * 10, (Math.random() - 0.5) * 10] as [number, number, number],
      text: words[Math.floor(Math.random() * words.length)],
      speed: 0.02 + Math.random() * 0.05
    }));
  }, []);

  useFrame(() => {
    group.current.children.forEach((child, i) => {
      child.position.y -= elements[i].speed;
      if (child.position.y < -5) child.position.y = 5;
    });
  });

  return (
    <group ref={group}>
      {elements.map((el, i) => (
        <Text
          key={i}
          position={el.position}
          fontSize={0.2}
          color="#0ea5e9"
          font="/fonts/GeistMono-Bold.woff" // Предполагаем наличие или стандартный fallback
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.5}
        >
          {el.text}
        </Text>
      ))}
    </group>
  );
}

export default function GarageScene() {
  return (
    <div className="w-full h-full bg-black">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
        
        {/* Освещение: Интенсивное и неоновое */}
        <ambientLight intensity={0.1} />
        <spotLight 
          position={[0, 10, 2]} 
          angle={0.5} 
          penumbra={0.5} 
          intensity={10} 
          castShadow 
          color="#0ea5e9"
        />
        <pointLight position={[0, 0, 0]} intensity={15} color="#0ea5e9" />
        <rectAreaLight
          width={20}
          height={20}
          intensity={2}
          position={[0, 0, -10]}
          color="#0ea5e9"
        />

        {/* Эффекты окружения */}
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={400} scale={15} size={3} speed={1} color="#0ea5e9" opacity={0.8} />
        
        {/* Центральное ядро-портал */}
        <group position={[0, 0.5, 0]}>
            <MatrixCore />
            {/* Имитация внутренних деталей гаража в сфере */}
            <ReconstructionObject position={[0, 0, 0]} args={[1, 0.5, 1.5]} color="#222" />
        </group>

        {/* Объекты гаража (символические формы) */}
        <ReconstructionObject position={[-4, -0.5, -2]} args={[3, 1, 5]} color="#111" />
        <ReconstructionObject position={[4, -1, -1]} args={[1, 1.5, 2]} color="#111" />
        
        {/* Цифровой водопад */}
        <DataWaterfall />

        {/* Сетка пола с глубоким затуханием */}
        <Grid 
          infiniteGrid 
          fadeDistance={30} 
          sectionColor="#0ea5e9" 
          cellColor="#0284c7" 
          sectionThickness={1.2} 
          position={[0, -2, 0]} 
        />
        
        <ContactShadows position={[0, -1.9, 0]} opacity={0.6} scale={20} blur={2} far={4.5} />

        <fog attach="fog" args={["#000", 2, 20]} />
      </Canvas>
    </div>
  )
}
