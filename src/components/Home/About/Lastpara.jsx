import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ═══════════════════════════ CONTROLS ═══════════════════════════
   Everything you may want to tweak is in this block.
   ════════════════════════════════════════════════════════════════ */

// Use full website screenshots (hosts must allow CORS). Use 3 to 8 items.
const IMAGES = [
  {
    url: "https://ik.imagekit.io/m9zi40oov/uiux/Frame%204C.png",
  },
  {
    url: "https://ik.imagekit.io/m9zi40oov/compress%20img/k72.png?updatedAt=1782026239284",
  },
  {
    url: "https://ik.imagekit.io/m9zi40oov/uiux/MacBook%20Pro%2016_%20-%201C.png",
  },
  {
    url: "https://ik.imagekit.io/m9zi40oov/compress%20img/coder.png?updatedAt=1782026239168",
  },
  {
    url: "https://ik.imagekit.io/m9zi40oov/uiux/Frame%202.png",
  },
  {
    url: "https://ik.imagekit.io/m9zi40oov/aboutus.png?updatedAt=1782029051521",
  },
];

const ROTATION_SPEED = 0.5; // spin speed (0 = stopped, 1.5 = fast)
const TILT = 0.12; // fixed tilt of the cylinder (radians)
const CAMERA_HEIGHT = 0.9; // positive = look from above, negative = from below
const CAMERA_FOV = 45; // lower = flatter look, higher = more perspective
const FIT_MARGIN = 0.9; // lower = bigger cylinder, higher = smaller
const ENABLE_ORBIT = true; // true = mouse users can drag to rotate the view

const IMAGE_BRIGHTNESS = 1.12; // 1 = original, higher = brighter images
const INNER_WALL_BRIGHTNESS = "#9a9aa8"; // inside wall tint (white = same as outside)

const IMAGE_GAP = 0.025; // gap between images as a fraction of each panel (0 = touching, 0.15 = wide)

// Glow that comes from the images themselves (set GLOW_STRENGTH = 0 for none)
const GLOW_STRENGTH = 0.65; // 0 to 1
const GLOW_SPREAD = 1; // how far the glow reaches above and below (1 = none)

// Section size (Tailwind classes). The cylinder is centered inside this area.
const SECTION_HEIGHT = "h-[90vh] lg:h-[100vh] min-h-[560px]";
const SECTION_BG = "bg-black";

// Space reserved at the bottom for the marquee + button, so the cylinder never sits under them.
const OVERLAY_SPACE = "bottom-[120px] sm:bottom-[120px]";

// Marquee
const MARQUEE_ITEMS = [
  "OUR WORK",
  "UI/UX DESIGN",
  "WEB EXPERIENCES",
  "DEVELOPMENT",
  "MOTION",
  "BRANDING",
  "DIGITAL EXPERIENCES",
];
const MARQUEE_SECONDS = 40; // lower = faster
const MARQUEE_TEXT_SIZE = "text-[9vw] sm:text-[6vw] lg:text-[4.2vw]"; // marquee text size
const MARQUEE_OUTLINE = "1px rgba(255,255,255,0.75)"; // stroke of the outlined words

const CTA_LABEL = "start a project";
const CTA_LINK = "/contact";

/* ═══════════════════════════ Internals ═══════════════════════════ */

const RADIUS = 8.5;
const HEIGHT = 5.5;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GLOW_HEIGHT = HEIGHT * GLOW_SPREAD;
const BOUNDING_RADIUS =
  Math.sqrt(RADIUS * RADIUS + (GLOW_HEIGHT / 2) * (GLOW_HEIGHT / 2)) + 0.1;

const loadImage = (url) =>
  new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });

