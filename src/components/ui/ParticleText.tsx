"use client";

import React, { useEffect, useRef } from "react";

interface ParticleTextProps {
  text?: string;
  isStarted?: boolean; // Слушаем глобальный статус загрузки
}

export default function ParticleText({
  text = "Hardcore Development",
  isStarted,
}: ParticleTextProps) {
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
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let particleCount = 0;
    let pos = new Float32Array(0); // [x, y, x, y, ...]
    let base = new Float32Array(0); // [baseX, baseY, ...]
    let vel = new Float32Array(0); // [vx, vy, ...]
    let animationFrame: number;
    let lastWidth = 0;
    let gradient: CanvasGradient | null = null;
    let gradientW = -1;
    let gradientH = -1;

    const mouse = { x: -1000, y: -1000, radius: 80 };
    const mouseRadiusSq = mouse.radius * mouse.radius;
    const friction = 0.95;
    const step = 3;

    const updateParticle = (index: number) => {
      const i2 = index * 2;
      let x = pos[i2];
      let y = pos[i2 + 1];
      let vx = vel[i2];
      let vy = vel[i2 + 1];
      const baseX = base[i2];
      const baseY = base[i2 + 1];

      const dx = mouse.x - x;
      const dy = mouse.y - y;
      const distanceSq = dx * dx + dy * dy;

      if (distanceSq < mouseRadiusSq) {
        // Без sqrt: используем квадратичную аппроксимацию ослабления силы.
        const force = (mouseRadiusSq - distanceSq) / mouseRadiusSq;
        const angle = Math.atan2(dy, dx);
        const power = force * 50;
        vx -= Math.cos(angle) * power + (Math.random() - 0.5) * 8;
        vy -= Math.sin(angle) * power + (Math.random() - 0.5) * 8;
      }

      const currentSpeedSq = vx * vx + vy * vy;
      const dynamicEase = currentSpeedSq > 1 ? 0.07 : 0.2;

      x += (baseX - x) * dynamicEase + vx;
      y += (baseY - y) * dynamicEase + vy;
      vx *= friction;
      vy *= friction;

      pos[i2] = x;
      pos[i2 + 1] = y;
      vel[i2] = vx;
      vel[i2 + 1] = vy;
    };

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
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const words = text.split(" ").filter((word) => word.length > 0);
      ctx.fillStyle = "white";

      if (words.length > 1) {
        ctx.fillText(words[0].toUpperCase(), w / 2, h / 2 - fontSize * 0.4);
        ctx.fillText(words[1].toUpperCase(), w / 2, h / 2 + fontSize * 0.5);
      } else if (words.length === 1) {
        ctx.fillText(words[0].toUpperCase(), w / 2, h / 2);
      }

      const data = ctx.getImageData(0, 0, w, h).data;
      ctx.clearRect(0, 0, w, h);
      const collected: number[] = [];

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          if (data[(y * w + x) * 4 + 3] > 128) {
            collected.push(x, y);
          }
        }
      }

      particleCount = collected.length / 2;
      pos = new Float32Array(collected.length);
      base = new Float32Array(collected.length);
      vel = new Float32Array(collected.length);

      for (let i = 0; i < collected.length; i += 2) {
        const x = collected[i];
        const y = collected[i + 1];
        // Эффект появления: частицы разлетаются из центра текста при старте
        pos[i] = x + (Math.random() - 0.5) * 100;
        pos[i + 1] = y + (Math.random() - 0.5) * 100;
        base[i] = x;
        base[i + 1] = y;
        vel[i] = (Math.random() - 0.5) * 10;
        vel[i + 1] = (Math.random() - 0.5) * 10;
      }

      gradient = null;
      gradientW = -1;
      gradientH = -1;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (
        !gradient ||
        gradientW !== canvas.width ||
        gradientH !== canvas.height
      ) {
        gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, "#3b82f6");
        gradient.addColorStop(0.3, "#a855f7");
        gradient.addColorStop(0.5, "#ffffff");
        gradient.addColorStop(0.7, "#a855f7");
        gradient.addColorStop(1, "#3b82f6");
        gradientW = canvas.width;
        gradientH = canvas.height;
      }

      ctx.fillStyle = gradient;
      const size = window.innerWidth < 768 ? 2.5 : 2.0;
      for (let i = 0; i < particleCount; i++) {
        updateParticle(i);
        const i2 = i * 2;
        ctx.fillRect(pos[i2], pos[i2 + 1], size, size);
      }

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

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerdown", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerReset);
    canvas.addEventListener("pointerleave", handlePointerReset);
    canvas.addEventListener("pointercancel", handlePointerReset);
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(animationFrame);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerdown", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerReset);
      canvas.removeEventListener("pointerleave", handlePointerReset);
      canvas.removeEventListener("pointercancel", handlePointerReset);
      window.removeEventListener("resize", init);
      // Явно освобождаем ссылки на буферы и градиент.
      particleCount = 0;
      pos = new Float32Array(0);
      base = new Float32Array(0);
      vel = new Float32Array(0);
      gradient = null;
      isInitialized.current = false;
    };
  }, [isStarted, text]); // Теперь эффект перезапускается, когда лоадер дает команду

  return (
    <div className="relative w-full h-[150px] md:h-[250px] flex justify-center items-center pointer-events-none">
      <canvas
        ref={canvasRef}
        className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "100vw",
          height: "800px",
          touchAction: "pan-y",
        }}
      />
    </div>
  );
}
