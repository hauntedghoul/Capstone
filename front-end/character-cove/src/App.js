import './App.css';
import Navbar from './Components/Navbar/navbar';
import About from './Components/About/about';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Components/Header/header';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Navbar />
        <div className='main'>
          <Routes>
            <Route path="/" />
            <Route path="/about" element={<About />} />
            <Route path="/account" />
            <Route path="/create" />
            <Route path="/settings" />
            <Route path="/notification" />
            <Route path="/search" />
            <Route path="/browse" />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
