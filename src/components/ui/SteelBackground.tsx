"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function InfiniteGrid() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const size = 60; // Увеличили плотность для масштаба

    const { initialZ } = useMemo(() => {
        // Делаем плоскость ОЧЕНЬ большой, чтобы она закрывала весь обзор
        const geo = new THREE.PlaneGeometry(100, 100, size, size);
        const pos = geo.attributes.position.array as Float32Array;
        const zValues = new Float32Array(pos.length / 3);
        for (let i = 0; i < zValues.length; i++) {
            zValues[i] = pos[i * 3 + 2];
        }
        return { initialZ: zValues };
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const pos = meshRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i <= size; i++) {
            for (let j = 0; j <= size; j++) {
                const index = i * (size + 1) + j;

                // Математика спокойных, "стальных" волн
                const wave = Math.sin(i * 0.2 + time * 0.5) * 0.5 +
                    Math.cos(j * 0.2 + time * 0.3) * 0.5;

                pos[index * 3 + 2] = initialZ[index] + wave;
            }
        }
        meshRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2.1, 0, 0]} position={[0, -5, 0]}>
            <planeGeometry args={[100, 100, size, size]} />
            <meshBasicMaterial
                color="#ffffff"
                wireframe
                transparent
                opacity={0.1} // Очень тонкие линии
            />
        </mesh>
    );
}

export default function SteelBackground() {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none bg-[#13374d]">
            <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
                <fog attach="fog" args={["#13374d", 5, 35]} />

                <InfiniteGrid />
            </Canvas>

            {/* виньетка для мягкости перехода сверху */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-transparent opacity-80" />
        </div>
    );
}