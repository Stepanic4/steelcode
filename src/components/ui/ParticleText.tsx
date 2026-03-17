'use client';

import React, {useEffect, useRef} from 'react';

interface ParticleTextProps {
    text?: string,
    isStarted?: boolean // Слушаем глобальный статус загрузки
}

export default function ParticleText({text = "Hardcore Development", isStarted}: ParticleTextProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Используем ref для хранения состояния анимации, чтобы избежать лишних ререндеров
    const isInitialized = useRef(false);

    useEffect(() => {
        // КРИТИЧЕСКИЙ МОМЕНТ: Если прелоадер еще висит, ничего не делаем
        if (!isStarted) return;

        // Если уже инициализировано (например, при смене текста), не плодим циклы
        if (isInitialized.current) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', {willReadFrequently: true});
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrame: number;
        let lastWidth = 0;

        const mouse = {x: -1000, y: -1000, radius: 80};

        class Particle {
            x: number;
            y: number;
            baseX: number;
            baseY: number;
            vx: number;
            vy: number;
            friction: number = 0.95;

            constructor(x: number, y: number) {
                // Эффект появления: частицы разлетаются из центра текста при старте
                this.x = x + (Math.random() - 0.5) * 100;
                this.y = y + (Math.random() - 0.5) * 100;
                this.baseX = x;
                this.baseY = y;
                this.vx = (Math.random() - 0.5) * 10;
                this.vy = (Math.random() - 0.5) * 10;
            }

            update() {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distanceSq = dx * dx + dy * dy;
                const mouseRadiusSq = mouse.radius * mouse.radius;

                if (distanceSq < mouseRadiusSq) {
                    const distance = Math.sqrt(distanceSq);
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    const power = force * 50;
                    this.vx -= Math.cos(angle) * power + (Math.random() - 0.5) * 8;
                    this.vy -= Math.sin(angle) * power + (Math.random() - 0.5) * 8;
                }

                const currentSpeedSq = this.vx * this.vx + this.vy * this.vy;
                const dynamicEase = currentSpeedSq > 1 ? 0.07 : 0.20;

                this.x += (this.baseX - this.x) * dynamicEase + this.vx;
                this.y += (this.baseY - this.y) * dynamicEase + this.vy;
                this.vx *= this.friction;
                this.vy *= this.friction;
            }

            addPath(c: CanvasRenderingContext2D) {
                const size = window.innerWidth < 768 ? 2.5 : 2.0;
                c.rect(this.x, this.y, size, size);
            }
        }

        const init = () => {
            const w = window.innerWidth;
            if (w === lastWidth) return;
            lastWidth = w;

            const h = 800;
            canvas.width = w;
            canvas.height = h;

            ctx.clearRect(0, 0, w, h);
            const fontSize = Math.min(w * 0.1, 120);
            ctx.font = `900 ${fontSize}px Inter, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const words = text.split(' ').filter(word => word.length > 0);
            ctx.fillStyle = 'white';

            if (words.length > 1) {
                ctx.fillText(words[0].toUpperCase(), w / 2, h / 2 - fontSize * 0.4);
                ctx.fillText(words[1].toUpperCase(), w / 2, h / 2 + fontSize * 0.5);
            } else if (words.length === 1) {
                ctx.fillText(words[0].toUpperCase(), w / 2, h / 2);
            }

            const data = ctx.getImageData(0, 0, w, h).data;
            ctx.clearRect(0, 0, w, h);
            particles = [];
            const step = 3;

            for (let y = 0; y < h; y += step) {
                for (let x = 0; x < w; x += step) {
                    if (data[(y * w + x) * 4 + 3] > 128) {
                        particles.push(new Particle(x, y));
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#3b82f6');
            gradient.addColorStop(0.3, '#a855f7');
            gradient.addColorStop(0.5, '#ffffff');
            gradient.addColorStop(0.7, '#a855f7');
            gradient.addColorStop(1, '#3b82f6');

            ctx.beginPath();
            ctx.fillStyle = gradient;
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].addPath(ctx);
            }
            ctx.fill();
            animationFrame = requestAnimationFrame(animate);
        };

        const handlePointerMove = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handlePointerReset = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        // ТЕПЕРЬ ЗАПУСК МГНОВЕННЫЙ ПОСЛЕ СНЯТИЯ ПРЕЛОАДЕРА
        isInitialized.current = true;
        init();
        animate();

        canvas.addEventListener('pointermove', handlePointerMove);
        canvas.addEventListener('pointerdown', handlePointerMove);
        canvas.addEventListener('pointerup', handlePointerReset);
        canvas.addEventListener('pointerleave', handlePointerReset);
        canvas.addEventListener('pointercancel', handlePointerReset);
        window.addEventListener('resize', init);

        return () => {
            cancelAnimationFrame(animationFrame);
            canvas.removeEventListener('pointermove', handlePointerMove);
            canvas.removeEventListener('pointerdown', handlePointerMove);
            canvas.removeEventListener('pointerup', handlePointerReset);
            canvas.removeEventListener('pointerleave', handlePointerReset);
            canvas.removeEventListener('pointercancel', handlePointerReset);
            window.removeEventListener('resize', init);
            isInitialized.current = false;
        };
    }, [isStarted, text]); // Теперь эффект перезапускается, когда лоадер дает команду

    return (
        <div className="relative w-full h-[150px] md:h-[250px] flex justify-center items-center pointer-events-none">
            <canvas
                ref={canvasRef}
                className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                    width: '100vw',
                    height: '800px',
                    touchAction: 'pan-y'
                }}
            />
        </div>
    );
}