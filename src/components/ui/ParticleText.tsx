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
        // willReadFrequently ускоряет частые вызовы getImageData
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrame: number;
        // Переменная для фиксации ширины (защита от сброса при скролле на Android)
        let lastWidth = 0;

        // --- РАДИУС ВЗАИМОДЕЙСТВИЯ ---
        // Чем больше число, тем дальше от курсора частицы начинают убегать
        const mouse = { x: -1000, y: -1000, radius: 80 };

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

                // --- ОПТИМИЗАЦИЯ ДИСТАНЦИИ ---
                // Сначала проверяем квадрат расстояния, чтобы не считать Math.sqrt лишний раз
                const distanceSq = dx * dx + dy * dy;
                const mouseRadiusSq = mouse.radius * mouse.radius;

                if (distanceSq < mouseRadiusSq) {
                    const distance = Math.sqrt(distanceSq);
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);

                    // --- МОЩНОСТЬ ВЗРЫВА (POWER) ---
                    // Сейчас 50. / 70 — будут улетать пулей./  10 — будут лениво двигаться.
                    const power = force * 50;

                    // --- ХАОС (RANDOM) ---
                    // Число 8 добавляет "песочности". Если уберешь — разлет будет ровным кругом.
                    this.vx -= Math.cos(angle) * power + (Math.random() - 0.5) * 8;
                    this.vy -= Math.sin(angle) * power + (Math.random() - 0.5) * 8;
                }

                const currentSpeedSq = this.vx * this.vx + this.vy * this.vy;

                // --- ДИНАМИЧЕСКИЙ ВОЗВРАТ (EASE) ---
                // dynamicEase — это скорость притяжения к буквам.
                // 0.07 — когда частица летит. 0.20 — когда замедлилась (быстро примагничивает).
                const dynamicEase = currentSpeedSq > 1 ? 0.07 : 0.20;

                this.x += (this.baseX - this.x) * dynamicEase + this.vx;
                this.y += (this.baseY - this.y) * dynamicEase + this.vy;

                this.vx *= this.friction;
                this.vy *= this.friction;
            }

            // Просто помечаем область для заливки, не рисуя её сразу
            addPath(c: CanvasRenderingContext2D) {
                // Если ширина окна меньше 768px (мобилки), ставим 2.5, иначе 2.0
                const size = window.innerWidth < 768 ? 2.5 : 2.0;
                c.rect(this.x, this.y, size, size);
            }
        }

        const init = () => {
            const w = window.innerWidth;

            // Блокировка: если ширина не изменилась (скролл на мобилке), ничего не пересоздаем
            if (w === lastWidth) return;
            lastWidth = w;

            const h = 800; // Высота холста (зона полета)
            canvas.width = w;
            canvas.height = h;

            ctx.clearRect(0, 0, w, h);

            // --- НАСТРОЙКИ ШРИФТА ---
            const fontSize = Math.min(w * 0.1, 120);
            ctx.font = `900 ${fontSize}px Inter, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Фильтруем пустые элементы
            const words = text.split(' ').filter(word => word.length > 0);
            ctx.fillStyle = 'white';

            // Отрисовка текста (центрирование)
            if (words.length > 1) {
                ctx.fillText(words[0].toUpperCase(), w / 2, h / 2 - fontSize * 0.4);
                ctx.fillText(words[1].toUpperCase(), w / 2, h / 2 + fontSize * 0.5);
            } else if (words.length === 1) {
                ctx.fillText(words[0].toUpperCase(), w / 2, h / 2);
            }

            // Сканирование пикселей (создание точек)
            const data = ctx.getImageData(0, 0, w, h).data;
            ctx.clearRect(0, 0, w, h);
            particles = [];

            // --- ШАГ ПИКСЕЛЕЙ (ГЛАВНЫЙ РЕГУЛЯТОР) ---
            // Чем меньше шаг, тем больше частиц и тяжелее код.
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

            // --- ЦВЕТ ПОБЕЖАЛОСТИ (STEEL HEAT TINT) ---
            // Создаем градиент как в стальных карточках
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#3b82f6');
            gradient.addColorStop(0.3, '#a855f7');
            gradient.addColorStop(0.5, '#ffffff');
            gradient.addColorStop(0.7, '#a855f7');
            gradient.addColorStop(1, '#3b82f6');

            // --- ПАКЕТНАЯ ОТРЕСОВКА (BATCHING) ---
            ctx.beginPath();
            ctx.fillStyle = gradient;

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].addPath(ctx);
            }

            // Закрашиваем всё одновременно.
            ctx.fill();

            animationFrame = requestAnimationFrame(animate);
        };

        // Обработка движения (мышь и палец)
        const handlePointerMove = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        // Сброс координат при отрыве пальца или уходе мыши
        const handlePointerReset = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        init();
        animate();

        // Pointer Events покрывают и мышь, и тач на Android
        canvas.addEventListener('pointermove', handlePointerMove);
        canvas.addEventListener('pointerdown', handlePointerMove);
        canvas.addEventListener('pointerup', handlePointerReset);
        canvas.addEventListener('pointerleave', handlePointerReset);
        canvas.addEventListener('pointercancel', handlePointerReset); // Критично для сброса при скролле

        window.addEventListener('resize', init);

        return () => {
            cancelAnimationFrame(animationFrame);
            canvas.removeEventListener('pointermove', handlePointerMove);
            canvas.removeEventListener('pointerdown', handlePointerMove);
            canvas.removeEventListener('pointerup', handlePointerReset);
            canvas.removeEventListener('pointerleave', handlePointerReset);
            canvas.removeEventListener('pointercancel', handlePointerReset);
            window.removeEventListener('resize', init);
        };
    }, [text]);

    return (
        <div className="relative w-full h-[150px] md:h-[250px] flex justify-center items-center pointer-events-none">
            <canvas
                ref={canvasRef}
                className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                    width: '100vw',
                    height: '800px',
                    touchAction: 'pan-y' // Разрешает вертикальный скролл страницы на мобильных
                }}
            />
        </div>
    );
}