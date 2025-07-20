import "./theme.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { FarcasterSDKInitializer } from "../app/components/FarcasterSDK";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}; 

export async function generateMetadata(): Promise<Metadata> {
  const URL = process.env.NEXT_PUBLIC_URL || "https://thou-shalt-cookie.vercel.app";
  
  // Frame configuration optimized for both platforms
  const frameConfig = {
    version: "1",
    imageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE || "https://thou-shalt-cookie.vercel.app/hero.png",
    button: {
      title: "Open Fortune Cookie",
      action: {
        type: "launch_frame",
        name: "Thou Shalt Cookie",
        url: URL,
        splashImageUrl: process.env.NEXT_PUBLIC_SPLASH_IMAGE || "https://thou-shalt-cookie.vercel.app/splash.png",
        splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || "#1e1b4b",
      },
    },
  };

  // TBA-compatible frame config (using "next" version for backward compatibility)
  const tbaFrameConfig = {
    version: "next",
    imageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE || "https://thou-shalt-cookie.vercel.app/hero.png",
    button: {
      title: `Launch ${process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "Thou Shalt Cookie"}`,
      action: {
        type: "launch_frame",
        name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "Thou Shalt Cookie",
        url: URL,
        splashImageUrl: process.env.NEXT_PUBLIC_SPLASH_IMAGE || "https://thou-shalt-cookie.vercel.app/splash.png",
        splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || "#1e1b4b",
      },
    },
  };

  return {
    title: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "Thou Shalt Cookie",
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Crack virtual fortune cookies for hilarious Shakespearean crypto predictions and Web3 wisdom!",
    openGraph: {
      title: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "Thou Shalt Cookie",
      description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Shakespearean crypto fortune cookies with Web3 wisdom and blockchain humor",
      images: process.env.NEXT_PUBLIC_APP_HERO_IMAGE ? [process.env.NEXT_PUBLIC_APP_HERO_IMAGE] : ["https://thou-shalt-cookie.vercel.app/hero.png"],
    },
    other: {
      // Farcaster Mini App meta tag (version "1")
      "fc:miniapp": JSON.stringify(frameConfig),
      // Backward compatibility for both platforms
      "fc:frame": JSON.stringify(tbaFrameConfig),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background">
        <Providers>
          {children}
          <FarcasterSDKInitializer />
        </Providers>
      </body>
    </html>
  );
} 