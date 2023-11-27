import "./App.css";
import Header from "./components/header/Header";
import LoginPage from "./pages/LoginPage";
import { Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import GamePage from "./pages/GamePage";
import SettingPage from "./pages/SettingPage";
import NotFoundPage from "./pages/NotFoundPage";
import Cookies from "js-cookie";
function App() {
  return (
    <div className="App w-full h-full">
      <Routes>
        <Route exact path="/" element={<DashboardPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/dashboard" element={<DashboardPage />} />
        <Route exact path="/game" element={<GamePage />} />
        <Route exact path="/user" element={<SettingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
