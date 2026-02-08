import { Link, useLocation, useNavigate } from "react-router-dom"
import { api } from "@/services/api"
import {
    LayoutDashboard,
    CalendarPlus,
    Car,
    User,
    Home,
    LogOut,
    ChevronLeft,
    ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
    { icon: CalendarPlus, label: "New Booking", path: "/booking" },
    { icon: Car, label: "Fleet Status", path: "/dashboard/fleet" },
    { icon: User, label: "Users", path: "/dashboard/users" },
    { icon: Home, label: "Landing Page", path: "/" },
]

export function Sidebar() {
    const location = useLocation()
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false)

    const handleLogout = () => {
        api.logout()
        navigate("/")
    }

    return (
        <aside
            className={cn(
                "flex flex-col h-screen bg-card border-r transition-all duration-300 ease-in-out sticky top-0 left-0",
                collapsed ? "w-20" : "w-64"
            )}
        >
            <div className="p-6 flex items-center justify-between">
                {!collapsed && <span className="text-2xl font-bold text-primary">TaxiGo</span>}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className="ml-auto"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </Button>
            </div>

            <nav className="flex-grow px-3 space-y-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                            location.pathname === item.path
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        <item.icon size={20} />
                        {!collapsed && <span className="font-medium">{item.label}</span>}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t space-y-2">
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors justify-start font-normal",
                        collapsed && "justify-center px-0"
                    )}
                    onClick={handleLogout}
                >
                    <LogOut size={20} />
                    {!collapsed && <span className="font-medium">Logout</span>}
                </Button>
            </div>
        </aside>
    )
}
