import { useEffect, useRef, useState } from "react";

const useScrollReveal = (threshold = 0.05) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setIsVisible(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );
    observer.observe(el);

    // Fallback: force visibility after 600ms so content is never hidden
    const timer = setTimeout(() => setIsVisible(true), 600);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [threshold]);

  return { ref, isVisible };
};

export default useScrollReveal;
