import "./CSS/Spacing.css";
import "./CSS/Alignment.css";
import "./CSS/Sizing.css";
import "./CSS/Typography.css";
import "./CSS/App.css";
import { useNavigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import { useAuthContext } from "./Contexts/AuthContext";
import { useEffect } from "react";
import Dashboard from "./Pages/Home/Dashboard";
import ProtectedRoute from "./Hooks/ProtectedRoute";
import SettingContextProvider from "./Contexts/SettingsContext";
import VerifyOTP from "./Pages/Auth/VerifyOTP";
import ResetPassword from "./Pages/Auth/ResetPassword";
import ResetContextProvider from "./Pages/Auth/ResetContext";

function App() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    !user && navigate("/login");
  }, []);

  return (
    <SettingContextProvider>
      <ResetContextProvider>
      <Routes>
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/verifyotp" element={<VerifyOTP />} />
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
      </ResetContextProvider>
    </SettingContextProvider>
  );
}

export default App;
