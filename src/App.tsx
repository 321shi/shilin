import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import CreatePost from "@/pages/CreatePost";
import Jobs from "@/pages/Jobs";
import CreateDailyJob from "@/pages/CreateDailyJob";
import CreateFactory from "@/pages/CreateFactory";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/create-daily-job" element={<CreateDailyJob />} />
        <Route path="/create-factory" element={<CreateFactory />} />
      </Routes>
    </Router>
  );
}
