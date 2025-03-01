import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import { Toaster } from "sonner";
import QueryProvider from "@/components/QueryProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Issue Tracker",
  description: "Issue Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          {" "}
          <Topbar />
          {children}
        </QueryProvider>

        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
