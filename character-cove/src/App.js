import './App.css';
import Navbar from './Components/Navbar/navbar';
import About from './Components/About/about';
import Home from './Components/Home/home';
import Account from './Components/Account/account';
import Edit from './Components/Edit/edit';
import Settings from './Components/Settings/setting';
import Login from './Components/Login/login';
import Signup from './Components/Signup/signup';
import Createprofile from './Components/CreateProfile/createprofile';
import Post from './Components/Posts/post';
import CreateOc from './Components/CreateOc/createoc';
import Browse from './Components/Browse/browse';
import Notifcation from './Components/Notification/notif';
import OCPage from './Components/OcPage/ocpage';
import UserAccount from './Components/UserAccount/UserAccount';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/header';
import PrivateRoute from './Components/PrivateRoute/privateRoute';

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Navbar />
        <div className='main'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/createprofile" element={ <Createprofile /> } />
            <Route path="/account" element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            } />
            <Route path="/edit" element={
              <PrivateRoute>
                <Edit />
              </PrivateRoute>
            } />
            <Route path="/settings" element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            } />
            <Route path="/post" element={
              <PrivateRoute>
                <Post />
              </PrivateRoute>
            } />
            <Route path="/create" element={
              <PrivateRoute>
                <CreateOc />
              </PrivateRoute>
            } />
            <Route path="/browse" element={
              <PrivateRoute>
                <Browse />
              </PrivateRoute>
            } />
            <Route path="/notification" element={
              <PrivateRoute>
                <Notifcation />
              </PrivateRoute>
            } />
            <Route path="/ocpage/:id" element={
              <PrivateRoute>
                <OCPage />
              </PrivateRoute>
            } />
            <Route path="/users/:username" element={
              <PrivateRoute>
                <UserAccount />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
