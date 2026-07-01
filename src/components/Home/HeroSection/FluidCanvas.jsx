import { useEffect, useRef } from "react";
import * as THREE from "three";

const FluidCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Scene + Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#dce8f8");
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Shader — fluid blob / marble texture
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      varying vec2 vUv;

      // smooth noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0,i1.y,1.0)) + i.x + vec3(0.0,i1.x,1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m; m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0+h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

void main() {
  vec2 uv = vUv;
  float t = uTime * 0.08;  // slower

  // offset origin to push clouds toward top-right
  vec2 uvShifted = uv + vec2(-0.3, 0.2);

  float n1 = snoise(uvShifted * 1.8 + vec2(t * 0.5, t * 0.3));
  float n2 = snoise(uvShifted * 3.5 + vec2(-t * 0.4, t * 0.5) + n1 * 0.5);
  float n3 = snoise(uvShifted * 6.5 + vec2(t * 0.2, -t * 0.4) + n2 * 0.4);
  float n4 = snoise(uvShifted * 12.0 + vec2(-t * 0.3, t * 0.15) + n3 * 0.25);

  float marble = n1 * 0.50
               + n2 * 0.28
               + n3 * 0.14
               + n4 * 0.08;
  marble = marble * 0.5 + 0.5;

  // color palette
  vec3 colorWhite = vec3(0.99, 0.99, 1.00);
  vec3 colorLight = vec3(0.86, 0.92, 0.98);
  vec3 colorMid   = vec3(0.70, 0.82, 0.95);
  vec3 colorDeep  = vec3(0.58, 0.74, 0.93);

  vec3 col = mix(colorWhite, colorLight, smoothstep(0.35, 0.55, marble));
  col = mix(col, colorMid,   smoothstep(0.55, 0.72, marble));
  col = mix(col, colorDeep,  smoothstep(0.72, 0.88, marble));

  // KEY: left side white fade
  // uv.x = 0 is left, 1 is right
  float leftFade = smoothstep(0.0, 0.55, uv.x);   // left 55% fades to white
  col = mix(colorWhite, col, leftFade);

  // bottom fade to white
  float bottomFade = smoothstep(0.0, 0.45, uv.y);
  col = mix(colorWhite, col, bottomFade);

  // top-right bright spot (Atharv ka white glow center)
  float hotspot = length(uv - vec2(0.85, 0.85)) * 2.2;
  col = mix(col, colorWhite, smoothstep(1.0, 0.0, hotspot) * 0.6);

  gl_FragColor = vec4(col, 1.0);
}
    `;

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(W, H) },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    let animId;
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        borderRadius: "inherit",
      }}
    />
  );
};

export default FluidCanvas;