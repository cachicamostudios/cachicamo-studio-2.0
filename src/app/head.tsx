// src/app/head.tsx
export default function Head() {
  return (
    <>
      <title>Cachicamo Studios – Contenido, Ideas y Tecnología para un Internet Más Creativo</title>
      <meta
        name="description"
        content="Cachicamo Studios: Agencia de creatividad, producción digital y tecnología. YouTube, Web3, blogs y branding con visión global."
      />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:title" content="Cachicamo Studios" />
      <meta
        property="og:description"
        content="Agencia de creatividad, producción digital y tecnología. YouTube, Web3, blogs y branding con visión global."
      />
      <meta property="og:image" content="https://cachicamo.studio/cachicamo-logo.png" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://cachicamo.studio" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Cachicamo Studios" />
      <meta name="twitter:description" content="Agencia de creatividad, producción digital y tecnología." />
      <meta name="twitter:image" content="https://cachicamo.studio/cachicamo-logo.png" />

      {/* Favicons multiplataforma */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </>
  );
}
