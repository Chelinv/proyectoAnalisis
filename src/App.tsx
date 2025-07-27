import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import AdminPage from './pages/AdminPage'
import ClientePage from "./pages/ClientePage"
import RegistroPage from "./pages/RegistroPage"
import CatalogoPage from "./pages/CatalogoPage"
import ContactoPage from "./pages/ContactoPage"
import AyudaPage from "./pages/AyudaPage"
import OfertasPage from "./pages/OfertasPage"
import ProductoPage from "./pages/ProductoPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/cliente" element={<ClientePage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/catalogo" element={<CatalogoPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/ayuda" element={<AyudaPage />} />
        <Route path="/ofertas" element={<OfertasPage />} />
        <Route path="/producto/:id" element={<ProductoPage />} />
      </Routes>
    </Router>
  )
}

export default App
