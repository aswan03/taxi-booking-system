import { Search, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/services/api"

export function Topbar() {
    const userDisplayName = api.getUsername() || api.getUserEmail() || "Guest"

    return (
        <header className="h-16 border-b bg-card px-8 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-4 w-1/3">
                <div className="relative w-full max-w-sm hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search system..."
                        className="pl-10 bg-muted/50 border-none focus-visible:ring-primary"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell size={20} className="text-muted-foreground" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
                </Button>

                <div className="h-8 w-px bg-border mx-2" />

                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium">{userDisplayName}</p>
                        <p className="text-xs text-muted-foreground">Registered User</p>
                    </div>
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-2 border-primary/20">
                        <User size={20} />
                    </Button>
                </div>
            </div>
        </header>
    )
}
