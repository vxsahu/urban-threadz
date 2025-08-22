import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { baseMetadata } from "@/utils/seo";
import StructuredData from "@/components/StructuredData";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/utils/structuredData";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-scope-one',
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <StructuredData data={generateOrganizationSchema()} />
        <StructuredData data={generateWebsiteSchema()} />
      </head>
      <body className="relative">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}