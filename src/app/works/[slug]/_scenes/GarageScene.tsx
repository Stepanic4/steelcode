'use client'

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Float, MeshReflectorMaterial, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FloatingDetail() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.5;
    meshRef.current.rotation.z = t * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[1, 1.2, 0.5, 6]} />
        <meshStandardMaterial 
          color="#444" 
          metalness={0.8} 
          roughness={0.2} 
          wireframe={false} 
        />
      </mesh>
    </Float>
  );
}

export default function GarageScene() {
  return (
    <div className="w-full h-full bg-zinc-950">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
        
        {/* Освещение */}
        <ambientLight intensity={0.2} color="#4455ff" />
        <spotLight 
          position={[5, 10, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={150} 
          castShadow 
          color="#ffaa44"
        />
        <pointLight position={[-5, 2, -2]} intensity={20} color="#3355ff" />

        {/* Пыль в воздухе */}
        <Sparkles count={50} scale={10} size={2} speed={0.4} opacity={0.5} color="#ffccaa" />

        {/* Центральный объект */}
        <group position={[0, 0.5, 0]}>
          <FloatingDetail />
        </group>

        {/* Пол */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={40}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#101010"
            metalness={0.5}
            mirror={0}
          />
        </mesh>

        <fog attach="fog" args={["#050505", 5, 15]} />
      </Canvas>
    </div>
  )
}
