import type { Metadata } from "next";
import "./globals.css";
/* eslint-disable @next/next/no-page-custom-font */

export const metadata: Metadata = {
  title: "Bar Christina | Kew East Wine Bar",
  description:
    "A neighbourhood wine bar at 663 High Street, Kew East, Melbourne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400;1,6..96,500&family=Jost:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
