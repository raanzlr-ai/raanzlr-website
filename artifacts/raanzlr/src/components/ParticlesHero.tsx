import React, { useEffect, useMemo, useState } from "react";
import { Particles } from "@tsparticles/react";
import { useTheme } from "next-themes";

type ParticlesHeroProps = {
  id?: string;
  count?: number;
  themeColors?: string[];
};

const ParticlesHero = ({
  id = "tsparticles-home",
  count = 50,
  themeColors = ["#00F0FF", "#2563EB", "#ffffff"]
}: ParticlesHeroProps) => {
  const { resolvedTheme } = useTheme();
  // next-themes returns `undefined` for resolvedTheme until after mount. If we
  // let the canvas initialize during that window it uses the dark palette, whose
  // bright cyan/white dots are invisible on the light surface — and tsParticles
  // will not recolor an already-created container. So we gate on mount and, via
  // the theme-based `key` below, force a fresh canvas whenever the theme changes.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isLight = resolvedTheme === "light";

  // Memoize options to prevent lag and unnecessary canvas re-draws
  const particleOptions = useMemo(() => {
    // The bright cyan/white dots & links vanish on the light grey surface, so on
    // light theme use deep, saturated ink tones. The greys/cyans that read fine
    // on the near-black dark surface are almost invisible on light, so we swap in
    // darker navy/teal, and push link opacity, dot opacity, size and link width
    // up so the neuron field is clearly visible against the light background.
    const dotColors = isLight ? ["#075985", "#1E3A8A", "#0E7490"] : themeColors;
    const linkColor = isLight ? "#0C566B" : "#00F0FF";
    const linkOpacity = isLight ? 0.7 : 0.18;
    const linkWidth = isLight ? 1.5 : 1;

    return {
      fullScreen: { enable: false }, // Crucial so it doesn't cover the entire page
      background: { color: { value: "transparent" } },
      fpsLimit: 45, // Cap FPS at 45 to prevent heavy GPU usage on mobile/low-end laptops
      detectRetina: true,
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: true, mode: "push" },
        },
        modes: {
          grab: { distance: 150, links: { opacity: 0.5 } },
          push: { quantity: 1 },
        },
      },
      particles: {
        color: { value: dotColors },
        links: {
          enable: true,
          color: linkColor,
          distance: 120,
          opacity: linkOpacity,
          width: linkWidth,
        },
        move: {
          enable: true,
          speed: 0.5,
          outModes: { default: "bounce" as const },
        },
        number: { value: count, density: { enable: true, area: 900 } },
        // Stronger, larger dots on light so the neuron field stays visible.
        opacity: { value: isLight ? { min: 0.85, max: 1 } : { min: 0.3, max: 0.8 } },
        shape: { type: "circle" },
        size: { value: isLight ? { min: 1.6, max: 3.2 } : { min: 0.5, max: 2 } },
      },
    };
  }, [count, themeColors, isLight]);

  // Hold rendering until the theme is known, so the canvas never inits with the
  // wrong palette.
  if (!mounted) return null;

  return (
    <Particles
      key={`${id}-${resolvedTheme ?? "system"}`}
      id={id}
      options={particleOptions}
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default React.memo(ParticlesHero);
