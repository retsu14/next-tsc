"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SessionProvider } from "next-auth/react";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { email } = useUserStore();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (!email && !session?.user) router.push("/login");
  }, [router, email, session]);

  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <div className="md:pl-[20px]">{children}</div>
        </main>
      </SidebarProvider>
    </SessionProvider>
  );
}
