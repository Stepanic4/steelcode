'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import Molecule from './Molecule';

export default function MoleculeScene() {
    return (
        <div className="w-full h-full min-h-[300px] relative">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                <Molecule />

                {/* Environment дает те самые стальные блики */}
                <Environment preset="city" />

                <ContactShadows
                    position={[0, -2, 0]}
                    opacity={0.4}
                    scale={10}
                    blur={2}
                    far={4.5}/>
            </Canvas>
        </div>
    );
}