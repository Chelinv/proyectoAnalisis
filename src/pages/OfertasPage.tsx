"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Package, Star, BookOpen, Palette, Search, ArrowLeft, X, Plus, Minus, Tag, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import "./OfertasPage.css"

export default function OfertasPage() {
  const [productoSeleccionado, setProductoSeleccionado] = useState<any>(null)
  const [mostrarModal, setMostrarModal] = useState(false)
  const [cantidad, setCantidad] = useState(1)

  const ofertas = [
    {
      id: 1,
      nombre: "Cuaderno Universitario 100 hojas",
      categoria: "Papelería",
      precioOriginal: 2.5,
      precioOferta: 1.99,
      descuento: 20,
      descripcion: "Cuaderno universitario de 100 hojas rayadas, tapa dura",
      descripcionDetallada:
        "Cuaderno universitario profesional con 100 hojas de papel bond de alta calidad. Cuenta con tapa dura resistente, espiral metálico y hojas rayadas perfectas para tomar apuntes. ¡Oferta especial por tiempo limitado!",
      rating: 4.5,
      stock: 150,
      icon: BookOpen,
      tipoOferta: "Descuento",
      fechaVencimiento: "2024-02-15",
      especificaciones: [
        "100 hojas de papel bond 75g",
        "Tapa dura plastificada",
        "Espiral metálico resistente",
        "Tamaño: 21 x 29.7 cm",
        "Hojas rayadas con margen",
      ],
      marca: "Norma",
    },
    {
      id: 2,
      nombre: "Set de Colores 24 unidades",
      categoria: "Material de Arte",
      precioOriginal: 8.75,
      precioOferta: 6.99,
      descuento: 20,
      descripcion: "Set de colores de madera con 24 tonalidades diferentes",
      descripcionDetallada:
        "Set completo de 24 colores de madera con pigmentos vibrantes y duraderos. Cada lápiz está fabricado con madera de cedro y mina de alta calidad. ¡Precio especial por liquidación de inventario!",
      rating: 4.3,
      stock: 45,
      icon: Palette,
      tipoOferta: "Liquidación",
      fechaVencimiento: "2024-02-20",
      especificaciones: [
        "24 colores diferentes",
        "Madera de cedro premium",
        "Mina de 3.3mm",
        "Pigmentos no tóxicos",
        "Incluye estuche organizador",
      ],
      marca: "Prismacolor",
    },
    {
      id: 3,
      nombre: "Grapadora Metálica",
      categoria: "Oficina",
      precioOriginal: 12.0,
      precioOferta: 8.99,
      descuento: 25,
      descripcion: "Grapadora metálica resistente para uso profesional",
      descripcionDetallada:
        "Grapadora metálica de uso pesado, ideal para oficinas y uso profesional. Construida completamente en metal con mecanismo de precisión. ¡Oferta especial de temporada!",
      rating: 4.6,
      stock: 25,
      icon: Package,
      tipoOferta: "Temporada",
      fechaVencimiento: "2024-02-10",
      especificaciones: [
        "Construcción 100% metálica",
        "Capacidad: 25 hojas",
        "Usa grapas estándar 26/6",
        "Base antideslizante",
        "Mecanismo de precisión",
      ],
      marca: "Swingline",
    },
    // ... resto de productos
  ]

  const tiposOferta = ["Todas", "Descuento", "Liquidación", "Pack", "Temporada", "Fin de Temporada"]

  const abrirModal = (producto: any) => {
    setProductoSeleccionado(producto)
    setCantidad(1)
    setMostrarModal(true)
  }

  const cerrarModal = () => {
    setMostrarModal(false)
    setProductoSeleccionado(null)
    setCantidad(1)
  }

  const aumentarCantidad = () => {
    if (cantidad < productoSeleccionado?.stock) {
      setCantidad(cantidad + 1)
    }
  }

  const disminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1)
    }
  }

  const calcularAhorro = (precioOriginal: number, precioOferta: number) => {
    return precioOriginal - precioOferta
  }

  const renderModal = () => {
    if (!mostrarModal || !productoSeleccionado) return null

    const IconComponent = productoSeleccionado.icon
    const totalPrecio = productoSeleccionado.precioOferta * cantidad
    const ahorroTotal =
      calcularAhorro(productoSeleccionado.precioOriginal, productoSeleccionado.precioOferta) * cantidad

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header del modal */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Vista Rápida</h3>
            <Button variant="ghost" onClick={cerrarModal} className="p-1">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Contenido del modal */}
          <div className="p-6">
            {/* Badge de oferta */}
            <div className="flex justify-center mb-4">
              <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                {productoSeleccionado.descuento}% de descuento - {productoSeleccionado.tipoOferta}
              </span>
            </div>

            {/* Imagen y info básica */}
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <IconComponent className="h-16 w-16 text-gray-700" />
                </div>
              </div>

              <div className="flex-1">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">{productoSeleccionado.nombre}</h4>
                <p className="text-gray-600 mb-3">{productoSeleccionado.descripcionDetallada}</p>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(productoSeleccionado.rating) ? "fill-gray-400 text-gray-400" : "fill-gray-300 text-gray-300"}`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">{productoSeleccionado.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">Stock: {productoSeleccionado.stock}</span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ${productoSeleccionado.precioOferta.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${productoSeleccionado.precioOriginal.toFixed(2)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {productoSeleccionado.categoria}
                  </span>
                </div>

                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  Oferta válida hasta: {productoSeleccionado.fechaVencimiento}
                </div>
              </div>
            </div>

            {/* Selector de cantidad y precio total */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-900">Cantidad:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={disminuirCantidad}
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 border-gray-300 bg-transparent"
                      disabled={cantidad <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{cantidad}</span>
                    <Button
                      onClick={aumentarCantidad}
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 border-gray-300 bg-transparent"
                      disabled={cantidad >= productoSeleccionado.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total:</p>
                  <p className="text-2xl font-bold text-gray-900">${totalPrecio.toFixed(2)}</p>
                  <p className="text-sm text-green-600">Ahorras: ${ahorroTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-gray-900 text-white hover:bg-gray-800"
                disabled={productoSeleccionado.stock === 0}
              >
                Añadir al Carrito
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                asChild
              >
                <Link to={`/producto/${productoSeleccionado.id}`}>Ver Detalles Completos</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ofertas-page">
      {/* Header */}
      <header className="ofertas-header">
        <div className="header-container">
          <div className="header-back">
            <Link to="/" className="back-link">
              <ArrowLeft className="back-icon" />
              <span>Volver</span>
            </Link>
          </div>
          <div className="header-logo">
            <div className="logo-icon">
              <Package className="icon" />
            </div>
            <h1 className="logo-text">BAZAR DOÑA MARLENE</h1>
          </div>
          <Button variant="outline" className="login-button bg-transparent" asChild>
            <Link to="/login">Iniciar Sesión</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-title-container">
            <Tag className="hero-icon" />
            <h2 className="hero-title">Ofertas Especiales</h2>
          </div>
          <p className="hero-subtitle">
            Aprovecha nuestras promociones especiales con descuentos de hasta 30% en productos seleccionados
          </p>

          {/* Barra de búsqueda */}
          <div className="search-container">
            <div className="search-input-container">
              <Search className="search-icon" />
              <Input type="text" placeholder="Buscar ofertas..." className="search-input" />
            </div>
          </div>
        </div>
      </section>

      {/* Productos en oferta */}
      <section className="products-section">
        <div className="products-container">
          <div className="products-grid">
            {ofertas.map((producto) => {
              const IconComponent = producto.icon
              const ahorro = calcularAhorro(producto.precioOriginal, producto.precioOferta)

              return (
                <div key={producto.id} className="product-card">
                  {/* Badge de descuento */}
                  <div className="discount-badge">-{producto.descuento}%</div>

                  <div className="product-icon-container">
                    <IconComponent className="product-icon" />
                  </div>

                  <h3 className="product-name">{producto.nombre}</h3>
                  <p className="product-description">{producto.descripcion}</p>

                  <div className="product-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`star ${i < Math.floor(producto.rating) ? "filled" : "empty"}`} />
                    ))}
                    <span className="rating-number">{producto.rating}</span>
                  </div>

                  <div className="product-pricing">
                    <div className="price-container">
                      <p className="offer-price">${producto.precioOferta.toFixed(2)}</p>
                      <p className="original-price">${producto.precioOriginal.toFixed(2)}</p>
                    </div>
                    <p className="savings">Ahorras: ${ahorro.toFixed(2)}</p>
                    <p className="stock">Stock: {producto.stock}</p>
                    <p className="category">{producto.categoria}</p>
                  </div>

                  <div className="offer-type">
                    <span className="offer-badge">{producto.tipoOferta}</span>
                  </div>

                  <div className="expiry-date">
                    <Clock className="clock-icon" />
                    Válida hasta: {producto.fechaVencimiento}
                  </div>

                  <div className="product-actions">
                    <Button onClick={() => abrirModal(producto)} className="quick-view-button-full">
                      Vista Rápida
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Modal de vista rápida */}
      {renderModal()}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <div className="footer-logo-icon">
                  <Package className="icon" />
                </div>
                <h4 className="footer-logo-text">Bazar Doña Marlene</h4>
              </div>
              <p className="footer-description">Tu papelería de confianza desde hace más de 20 años</p>
            </div>

            <div className="footer-section">
              <h4 className="footer-section-title">Contacto</h4>
              <div className="footer-info">
                <p>Teléfono: (555) 123-4567</p>
                <p>Email: info@bazarmarlene.com</p>
                <p>Dirección: Av. Principal 123</p>
              </div>
            </div>

            <div className="footer-section">
              <h4 className="footer-section-title">Horarios</h4>
              <div className="footer-info">
                <p>Lun - Vie: 8:00 AM - 7:00 PM</p>
                <p>Sábado: 9:00 AM - 5:00 PM</p>
                <p>Domingo: Cerrado</p>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">© 2024 Bazar Doña Marlene. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
