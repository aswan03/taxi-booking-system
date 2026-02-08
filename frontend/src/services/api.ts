const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8085/api";

export interface BookingRequest {
    customerId: number;
    pickup: string;
    drop: string;
    pickTime: number;
}

export interface Customer {
    customerId: number;
    pickup: string;
    drop: string;
    pickTime: number;
}

export interface Booking {
    bookingId: number;
    dropTime: number;
    charges: number;
    customer: Customer;
}

export interface Taxi {
    taxiId: number;
    currentSpot: string;
    freeTime: number;
    earnings: number;
    bookings: Booking[];
}

export interface AuthRequest {
    email: string;
    username?: string;
    password?: string;
}

export const api = {
    bookTaxi: async (request: BookingRequest): Promise<string> => {
        const response = await fetch(`${API_URL}/book`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        // The backend returns a plain string, so we use text() instead of json()
        return response.text();
    },

    getTaxis: async (): Promise<Taxi[]> => {
        const response = await fetch(`${API_URL}/taxis`);
        if (!response.ok) {
            throw new Error("Failed to fetch taxis");
        }
        return response.json();
    },

    register: async (request: AuthRequest): Promise<string> => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });
        return response.text();
    },

    login: async (request: AuthRequest): Promise<string> => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });
        const text = await response.text();
        if (!response.ok) {
            throw new Error(text || "Login failed");
        }
        // Store auth state in localStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", request.email);
        localStorage.setItem("username", text); // Store the username returned by the backend
        return text;
    },

    logout: () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("username");
    },

    isAuthenticated: (): boolean => {
        return localStorage.getItem("isAuthenticated") === "true";
    },

    getUserEmail: (): string | null => {
        return localStorage.getItem("userEmail");
    },

    getUsername: (): string | null => {
        return localStorage.getItem("username");
    },
};
