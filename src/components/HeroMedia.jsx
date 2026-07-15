import { useEffect, useState } from 'react';

function StaticHero() {
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet="/images/optimized/hero-mobile.webp" />
      <img
        src="/images/optimized/hero-desktop.webp"
        alt="Homem em ambiente escuro com presença séria"
        className="absolute inset-0 h-full w-full object-cover object-center md:object-[68%_center] lg:object-contain lg:object-right"
        width="1672"
        height="941"
        fetchPriority="high"
        decoding="async"
      />
    </picture>
  );
}

export function HeroMedia({ mode = 'static' }) {
  const [reduceMotion, setReduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  if (mode !== 'cinematic' || reduceMotion) return <StaticHero />;

  return (
    <video
      className="absolute inset-0 h-full w-full object-cover object-center md:left-auto md:right-0 md:w-[58%] md:object-contain md:object-right"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/images/optimized/mobile-motion-poster.webp"
      aria-label="Cena curta representando calma e presença"
    >
      <source src="/images/optimized/mobile-presence-motion.mp4" type="video/mp4" />
    </video>
  );
}
