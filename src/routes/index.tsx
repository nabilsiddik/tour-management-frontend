import App from "@/App";
import AdminLayout from "@/components/layouts/AdminLayout";
import About from "@/pages/About";
import Analytics from "@/pages/Analytics";
import LoginPage from "@/pages/auth/Login";
import SignUpPage from "@/pages/auth/SignUp";
import Tours from "@/pages/Tours";
import { createBrowserRouter } from "react-router-dom";

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
        Component: AdminLayout,
        children: [
            {
                path: 'analytics',
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
    }
    
])