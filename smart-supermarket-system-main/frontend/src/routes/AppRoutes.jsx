import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import MainLayout from '../layouts/MainLayout'
import Dashboard from '../pages/Dashboard'
import Products from '../pages/Products'
import AddProduct from '../pages/AddProduct'
import EditProduct from '../pages/EditProduct'
import Sales from '../pages/Sales'
import CreateSale from '../pages/CreateSale'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'

function RequireAuth({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireAuth><MainLayout /></RequireAuth>}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="sales" element={<Sales />} />
        <Route path="sales/create" element={<CreateSale />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
