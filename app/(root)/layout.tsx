"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Toaster } from "@/components/ui/toaster";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full bg-gray-100">
            <div className="block md:hidden">
              <SidebarTrigger />
            </div>
            <div className="md:p-[20px]">{children}</div>
            <Toaster />
          </main>
        </SidebarProvider>
      </SessionProvider>
    </Provider>
  );
}
