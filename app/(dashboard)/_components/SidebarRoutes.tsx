'use client'

import { Layout,Compass } from "lucide-react"
import SidebarRouteItems from "./SidebarRouteItem"

const guestRoutes = [
    {
        label: 'Dashboard',
        href: '/',
        icon: Layout
    },
    {
        label: 'Browse',
        href: '/search',
        icon: Compass
    }
]

const SidebarRoutes = () => {
    const routes = guestRoutes

  return (
    <div className="flex flex-col w-full">
        {routes.map(route => (
            <SidebarRouteItems key={route.label} {...route}/>
        ))}
    </div>
  )
}

export default SidebarRoutes