/** Builds the seamless image texture plus a blurred copy used for the image glow. */
function useCylinderTextures(imageList) {
  const gl = useThree((s) => s.gl);
  const [textures, setTextures] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let main = null;
    let glow = null;

    Promise.all(imageList.map((item) => loadImage(item.url))).then((images) => {
      if (cancelled) return;

      const count = imageList.length;
      const canvasH = 1024;
      const canvasW = Math.round(canvasH * (CIRCUMFERENCE / HEIGHT));
      const canvas = document.createElement("canvas");
      canvas.width = canvasW;
      canvas.height = canvasH;
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvasW, canvasH);

      const slotW = canvasW / count;

      imageList.forEach((_, i) => {
        const gapPx = slotW * IMAGE_GAP;
        const x = Math.floor(i * slotW + gapPx / 2);
        const w = Math.ceil(slotW - gapPx) + (IMAGE_GAP === 0 ? 1 : 0);

        ctx.save();
        ctx.beginPath();
        ctx.rect(x, 0, w, canvasH);
        ctx.clip();

        const img = images[i];
        if (img) {
          const scale = Math.max(w / img.width, canvasH / img.height);
          const dw = img.width * scale;
          const dh = img.height * scale;
          ctx.drawImage(img, x + (w - dw) / 2, (canvasH - dh) / 2, dw, dh);
        } else {
          const ph = ctx.createLinearGradient(x, 0, x + w, canvasH);
          ph.addColorStop(0, "#312e81");
          ph.addColorStop(1, "#581c87");
          ctx.fillStyle = ph;
          ctx.fillRect(x, 0, w, canvasH);
        }
        ctx.restore();
      });

      main = new THREE.CanvasTexture(canvas);
      main.colorSpace = THREE.SRGBColorSpace;
      main.wrapS = THREE.RepeatWrapping;
      main.wrapT = THREE.ClampToEdgeWrapping;
      main.anisotropy = Math.min(16, gl.capabilities.getMaxAnisotropy());
      main.needsUpdate = true;

      // Glow texture: tiny downscaled copy in the middle band, GPU smoothing = blur.
      if (GLOW_STRENGTH > 0) {
        const gh = 24;
        const gw = Math.round(gh * (CIRCUMFERENCE / GLOW_HEIGHT));
        const gCanvas = document.createElement("canvas");
        gCanvas.width = gw;
        gCanvas.height = gh;
        const gctx = gCanvas.getContext("2d");
        const bandH = gh / GLOW_SPREAD;
        gctx.imageSmoothingQuality = "high";
        gctx.drawImage(canvas, 0, (gh - bandH) / 2, gw, bandH);

        glow = new THREE.CanvasTexture(gCanvas);
        glow.colorSpace = THREE.SRGBColorSpace;
        glow.wrapS = THREE.RepeatWrapping;
        glow.wrapT = THREE.ClampToEdgeWrapping;
        glow.needsUpdate = true;
      }

      setTextures({ main, glow });
    });

    return () => {
      cancelled = true;
      main?.dispose();
      glow?.dispose();
    };
  }, [imageList, gl]);

  return textures;
}

function CylinderMesh({ reducedMotion }) {
  const spinRef = useRef(null);
  const textures = useCylinderTextures(IMAGES);
  const texture = textures?.main;
  const glowTexture = textures?.glow;

  // Flipped copy so images read correctly on the inside wall.
  const innerTexture = useMemo(() => {
    if (!texture) return null;
    const t = texture.clone();
    t.repeat.x = -1;
    t.offset.x = 1;
    t.needsUpdate = true;
    return t;
  }, [texture]);

  useEffect(() => () => innerTexture?.dispose(), [innerTexture]);

  const brightColor = useMemo(
    () => new THREE.Color(IMAGE_BRIGHTNESS, IMAGE_BRIGHTNESS, IMAGE_BRIGHTNESS),
    [],
  );

  useFrame((_, delta) => {
    if (!spinRef.current) return;
    const speed = reducedMotion ? 0.08 : ROTATION_SPEED;
    spinRef.current.rotation.y += Math.min(delta, 0.05) * speed;
  });

  return (
    <group rotation={[0, 0, TILT]}>
      <group ref={spinRef}>
        {texture && innerTexture && (
          <>
            {/* Inside wall */}
            <mesh>
              <cylinderGeometry args={[RADIUS, RADIUS, HEIGHT, 128, 1, true]} />
              <meshBasicMaterial
                map={innerTexture}
                color={INNER_WALL_BRIGHTNESS}
                side={THREE.BackSide}
                toneMapped={false}
              />
            </mesh>

            {/* Outside wall */}
            <mesh renderOrder={1}>
              <cylinderGeometry args={[RADIUS, RADIUS, HEIGHT, 128, 1, true]} />
              <meshBasicMaterial
                map={texture}
                color={brightColor}
                side={THREE.FrontSide}
                toneMapped={false}
              />
            </mesh>

            {/* Image glow: blurred copy of the images in their own colors */}
            {glowTexture && (
              <mesh renderOrder={2}>
                <cylinderGeometry
                  args={[
                    RADIUS + 0.02,
                    RADIUS + 0.02,
                    GLOW_HEIGHT,
                    128,
                    1,
                    true,
                  ]}
                />
                <meshBasicMaterial
                  map={glowTexture}
                  transparent
                  opacity={GLOW_STRENGTH}
                  blending={THREE.AdditiveBlending}
                  depthWrite={false}
                  side={THREE.FrontSide}
                  toneMapped={false}
                />
              </mesh>
            )}
          </>
        )}
      </group>
    </group>
  );
}

