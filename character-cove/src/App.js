import './App.css';
import Navbar from './Components/Navbar/navbar';
import About from './Components/About/about';
import Home from './Components/Home/home';
import Account from './Components/Account/account'
import Edit from './Components/Edit/edit'
import Settings from './Components/Settings/setting';
import Login from './Components/Login/login';
import Signup from './Components/Signup/signup'
import Createprofile from './Components/CreateProfile/createprofile';
import Post from './Components/Posts/post';
import CreateOc from './Components/CreateOc/createoc'
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
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/createprofile" element={<Createprofile />}/>
            <Route path="/about" element={<About />} />
            <Route path="/account" element={<Account/>}/>
            <Route path="/edit" element={<Edit/>}/>
            <Route path="/settings" element={<Settings />}/>
            <Route path="/post" element={<Post />} />
            <Route path="/create" element={<CreateOc />}/>
            <Route path="/notification" />
            <Route path="/browse" />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
