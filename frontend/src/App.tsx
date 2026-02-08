import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom"
import { api } from "@/services/api"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Booking from "@/pages/Booking"
import Dashboard from "@/pages/Dashboard"
import ProtectedRoute from "@/components/ProtectedRoute"

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

function AppContent() {
  const { pathname } = useLocation()
  const isDashboard = pathname.startsWith("/dashboard")
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isAuthenticated = api.isAuthenticated();

  // Global Access Control: If not authenticated and not on an auth page, redirect to register
  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/register" state={{ from: pathname }} replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/fleet"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/users"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Catch-all for non-existing routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </div>
  )
}

export default App
