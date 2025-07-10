import { Route, Routes, Navigate } from "react-router-dom"
import LoginPage from "./components/LoginPage"
import PageNotFound from "./components/PageNotFound"
import Home from "./components/Home"
import Popular from "./components/Popular"
import ProfilePage from "./components/ProfilePage"
import SearchPage from "./components/SearchPage"
import ProtectedRoute from "./components/ProtectedRoute"
import MoviesPage from "./components/MoviesPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} ></Route>
        <Route path="/home" element={<ProtectedRoute><Navigate to="/"></Navigate></ProtectedRoute>} ></Route>
        <Route path="/popular" element={<ProtectedRoute><Popular /></ProtectedRoute>}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}></Route>
        <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>}></Route>
        <Route path="/movie/:id" element={<ProtectedRoute><MoviesPage /></ProtectedRoute>}></Route>
        <Route path="*" element={<ProtectedRoute><PageNotFound /></ProtectedRoute>} ></Route>
      </Routes>
    </>
  )
}

export default App
