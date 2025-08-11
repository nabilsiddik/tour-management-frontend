import AddTour from "@/pages/admin/AddTour";
import AddTourType from "@/pages/admin/AddTourType";
import Analytics from "@/pages/admin/Analytics";
import { SquareTerminal } from "lucide-react";

export const adminSidebarRoutes = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Analytics",
          url: "/admin/analytics",
          component: Analytics
        }
      ],
    },
    {
      title: "Tour Management",
      url: "/admin",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Add Tour Type",
          url: "/admin/add-tour-type",
          component: AddTourType
        },
        {
            title: "Add Tour",
            url: '/admin/add-tour',
            component: AddTour
        }
      ],
    }
  ]