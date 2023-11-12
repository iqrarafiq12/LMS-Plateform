import Sidebar from "./_components/Sidebar"

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-20">
                <Sidebar />
            </div>
            <main className="md:pl-56 h-full">
            {children}
            </main>
        </div>
    )
}