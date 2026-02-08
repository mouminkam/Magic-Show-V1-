import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Toast from "../components/ui/Toast";
import DecorativeCircles from "../components/ui/DecorativeCircles";
import { getLanguage } from "../lib/getLanguage";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "../components/GoogleAnalytics";

import "./globals.css";

export default async function RootLayout({ children }) {
  // Read language from cookies on Server Side
  const lang = await getLanguage();

  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <link rel="manifest" href="/manifest.json" />
        <title>Magic Show - Jewelry E-commerce</title>
        <meta name="description" content="Jewelry E-commerce Website" />
        
        {/* Leaflet CSS */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />

        {/* Google Fonts */}
        {/* <link
          href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=optional"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:700&display=optional"
          rel="stylesheet"
        /> */}
      </head>

      <body suppressHydrationWarning>
        {/* <DecorativeCircles /> */}
        <Header lang={lang} />
        <main id="main" role="main">
          {children}
        </main>
        <Footer />
        <Toast />
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
