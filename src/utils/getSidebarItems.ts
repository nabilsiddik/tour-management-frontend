import { role } from "@/constants/role";
import { adminSidebarRoutes } from "@/routes/adminSidebarRoutes";
import { userSidebarRoutes } from "@/routes/userSidebarRoutes";
import type { TRole } from "@/types";

export const getSidebarItem = (userRole: TRole) => {
    switch(userRole){
        case role.superAdmin:
            return [...adminSidebarRoutes]
        case role.admin:
            return [...adminSidebarRoutes]
        case role.user:
            return [...userSidebarRoutes]
        default:
            return []
    }
}