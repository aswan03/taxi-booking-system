import { Sidebar } from "./Sidebar"
import { Topbar } from "./Topbar"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen bg-muted/30">
            <Sidebar />
            <div className="flex-grow flex flex-col">
                <Topbar />
                <main className="p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
