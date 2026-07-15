import { useEffect, useRef, useState } from 'react';

export function MobileMotionStory() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduceMotion) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: '0px 0px -15% 0px' },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad || reduceMotion) return undefined;

    if (isInView) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
    return undefined;
  }, [isInView, reduceMotion, shouldLoad]);

  return (
    <div ref={sectionRef} className="relative mt-12 border-y border-white/5 bg-[#070604] px-5 py-12 md:hidden" aria-labelledby="motion-story-title">
      <div className="mx-auto max-w-md overflow-hidden border border-[#CFA34A]/25 bg-[#0f0e0b]">
        <div className="relative aspect-[9/12] overflow-hidden bg-[#090806]">
          {reduceMotion ? (
            <img
              src="/images/optimized/mobile-motion-poster.webp"
              alt="Homem mantendo postura calma antes de responder"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              width="540"
              height="960"
            />
          ) : shouldLoad ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
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
          ) : (
            <div className="h-full w-full animate-pulse bg-[linear-gradient(145deg,#191611,#090806)] motion-reduce:animate-none" aria-hidden="true" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,6,4,.08)_35%,rgba(7,6,4,.92)_100%)]" />
          <div className="pointer-events-none absolute inset-x-5 bottom-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#CFA34A]">Menos impulso. Mais presença.</p>
            <h2 id="motion-story-title" className="mt-2 text-2xl font-black uppercase leading-tight text-[#f4ead8]">A mudança começa no intervalo entre sentir e reagir.</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
