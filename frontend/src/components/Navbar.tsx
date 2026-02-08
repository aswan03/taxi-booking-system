import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Menu, X, Car } from "lucide-react"
import { api } from "@/services/api"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const isAuth = api.isAuthenticated()

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <Car className="h-6 w-6" />
                    <span>TaxiGo</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                        Home
                    </Link>
                    {isAuth && (
                        <>
                            <Link to="/booking" className="text-sm font-medium hover:text-primary transition-colors">
                                Book a Ride
                            </Link>
                            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                                Dashboard
                            </Link>
                        </>
                    )}
                    <div className="flex items-center gap-4 ml-4">
                        {!isAuth ? (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost" size="sm">
                                        Log In
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button size="sm">Sign Up</Button>
                                </Link>
                            </>
                        ) : (
                            <Link to="/dashboard">
                                <Button size="sm" variant="outline">My Account</Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t p-4 space-y-4 bg-background">
                    <div className="flex flex-col gap-4">
                        <Link
                            to="/"
                            className="text-sm font-medium hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        {isAuth && (
                            <>
                                <Link
                                    to="/booking"
                                    className="text-sm font-medium hover:text-primary transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Book a Ride
                                </Link>
                                <Link
                                    to="/dashboard"
                                    className="text-sm font-medium hover:text-primary transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            </>
                        )}
                        <hr />
                        {!isAuth ? (
                            <>
                                <Link to="/login" onClick={() => setIsOpen(false)}>
                                    <Button variant="ghost" className="w-full justify-start">
                                        Log In
                                    </Button>
                                </Link>
                                <Link to="/register" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full">Sign Up</Button>
                                </Link>
                            </>
                        ) : (
                            <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                                <Button className="w-full" variant="outline">Dashboard</Button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
