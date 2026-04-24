import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: { default: "Safe21.space", template: "%s — Safe21.space" },
  description:
    "Informasi akurat tentang Down Syndrome, panduan terapi, dan komunitas orang tua — semua dalam satu tempat.",
  keywords: ["down syndrome", "safe21 space", "trisomi 21", "komunitas down syndrome", "orang tua DS"],
  openGraph: {
    title: "Safe21.space",
    description: "Tempat aman untuk memahami & merayakan Down Syndrome.",
    type: "website",
    locale: "id_ID",
  },
};

const GA_ID = "G-RNR5YGF2MP";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
