import AddDivision from "@/pages/admin/AddDivision";
import AddTour from "@/pages/admin/AddTour";
import AddTourType from "@/pages/admin/AddTourType";
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
        title: 'Add Tour Type',
        url: '/admin/tour-types',
        component: AddTourType
      },
      {
        title: "Add Tour",
        url: '/admin/add-tour',
        component: AddTour
      }
    ],
  },
  {
    title: "Division Management",
    url: "/admin",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: 'Add Division',
        url: '/admin/add-division',
        component: AddDivision
      }
    ],
  }
]