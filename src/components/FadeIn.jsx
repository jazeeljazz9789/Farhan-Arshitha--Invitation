import React, { useState, useEffect, useRef } from 'react';

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 700,
  yOffset = 24,
  threshold = 0.05,
  rootMargin = "0px 0px -20px 0px",
  style = {}
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const currentElem = domRef.current;
    if (!currentElem) return;

    const checkInitialInView = () => {
      const rect = currentElem.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      return rect.top < viewportHeight - 10 && rect.bottom > 10;
    };

    if (checkInitialInView()) {
      requestAnimationFrame(() => setIsVisible(true));
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold, rootMargin });

    observer.observe(currentElem);

    const onScrollOrResize = () => {
      if (checkInitialInView()) {
        setIsVisible(true);
        observer.disconnect();
        window.removeEventListener("scroll", onScrollOrResize);
        window.removeEventListener("resize", onScrollOrResize);
      }
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [threshold, rootMargin]);

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : `translateY(${yOffset}px)`,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform"
      }}
    >
      {children}
    </div>
  );
}
