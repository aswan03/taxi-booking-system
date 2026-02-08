import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Shield, Euro } from "lucide-react"
import { Link } from "react-router-dom"

import { api } from "@/services/api"

export default function Home() {
    const isAuth = api.isAuthenticated()

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 px-4 md:py-32 bg-gradient-to-br from-primary/90 to-primary text-primary-foreground overflow-hidden">
                <div className="container mx-auto relative z-10">
                    <div className="max-w-2xl space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                            Your Ride, Your Way
                            <span className="block text-primary-foreground/80">Anytime, Anywhere.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-primary-foreground/80">
                            Experience the future of transportation with TaxiGo. reliable rides at the tap of a button.
                            Professional drivers, premium comfort, and transparent pricing.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {isAuth ? (
                                <Link to="/dashboard">
                                    <Button size="lg" variant="secondary" className="font-semibold text-lg px-8">
                                        Go to Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link to="/booking">
                                        <Button size="lg" variant="secondary" className="font-semibold text-lg px-8">
                                            Book Now
                                        </Button>
                                    </Link>
                                    <Link to="/dashboard">
                                        <Button size="lg" variant="outline" className="font-semibold text-lg px-8 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                                            View Dashboard
                                        </Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button size="lg" variant="ghost" className="font-semibold text-lg px-8 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Abstract shapes/background elements could go here */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-full bg-accent/10 blur-3xl rounded-full -mr-20 pointer-events-none" />
            </section>

            {/* Features Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold">Why Choose TaxiGo?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            We prioritize your safety and comfort. See what makes us the preferred choice for thousands of passengers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            icon={<MapPin className="h-10 w-10 text-primary" />}
                            title="Wide Coverage"
                            description="Available in over 50 cities worldwide. We are where you need us to be."
                        />
                        <FeatureCard
                            icon={<Clock className="h-10 w-10 text-primary" />}
                            title="Fast Pickup"
                            description="Get picked up within minutes. Our smart dispatch system ensures minimal wait times."
                        />
                        <FeatureCard
                            icon={<Shield className="h-10 w-10 text-primary" />}
                            title="Safe & Secure"
                            description="Verified drivers and real-time trip tracking for your peace of mind."
                        />
                        <FeatureCard
                            icon={<Euro className="h-10 w-10 text-primary" />}
                            title="Transparent Pricing"
                            description="Know your fare before you ride. No hidden charges or surge pricing surprises."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 text-center">
                    <Card className="max-w-4xl mx-auto bg-card border-none shadow-lg overflow-hidden">
                        <div className="p-12 space-y-6">
                            <h2 className="text-3xl font-bold">Ready to Get Moving?</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Join thousands of satisfied riders. Download the app or book online today.
                            </p>
                            <Link to="/booking">
                                <Button size="lg" className="mt-4">
                                    Book Your Ride
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="mb-4">{icon}</div>
                <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}
