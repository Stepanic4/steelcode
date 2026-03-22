"use client";

import React, { useEffect, useRef, useState } from "react";

class Pixel {
    width: number; height: number; ctx: CanvasRenderingContext2D; x: number; y: number;
    color: string; speed: number; size: number; sizeStep: number; minSize: number;
    maxSizeInteger: number; maxSize: number; delay: number; counter: number;
    counterStep: number; isIdle: boolean; isReverse: boolean; isShimmer: boolean;

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, x: number, y: number, color: string, speed: number, delay: number) {
        this.width = canvas.width; this.height = canvas.height; this.ctx = context;
        this.x = x; this.y = y; this.color = color;
        this.speed = (Math.random() * (0.9 - 0.1) + 0.1) * speed;
        this.size = 0; this.sizeStep = Math.random() * 0.4; this.minSize = 0.5;
        this.maxSizeInteger = 2;
        this.maxSize = Math.random() * (this.maxSizeInteger - this.minSize) + this.minSize;
        this.delay = delay; this.counter = 0;
        this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
        this.isIdle = false; this.isReverse = false; this.isShimmer = false;
    }

    draw() {
        const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
    }

    appear() {
        this.isIdle = false;
        if (this.counter <= this.delay) { this.counter += this.counterStep; return; }
        if (this.size >= this.maxSize) this.isShimmer = true;
        if (this.isShimmer) this.shimmer(); else this.size += this.sizeStep;
        this.draw();
    }

    disappear() {
        this.isShimmer = false; this.counter = 0;
        if (this.size <= 0) { this.isIdle = true; return; } else { this.size -= 0.1; }
        this.draw();
    }

    shimmer() {
        if (this.size >= this.maxSize) this.isReverse = true;
        else if (this.size <= this.minSize) this.isReverse = false;
        if (this.isReverse) this.size -= this.speed; else this.size += this.speed;
    }
}

export default function PixelCanvas({ gap = 5, speed = 25, theme = "" }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        class PixelCanvasElement extends HTMLElement {
            canvas!: HTMLCanvasElement; ctx!: CanvasRenderingContext2D; pixels: Pixel[] = [];
            animationFrame: number | null = null; timeInterval = 1000 / 60; timePrevious = performance.now();
            _parent: HTMLElement | null = null;

            get colors() {
                const style = getComputedStyle(this);
                const cssColors = style.getPropertyValue('--pixel-colors').trim();
                return cssColors ? cssColors.split(",").map(c => c.trim()) : ["#fde047", "#eab308"];
            }
            get baseGap() { return Math.max(4, parseInt(this.dataset.gap || "5")); }
            get moveSpeed() { return parseInt(this.dataset.speed || "35") * 0.001; }

            connectedCallback() {
                const shadow = this.attachShadow({ mode: "open" });
                shadow.innerHTML = `<style>:host{display:block;width:100%;height:100%;position:absolute;inset:0;pointer-events:none;z-index:0;}</style><canvas></canvas>`;
                this.canvas = shadow.querySelector("canvas")!;
                this.ctx = this.canvas.getContext("2d")!;
                this._parent = this.parentElement;

                this.init();
                window.addEventListener('resize', () => this.init());

                const appearTrigger = () => this.handleTrigger("appear");
                const disappearTrigger = () => this.handleTrigger("disappear");

                this._parent?.addEventListener("mouseenter", appearTrigger);
                this._parent?.addEventListener("mouseleave", disappearTrigger);
                this._parent?.addEventListener("touchstart", appearTrigger, {passive: true});
                this._parent?.addEventListener("touchend", disappearTrigger, {passive: true});
            }

            handleTrigger(fnName: "appear" | "disappear") {
                if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
                this.runLoop(fnName);
            }

            init() {
                const rect = this.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) return;
                this.canvas.width = rect.width;
                this.canvas.height = rect.height;
                const isMobile = window.innerWidth < 768;
                const finalGap = isMobile ? this.baseGap + 2 : this.baseGap;
                this.createPixels(finalGap);
            }

            createPixels(renderGap: number) {
                this.pixels = [];
                const currentColors = this.colors; // Кэшируем цвета темы
                for (let x = 0; x < this.canvas.width; x += renderGap) {
                    for (let y = 0; y < this.canvas.height; y += renderGap) {
                        const color = currentColors[Math.floor(Math.random() * currentColors.length)];
                        const delay = Math.sqrt(Math.pow(x - this.canvas.width/2, 2) + Math.pow(y - this.canvas.height/2, 2));
                        this.pixels.push(new Pixel(this.canvas, this.ctx, x, y, color, this.moveSpeed, delay));
                    }
                }
            }

            runLoop(fnName: "appear" | "disappear") {
                this.animationFrame = requestAnimationFrame(() => this.runLoop(fnName));
                const timeNow = performance.now();
                if (timeNow - this.timePrevious < this.timeInterval) return;
                this.timePrevious = timeNow;
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.pixels.forEach(p => p[fnName]());
                if (this.pixels.every(p => p.isIdle)) cancelAnimationFrame(this.animationFrame!);
            }
        }

        if (!customElements.get("pixel-canvas")) {
            customElements.define("pixel-canvas", PixelCanvasElement);
        }
    }, []);

    // @ts-ignore
    return (<pixel-canvas className={theme} data-gap={gap.toString()} data-speed={speed.toString()}/>);
}