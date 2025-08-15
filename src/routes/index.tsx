import App from "@/App";
import DashboardLayout from "@/components/layouts/Dashboard/DashboardLayout";
import About from "@/pages/About";
import LoginPage from "@/pages/auth/LoginPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import VerificationPage from "@/pages/auth/VerificationPage";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { adminSidebarRoutes } from "./adminSidebarRoutes";
import { userSidebarRoutes } from "./userSidebarRoutes";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import AllTourTypes from "@/pages/admin/AddTourType";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: 'about',
                Component: withAuth(About)
            }
        ]
    },
    {
        path: '/admin',
        Component: withAuth(DashboardLayout, role.admin as TRole),
        children: [
            {
                index: true,
                element: <Navigate to={'/admin/analytics'} />
            },
            ...generateRoutes(adminSidebarRoutes)
        ]
    },
    {
        path: '/user',
        Component: withAuth(DashboardLayout, role.user as TRole),
        children: [
            {
                index: true,
                element: <Navigate to={'/user/bookings'} />
            },
            ...generateRoutes(userSidebarRoutes)
        ]
    },
    {
        path: '/tour',
        Component: withAuth(AllTourTypes, role.admin as TRole)
    },
    {
        path: '/login',
        Component: LoginPage
    },
    {
        path: '/signup',
        Component: SignUpPage
    },
    {
        path: '/verify',
        Component: VerificationPage
    },
    {
        path: '/unauthorized',
        Component: Unauthorized
    }

])