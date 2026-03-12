'use client';

import React, { useEffect, useRef } from 'react';

interface ParticleTextProps {
    text?: string;
}

export default function ParticleText({ text = "Hardcore Development" }: ParticleTextProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrame: number;

        // --- РАДИУС ВЗАИМОДЕЙСТВИЯ ---
        // Чем больше число, тем дальше от курсора частицы начинают убегать
        const mouse = { x: -1000, y: -1000, radius: 70 };

        class Particle {
            x: number; y: number;
            baseX: number; baseY: number;
            vx: number; vy: number;

            // --- ТРЕНИЕ (FRICTION) ---
            // 0.95 — частицы плавно скользят.
            // Если поставить 0.8 — они будут как в киселе. Если 0.99 — будут летать очень долго.
            friction: number = 0.95;

            constructor(x: number, y: number) {
                // Эффект появления: разбрасываем их рандомно при старте
                this.x = Math.random() * window.innerWidth;
                this.y = Math.random() * window.innerHeight;
                this.baseX = x;
                this.baseY = y;
                this.vx = (Math.random() - 0.5) * 10;
                this.vy = (Math.random() - 0.5) * 10;
            }

            update() {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // 1. ЛОГИКА РАЗЛЕТА
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);

                    // --- МОЩНОСТЬ ВЗРЫВА (POWER) ---
                    // Сейчас 30. Поставь 50 — будут улетать пулей. Поставь 10 — будут лениво двигаться.
                    const power = force * 30;

                    // --- ХАОС (RANDOM) ---
                    // Число 8 добавляет "песочности" (дробовик). Если уберешь — разлет будет идеально ровным кругом.
                    this.vx -= Math.cos(angle) * power + (Math.random() - 0.5) * 8;
                    this.vy -= Math.sin(angle) * power + (Math.random() - 0.5) * 8;
                }

                const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);

                // 2. ДИНАМИЧЕСКИЙ ВОЗВРАТ (EASE)
                // dynamicEase — это скорость притяжения к буквам.
                // 0.01 — когда частица летит (дает ей свободу).
                // 0.15 — когда частица замедлилась (быстро примагничивает её к букве).
                const dynamicEase = currentSpeed > 1 ? 0.01 : 0.15;

                this.x += (this.baseX - this.x) * dynamicEase;
                this.y += (this.baseY - this.y) * dynamicEase;

                // 3. ПРИМЕНЕНИЕ СКОРОСТИ
                this.x += this.vx;
                this.y += this.vy;
                this.vx *= this.friction;
                this.vy *= this.friction;
            }

            draw() {
                ctx!.fillStyle = 'rgba(255, 255, 255, 0.9)';
                // Размер одной точки (1.5 x 1.5 пикселя)
                ctx!.fillRect(this.x, this.y, 1.5, 1.5);
            }
        }

        const init = () => {
            const w = window.innerWidth;
            const h = 800; // Высота холста (не влияет на верстку, только на зону полета)
            canvas.width = w;
            canvas.height = h;

            ctx.clearRect(0, 0, w, h);

            // --- ШРИФТ ---
            const fontSize = Math.min(w * 0.12, 130);
            ctx.font = `italic 900 ${fontSize}px Inter, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const words = text.split(' ');
            ctx.fillStyle = 'white';

            // Отрисовка текста в две строки (центрирование)
            if (words.length > 1) {
                ctx.fillText(words[0].toUpperCase(), w / 2, h / 2 - fontSize * 0.4);
                ctx.fillText(words[1].toUpperCase(), w / 2, h / 2 + fontSize * 0.5);
            } else {
                ctx.fillText(text.toUpperCase(), w / 2, h / 2);
            }

            // Сканирование пикселей (создание точек)
            const data = ctx.getImageData(0, 0, w, h).data;
            ctx.clearRect(0, 0, w, h);
            particles = [];

            // Шаг 3: Каждые 3 пикселя создаем частицу (чем меньше шаг, тем больше частиц и тяжелее код)
            for (let y = 0; y < h; y += 3) {
                for (let x = 0; x < w; x += 3) {
                    if (data[(y * w + x) * 4 + 3] > 128) {
                        particles.push(new Particle(x, y));
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            animationFrame = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        init();
        animate();
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', init);

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', init);
        };
    }, [text]);

    return (
        <div className="relative w-full h-[300px] md:h-[400px] flex justify-center items-center pointer-events-none">
            <canvas
                ref={canvasRef}
                className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ width: '100vw', height: '800px' }}
            />
        </div>
    );
}