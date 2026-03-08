'use client';

import {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {Sphere, Float} from '@react-three/drei';
import * as THREE from 'three';

export default function Molecule() {
    const groupRef = useRef<THREE.Group>(null);

    // Анимация вращения через useFrame
    useFrame((state) => {
        if (!groupRef.current) return;

        const t = state.clock.getElapsedTime();
        const mX = state.mouse.x; // Позиция мыши от -1 до 1
        const mY = state.mouse.y;

        // Базовое вращение + реакция на мышь
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, t * 0.2 + mY * 0.5, 0.1);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, t * 0.3 + mX * 0.5, 0.1);
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={groupRef}>
                {/* Центральный атом */}
                <Sphere args={[0.6, 32, 32]}>
                    <meshStandardMaterial
                        color="#f0f0f0"
                        metalness={1}
                        roughness={0.1}/>
                </Sphere>

                {/* Связи (периферийные атомы) */}
                {[
                    [1.2, 1.2, 1.2], [-1.2, -1.2, 1.2], [1.2, -1.2, -1.2], [-1.2, 1.2, -1.2]
                ].map((pos, i) => (
                    <mesh key={i} position={[pos[0] * 0.6, pos[1] * 0.6, pos[2] * 0.6]}>
                        <sphereGeometry args={[0.3, 24, 24]}/>
                        <meshStandardMaterial
                            color="#f0f0f0"
                            metalness={1}
                            roughness={0.1}/>
                    </mesh>
                ))}
            </group>
        </Float>
    );
}