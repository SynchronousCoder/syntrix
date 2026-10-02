import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const REST_ROTATE_Y = -10;
const REST_ROTATE_X = 4;
const MAX_TILT_Y = 24; // degrees, left/right
const MAX_TILT_X = 18; // degrees, up/down

const REST_SHADOW = "drop-shadow(0px 32px 48px rgba(0,0,0,0.14))";

const FloatingPreview = () => {
  const areaRef = useRef(null); // hover area
  const wrapRef = useRef(null); // ambient float layer (y only)
  const tiltRef = useRef(null); // tilt + scale layer
  const imgRef = useRef(null);  // parallax + shadow layer
  const quick = useRef(null);
  const isHovered = useRef(false);

  useGSAP(
    () => {
      // Perspective is applied directly on the rotating element,
      // so the 3D depth is always visible.
      gsap.set(tiltRef.current, {
        transformPerspective: 1100,
        transformOrigin: "50% 50%",
        rotationY: REST_ROTATE_Y,
        rotationX: REST_ROTATE_X,
      });

      // Ambient float lives on its own element so hover never kills it.
      gsap.to(wrapRef.current, {
        y: -6,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: "sine.inOut",
      });

      const opts = { duration: 0.6, ease: "power3.out" };
      quick.current = {
        rotY: gsap.quickTo(tiltRef.current, "rotationY", opts),
        rotX: gsap.quickTo(tiltRef.current, "rotationX", opts),
        imgX: gsap.quickTo(imgRef.current, "x", opts),
        imgY: gsap.quickTo(imgRef.current, "y", opts),
      };
    },
    { scope: areaRef },
  );

  const handleMouseEnter = (e) => {
    if (e.pointerType && e.pointerType === "touch") return;
    isHovered.current = true;

    gsap.to(tiltRef.current, {
      scale: 1.04,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseMove = (e) => {
    if (!isHovered.current || !quick.current) return;

    const rect = areaRef.current.getBoundingClientRect();
    // Normalised -1 → 1, measured from the center of the hover area.
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    // Mouse on the right  → right edge turns away (rotateY +)
    // Mouse on the bottom → bottom edge turns away (rotateX −)
    quick.current.rotY(REST_ROTATE_Y + nx * MAX_TILT_Y);
    quick.current.rotX(REST_ROTATE_X - ny * MAX_TILT_X);

    // Inner parallax shift for extra depth.
    quick.current.imgX(nx * 16);
    quick.current.imgY(ny * 12);

    // Shadow slides opposite to the tilt, like a real light source.
    gsap.to(imgRef.current, {
      filter: `drop-shadow(${-nx * 26}px ${38 - ny * 16}px 60px rgba(0,0,0,0.28))`,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    isHovered.current = false;

    gsap.to(tiltRef.current, {
      scale: 1,
      duration: 1,
      ease: "power3.out",
      overwrite: "auto",
    });

    if (quick.current) {
      quick.current.rotY(REST_ROTATE_Y);
      quick.current.rotX(REST_ROTATE_X);
      quick.current.imgX(0);
      quick.current.imgY(0);
    }

    gsap.to(imgRef.current, {
      filter: REST_SHADOW,
      duration: 1,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={areaRef}
      className="hidden lg:block absolute right-[1vw] top-[10vh] w-[58vw] h-[70vh] z-[10]"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={wrapRef} className="w-full h-full">
        <div
          ref={tiltRef}
          className="w-full h-full"
          style={{ willChange: "transform" }}
        >
          <img
            ref={imgRef}
            src="https://ik.imagekit.io/m9zi40oov/ogHero.png?updatedAt=1782332189820"
            alt="Syntrix Preview"
            className="w-full h-full object-contain select-none"
            style={{ filter: REST_SHADOW, willChange: "transform, filter" }}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingPreview;