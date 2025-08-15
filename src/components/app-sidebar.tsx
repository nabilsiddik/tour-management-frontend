"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "./ui/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { getSidebarItem } from "@/utils/getSidebarItems"
import LogoIcon from "@/assets/icons/LogoIcon"
import { Link } from "react-router-dom"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data } = useUserInfoQuery(undefined)
  const sidebarData = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: getSidebarItem(data?.data?.role)
  }



  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link to='/'>
          <div className="flex items-center gap-3 px-2">
            <LogoIcon width='45px' height='45px' />
            <h3 className="font-bold text-2xl">Tour Hobe</h3>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
