"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { useUserStore } from "@/store/useUserStore";
import { signOut, useSession } from "next-auth/react";
import { teams, navMain } from "@/lib/sidebarData";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const { email, name, clearUser } = useUserStore();

  const userData = {
    name: session?.user?.name || name,
    email: session?.user?.email || email,
    avatar: session?.user?.image || "/trustwing.webp",
  };

  const handleLogout = () => {
    if (email) clearUser();
    else signOut();
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} clearUser={handleLogout} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
