import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Sidebar } from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Roadmap from "./pages/Dashboard/Roadmap.jsx";
import Profile from "./pages/Dashboard/Profile/Profile.jsx";
import Recommendation from "./pages/Dashboard/Recommendation.jsx";
import Resources from "./pages/Dashboard/Resources.jsx";
import Performance from "./pages/Dashboard/Performance.jsx";
import Notification from "./pages/Dashboard/Notification.jsx";
import Achievement from "./pages/Dashboard/Achievement.jsx";
import Test from "./pages/Dashboard/Test.jsx";
import Footer from "./components/Footer.jsx";
import PhaseDetails from "./pages/Dashboard/PhaseDetails.jsx";

import LandingPage from "./pages/LandingPage";
import Hero from "./pages/Hero";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register"; // 🔥 added
import { useAuth } from "./AuthContext";
import Task from "./pages/Dashboard/Task.jsx";

// 🔐 PROTECTED ROUTE
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// 🌍 PUBLIC ROUTE (prevent logged-in user from seeing login)
const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const DashboardLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-[#eff3f6] overflow-hidden relative">
      <div className="flex flex-1 overflow-hidden relative ">
        <div className="w-60 bg-white p-4 shadow-lg h-full hidden md:block">
          <Sidebar />
        </div>

        <div className="flex-1 backdrop-blur-md rounded-lg overflow-y-auto p-0 md:p-3">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/resources/:id" element={<Resources />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/achievements" element={<Achievement />} />
            <Route path="/test" element={<Test />} />
            <Route path="/task" element={<Task />} />
            <Route path="/phase/:phaseId" element={<PhaseDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const LandingLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/main" element={<Main />} />

          {/* 🔥 PUBLIC ROUTES */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

const App = () => {
  const { user } = useAuth();

  useEffect(() => {
    const handleContextMenu = (event) => event.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* 🔐 PROTECTED DASHBOARD */}
        <Route
          path="/*"
          element={
            user ? (
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            ) : (
              <LandingLayout />
            )
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
