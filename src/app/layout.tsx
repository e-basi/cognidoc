import type { Metadata } from "next";
import "./globals.css";
import {  
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton } from '@clerk/nextjs'

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
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}