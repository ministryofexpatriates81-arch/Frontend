import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

//Pages import
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

import { io } from 'socket.io-client';
import SocketContext from './context/SocketContext';
import { useSelector } from 'react-redux';

// API লিংকটি ঠিকমতো না পেলে যেন সাইট ক্র্যাশ না করে, তার জন্য সেফটি দেওয়া হলো
const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || '';
const socketUrl = apiEndpoint ? apiEndpoint.split('/api/v1')[0] : 'http://localhost:5000'; // আপনার ব্যাকএন্ড লিংক না পেলে লোকালহোস্ট ধরবে
const socket = io(socketUrl);

function App() {
  // User ডেটা না থাকলে যেন ক্র্যাশ না করে, সেজন্য optional chaining (?.) ব্যবহার করা হলো
  const user = useSelector((state) => state.user?.user); 
  const token = user?.token;

  console.log("Token:", token);

  return (
    <div className='dark'>
      <SocketContext.Provider value={socket}>
        {/* গিটহাব পেজেসের জন্য basename="/Frontend" যুক্ত করা হলো */}
        <Router basename="/Frontend">
          <Routes>
            <Route exact path="/" element={token ? <Home socket={socket}/> : <Navigate to="/login"/>} />
            
            {/* লগিন লজিক ঠিক করা হলো (!token) */}
            <Route exact path="/login" element={!token ? <Login/> : <Navigate to="/"/>} />
            <Route exact path="/register" element={!token ? <Register/> : <Navigate to="/"/>} />
          </Routes>
          <div className='dark'></div>
        </Router>
      </SocketContext.Provider>
  </div>
  );
}

export default App;
