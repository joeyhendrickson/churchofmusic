import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ChatbotProvider } from "@/context/ChatbotContext";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The United States Church of Music",
  description: "A collection of home churches across the USA where we believe God works through the power of music. Join worship ceremonies, host a Home Group, or discover our beliefs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#ffffff] text-[#1a1a1a] min-h-screen`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <CartProvider>
          <ChatbotProvider>
            <Navbar />
            <main id="main-content">{children}</main>
            <Chatbot />
          </ChatbotProvider>
        </CartProvider>
      </body>
    </html>
  );
}
