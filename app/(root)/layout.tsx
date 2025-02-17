import Home from "./page";
import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="lg:px-[30px]">
      <SessionProvider>
        <Navbar />
      </SessionProvider>
      {children}
    </main>
  );
}
