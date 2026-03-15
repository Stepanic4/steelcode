"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// --- SHADER SOURCE ---

// language=GLSL
const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;

#define TIME      uTime
#define RESOLUTION   uResolution
#define PI          3.141592654
#define TAU          (2.0*PI)
#define ROT(a)      mat2(cos(a), sin(a), -sin(a), cos(a))

const float bstart = 0.0;
const float bpm    = 120.0; // СКОРОСТЬ ПУЛЬСАЦИИ (BPM)
const float bhz    = bpm/60.0;

float tanh_approx(float x) {
  float x2 = x*x;
  return clamp(x*(27.0 + x2)/(27.0+9.0*x2), -1.0, 1.0);
}

vec2 mod2(inout vec2 p, vec2 size) {
  vec2 c = floor((p + size*0.5)/size);
  p = mod(p + size*0.5,size) - size*0.5;
  return c;
}

vec2 raySphere(vec3 ro, vec3 rd, vec4 sph) {
  vec3 oc = ro - sph.xyz;
  float b = dot( oc, rd );
  float c = dot( oc, oc ) - sph.w*sph.w;
  float h = b*b - c;
  if (h < 0.0) return vec2(-1.0);
  h = sqrt(h);
  return vec2(-b - h, -b + h);
}

vec3 toSpherical(vec3 p) {
  float r   = length(p);
  float t   = acos(p.z/r);
  float ph  = atan(p.y, p.x);
  return vec3(r, t, ph);
}

float bouncef(float tt) {
  float tm = tt*bhz/2.0;
  float t = fract(tm)-0.5;
  return 4.0*(0.25 - t*t);
}

float dots(vec2 p, float f, float mf) {
  const vec2 gz = vec2(PI/100.0);
  mod2(p, gz);
  p.x /= f;
  return length(p)-0.005; // РАЗМЕР ТОЧЕК НА ШАРЕ
}

float grid(vec2 p, float f, float mf) {
  const float steps = 20.0;
  vec2 gz = vec2(PI/(steps*mf), PI/steps);
  mod2(p, gz);
  p.y *= f;
  return min(abs(p.x), abs(p.y))-0.0025; // ТОЛЩИНА СЕТКИ НА ШАРЕ
}

const vec3 lightPos = vec3(1.0, 2.0, 2.0); // ПОЗИЦИЯ ИСТОЧНИКА СВЕТА
const float planeY  = -0.75; // ВЫСОТА ПОЛА

vec4 ballDim(float bf) {
  float b = 0.25*bf;
  const float r = 0.5; // РАДИУС ШАРА
  return vec4(vec3(0.0, b+planeY+r, 0.0), r);
}

vec3 skyColor(float bf, vec3 ro, vec3 rd, vec3 nrd) {
  float pi = -(ro.y-(planeY))/rd.y;
  if (pi < 0.0) return vec3(0.04, 0.08, 0.12); // ЦВЕТ ГЛУБОКОГО КОСМОСА/НЕБА (R, G, B)
  
  vec3 pp = ro+rd*pi;
  vec3 npp= ro+nrd*pi;
  vec3 pld = normalize(lightPos-pp);  
  float aa = length(npp-pp);
  vec4 ball = ballDim(bf);
  vec2 bi = raySphere(pp, pld, ball);
  vec2 pp2 = pp.xz+0.5*TIME;
  mod2(pp2, vec2(0.5));
  float pd = min(abs(pp2.x), abs(pp2.y))-0.01;
  
  vec3 col = vec3(0.7, 0.8, 0.9); // ОСНОВНОЙ ЦВЕТ ПОЛА (СВЕТЛЫЙ)
  col = mix(col, vec3(0.3, 0.4, 0.5), smoothstep(aa, -aa, pd)); // ЦВЕТ СЕТКИ НА ПОЛУ
  
  if (bi.x > 0.0) {
    col *= mix(1.0, 1.0-exp(-bi.x), tanh_approx(2.0*(bi.y-bi.x))); // ЗДЕСЬ СЧИТАЕТСЯ ТЕНЬ
  }
  return mix(vec3(0.05, 0.1, 0.15), col, exp(-0.2*max(pi-2.0, 0.0))); // ТУМАН НА ГОРИЗОНТЕ
}

