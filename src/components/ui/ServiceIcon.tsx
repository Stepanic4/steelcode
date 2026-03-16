"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

type ShapeType = "torus" | "tetrahedron" | "cylinder";

interface SceneProps {
    type: ShapeType;
    hovered: boolean;
}

function Shape({ type, hovered }: SceneProps) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        const targetScale = hovered ? 1.3 : 1.0;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        meshRef.current.rotation.x += delta * 0.5;
        meshRef.current.rotation.y += delta * 0.3;
    });

    return (
        <mesh ref={meshRef}>
            {type === "torus" && <torusGeometry args={[0.6, 0.3, 32, 64]} />}
            {type === "tetrahedron" && <tetrahedronGeometry args={[1, 0]} />}
            {type === "cylinder" && <cylinderGeometry args={[0.7, 0.7, 1.2, 32]} />}

            <meshPhysicalMaterial
                metalness={1}
                roughness={0.05} // Небольшая шероховатость для мягких бликов
                reflectivity={1}
                onBeforeCompile={(shader) => {
                    shader.uniforms.uPurple = { value: new THREE.Color(0.4, 0.1, 0.7) };
                    shader.uniforms.uDarkBlue = { value: new THREE.Color(0.02, 0.05, 0.4) };

                    shader.vertexShader = `
                        varying vec3 vLocalPosition;
                        ${shader.vertexShader}
                    `.replace(
                        `#include <begin_vertex>`,
                        `#include <begin_vertex>
                         vLocalPosition = position;`
                    );

                    shader.fragmentShader = `
                        uniform vec3 uPurple;
                        uniform vec3 uDarkBlue;
                        varying vec3 vLocalPosition;
                        ${shader.fragmentShader}
                    `.replace(
                        `#include <color_fragment>`,
                        `
                        float heatFactor = smoothstep(-0.6, 0.7, vLocalPosition.y);
                        vec3 heatColor = mix(uPurple, uDarkBlue, smoothstep(0.0, 1.0, heatFactor));
                        // Смешиваем хром (белый) и побежалость
                        diffuseColor.rgb = mix(vec3(1.0), heatColor, heatFactor);
                        `
                    );
                }}
            />
        </mesh>
    );
}

export default function ServiceIcon({ type, hovered }: SceneProps) {
    return (
        <div className="w-16 h-16 flex items-center justify-center">
            <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
                <Environment preset="studio" />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <spotLight position={[-5, 5, 5]} angle={0.15} penumbra={1} intensity={2} />

                <Float speed={2} rotationIntensity={0.8} floatIntensity={0.5}>
                    <Shape type={type} hovered={hovered} />
                </Float>
            </Canvas>
        </div>
    );
}