import App from "@/App";
import AdminLayout from "@/components/layouts/AdminLayout";
import DashboardLayout from "@/components/layouts/Dashboard/DashboardLayout";
import About from "@/pages/About";
import Analytics from "@/pages/admin/Analytics";
import LoginPage from "@/pages/auth/LoginPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import VerificationPage from "@/pages/auth/VerificationPage";
import Tours from "@/pages/user/Tours";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router-dom";
import { adminSidebarRoutes } from "./AdminSidebarRoutes";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: 'about',
                Component: About
            },
            {
                path: 'tours',
                Component: Tours
            }
        ]
    },
    {
        path: '/admin',
        Component: DashboardLayout,
        children: [...generateRoutes(adminSidebarRoutes)]
    },
    {
        path: '/user',
        Component: DashboardLayout,
        children: [
            {
                path: 'tours',
                Component: Analytics
            }
        ]
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
    }
    
])