'use client';

import React, { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagneticProps {
    children: ReactNode;
}

export default function Magnetic({ children }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = ref.current?.getBoundingClientRect();

        if (rect) {
            const { width, height, left, top } = rect;
            // Вычисляем центр кнопки
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            // Расстояние от курсора до центра
            const dx = clientX - centerX;
            const dy = clientY - centerY;

            // Коэффициент силы притяжения (0.5 — кнопка идет за мышкой наполовину)
            setPosition({ x: dx * 0.4, y: dy * 0.4 });
        }
    };

    const handleMouseLeave = () => {
        // Возвращаем в исходную точку
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="flex items-center justify-center"
        >
            {children}
        </motion.div>
    );
}