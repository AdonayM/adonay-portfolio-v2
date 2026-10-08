// src/components/SEO.jsx
import { Helmet } from 'react-helmet-async'

const SEO = ({
  title = 'Adonay Mussie — Cybersecurity Professional',
  description = 'Portfolio of Adonay Mussie, a cybersecurity professional specializing in Vulnerability Assessment, Penetration Testing, Application Security, and DevSecOps.',
  image = 'https://adonay-portfolio-v2.vercel.app/og-image.png',
  url = 'https://adonay-portfolio-v2.vercel.app',
  type = 'website',
}) => {
  return (
    <Helmet>
      {/* Standard meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Adonay Mussie" />
      <link rel="canonical" href={url} />

      {/* Open Graph — LinkedIn, Facebook, Telegram, WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

export default SEO