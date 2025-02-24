"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/store/store";

// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { useSession } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const router = useRouter();
  // const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (status === "loading") return;

  //   if (!session?.user) router.push("/login");
  // }, [router, session]);

  return (
    <Provider store={store}>
      <SessionProvider>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <div className="block md:hidden">
              <SidebarTrigger />
            </div>
            <div className="md:p-[20px]">{children}</div>
          </main>
        </SidebarProvider>
      </SessionProvider>
    </Provider>
  );
}
