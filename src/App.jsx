import React from "react";
import { createRoot } from "react-dom/client";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Secret from "./components/Secret";
// import "./AppStyles.css";

const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  const renderURLHelper = () => {
    if (location.pathname === "/login") {
      return (
        <p>
          <a href="/signup">Sign up</a> | <a href="/">Back to Home</a>
        </p>
      );
    } else if (location.pathname === "/signup") {
      return (
        <p>
          <a href="/login">Log in</a> | <a href="/">Back to Home</a>
        </p>
      );
    }
    return null;
  };

  return (
    <div>
      {!isAuthPage && <NavBar />}
      <div className="app">
        {renderURLHelper()}
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/secret" element={<Secret />} />
        </Routes>
      </div>
    </div>
  );
};

// We're using React Router to handle the navigation between pages.
// It's important that the Router is at the top level of our app,
// and that we wrap our entire app in it. With this in place, we can
// declare Routes, Links, and use useful hooks like useNavigate.
const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
