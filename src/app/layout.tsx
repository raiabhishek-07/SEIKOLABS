import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "SEIKO LABS — Build. Code. Create.",
  description: "Hands-on STEM kits designed to turn curiosity into real projects.",
  keywords: ["SEIKO LABS", "STEM kits", "Electronics learning", "Hardware brand", "Robotics"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Premium Typography: Fraunces (Display Serif) + DM Sans (Body) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,700&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        {/* Bootstrap Icons CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body
        className="antialiased min-h-screen flex flex-col justify-between"
        style={{
          backgroundColor: "var(--bg-page)",
          color: "var(--text-primary)",
          fontFamily: "var(--font-body)",
        }}
      >
        <ThemeProvider>
          <AppProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <CartDrawer />
            <Toaster position="bottom-right" richColors />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
