import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata = {
  title: "Mercury Zimbabwe",
  description:
    "High-performance ICT devices engineered for Africa, built to international standards. Locally assembled with global quality.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#111111",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-mercuryBlack text-white antialiased">
        {children}
      </body>
    </html>
  );
}
