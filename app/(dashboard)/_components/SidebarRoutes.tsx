'use client'

import { Layout,Compass, List, BarChart } from "lucide-react"
import SidebarRouteItems from "./SidebarRouteItem"
import {usePathname} from 'next/navigation'

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
const teacherRoutes = [
    {
        label: 'Courses',
        href: '/teacher/courses',
        icon: List
    },
    {
        label: 'Analytics',
        href: '/teacher/analytics',
        icon: BarChart
    }
]

const SidebarRoutes = () => {
    const pathname = usePathname()
    const isTeacherPage = pathname?.startsWith('/teacher') // Checking if the pathname starts with '/teacher' then it is a teacher page.
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
        {routes.map(route => (
            <SidebarRouteItems key={route.label} {...route}/>
        ))}
    </div>
  )
}

export default SidebarRoutes