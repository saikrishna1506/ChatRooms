import './App.css';
import {BrowserRouter, Routes, Route,} from 'react-router-dom'
import Home from './components/Home/Home';
import ChatRoom from './components/ChatRoom/ChatRoom';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Signup from './components/SignUp/Signup';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        
        <Route exact path="/" element={<Landing/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Signup/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/:roomId/:userName" element={<ChatRoom/>}/>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
