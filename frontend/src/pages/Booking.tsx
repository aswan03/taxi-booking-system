import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, Car } from "lucide-react"
import { api } from "@/services/api"

export default function Booking() {
    const [pickup, setPickup] = useState("")
    const [drop, setDrop] = useState("")
    const [pickTime, setPickTime] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleBooking = async () => {
        setLoading(true)
        setMessage("")
        try {
            // Basic validation and conversion
            // Backend expects single char A-F. We'll just take the first char of input for now to demonstrate.
            const p = pickup.toUpperCase().charAt(0) || 'A';
            const d = drop.toUpperCase().charAt(0) || 'B';

            // Backend expects int time. We'll use the hour from the time input or default to 1.
            const timeParts = pickTime.split(":");
            const time = (timeParts.length > 0 && timeParts[0] !== "") ? parseInt(timeParts[0]) : 1;

            // Random customer ID for demo
            const customerId = Math.floor(Math.random() * 1000) + 1;

            const result = await api.bookTaxi({
                customerId,
                pickup: p,
                drop: d,
                pickTime: time
            });

            setMessage(result);
        } catch (error) {
            setMessage("Failed to book taxi. Please try again.");
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Book a Ride</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Booking Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Where to?</CardTitle>
                        <CardDescription>Enter your pickup and drop-off locations (A-F for demo).</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="pickup" className="text-sm font-medium">Pickup Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="pickup"
                                    placeholder="Location (A, B, C...)"
                                    className="pl-9"
                                    value={pickup}
                                    onChange={(e) => setPickup(e.target.value)}
                                    maxLength={1}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="dropoff" className="text-sm font-medium">Drop-off Location</label>
                            <div className="relative">
                                <Navigation className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="dropoff"
                                    placeholder="Destination (A, B, C...)"
                                    className="pl-9"
                                    value={drop}
                                    onChange={(e) => setDrop(e.target.value)}
                                    maxLength={1}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="date" className="text-sm font-medium">Date</label>
                                <Input id="date" type="date" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="time" className="text-sm font-medium">Time</label>
                                <Input
                                    id="time"
                                    type="time"
                                    value={pickTime}
                                    onChange={(e) => setPickTime(e.target.value)}
                                />
                            </div>
                        </div>

                        {message && (
                            <div className={`p-3 rounded-md text-sm font-medium ${message.includes("allocated") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                {message}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" size="lg" onClick={handleBooking} disabled={loading}>
                            {loading ? "Booking..." : "Find a Ride"}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Map Placeholder */}
                <Card className="h-[400px] md:h-auto bg-muted/20 flex items-center justify-center border-dashed">
                    <div className="text-center text-muted-foreground p-4">
                        <Car className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Map view will be integrated here</p>
                        <p className="text-sm">Google Maps / OpenStreetMap integration</p>
                    </div>
                </Card>
            </div>
        </div>
    )
}
