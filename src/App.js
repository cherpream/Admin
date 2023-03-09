import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Screens/Login";
import MissionManager from "./Screens/MissionManager";
import RewardManager from "./Screens/RewardManager";
import UserManager from "./Screens/UserManager";



function App() {
  return ( 
    
    <Router>
    
      <Routes> 
      <Route path="/" element={<Login/>}  />
        <Route path="/Mission" element={<MissionManager />} />
        <Route path="/Reward" element={<RewardManager />} />
        <Route path="/User" element={<UserManager />} />
      </Routes>
    </Router>
    
  );
}

export default App;
