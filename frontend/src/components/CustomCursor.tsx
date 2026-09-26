import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supportsCustomCursor = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsCustomCursor || prefersReducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const moveCursor = (event: MouseEvent) => {
      const position = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      dot.style.transform = position;
      ring.style.transform = position;
      ring.dataset.visible = "true";
      dot.dataset.visible = "true";
      const target = event.target;
      ring.dataset.hover = target instanceof Element && target.closest("a, button, input, textarea") ? "true" : "false";
    };

    const hideCursor = () => {
      ring.dataset.visible = "false";
      dot.dataset.visible = "false";
    };

    const showCursor = () => {
      dot.dataset.visible = "true";
      ring.dataset.visible = "true";
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("mouseenter", showCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", hideCursor);
      document.removeEventListener("mouseenter", showCursor);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
