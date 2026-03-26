import React from 'react';
import { Helmet } from 'react-helmet-async';

function SEO({ title, description, name = "Mova Mobility", type = "website" }) {
  // Concaténer en une seule chaîne de caractères pour éviter les bugs de Helmet
  const pageTitle = `${title} | ${name}`;

  return (
    <Helmet>
      {/* Balises standards */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />

      {/* Balises Open Graph (Facebook, LinkedIn) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      
      {/* Balises Twitter */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}

export default SEO;