import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Eminence Cleaning Company | Where Cleanliness Meets Class",
    template: "%s | Eminence Cleaning Company",
  },
  description:
    "Professional office, residential, carpet, fumigation and specialized cleaning services in Kenya. Book a service with Eminence Cleaning Company.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${manrope.variable} font-body antialiased bg-white text-eminence-black`}>
        {children}
      </body>
    </html>
  );
}