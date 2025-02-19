"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (status === "loading") return;

  //   if (!session?.user) router.push("/login");
  // }, [router, session]);

  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <main>
          {/* <SidebarTrigger /> */}
          <div className="md:p-[20px]">{children}</div>
        </main>
      </SidebarProvider>
    </SessionProvider>
  );
}
