import { BookOpenIcon, InfoIcon, LifeBuoyIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Logo from "@/assets/icons/Logo"
import { ModeToggle } from "./ModeToggler"
import { Link, NavLink } from "react-router-dom"
import { Button } from "../ui/button"
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hook"
import { role } from "@/constants/role"

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  {
    href: "/",
    label: "Home",
    role: 'PUBLIC'
  },
  {
    label: "About",
    submenu: false,
    type: "icon",
    href: '/about',
    role: 'PUBLIC'
  },
  {
    label: "Admin",
    submenu: false,
    type: "icon",
    href: '/admin',
    role: role.admin
  },
  {
    label: "User",
    submenu: false,
    type: "icon",
    href: '/user',
    role: role.admin
  },
  // {
  //   label: "Features",
  //   submenu: true,
  //   type: "description",
  //   items: [
  //     {
  //       href: "#",
  //       label: "Components",
  //       description: "Browse all components in the library.",
  //     },
  //     {
  //       href: "#",
  //       label: "Documentation",
  //       description: "Learn how to use the library.",
  //     },
  //     {
  //       href: "#",
  //       label: "Templates",
  //       description: "Pre-built layouts for common use cases.",
  //     },
  //   ],
  // },
  {
    label: "Auth",
    submenu: true,
    type: "simple",
    items: [
      { href: "/login", label: "Login" },
      { href: "/signup", label: "Signup" }
    ],
  },
]

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined)
  const [logout] = useLogoutMutation(undefined)
  const dispatch = useAppDispatch()


  // Log out user
  const handleLogout = async () => {
    await logout(undefined)
    dispatch(authApi.util.resetApiState())
  }

  return (
    <header className="border-b container mx-auto px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      {link.submenu ? (
                        <>
                          <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                            {link.label}
                          </div>
                          <ul>
                            {link.items && link.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <NavLink to={item.href}>
                                  {item.label}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <NavLink to={link.href || '#'}>
                          {link.label}
                        </NavLink>
                      )}
                      {index < navigationLinks.length - 1 &&
                        ((!link.submenu &&
                          navigationLinks[index + 1].submenu) ||
                          (link.submenu &&
                            !navigationLinks[index + 1].submenu) ||
                          (link.submenu &&
                            navigationLinks[index + 1].submenu &&
                            link.type !== navigationLinks[index + 1].type)) && (
                          <div
                            role="separator"
                            aria-orientation="horizontal"
                            className="bg-border -mx-1 my-1 h-px w-full"
                          />
                        )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>


          {/* Main nav */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-primary hover:text-primary/90">
              <Logo />
            </a>
            {/* Navigation menu */}
            <NavigationMenu viewport={false} className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <>
                    {/* public routes  */}
                    {link.role === 'PUBLIC' &&
                      <NavigationMenuItem key={index}>
                        {link.submenu ? (
                          <>
                            <NavigationMenuTrigger className="text-muted-foreground hover:text-primary bg-transparent px-2 py-1.5 font-medium *:[svg]:-me-0.5 *:[svg]:size-3.5">
                              {link.label}
                            </NavigationMenuTrigger>
                          </>
                        ) : (
                          <NavLink className='text-muted-foreground hover:text-primary bg-transparent px-2 py-1.5 font-medium' to={link.href || '#'}>
                            {link.label}
                          </NavLink>
                        )}
                      </NavigationMenuItem>
                    }

                    {link.role === data?.data?.role &&
                      <NavigationMenuItem key={index}>
                        {link.submenu ? (
                          <>
                            <NavigationMenuTrigger className="text-muted-foreground hover:text-primary bg-transparent px-2 py-1.5 font-medium *:[svg]:-me-0.5 *:[svg]:size-3.5">
                              {link.label}
                            </NavigationMenuTrigger>
                          </>
                        ) : (
                          <NavLink className='text-muted-foreground hover:text-primary bg-transparent px-2 py-1.5 font-medium' to={link.href || '#'}>
                            {link.label}
                          </NavLink>
                        )}
                      </NavigationMenuItem>
                    }
                  </>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          {data?.data?.email ?
            <Button onClick={handleLogout} size="sm" className="text-sm text-foreground cursor-pointer">
              Logout
            </Button>
            :
            <Link to='/login'>
              <Button size="sm" className="text-sm text-foreground cursor-pointer">
                Login
              </Button>
            </Link>
          }
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
