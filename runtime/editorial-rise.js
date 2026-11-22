(async function () {
  const targets = document.querySelectorAll('[data-editorial-rise]');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!targets.length || motion.matches || !('IntersectionObserver' in window)) return;

  const source = new URL('scl-editorial-rise.animation.json', document.currentScript.src);
  try {
    const response = await fetch(source);
    if (!response.ok) return;
    const { frames, duration } = await response.json();

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (!motion.matches) entry.target.animate(frames, { duration: duration * 1000 });
      }
    }, { threshold: 0.15 });

    for (const target of targets) observer.observe(target);
    motion.addEventListener('change', () => {
      if (!motion.matches) return;
      for (const target of targets) {
        for (const animation of target.getAnimations()) animation.cancel();
      }
    });
  } catch (error) {
    console.warn('Editorial rise could not load.', error);
  }
}());
