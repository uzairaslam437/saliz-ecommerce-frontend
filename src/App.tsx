import './App.css'
import { BrowserRouter as Router , Routes , Route, Navigate, useActionData } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { ProductDetails } from './pages/ProductDetail'
// import { useAuth } from './hooks/useAuth'
function App() {

  // const token = useAuth();
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={
          token ? <Navigate to="/home" /> : <Navigate to="/login" />
        } /> */}
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path='/products/:id' element={<ProductDetails />} />
        

        {/* 404 Not Found */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
