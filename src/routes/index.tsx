import App from "@/App";
import AdminLayout from "@/components/layouts/AdminLayout";
import About from "@/pages/About";
import Analytics from "@/pages/Analytics";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: 'about',
                Component: About
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
    }
])