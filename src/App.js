import "./App.css";
import Header from "./components/header/Header";
import LoginPage from "./pages/LoginPage";
import { Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import GamePage from "./pages/GamePage";
import SettingPage from "./pages/SettingPage";
import NotFoundPage from "./pages/NotFoundPage";
import Cookies from "js-cookie";
import { isLogin } from "./authentication";
function App() {
  return (
    <div className="App w-full h-full">
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/dashboard" element={<DashboardPage />} />
        <Route exact path="/game" element={<GamePage />} />
        <Route exact path="/setting" element={<SettingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