vec3 color(float bf, vec3 ro, vec3 rd, vec3 nrd) {
  vec4 ball = ballDim(bf);
  vec3 sky = skyColor(bf, ro, rd, nrd);
  vec2 bi = raySphere(ro, rd, ball);
  if (bi.x < 0.0) return sky;
  
  vec3 sp = ro + bi.x*rd;
  vec3 nsp = ro + bi.x*nrd;
  float aa = length(sp-nsp);
  vec3 sld = normalize(lightPos-sp); 
  vec3 sn = normalize(sp - ball.xyz);
  vec3 sr = reflect(rd, sn);
  float sfre = pow(1.0+dot(sn, rd), 2.0);
  
  vec3 spr = sp - ball.xyz;
  spr.yz *= ROT(TIME*sqrt(0.5)); // СКОРОСТЬ ВРАЩЕНИЯ ШАРА ПО YZ
  spr.xy *= ROT(TIME*1.234);     // СКОРОСТЬ ВРАЩЕНИЯ ШАРА ПО XY
  vec3 ssp = toSpherical(spr.zxy);
  vec2 sp2 = ssp.yz;
  float sf = sin(sp2.x); 
  float smf = pow(2.0, -ceil(log(sf)/log(2.0)));
  
  float sdiff = max(dot(sld, sn), 0.0);
  float sspe = pow(max(dot(sld, sr), 0.0), 0.5);
  float sdd = dots(sp2, sf, smf);
  float sdg = grid(sp2, sf, smf);
  
  // ЦВЕТА САМОГО ШАРА:
  vec3 scol = mix(vec3(0.05), vec3(0.15), sdiff); // ТЕМНЫЕ УЧАСТКИ ШАРА
  scol = mix(scol, vec3(0.35), smoothstep(aa, -aa, sdd)); // ЦВЕТ ТОЧЕК НА ШАРЕ
  scol = mix(scol, vec3(0.5), smoothstep(aa, -aa, sdg)); // ЦВЕТ СЕТКИ НА ШАРЕ
  scol += sspe*sfre; // ЯРКОСТЬ БЛИКА
  
  return mix(sky, scol, tanh_approx(10.0*(bi.y-bi.x)));
}

void main() {
  vec2 q = gl_FragCoord.xy / RESOLUTION.xy;
  vec2 p = -1. + 2. * q;
  p.x *= RESOLUTION.x/RESOLUTION.y;
  
  vec3 ro = vec3(0.0, 0.5, 2.8); // ПОЛОЖЕНИЕ КАМЕРЫ (X, Y, Z)
  vec3 la = vec3(0.0, 0.0, 0.0); // ТОЧКА, КУДА СМОТРИТ КАМЕРА
  vec3 ww = normalize(la - ro);
  vec3 uu = normalize(cross(vec3(0.0,1.0,0.0), ww));
  vec3 vv = cross(ww,uu);
  vec3 rd = normalize(-p.x*uu + p.y*vv + 2.0*ww);
  vec3 nrd = normalize(-(p.x+2.0/RESOLUTION.y)*uu + p.y*vv + 2.0*ww);

  float bf = bouncef(TIME);
  vec3 col = color(bf, ro, rd, nrd);
  
  // ЭФФЕКТ ПОЯВЛЕНИЯ (ВСПЫШКА В НАЧАЛЕ)
    col = mix(col, vec3(0.7, 0.8, 1.0), smoothstep(2.5, 1.0, TIME));
  
  gl_FragColor = vec4(col, 1.0);
}
`;

function BallBackground() {
    const meshRef = useRef<THREE.Mesh>(null!);

    const uniforms = useMemo<{[key: string]: THREE.IUniform}>(() => ({
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(0, 0) }
    }), []);

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.getElapsedTime();
            material.uniforms.uResolution.value.set(state.size.width, state.size.height);
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                key={THREE.REVISION}
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
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none bg-[#050a0f]">
            <Canvas dpr={[1, 2]}>
                <BallBackground />
            </Canvas>
            {/* ГРАДИЕНТ ПОВЕРХ ШЕЙДЕРА (ЗАТЕМНЕНИЕ СВЕРХУ) */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        </div>
    );
}