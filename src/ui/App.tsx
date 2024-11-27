import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainWindow from '../Pages/MainWindow/MainWindow'
import Login from "@/Pages/Login/Login";
import Admin from "@/Pages/Admin/AdminDashboard";//AdminLayout
function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<MainWindow />} />
      <Route path="/admin/*" element={<Admin children={undefined} />} />
    </Routes>
  </Router>
  );
}

export default App;
