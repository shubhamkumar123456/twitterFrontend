
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YourBlogs from './pages/YourBlogs';
import { useContext } from 'react';
import UserContext from './context/UserContext';
import ForgetPassword from './pages/ForgetPassword';
import Auth from './pages/Auth';
import Profile from './pages/Profile'

function App() {
  let ctx = useContext(UserContext)
  // console.log(ctx)
  let login = ctx.details.login
  // console.log(login)
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar/>
        <Routes>
            {<Route path='/' element = {login===true?<Home/> :<Navigate to={'/login'}/>}/>}
            <Route path='/login' element = {login===false ?<Login/>:<Navigate to={'/'}/>}/>
            <Route path='/signup' element = {<Signup/>}/>
            <Route path='/yourBlog' element = {login===true? <YourBlogs/>: <Navigate to="/login"/> }/>
            <Route path='/forgetPassword' element={<ForgetPassword/>}/>
            <Route path='/user/profile' element={<Profile/>}/>

            {/* {<Route path='/' element = {login===true?<Home/> :<Navigate to={'/auth'}/>}/>}
            <Route path='/auth' element = {login===false ?<Auth/>:<Navigate to={'/'}/>}/>
            <Route path='/auth' element = {<Auth/>}/>
            <Route path='/yourBlog' element = {login===true? <YourBlogs/>: <Navigate to="/auth"/> }/>
            <Route path='/forgetPassword' element={<ForgetPassword/>}/> */}

        </Routes>
        <ToastContainer/>
     </BrowserRouter>

    </div>
  );
}

export default App;
