import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeToggle from "./theme-toggle";
import {Toaster} from 'react-hot-toast'
import Providers from "@/components/ui/Providers";


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
        <Providers>
          {children}
          <Toaster/>
        </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
