"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useLoading } from "@/context/LoadingContext";

// --- SHADER SOURCE ---

// language=GLSL
const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;

precision highp float;
precision highp int;

#define TIME        uTime
#define RESOLUTION  uResolution
#define PI          3.141592654
#define TAU         (2.0 * PI)
#define ROT(a)      mat2(cos(a), sin(a), -sin(a), cos(a))

const float bstart = 0.0;
const float bpm    = 120.0;
const float bhz    = bpm / 60.0;

float tanh_approx(float x) {
  float x2 = x * x;
  return clamp(x * (27.0 + x2) / (27.0 + 9.0 * x2), -1.0, 1.0);
}

vec2 mod2(inout vec2 p, vec2 size) {
  vec2 c = floor((p + size * 0.5) / size);
  p = mod(p + size * 0.5, size) - size * 0.5;
  return c;
}

vec2 raySphere(vec3 ro, vec3 rd, vec4 sph) {
  vec3 oc = ro - sph.xyz;
  float b = dot(oc, rd);
  float c = dot(oc, oc) - sph.w * sph.w;
  float h = b * b - c;
  if (h < 0.0) return vec2(-1.0);
  h = sqrt(h);
  return vec2(-b - h, -b + h);
}

vec3 toSpherical(vec3 p) {
  float r = length(p);
  float t = acos(p.z / r);
  float ph = atan(p.y, p.x);
  return vec3(r, t, ph);
}

float bouncef(float tt) {
  float tm = tt * bhz / 2.0;
  float t = fract(tm) - 0.5;
  return 4.0 * (0.25 - t * t);
}

float grid(vec2 p, float f, float mf) {
  const float steps = 20.0;
  vec2 gz = vec2(PI / (steps * mf), PI / steps);
  mod2(p, gz);
  p.y *= f;
  return min(abs(p.x), abs(p.y)) - 0.0025;
}

const vec3 lightPos = vec3(1.0, 2.0, 2.0);
const float planeY  = -0.75;

vec4 ballDim(float bf) {
  float b = 0.25 * bf;
  const float r = 0.5;
  return vec4(vec3(0.0, b + planeY + r, 0.0), r);
}

vec3 skyColor(float bf, vec3 ro, vec3 rd, vec3 nrd) {
  // Расстояние до плоскости пола
  float pi = -(ro.y - planeY) / rd.y;

  // ЦВЕТ "НЕБА" (пустоты выше горизонта)
  if (pi < 0.0) return vec3(0.04, 0.08, 0.12);

  vec3 pp = ro + rd * pi;
  vec3 npp = ro + nrd * pi;
  vec3 pld = normalize(lightPos - pp);
  float aa = length(npp - pp);
  vec4 ball = ballDim(bf);
  vec2 bi = raySphere(pp, pld, ball);

  // ПАРАМЕТРЫ СЕТКИ: 0.5 - размер ячейки, 0.5*TIME - скорость движения пола
  vec2 pp2 = pp.xz + 0.5 * TIME;
  mod2(pp2, vec2(0.5));

  // ТОЛЩИНА ЛИНИЙ СЕТКИ: 0.01 (чем больше число, тем толще линии)
  float pd = min(abs(pp2.x), abs(pp2.y)) - 0.01;

  // ЦВЕТ ПОВЕРХНОСТИ ПОЛА (второй vec3 в функции mix)
  vec3 col = vec3(0.48, 0.68, 0.82);

  // ЦВЕТ ЛИНИЙ СЕТКИ (RGB от 0 до 1)
  col = mix(col, vec3(0.3, 0.4, 0.5), smoothstep(aa, -aa, pd));

  // Тень от шара на полу (branchless)
  float shadowMask = step(0.0, bi.x);
  float shadowMul = mix(1.0, 1.0 - exp(-bi.x), tanh_approx(2.0 * (bi.y - bi.x)));
  col *= mix(1.0, shadowMul, shadowMask);

  // ТУМАН НА ГОРИЗОНТЕ: vec3(0.05, 0.1, 0.15) - цвет, в который уходит пол вдалеке
  return mix(vec3(0.05, 0.1, 0.15), col, exp(-0.2 * max(pi - 2.0, 0.0)));
}

vec3 temperColor(float t) {
  vec3 purple = vec3(0.4, 0.1, 0.7);
  vec3 darkBlue = vec3(0.02, 0.05, 0.4);
  return mix(purple, darkBlue, smoothstep(0.0, 1.0, t));
}

