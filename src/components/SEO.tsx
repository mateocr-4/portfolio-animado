import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  imageUrl?: string;
}

export const SEO = ({ title, description, imageUrl }: SEOProps) => {
  const defaultTitle = "Mateo.dev | System & Growth Architect";
  const defaultDescription = "Especialista en desarrollo web con React/Next.js y analítica digital. Construyo soluciones SaaS de alto rendimiento.";
  const defaultImage = "https://mateocanibanoes.vercel.app/og-image.png";
  const url = window.location.href;

  const finalTitle = title ? `Mateo.dev | ${title}` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = imageUrl || defaultImage;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />

      {/* Meta Tags Dinámicos (Open Graph) */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={finalImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
    </Helmet>
  );
};
