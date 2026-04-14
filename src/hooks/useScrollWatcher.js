
// src/hooks/useScrollWatcher.js

import { useState, useEffect } from 'react';

/**
 * Hook personalizado para detectar si el usuario ha hecho scroll más allá de un umbral específico.
 * Se usa para cambiar estilos de la Navbar.
 * @param {number} threshold - La distancia en píxeles para considerar que se ha "scrolleado".
 * @returns {boolean} - true si el scrollY es mayor que el umbral.
 */
export const useScrollWatcher = (threshold = 10) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    // Agregar el listener al montar el componente
    window.addEventListener('scroll', handleScroll);
    
    // Limpiar el listener al desmontar el componente (buena práctica)
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
};