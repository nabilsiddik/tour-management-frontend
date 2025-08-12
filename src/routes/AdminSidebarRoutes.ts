import AddTour from "@/pages/admin/AddTour";
import AddTourType from "@/pages/admin/AddTourType";
import AllTourTypes from "@/pages/admin/AllTourTypes";
import { SquareTerminal } from "lucide-react";
import { lazy } from "react";
const Analytics = lazy(() => import('@/pages/admin/Analytics'))

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
        },
        {
          title: 'All Tour Types',
          url: '/admin/tour-types',
          component: AllTourTypes
        }
      ],
    }
  ]