import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AuthLayout from "./components/layout/AuthLayout";

import { useEffect } from "react";
import { checkLoginStatus } from "./utils/checkLoginStatus";

function App() {
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Protected Routes  */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