/** Keeps the whole cylinder inside the canvas at every screen size and orbit angle. */
function FitCamera() {
  const camera = useThree((s) => s.camera);
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);

  useEffect(() => {
    const aspect = width / Math.max(height, 1);
    const vFov = THREE.MathUtils.degToRad(camera.fov);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
    const limitingFov = Math.min(vFov, hFov);
    const distance = (BOUNDING_RADIUS * FIT_MARGIN) / Math.sin(limitingFov / 2);
    camera.position.setLength(distance);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, width, height]);

  return null;
}

/* ═══════════════════════════ Component ═══════════════════════════ */

const Lastpara = ({ btnAnimation }) => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [canOrbit, setCanOrbit] = useState(false);

  // Pause rendering when the section is off-screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Respect reduced-motion; drag-orbit only for mouse users so touch can still scroll.
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const sync = () => {
      setReducedMotion(motionQuery.matches);
      setCanOrbit(ENABLE_ORBIT && pointerQuery.matches);
    };
    sync();
    motionQuery.addEventListener("change", sync);
    pointerQuery.addEventListener("change", sync);
    return () => {
      motionQuery.removeEventListener("change", sync);
      pointerQuery.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`relative w-full ${SECTION_HEIGHT} ${SECTION_BG}`}
    >
      <style>{`
        @keyframes syntrixMarquee {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0%, 0, 0); }
        }
        .syntrix-marquee-track {
          animation: syntrixMarquee ${MARQUEE_SECONDS}s linear infinite;
          will-change: transform;
        }
        .syntrix-outline {
          color: transparent;
          -webkit-text-stroke: ${MARQUEE_OUTLINE};
        }
        @media (prefers-reduced-motion: reduce) {
          .syntrix-marquee-track {
            animation: none;
            transform: translate3d(-12%, 0, 0);
          }
        }
      `}</style>

      {/* 3D area: stops above the marquee/button so nothing overlaps */}
      <div
        className={`absolute inset-x-0 top-0 ${OVERLAY_SPACE} ${
          canOrbit ? "cursor-grab active:cursor-grabbing" : ""
        }`}
      >
        <Canvas
          className="!absolute inset-0"
          camera={{
            position: [0, CAMERA_HEIGHT, 8],
            fov: CAMERA_FOV,
            near: 0.1,
            far: 100,
          }}
          dpr={[1, 1.75]}
          frameloop={inView ? "always" : "never"}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
        >
          <FitCamera />
          <CylinderMesh reducedMotion={reducedMotion} />

          {/* Zoom is off so the mouse wheel keeps scrolling the page (Lenis) */}
          {canOrbit && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableDamping
              dampingFactor={0.08}
              rotateSpeed={0.6}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.6}
            />
          )}
        </Canvas>
      </div>

      {/* ────────────────────── MARQUEE + BUTTON ────────────────────── */}
      <div className="bg-transparent pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-4 pb-5 sm:gap-6 sm:pb-8">
        {/* Moving statement: solid and outlined words alternate */}
        <div className="w-full overflow-hidden" aria-hidden="true">
          <div className="syntrix-marquee-track flex w-max whitespace-nowrap">
            {[0, 1].map((groupIndex) => (
              <div key={groupIndex} className="flex shrink-0 items-center">
                {MARQUEE_ITEMS.map((item, i) => (
                  <React.Fragment key={`${groupIndex}-${item}`}>
                    <span
                      className={`font-[font1] uppercase leading-none ${MARQUEE_TEXT_SIZE} mx-[3vw] sm:mx-[2vw] ${
                        i % 2 === 0 ? "text-white" : "syntrix-outline"
                      }`}
                    >
                      {item}
                    </span>
                    <span className="text-[1.25rem] leading-none text-white/30 sm:text-[1.6vw]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
                      </svg>{" "}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Your existing button animation */}
        <div className="pointer-events-auto">
          <Link to={CTA_LINK}>
            {btnAnimation ? (
              btnAnimation({ char: CTA_LABEL, key: 1 })
            ) : (
              <span className="rounded-full border border-white/45 px-6 py-3 text-xs uppercase tracking-[0.18em] text-white">
                {CTA_LABEL}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Lastpara;