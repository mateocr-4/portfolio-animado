import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Extend window object for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const Analytics = () => {
  const location = useLocation();
  const gaId = import.meta.env.VITE_GA_ID;
  const isDev = import.meta.env.DEV;

  // 1. Initial Injection of GA4 Script
  useEffect(() => {
    // Evitar cargar si no hay ID o estamos en entorno local
    if (!gaId || isDev) return;

    // Solo cargarlo una vez
    if (document.getElementById('ga4-script')) return;

    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());

  }, [gaId]);

  // 2. Event Listener para Cambio de Ruta (Page Views Dinámicas)
  useEffect(() => {
    if (!gaId || isDev || !window.gtag) return;
    
    // Registramos la vista de página con la ruta del React Router
    window.gtag('config', gaId, {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
    });
  }, [location, gaId]);

  return null;
};
