import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import Dashboard from "./pages/Dashboard";
import {
  isAdminAuthenticated,
  setAdminAuthenticated,
} from "./adminData";

interface AdminControllerProps {
  defaultView?: "login" | "forget-password" | "dashboard";
}

const AdminController: React.FC<AdminControllerProps> = ({ defaultView }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine initial view based on URL path or prop
  const getInitialView = (): "login" | "forget-password" | "dashboard" => {
    if (defaultView) return defaultView;
    const path = location.pathname.toLowerCase();
    if (path.includes("forget-password") || path.includes("forgot-password")) {
      return "forget-password";
    }
    if (path.includes("login")) {
      return "login";
    }
    // If accessing /admin or /admin/dashboard
    if (isAdminAuthenticated()) {
      return "dashboard";
    }
    return "login";
  };

  const [currentView, setCurrentView] = useState<"login" | "forget-password" | "dashboard">(getInitialView);

  // Sync with URL changes
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("forget-password") || path.includes("forgot-password")) {
      setCurrentView("forget-password");
    } else if (path.includes("login")) {
      setCurrentView("login");
    } else if (isAdminAuthenticated()) {
      setCurrentView("dashboard");
    }
  }, [location.pathname]);

  const handleLoginSuccess = () => {
    setCurrentView("dashboard");
    navigate("/admin/dashboard", { replace: true });
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setCurrentView("login");
    navigate("/admin/login", { replace: true });
  };

  // Ensure default cursor is active across admin views
  useEffect(() => {
    document.body.classList.add("admin-cursor");
    return () => {
      document.body.classList.remove("admin-cursor");
    };
  }, []);

  const handleBackToLogin = () => {
    setCurrentView("login");
    navigate("/admin/login");
  };

  const handleForgotPassword = () => {
    setCurrentView("forget-password");
    navigate("/admin/forget-password");
  };

  // Render view wrapped in admin-cursor container
  return (
    <div className="admin-cursor w-full min-h-screen">
      {currentView === "forget-password" && (
        <ForgetPassword onBackToLogin={handleBackToLogin} />
      )}

      {currentView === "dashboard" &&
        (isAdminAuthenticated() ? (
          <Dashboard onLogout={handleLogout} />
        ) : (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onForgotPassword={handleForgotPassword}
          />
        ))}

      {currentView === "login" && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onForgotPassword={handleForgotPassword}
        />
      )}
    </div>
  );
};

export default AdminController;