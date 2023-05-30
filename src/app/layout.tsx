import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import SupabaseProvider from "./supabase-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Clinic Manager",
  description: "A simple and easy to use clinic management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("bg-white text-zinc-900 antialiased", inter.className)}
    >
      <body className="min-h-screen bg-zinc-50 dark:bg-zinc-900 antialiased">
        <SupabaseProvider>
          <Providers>
            {/* @ts-expect-error Server Component*/}
            <Navbar />
            <Toaster position="bottom-right" />
            <div className="relative h-screen flex -items-center justify-center overflow-x-hidden">
              <div className="container max-w-7xl  mx-auto  w-full h-full">
                {children}
              </div>
            </div>
          </Providers>

          {/* Allow for more height on mobile devices */}
          <div className="h-40 md:hidden" />
        </SupabaseProvider>
      </body>
    </html>
  );
}
