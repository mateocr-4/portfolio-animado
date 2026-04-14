import useSmoothScroll from "../hooks/useSmoothScroll";

export default function ScrollParallax({ children, strength = 0.05 }) {
  const y = useSmoothScroll();

  // Movimiento calculado
  const translateY = -(y * strength);

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        transition: "transform 0.05s linear",
      }}
    >
      {children}
    </div>
  );
}
