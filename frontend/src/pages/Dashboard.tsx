import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreditCard, Loader2, MapPin, Navigation, TrendingUp, Users, Activity } from "lucide-react"
import { api, type Taxi } from "@/services/api"
import { DashboardLayout } from "@/components/DashboardLayout"

export default function Dashboard() {
    const [taxis, setTaxis] = useState<Taxi[]>([]);
    const [loading, setLoading] = useState(true);
    const [pickup, setPickup] = useState("")
    const [drop, setDrop] = useState("")
    const [message, setMessage] = useState("")
    const [bookingLoading, setBookingLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getTaxis();
                setTaxis(data);
            } catch (err) {
                console.error("Failed to load dashboard data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 10000); // Auto-refresh every 10s
        return () => clearInterval(interval);
    }, []);

    const handleQuickBooking = async () => {
        setBookingLoading(true)
        setMessage("")
        try {
            const p = pickup.toUpperCase().charAt(0) || 'A';
            const d = drop.toUpperCase().charAt(0) || 'B';
            const customerId = Math.floor(Math.random() * 1000) + 1;
            const time = new Date().getHours();

            const result = await api.bookTaxi({
                customerId,
                pickup: p,
                drop: d,
                pickTime: time
            });
            setMessage(result);
            // Refresh taxis after booking
            const data = await api.getTaxis();
            setTaxis(data);
        } catch (error) {
            setMessage("Booking failed.");
        } finally {
            setBookingLoading(false)
        }
    }

    const allBookings = taxis.flatMap(t =>
        (t.bookings || []).map(b => ({ ...b, taxiId: t.taxiId }))
    );
    allBookings.sort((a, b) => b.bookingId - a.bookingId);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                        <p className="text-muted-foreground italic">Welcome back, {api.getUsername() || api.getUserEmail() || "User"}. Here's what's happening today.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">Export Data</Button>
                        <Button>Refresh View</Button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Active Fleet"
                        value={taxis.length}
                        description="Taxis currently online"
                        icon={<Activity className="text-blue-500" />}
                        trend="+2 from last hour"
                    />
                    <StatCard
                        title="Total Revenue"
                        value={`$${taxis.reduce((sum, t) => sum + t.earnings, 0)}`}
                        description="Accumulated today"
                        icon={<TrendingUp className="text-green-500" />}
                        trend="+12% vs yesterday"
                    />
                    <StatCard
                        title="Bookings"
                        value={allBookings.length}
                        description="Completed trips"
                        icon={<CreditCard className="text-purple-500" />}
                    />
                    <StatCard
                        title="Total Customers"
                        value={new Set(allBookings.map(b => b.customer.customerId)).size}
                        description="Unique users served"
                        icon={<Users className="text-orange-500" />}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Fleet Status Table */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Fleet Availability</CardTitle>
                            <CardDescription>Real-time status of all registered taxis.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs uppercase bg-muted/50 border-b">
                                        <tr>
                                            <th className="px-4 py-3">Taxi</th>
                                            <th className="px-4 py-3">Location</th>
                                            <th className="px-4 py-3">Status</th>
                                            <th className="px-4 py-3">Free At</th>
                                            <th className="px-4 py-3 text-right">Revenue</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {taxis.map((taxi) => (
                                            <tr key={taxi.taxiId} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                                                <td className="px-4 py-4 font-medium">Taxi-{taxi.taxiId}</td>
                                                <td className="px-4 py-4">Point {taxi.currentSpot}</td>
                                                <td className="px-4 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${taxi.freeTime <= 6 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                                        {taxi.freeTime <= 6 ? 'Available' : 'On Trip'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 font-mono">{taxi.freeTime}:00</td>
                                                <td className="px-4 py-4 text-right font-mono">${taxi.earnings}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Booking Widget */}
                    <div className="space-y-6">
                        <Card className="border-primary/20 shadow-md">
                            <CardHeader>
                                <CardTitle className="text-lg">Quick Allocation</CardTitle>
                                <CardDescription>Instant taxi dispatch</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Pickup (A-F)"
                                            className="pl-9"
                                            value={pickup}
                                            onChange={(e) => setPickup(e.target.value)}
                                            maxLength={1}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="relative">
                                        <Navigation className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Drop (A-F)"
                                            className="pl-9"
                                            value={drop}
                                            onChange={(e) => setDrop(e.target.value)}
                                            maxLength={1}
                                        />
                                    </div>
                                </div>
                                {message && (
                                    <p className={`text-xs p-2 rounded ${message.includes("allocated") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                                        {message}
                                    </p>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={handleQuickBooking} disabled={bookingLoading}>
                                    {bookingLoading ? "Allocating..." : "Dispatch Taxi"}
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">System Health</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <HealthItem label="API Status" status="Healthy" color="bg-green-500" />
                                <HealthItem label="Database" status="Connected" color="bg-green-500" />
                                <HealthItem label="Dispatch Engine" status="Idle" color="bg-blue-500" />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Recent Bookings History */}
                <Card>
                    <CardHeader>
                        <CardTitle>System-wide Bookings</CardTitle>
                        <CardDescription>Consolidated view of all assignments across the fleet.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs uppercase bg-muted/50 border-b">
                                    <tr>
                                        <th className="px-4 py-3">ID</th>
                                        <th className="px-4 py-3">Taxi</th>
                                        <th className="px-4 py-3">User</th>
                                        <th className="px-4 py-3">Route</th>
                                        <th className="px-4 py-3">Fare</th>
                                        <th className="px-4 py-3">Timing</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allBookings.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground italic">No bookings found in history.</td>
                                        </tr>
                                    ) : (
                                        allBookings.slice(0, 10).map((booking) => (
                                            <tr key={booking.bookingId} className="border-b last:border-0 hover:bg-muted/10">
                                                <td className="px-4 py-4 font-mono text-xs">#{booking.bookingId}</td>
                                                <td className="px-4 py-4 font-semibold">T-{booking.taxiId}</td>
                                                <td className="px-4 py-4">UID-{booking.customer.customerId}</td>
                                                <td className="px-4 py-4 text-xs">
                                                    {booking.customer.pickup} <Navigation className="inline h-2 w-2 mx-1" /> {booking.customer.drop}
                                                </td>
                                                <td className="px-4 py-4 font-bold text-green-600">${booking.charges}</td>
                                                <td className="px-4 py-4 text-xs text-muted-foreground">
                                                    {booking.customer.pickTime}:00 - {booking.dropTime}:00
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                    {allBookings.length > 10 && (
                        <CardFooter className="justify-center border-t py-3">
                            <Button variant="ghost" size="sm">View All Bookings</Button>
                        </CardFooter>
                    )}
                </Card>
            </div>
        </DashboardLayout>
    )
}

function StatCard({ title, value, description, icon, trend }: any) {
    return (
        <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center">
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">{description}</p>
                {trend && (
                    <div className="mt-2 text-[10px] font-medium text-green-600 flex items-center gap-1">
                        <TrendingUp size={10} /> {trend}
                    </div>
                )}
            </CardContent>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/10" />
        </Card>
    )
}

function HealthItem({ label, status, color }: any) {
    return (
        <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium">{status}</span>
                <div className={`h-2 w-2 rounded-full ${color}`} />
            </div>
        </div>
    )
}
