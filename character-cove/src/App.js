import './App.css';
import Navbar from './Components/Navbar/navbar';
import About from './Components/About/about';
import Home from './Components/Home/home';
import Account from './Components/Account/account'
import Edit from './Components/Edit/edit'
import Settings from './Components/Settings/setting';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/header';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Navbar />
        <div className='main'>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />} />
            <Route path="/account" element={<Account/>}/>
            <Route path="/edit" element={<Edit/>}/>
            <Route path="/create" />
            <Route path="/settings" element={<Settings />}/>
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
