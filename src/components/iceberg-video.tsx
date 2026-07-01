"use client";
import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   VIVYNQ IJSBERG — TV DOCUMENTARY EDITION
   WebGL fragment shader met: god rays, broadcast scan lines,
   film grain, chromatische aberratie, BBC-stijl lower-thirds.
═══════════════════════════════════════════════════════════════ */

const VERT = `attribute vec2 a_pos; void main(){gl_Position=vec4(a_pos,0.0,1.0);}`;

const FRAG = `
precision highp float;
uniform vec2  u_res;
uniform float u_time;

/* ── NOISE ──────────────────────────────── */
float hash(vec2 p){p=fract(p*vec2(127.1,311.7));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float vnoise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.0,a=0.5;for(int i=0;i<5;i++){v+=a*vnoise(p);p=p*2.1+vec2(1.7,9.2);a*=0.5;}return v;}

/* ── CAUSTICS (animated Voronoi) ────────── */
float caustics(vec2 p,float t){
  float c=0.0;
  for(int k=0;k<3;k++){
    float sc=1.0+float(k)*0.9;
    vec2 q=p*sc+vec2(sin(t*0.18+float(k)*1.3),cos(t*0.13+float(k)*2.1));
    vec2 qi=floor(q);float mn=9.0;
    for(int x=-1;x<=1;x++)for(int y=-1;y<=1;y++){
      vec2 nb=qi+vec2(x,y);vec2 rr=nb+vec2(hash(nb),hash(nb+7.3))*0.8-q;
      mn=min(mn,dot(rr,rr));
    }
    c+=1.0/(1.0+mn*14.0)/pow(2.0,float(k));
  }
  return c;
}

/* ── GERSTNER WAVES ─────────────────────── */
float waveY(float x,float t){
  return 0.395
    +0.008*sin(x*7.0-t*1.4+0.3)
    +0.005*sin(x*14.0+t*2.1)
    +0.003*sin(x*23.0-t*3.3)
    +fbm(vec2(x*3.5+t*0.12,t*0.08))*0.010;
}

/* ── ICE PROFILES ───────────────────────── */
float iceAbove(vec2 uv,float cx){
  if(uv.y>=0.395)return-1.0;
  float h=clamp((0.395-uv.y)/(0.395-0.075),0.0,1.0);
  float w=0.112*(1.0-h)*(1.0+0.28*sin(h*3.14159));
  w+=fbm(vec2(uv.x*9.0,uv.y*14.0))*0.007-0.0035;
  return w-abs(uv.x-cx);
}
float iceBelow(vec2 uv,float cx){
  if(uv.y<0.395)return-1.0;
  float d=clamp((uv.y-0.395)/0.60,0.0,1.0);
  float w=0.112+0.148*sin(d*3.14159);
  w*=1.0-d*d*0.22;
  w+=fbm(vec2(uv.x*4.5+1.3,uv.y*5.5))*0.016-0.008;
  return w-abs(uv.x-cx);
}

/* ── SCENE (computable at shifted UV) ───── */
vec3 scene(vec2 uv,float t,float cx){
  float wY=waveY(uv.x,t);
  float breath=sin(t*0.68)*0.006;
  vec2 uvB=vec2(cx,0.395)+(uv-vec2(cx,0.395))*(1.0-breath);
  float av=iceAbove(uvB,cx);
  float bv=iceBelow(uvB,cx);
  bool underwater=uv.y>wY;
  vec3 col;

  /* Sky */
  if(!underwater){
    float sky=uv.y/0.40;
    col=mix(vec3(0.008,0.022,0.055),vec3(0.022,0.072,0.150),sky);
    col+=vec3(0.016,0.045,0.100)*pow(sky,3.0);
    float sn=vnoise(uv*vec2(90.0,55.0));
    float star=pow(max(0.0,sn-0.905),2.0)*32.0;
    col+=vec3(star*.7,star*.82,star)*(1.0-sky*1.5);
    /* Subtle aurora */
    float aur=fbm(vec2(uv.x*1.8+t*0.03,uv.y*3.5))*0.45;
    col+=vec3(0.0,0.045,0.090)*aur*(1.0-sky)*0.45;
  } else {
    /* Ocean */
    float d=clamp((uv.y-0.395)/0.60,0.0,1.0);
    col=mix(vec3(0.030,0.105,0.240),vec3(0.003,0.013,0.048),d*d*1.6);
    /* Caustics */
    float caus=caustics(uv*vec2(6.0,3.5)+vec2(0.0,t*0.04),t);
    col+=vec3(0.20,0.48,0.85)*caus*max(0.0,1.0-d*2.8)*0.40;
    /* GOD RAYS — light shafts from surface */
    float gx=(uv.x-cx)*1.2;
    float ray=exp(-gx*gx*18.0)*exp(-d*3.2);
    float rayFlicker=0.75+0.25*sin(t*1.8+uv.x*7.0);
    col+=vec3(0.18,0.42,0.80)*ray*rayFlicker*0.30;
    /* Bioluminescence near berg */
    float bglow=exp(-abs(uv.x-cx)*9.0)*max(0.0,1.0-d*3.2)*0.07;
    col+=vec3(0.0,0.20,0.45)*bglow;
    /* Depth fog */
    col=mix(col,vec3(0.002,0.010,0.038),1.0-exp(-d*3.4));
  }

  /* Ice above */
  if(!underwater&&av>0.0){
    float edge=clamp(av*72.0,0.0,1.0);
    float iceH=clamp((0.395-uv.y)/0.320,0.0,1.0);
    vec3 ic=mix(mix(vec3(0.30,0.52,0.74),vec3(0.50,0.68,0.84),iceH*0.8),vec3(0.80,0.89,0.96),pow(iceH,1.4));
    float sss=pow(1.0-edge,1.8)*(1.0-iceH)*0.55;
    ic+=vec3(0.07,0.30,0.52)*sss;
    vec2 ldir=normalize(vec2(0.5,-0.72));
    vec2 nm=normalize(vec2(sin(uv.x*28.0+1.2+t*0.04),-1.0));
    float sp=pow(max(0.0,dot(nm,ldir)),24.0);
    ic+=vec3(1.0,0.97,0.93)*sp*0.78;
    float pg=exp(-length(uv-vec2(cx,0.082))*58.0)*2.4;
    ic+=vec3(pg*0.83,pg*0.89,pg);
    ic=mix(ic,vec3(0.86,0.66,0.33)*0.52,pow(1.0-edge,4.0)*0.28);
    col=mix(col,ic,edge*0.96);
    /* Ice surface detail — faint normal-mapped scratches */
    float scratch=step(0.98,vnoise(uv*vec2(60.0,20.0)));
    col=mix(col,vec3(0.92,0.96,1.0),scratch*edge*0.35);
  }

  /* Ice below */
  if(underwater&&bv>0.0){
    float edge=clamp(bv*46.0,0.0,1.0);
    float d=clamp((uv.y-0.395)/0.60,0.0,1.0);
    vec3 ic=mix(vec3(0.09,0.26,0.54),vec3(0.04,0.14,0.32),edge);
    float caus=caustics(uv*5.5+vec2(1.0,0.0),t);
    ic+=vec3(0.11,0.30,0.58)*caus*(1.0-d)*0.45;
    ic*=exp(-d*2.0);
    ic+=vec3(0.04,0.17,0.36)*pow(1.0-edge,2.0)*0.65;
    col=mix(col,ic,edge*0.95);
  }

  /* Water surface */
  float wd=uv.y-wY;
  col=mix(col,vec3(0.015,0.080,0.185),smoothstep(0.012,0.0,abs(wd))*0.72);
  float sp2=uv.x*2.8-t*0.28;
  float sh=(0.5+0.5*sin(sp2*6.28))*(0.6+0.4*sin(sp2*13.0));
  vec3 gold=mix(vec3(0.62,0.45,0.10),vec3(0.95,0.80,0.38),sh);
  col=mix(col,gold,smoothstep(0.003,0.0,abs(wd))*0.94);
  /* Foam spray */
  float foamD=abs(uv.x-cx)-0.112;
  col=mix(col,vec3(0.88,0.93,0.97),smoothstep(0.004,0.0,abs(wd))*smoothstep(0.012,0.0,abs(foamD))*0.55);

  return col;
}

/* ── MAIN ───────────────────────────────── */
void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  uv.y=1.0-uv.y;
  float t=u_time;
  float cx=0.44;

  /* Chromatic aberration — compute scene for R/G/B at slightly offset UVs */
  float abb=0.0022;
  vec2 edge2=uv-0.5;
  float ef=dot(edge2,edge2)*2.5;
  vec3 colR=scene(uv+vec2(abb,0.0)*ef,t,cx);
  vec3 colG=scene(uv,t,cx);
  vec3 colB=scene(uv-vec2(abb,0.0)*ef,t,cx);
  vec3 col=vec3(colR.r,colG.g,colB.b);

  /* Film grain */
  float grain=fract(sin(dot(uv*1234.5+t*0.07,vec2(127.1,311.7)))*43758.5453);
  col+=(grain-0.5)*0.038;

  /* TV scan lines — subtle horizontal bands */
  float sl=0.92+0.08*sin(gl_FragCoord.y*3.14159);
  col*=sl;

  /* Broadcast vignette — rounded, heavier than cinema */
  vec2 vig=(uv-0.5)*vec2(1.0,1.3);
  col*=1.0-dot(vig,vig)*0.80;

  /* ACES filmic tone map */
  col=(col*(2.51*col+0.03))/(col*(2.43*col+0.59)+0.14);

  /* Broadcast color grade: lift shadows slightly, warm highlights */
  col=mix(col,col*vec3(1.04,1.00,0.96),0.35);
  col=pow(clamp(col,0.0,1.0),vec3(1.0/2.2));

  /* Broadcast safe — very faint letterbox bars top/bottom */
  float bars=step(uv.y,0.025)+step(0.975,uv.y);
  col=mix(col,vec3(0.0),bars*0.85);

  gl_FragColor=vec4(col,1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, src: string, type: number) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return sh;
}

/* Lower-third data — BBC/NatGeo documentary style */
const LOWER_THIRDS = [
  {
    zone: "above",
    tag:  "DISC-PROFIEL",
    title: "Boven het wateroppervlak",
    sub:   "Zichtbaar gedrag · communicatiestijl · drijfveren",
    items: ["D · Daadkracht — directief, resultaatgericht", "I · Invloed — inspirerend, sociaal", "S · Stabiliteit — geduldig, samenwerkend", "C · Consciëntie — nauwkeurig, analytisch"],
    color: "#C9A84C",
    delay: 1.2,
  },
  {
    zone: "below",
    tag:  "SYSTEMISCH WERK",
    title: "Onder het wateroppervlak",
    sub:   "Verborgen patronen · loyaliteiten · familiedynamieken",
    items: ["Loyaliteitspatronen — onbewuste trouw aan het systeem", "Familiedynamieken — wat je meedraagt van vroeger", "Onbewuste drivers — wat gedrag vanuit de diepte stuurt", "Systemische balans — geven · nemen · orde · verbinding"],
    color: "#8B6FA0",
    delay: 3.5,
  },
];

export function IcebergVideo() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow]     = useState(false);
  const [phase, setPhase]   = useState(0); // 0=hidden 1=above 2=both

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!show) return;
    const t1 = setTimeout(() => setPhase(1), 1400);
    const t2 = setTimeout(() => setPhase(2), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;
    const gl = canvas.getContext("webgl") as WebGLRenderingContext | null;
    if (!gl) return;

    const vs  = compileShader(gl, VERT, gl.VERTEX_SHADER);
    const fs  = compileShader(gl, FRAG, gl.FRAGMENT_SHADER);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs);
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes  = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, animId = 0;
    const start = performance.now();

    function resize() {
      W = wrap!.offsetWidth;
      H = Math.round(W * 0.5625);
      canvas!.style.width  = `${W}px`;
      canvas!.style.height = `${H}px`;
      canvas!.width  = W * DPR;
      canvas!.height = H * DPR;
      gl!.viewport(0, 0, W * DPR, H * DPR);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function tick() {
      const t = (performance.now() - start) / 1000;
      gl!.uniform2f(uRes, W, H);
      gl!.uniform1f(uTime, t);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      if (!reduced) animId = requestAnimationFrame(tick);
    }
    animId = requestAnimationFrame(tick);

    return () => { cancelAnimationFrame(animId); ro.disconnect(); gl.deleteProgram(prog); };
  }, [show]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#010510", aspectRatio: "16/9", fontFamily: "'Manrope', system-ui, sans-serif" }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }}
        aria-label="VIVYNQ IJsberg model: DISC boven water, Systemisch onder water"
        role="img"
      />

      {show && (
        <div className="absolute inset-0 pointer-events-none">

          {/* ── BROADCAST BUG — station logo top-right ── */}
          <div style={{
            position: "absolute", top: "6%", right: "3%",
            opacity: 0.65,
            transition: "opacity 1s ease 0.5s",
          }}>
            <div style={{
              fontSize: "clamp(0.45rem,0.9vw,0.65rem)",
              fontWeight: 800,
              letterSpacing: "0.22em",
              color: "#C9A84C",
              textAlign: "right",
              lineHeight: 1.2,
            }}>VIVYNQ</div>
            <div style={{
              fontSize: "clamp(0.38rem,0.7vw,0.52rem)",
              color: "rgba(201,168,76,0.50)",
              letterSpacing: "0.18em",
              textAlign: "right",
            }}>DOCUMENTARY</div>
          </div>

          {/* ── CHAPTER INDICATOR — top-left ── */}
          <div style={{
            position: "absolute", top: "6%", left: "3%",
            opacity: show ? 0.55 : 0,
            transition: "opacity 0.8s ease 0.3s",
          }}>
            <div style={{
              fontSize: "clamp(0.38rem,0.7vw,0.52rem)",
              fontWeight: 600,
              letterSpacing: "0.20em",
              color: "rgba(250,248,242,0.60)",
              textTransform: "uppercase",
            }}>
              Het Vivynq-model
            </div>
          </div>

          {/* ── WATERLINE MARKER ── */}
          {phase >= 1 && (
            <div style={{
              position: "absolute",
              left: 0, right: 0,
              top: "38.5%",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "0 3%",
              opacity: 0,
              animation: "ltFadeIn 0.6s ease 0.1s forwards",
            }}>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(201,168,76,0.30), transparent)" }} />
              <span style={{
                fontSize: "clamp(0.40rem,0.75vw,0.55rem)",
                fontWeight: 700,
                letterSpacing: "0.22em",
                color: "rgba(250,248,242,0.40)",
                textTransform: "uppercase",
                flexShrink: 0,
              }}>
                Wateroppervlak
              </span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(201,168,76,0.30), transparent)" }} />
            </div>
          )}

          {/* ── LOWER THIRDS ── */}
          {LOWER_THIRDS.map((lt) => {
            const visible = lt.zone === "above" ? phase >= 1 : phase >= 2;
            const isAbove = lt.zone === "above";
            return (
              <div
                key={lt.zone}
                style={{
                  position: "absolute",
                  bottom: isAbove ? "57%" : "8%",
                  left: "3%",
                  maxWidth: "clamp(200px, 42%, 380px)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-24px)",
                  transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {/* Tag bar */}
                <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "5px" }}>
                  <div style={{ width: "3px", height: "clamp(14px,2.5vw,20px)", background: lt.color, flexShrink: 0, borderRadius: "1px" }} />
                  <span style={{
                    fontSize: "clamp(0.40rem,0.78vw,0.56rem)",
                    fontWeight: 800,
                    letterSpacing: "0.22em",
                    color: lt.color,
                    textTransform: "uppercase",
                  }}>
                    {lt.tag}
                  </span>
                </div>

                {/* Main card */}
                <div style={{
                  background: "rgba(5,8,16,0.82)",
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${lt.color}30`,
                  borderLeft: `3px solid ${lt.color}`,
                  padding: "clamp(8px,1.4vw,14px) clamp(10px,1.8vw,18px)",
                }}>
                  <p style={{
                    fontSize: "clamp(0.58rem,1.1vw,0.82rem)",
                    fontWeight: 700,
                    color: "rgba(250,248,242,0.95)",
                    lineHeight: 1.25,
                    margin: "0 0 3px",
                    letterSpacing: "0.01em",
                  }}>
                    {lt.title}
                  </p>
                  <p style={{
                    fontSize: "clamp(0.44rem,0.78vw,0.58rem)",
                    color: `${lt.color}BB`,
                    lineHeight: 1.4,
                    margin: "0 0 8px",
                    letterSpacing: "0.04em",
                  }}>
                    {lt.sub}
                  </p>

                  {/* Item list */}
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "3px" }}>
                    {lt.items.map((item, i) => (
                      <li key={i} style={{ display: "flex", gap: "6px", alignItems: "flex-start" }}>
                        <span style={{ color: lt.color, fontSize: "clamp(0.38rem,0.6vw,0.50rem)", flexShrink: 0, marginTop: "1px" }}>▸</span>
                        <span style={{
                          fontSize: "clamp(0.42rem,0.72vw,0.56rem)",
                          color: "rgba(250,248,242,0.62)",
                          lineHeight: 1.45,
                        }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

          {/* ── 7× BADGE ── */}
          {phase >= 2 && (
            <div style={{
              position: "absolute",
              top: "55%", right: "4%",
              textAlign: "right",
              opacity: 0,
              animation: "ltFadeIn 0.7s ease 0.3s forwards",
            }}>
              <div style={{
                fontSize: "clamp(1.4rem,3.5vw,3rem)",
                fontWeight: 700,
                color: "rgba(201,168,76,0.85)",
                fontStyle: "italic",
                lineHeight: 1,
                fontFamily: "'Fraunces', Georgia, serif",
              }}>
                7×
              </div>
              <div style={{
                fontSize: "clamp(0.40rem,0.72vw,0.56rem)",
                color: "rgba(201,168,76,0.50)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginTop: "2px",
              }}>
                groter dan zichtbaar
              </div>
            </div>
          )}

          {/* ── TIMECODE (decoratief) ── */}
          <div style={{
            position: "absolute",
            bottom: "4%", right: "3%",
            fontSize: "clamp(0.36rem,0.60vw,0.48rem)",
            fontFamily: "monospace",
            color: "rgba(250,248,242,0.22)",
            letterSpacing: "0.12em",
          }}>
            VIVYNQ · {new Date().getFullYear()} · SYSTEMISCH MODEL
          </div>
        </div>
      )}

      <style>{`
        @keyframes ltFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
