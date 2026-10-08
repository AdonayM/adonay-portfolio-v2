// src/components/SEO.jsx
import { Helmet } from 'react-helmet-async'

const SEO = ({
  title = 'Adonay Mussie | Cybersecurity Professional',
  description = 'Portfolio of Adonay Mussie, a cybersecurity professional specializing in VAPT, application security, and DevSecOps.',
  image = 'https://adonay-portfolio-v2.vercel.app/profile/adonay.jpg',
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

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  )
}

export default SEO