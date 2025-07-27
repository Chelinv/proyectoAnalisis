"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Package, ArrowLeft, User, Phone, Lock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    usuario: "",
    contraseña: "",
    confirmarContraseña: "",
  })
  const [errores, setErrores] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errores[name]) {
      setErrores((prev: any) => ({ ...prev, [name]: "" }))
    }
  }

  const validarFormulario = () => {
    const nuevosErrores: any = {}

    // Validar campos requeridos
    if (!formData.nombre.trim()) nuevosErrores.nombre = "El nombre es requerido"
    if (!formData.apellido.trim()) nuevosErrores.apellido = "El apellido es requerido"
    if (!formData.email.trim()) nuevosErrores.email = "El email es requerido"
    if (!formData.telefono.trim()) nuevosErrores.telefono = "El teléfono es requerido"
    if (!formData.usuario.trim()) nuevosErrores.usuario = "El usuario es requerido"
    if (!formData.contraseña.trim()) nuevosErrores.contraseña = "La contraseña es requerida"
    if (!formData.confirmarContraseña.trim()) nuevosErrores.confirmarContraseña = "Confirmar contraseña es requerido"

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      nuevosErrores.email = "Email inválido"
    }

    // Validar teléfono
    const telefonoRegex = /^[0-9\-$$$$\s+]+$/
    if (formData.telefono && !telefonoRegex.test(formData.telefono)) {
      nuevosErrores.telefono = "Teléfono inválido"
    }

    // Validar contraseña
    if (formData.contraseña && formData.contraseña.length < 4) {
      nuevosErrores.contraseña = "La contraseña debe tener al menos 4 caracteres"
    }

    // Validar confirmación de contraseña
    if (formData.contraseña !== formData.confirmarContraseña) {
      nuevosErrores.confirmarContraseña = "Las contraseñas no coinciden"
    }

    // Validar usuario único (simulado)
    const usuariosExistentes = ["admin", "cliente", "vendedor", "cajero"]
    if (formData.usuario && usuariosExistentes.includes(formData.usuario.toLowerCase())) {
      nuevosErrores.usuario = "Este usuario ya existe"
    }

    // Validar email único (simulado)
    const emailsExistentes = ["admin@bazar.com", "cliente@bazar.com", "info@bazarmarlene.com"]
    if (formData.email && emailsExistentes.includes(formData.email.toLowerCase())) {
      nuevosErrores.email = "Este email ya está registrado"
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validarFormulario()) {
      return
    }

    setLoading(true)

    // Simular delay de registro
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simular registro exitoso
    // En una aplicación real, aquí se enviarían los datos al servidor
    console.log("Datos de registro:", formData)

    // Mostrar mensaje de éxito
    alert("¡Registro exitoso! Ahora puedes iniciar sesión con tus credenciales.")

    // Redirigir al login
    router.push("/login")

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header con logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-gray-800 hover:text-gray-600">
            <ArrowLeft className="h-5 w-5" />
            <span>Volver al inicio</span>
          </Link>
        </div>

        {/* Formulario de registro */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          {/* Logo y título */}
          <div className="text-center mb-8">
            <div className="p-3 bg-gray-800 rounded-xl mx-auto w-fit mb-4">
              <Package className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Crear Cuenta</h1>
            <p className="text-gray-600 mt-2">Bazar Doña Marlene</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Personal */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Información Personal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre *
                  </Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ingrese su nombre"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50 ${
                      errores.nombre ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errores.nombre && <p className="text-red-500 text-xs mt-1">{errores.nombre}</p>}
                </div>
                <div>
                  <Label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-2">
                    Apellido *
                  </Label>
                  <Input
                    id="apellido"
                    name="apellido"
                    type="text"
                    value={formData.apellido}
                    onChange={handleChange}
                    placeholder="Ingrese su apellido"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50 ${
                      errores.apellido ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errores.apellido && <p className="text-red-500 text-xs mt-1">{errores.apellido}</p>}
                </div>
              </div>
            </div>

            {/* Información de Contacto */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Información de Contacto
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ejemplo@email.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50 ${
                      errores.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errores.email && <p className="text-red-500 text-xs mt-1">{errores.email}</p>}
                </div>
                <div>
                  <Label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50 ${
                      errores.telefono ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errores.telefono && <p className="text-red-500 text-xs mt-1">{errores.telefono}</p>}
                </div>
              </div>
            </div>

            {/* Información de Cuenta */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Información de Cuenta
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="usuario" className="block text-sm font-medium text-gray-700 mb-2">
                    Usuario *
                  </Label>
                  <Input
                    id="usuario"
                    name="usuario"
                    type="text"
                    value={formData.usuario}
                    onChange={handleChange}
                    placeholder="Nombre de usuario único"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50 ${
                      errores.usuario ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errores.usuario && <p className="text-red-500 text-xs mt-1">{errores.usuario}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contraseña" className="block text-sm font-medium text-gray-700 mb-2">
                      Contraseña *
                    </Label>
                    <Input
                      id="contraseña"
                      name="contraseña"
                      type="password"
                      value={formData.contraseña}
                      onChange={handleChange}
                      placeholder="Mínimo 4 caracteres"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50 ${
                        errores.contraseña ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errores.contraseña && <p className="text-red-500 text-xs mt-1">{errores.contraseña}</p>}
                  </div>
                  <div>
                    <Label htmlFor="confirmarContraseña" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmar Contraseña *
                    </Label>
                    <Input
                      id="confirmarContraseña"
                      name="confirmarContraseña"
                      type="password"
                      value={formData.confirmarContraseña}
                      onChange={handleChange}
                      placeholder="Repita su contraseña"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50 ${
                        errores.confirmarContraseña ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errores.confirmarContraseña && (
                      <p className="text-red-500 text-xs mt-1">{errores.confirmarContraseña}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Términos y condiciones */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terminos"
                required
                className="mt-1 h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
              />
              <Label htmlFor="terminos" className="text-sm text-gray-600">
                Acepto los{" "}
                <a href="#" className="text-gray-800 hover:underline">
                  términos y condiciones
                </a>{" "}
                y la{" "}
                <a href="#" className="text-gray-800 hover:underline">
                  política de privacidad
                </a>
              </Label>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gray-800 text-white hover:bg-gray-900 py-3 text-lg rounded-lg disabled:opacity-50"
              >
                {loading ? "Creando cuenta..." : "Crear Cuenta"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-gray-400 text-gray-700 hover:bg-gray-100 py-3 text-lg rounded-lg bg-transparent"
                asChild
              >
                <Link href="/login">Cancelar</Link>
              </Button>
            </div>
          </form>

          {/* Enlace a login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-gray-800 hover:underline font-medium">
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2024 Bazar Doña Marlene</p>
        </div>
      </div>
    </div>
  )
}
