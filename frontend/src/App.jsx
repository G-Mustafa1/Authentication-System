import { useEffect, useState } from 'react'
import './App.css'
import Signup from './pages/auth/Signup'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/auth/Login'
import VerifyOTP from './pages/auth/VerifyOTP'
import ResetPassword from './pages/auth/ResetPassword'
import Home from './pages/main/Home'
import VerifyEmail from './pages/auth/VerifyEmail'
import CheckEmail from './pages/auth/CheckEmail'
import Todos from './pages/main/Todos'
import HomeLayou from './layout/HomeLayou'
import AuthLayout from './layout/AuthLayout'
import { checkAuth } from './features/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import About from './pages/main/About'
import Features from './pages/main/Fetures'

function App() {
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  // if (loading) return <p>Loading...</p>;

  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<VerifyOTP />} />
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/check-email" element={<CheckEmail />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<HomeLayou />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/todos" element={<Todos />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