vec3 color(float bf, vec3 ro, vec3 rd, vec3 nrd) {
  vec4 ball = ballDim(bf);
  vec3 sky = skyColor(bf, ro, rd, nrd);
  vec2 bi = raySphere(ro, rd, ball);

  // Ранний выход сохраняем: он экономит дорогие вычисления
  if (bi.x < 0.0) return sky;

  vec3 sp = ro + bi.x * rd;
  vec3 sn = normalize(sp - ball.xyz);
  vec3 sr = reflect(rd, sn);
  float sfre = pow(1.0 + dot(sn, rd), 3.0);
  vec3 spr = sp - ball.xyz;
  spr.yz *= ROT(TIME * sqrt(0.5));
  spr.xy *= ROT(TIME * 1.234);
  vec3 ssp = toSpherical(spr.zxy);
  float verticalPos = ssp.y / PI;
  vec2 sp2 = ssp.yz;
  float sf = sin(sp2.x);
  float smf = pow(2.0, -ceil(log(sf) / log(2.0)));
  float sdg = grid(sp2, sf, smf);
  float aa = length(sp - (ro + bi.x * nrd));
  float heatFactor = smoothstep(0.4, 0.9, verticalPos);
  vec3 reflectedColor = skyColor(bf, sp, sr, sr);
  vec3 chromeColor = mix(reflectedColor, vec3(0.9, 0.95, 1.0), 0.1);
  vec3 heatColor = temperColor(heatFactor);
  vec3 baseColor = mix(chromeColor, heatColor, heatFactor);
  vec3 sld = normalize(lightPos - sp);
  float sspe = pow(max(dot(sld, sr), 0.0), 128.0);
  vec3 scol = baseColor;
  scol = mix(scol, vec3(0.7), smoothstep(aa, -aa, sdg));
  scol = mix(scol, reflectedColor, sfre * 0.5);
  scol += sspe * vec3(1.0);
  return mix(sky, scol, tanh_approx(10.0 * (bi.y - bi.x)));
}

void main() {
  // Оставляем highp в координатно-чувствительных участках (лучи/пересечения)
  highp vec2 q = gl_FragCoord.xy / RESOLUTION.xy;
  highp vec2 p = -1.0 + 2.0 * q;
  p.x *= RESOLUTION.x / RESOLUTION.y;

  highp vec3 ro = vec3(0.0, 0.5, 2.8);
  highp vec3 la = vec3(0.0, 0.0, 0.0);
  highp vec3 ww = normalize(la - ro);
  highp vec3 uu = normalize(cross(vec3(0.0, 1.0, 0.0), ww));
  highp vec3 vv = cross(ww, uu);
  highp vec3 rd = normalize(-p.x * uu + p.y * vv + 2.0 * ww);
  highp vec3 nrd = normalize(-(p.x + 2.0 / RESOLUTION.y) * uu + p.y * vv + 2.0 * ww);

  float bf = bouncef(TIME);
  vec3 col = color(bf, ro, rd, nrd);
  col = mix(col, vec3(0.7, 0.8, 1.0), smoothstep(2.5, 1.0, TIME));

  gl_FragColor = vec4(col, 1.0);
}
`;

function BallBackground() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { isReady } = useLoading();

  // Инициализируем разрешение один раз
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(
          typeof window !== "undefined" ? window.innerWidth : 1920,
          typeof window !== "undefined" ? window.innerHeight : 1080,
        ),
      },
    }),
    [],
  );

  // Ручной контроль ресайза для Android
  useEffect(() => {
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;
      // Обновляем только если изменилась ширина (поворот экрана)
      // Игнорируем изменение высоты (скрытие адресной строки)
      if (currentWidth !== lastWidth) {
        if (meshRef.current) {
          const material = meshRef.current.material as THREE.ShaderMaterial;
          material.uniforms.uResolution.value.set(currentWidth, currentHeight);
        }
        lastWidth = currentWidth;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame((state) => {
    if (!isReady || !meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={`
          void main() {
            gl_Position = vec4(position, 1.0);
          }
        `}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function SteelBackground() {
  const { isReady } = useLoading();

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden h-[100lvh]">
      <Canvas
        dpr={Math.min(
          typeof window !== "undefined" ? window.devicePixelRatio : 1,
          1.5,
        )}
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          alpha: false,
          depth: false,
          stencil: false,
          preserveDrawingBuffer: false,
          premultipliedAlpha: false,
        }}
      >
        <BallBackground />
      </Canvas>
      <div
        className={`absolute inset-0 pointer-events-none bg-gradient-to-b from-cyan-800 via-transparent to-transparent transition-opacity duration-1000 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
