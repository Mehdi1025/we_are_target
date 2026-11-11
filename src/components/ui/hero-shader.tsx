"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { cn } from "@/lib/utils";

/**
 * Fond WebGL du hero : fumée rouge en domain-warping + ondes de « cible »
 * qui se propagent depuis un point qui suit la souris, grain et vignettage.
 * Aucune dépendance. Se met en pause hors écran / onglet caché.
 * Repli CSS si WebGL indisponible ou animations réduites.
 */

const VERT = `
attribute vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_scroll;
uniform float u_intro;

float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i+vec2(1.,0.)), c = hash(i+vec2(0.,1.)), d = hash(i+vec2(1.,1.));
  vec2 u = f*f*(3.-2.*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.-u.x) + (d-b)*u.x*u.y;
}
float fbm(vec2 p){
  float v = 0., a = .5;
  mat2 r = mat2(.8,.6,-.6,.8);
  for(int i=0;i<5;i++){ v += a*noise(p); p = r*p*2.02; a *= .5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float asp = u_res.x / u_res.y;
  vec2 p = vec2(uv.x*asp, uv.y);
  float t = u_time*.06;

  // fumée : domain warping
  vec2 q = vec2(fbm(p*1.4 + t), fbm(p*1.4 + vec2(5.2,1.3) - t));
  vec2 r = vec2(fbm(p*1.6 + 3.*q + vec2(1.7,9.2) + t*1.3), fbm(p*1.6 + 3.*q + vec2(8.3,2.8) - t*1.1));
  float smoke = fbm(p*1.2 + 2.6*r);

  vec3 ink   = vec3(.090,.090,.090);
  vec3 ember = vec3(.29,.07,.05);
  vec3 acc   = vec3(1.,.227,.141);

  // centre de la cible : à droite, attiré par la souris
  vec2 c = mix(vec2(.70*asp,.56), vec2(u_mouse.x*asp, u_mouse.y), .45);
  vec2 d = p - c;
  float dist = length(d) + (smoke-.5)*.07;
  float ang = atan(d.y, d.x);

  // ondes concentriques qui partent du centre
  float freq = 16.;
  float wave = fract(dist*freq - u_time*.55);
  float ring = smoothstep(.0, .045, wave) * smoothstep(.12, .05, wave);
  float fade = smoothstep(1.25, .05, dist);
  ring *= fade * (.35 + .65*smoothstep(.2,.9,smoke));

  // anneaux fixes « cible » + anneau d'accent pulsé
  float target = 0.;
  for(int i=1;i<5;i++){
    float rr = float(i)*.11 + .02*sin(u_time*.4 + float(i));
    target += smoothstep(.006,.0, abs(dist - rr)) * (i==2 ? 1. : .45);
  }
  float pulse = .5 + .5*sin(u_time*1.6);
  float accent = smoothstep(.012,.0, abs(dist - (.22 + .015*pulse)));
  float dash = step(.5, fract(ang*6./3.14159 + u_time*.08));
  float dashed = smoothstep(.004,.0, abs(dist - .44)) * dash;

  // composition
  vec3 col = mix(ink, ember, smoothstep(.35, .95, smoke) * (.55 + .45*fade));
  col += acc * ring * .22;
  col += vec3(.95,.93,.9) * (target*.10 + dashed*.08);
  col += acc * accent * (.55 + .45*pulse);
  col += acc * .55 * smoothstep(.06,.0, dist) * (.6 + .4*pulse);         // cœur
  col += acc * .10 * smoothstep(.9, .0, dist) * (1. + u_scroll*1.5);      // halo

  // réticule discret
  float cross = (smoothstep(.0015,.0, abs(d.x)) + smoothstep(.0015,.0, abs(d.y))) * smoothstep(.75,.25,dist) * smoothstep(.03,.06,dist);
  col += vec3(.95,.93,.9) * cross * .06;

  // vignettage + grain
  float vig = smoothstep(1.35, .35, length((uv-.5)*vec2(asp*.9,1.)));
  col *= .55 + .45*vig;
  col += (hash(gl_FragCoord.xy + fract(u_time)*100.) - .5) * .045;

  col = mix(ink, col, u_intro);
  gl_FragColor = vec4(col, 1.);
}
`;

export function HeroShader({
  className,
  intro,
  scroll,
}: {
  className?: string;
  /** 0 → 1 : apparition (piloté par le hero) */
  intro: MutableRefObject<number>;
  /** 0 → 1 : progression du scroll dans le hero */
  scroll: MutableRefObject<number>;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFallback(true);
      return;
    }
    const gl = el.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl) {
      setFallback(true);
      return;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFallback(true);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = {
      res: gl.getUniformLocation(prog, "u_res"),
      time: gl.getUniformLocation(prog, "u_time"),
      mouse: gl.getUniformLocation(prog, "u_mouse"),
      scroll: gl.getUniformLocation(prog, "u_scroll"),
      intro: gl.getUniformLocation(prog, "u_intro"),
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const w = Math.max(1, Math.floor(el.clientWidth * dpr));
      const h = Math.max(1, Math.floor(el.clientHeight * dpr));
      if (el.width !== w || el.height !== h) {
        el.width = w;
        el.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    const target = { x: 0.7, y: 0.56 };
    const mouse = { x: 0.7, y: 0.56 };
    const onMove = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      target.x = (e.clientX - b.left) / b.width;
      target.y = 1 - (e.clientY - b.top) / b.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    let raf = 0;
    const t0 = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      mouse.x += (target.x - mouse.x) * 0.045;
      mouse.y += (target.y - mouse.y) * 0.045;
      gl.uniform2f(U.res, el.width, el.height);
      gl.uniform1f(U.time, (now - t0) / 1000);
      gl.uniform2f(U.mouse, mouse.x, mouse.y);
      gl.uniform1f(U.scroll, scroll.current);
      gl.uniform1f(U.intro, intro.current);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [intro, scroll]);

  return (
    <>
      <canvas ref={canvas} aria-hidden className={cn("absolute inset-0 h-full w-full", fallback && "hidden", className)} />
      {fallback && (
        <div aria-hidden className={cn("absolute inset-0", className)}>
          <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_70%_45%,#4a1710_0%,#1e1e1e_45%,#141414_100%)]" />
          <svg viewBox="0 0 400 400" className="absolute right-[8%] top-1/2 h-[90%] -translate-y-1/2 text-bone/10">
            {[180, 140, 100, 60].map((r, i) => (
              <circle key={r} cx="200" cy="200" r={r} fill="none" stroke={i === 2 ? "#ff3a24" : "currentColor"} strokeWidth="1" />
            ))}
            <circle cx="200" cy="200" r="6" fill="#ff3a24" />
          </svg>
        </div>
      )}
    </>
  );
}
