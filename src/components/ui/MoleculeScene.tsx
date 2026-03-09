'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import Molecule from './Molecule';
import * as THREE from 'three';

// Вспомогательный компонент для плавной анимации камеры
function CameraRig({ isScrolled }: { isScrolled: boolean }) {
    useFrame((state) => {
        const targetZ = isScrolled ? 7.5 : 5.0; // Точки отдаления
        // Плавный переход позиции камеры
        state.camera.position.z = THREE.MathUtils.lerp(
            state.camera.position.z,
            targetZ,
            0.05 // Скорость доводки
        );
        state.camera.updateProjectionMatrix();
    });
    return null;
}

export default function MoleculeScene({ isScrolled }: { isScrolled: boolean }) {
    return (
        <div className="w-full h-full relative flex items-center justify-center">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                <Molecule />

                {/* логика движения камеры */}
                <CameraRig isScrolled={isScrolled} />

                <Environment preset="city" frames={1} />


                <ContactShadows
                    position={[0, -1.5, 0]}
                    opacity={0.4}
                    scale={10}
                    blur={2}
                    far={4.5}/>
            </Canvas>
        </div>
    );
}