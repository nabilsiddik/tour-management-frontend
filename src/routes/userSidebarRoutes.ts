import Bookings from "@/pages/user/Bookings";
import { SquareTerminal } from "lucide-react";

export const userSidebarRoutes = [
    {
      title: "History",
      url: "/user",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Bookings",
          url: "/user/bookings",
          component: Bookings
        }
      ],
    }
  ]