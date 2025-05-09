import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import Dashboard from "./Dashboard";
import ContactPage from "./ContactPage";
import AboutPage from "./AboutPage";
import HomePage from "./HomePage";
import PropertyDashboard from "./PropertyDashboard";
import DealerLogin from "./DealerLogin";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/PropertyDashboard" element={<PropertyDashboard />} />
        <Route path="/DealerLogin" element={<DealerLogin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
