import { Geist, Geist_Mono } from "next/font/google";

// Shared by both root layouts and the global 404. next/font downloads the fonts
// at build time and serves them from this domain: no request to Google at runtime.
export const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
export const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const fontClasses = `${geistSans.variable} ${geistMono.variable}`;
