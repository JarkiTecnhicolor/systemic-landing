'use client';

import { useEffect, useRef, useState } from 'react';

// Module-level singleton: one IntersectionObserver shared across all
// AnimateOnScroll instances instead of 40+ separate observers. On iOS Safari,
// dozens of observers all firing after a layout shift (e.g. body unlock when
// closing the mobile menu) caused stalls — one observer is much cheaper.
type Callback = () => void;
const callbacks = new WeakMap<Element, Callback>();
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const cb = callbacks.get(entry.target);
        if (cb) {
          cb();
          callbacks.delete(entry.target);
          observer!.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.1 }
  );
  return observer;
}

export default function AnimateOnScroll({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    callbacks.set(el, () => setVisible(true));
    getObserver().observe(el);
    return () => {
      callbacks.delete(el);
      getObserver().unobserve(el);
    };
  }, []);

  return (
    <div ref={ref} className={`${visible ? 'aos-visible' : 'aos-hidden'} ${className}`}>
      {children}
    </div>
  );
}
