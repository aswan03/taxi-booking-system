import { Car } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-muted/50 border-t mt-auto">
            <div className="container mx-auto py-8 px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 font-bold text-xl text-primary">
                            <Car className="h-6 w-6" />
                            <span>TaxiGo</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Reliable rides, anytime, anywhere. Experience the comfort of modern travel.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Press</li>
                            <li>Blog</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Help Center</li>
                            <li>Safety</li>
                            <li>Terms of Service</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>support@taxigo.com</li>
                            <li>+1 (555) 123-4567</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} TaxiGo. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
