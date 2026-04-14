import { useEffect, useState } from "react";

export default function useSmoothScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [smooth, setSmooth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smoothing: evita movimientos bruscos
  useEffect(() => {
    const animation = requestAnimationFrame(() => {
      setSmooth((prev) => prev + (scrollY - prev) * 0.1);
    });

    return () => cancelAnimationFrame(animation);
  }, [scrollY]);

  return smooth;
}
