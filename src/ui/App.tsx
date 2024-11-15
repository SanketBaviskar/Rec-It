import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainWindow from '../Pages/MainWindow/MainWindow'
import Login from "@/Pages/Login/Login";
function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<MainWindow />} />
    </Routes>
  </Router>
  );
}

export default App;
