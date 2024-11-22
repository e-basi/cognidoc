import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeToggle from "./theme-toggle"; // Import the client component

export const metadata: Metadata = {
  title: "CogniDoc",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="absolute top-4 right-4 z-50">
            <ThemeToggle /> {/* Render the client-side theme toggle */}
          </div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
