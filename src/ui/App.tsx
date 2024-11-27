import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainWindow from '../Pages/MainWindow/MainWindow'
import Login from "@/Pages/Login/Login";
import AdminDashboard from "@/Pages/AdminDashboard/AdminDashboard";
function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<MainWindow />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  </Router>
  );
}

export default App;
