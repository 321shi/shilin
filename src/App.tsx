import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useJobStore } from "./store/jobStore";
import Header from "./components/Header";
import PartTimePage from "./pages/PartTimePage";
import FactoryPage from "./pages/FactoryPage";

function App() {
  const { partTimeJobs, factoryJobs } = useJobStore();
  
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header partTimeCount={partTimeJobs.length} factoryCount={factoryJobs.length} />
        <Routes>
          <Route path="/" element={<PartTimePage />} />
          <Route path="/part-time" element={<PartTimePage />} />
          <Route path="/factory" element={<FactoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
