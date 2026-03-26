import React from 'react';
import { Helmet } from 'react-helmet-async';

function SEO({ 
  title, 
  description, 
  name = "Mova Mobility", 
  type = "website",
  image = "/assets/images/logo.png"
}) {
  const pageTitle = `${title} | ${name}`;

  return (
    <Helmet>
      {/* Standard */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={pageTitle} />

      {/* Twitter */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

export default SEO;