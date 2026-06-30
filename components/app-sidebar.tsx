"use client";

import {
  BarChart3,
  BookOpen,
  MessageSquare,
  Settings,
  Trophy,
} from "lucide-react";
import type { ComponentProps } from "react";
import { CourseSwitcher } from "@/components/course-switcher";
import { Icons } from "@/components/icons";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import type { Session } from "@/lib/auth-client";

const data = {
  courses: [
    {
      name: "Spanish",
      logo: <Icons.spain className="size-4" />,
    },
    {
      name: "French",
      logo: <Icons.france className="size-4" />,
    },
    {
      name: "German",
      logo: <Icons.germany className="size-4" />,
    },
  ],
  navMain: [
    {
      title: "Lessons",
      url: "#",
      icon: <BookOpen className="size-4" />,
      isActive: true,
      items: [
        {
          title: "My Lessons",
          url: "#",
        },
        {
          title: "Saved",
          url: "#",
        },
        {
          title: "Continue",
          url: "#",
        },
      ],
    },
    {
      title: "Progress",
      url: "#",
      icon: <BarChart3 className="size-4" />,
      items: [
        {
          title: "Stats",
          url: "#",
        },
        {
          title: "Milestones",
          url: "#",
        },
        {
          title: "Achievements",
          url: "#",
        },
      ],
    },
    {
      title: "Achievements",
      url: "#",
      icon: <Trophy className="size-4" />,
      items: [
        {
          title: "Badges",
          url: "#",
        },
        {
          title: "Streaks",
          url: "#",
        },
        {
          title: "Leaderboard",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: <Settings className="size-4" />,
      items: [
        {
          title: "Account",
          url: "#",
        },
        {
          title: "Preferences",
          url: "#",
        },
        {
          title: "Notifications",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Active Conversations",
      url: "#",
      icon: <MessageSquare className="size-4" />,
    },
    {
      name: "Bookmarked",
      url: "#",
      icon: <BookOpen className="size-4" />,
    },
    {
      name: "Completed",
      url: "#",
      icon: <Trophy className="size-4" />,
    },
  ],
};

export function AppSidebar({
  session,
  ...props
}: { session: Session | null } & ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CourseSwitcher courses={data.courses} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        {session && (
          <NavUser
            user={{
              name: session.user.name,
              email: session.user.email,
              avatar:
                session.user.image ||
                `https://avatar.vercel.sh/${session.user.email}`,
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
