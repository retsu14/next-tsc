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
import { useSession } from "next-auth/react";
import { teams, navMain, dashboard } from "@/lib/sidebarData";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const { email, name, avatar } = useUserStore();

  interface userData {
    name: string | null;
    email: string | null;
    avatar: string | null;
  }

  const userData: userData = {
    name: session?.user?.name || name,
    email: session?.user?.email || email,
    avatar: avatar || session?.user?.image || "/trustwing.webp",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} dashboard={dashboard} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
