import { useState } from 'react'

export const useFormValidator = () => {
  const [errors, setErrors] = useState({})

  const validate = (formData) => {
    const newErrors = {}

    if (!formData.nombreUsuario?.trim()) newErrors.nombreUsuario = 'Este campo es requerido.'
    if (!formData.nombre?.trim()) newErrors.nombre = 'Este campo es requerido.'

    if (!formData.password?.trim()) {
      newErrors.password = 'Este campo es requerido.'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Debe tener al menos 6 caracteres.'
    }

    if (!formData.correo?.trim()) {
      newErrors.correo = 'Este campo es requerido.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = 'Correo inválido.'
    }

    if (!formData.telefono?.trim()) {
      newErrors.telefono = 'Este campo es requerido.'
    } else if (!/^\d{8}$/.test(formData.telefono)) {
      newErrors.telefono = 'Debe tener 8 dígitos numéricos.'
    }

    if (!formData.ci?.trim()) newErrors.ci = 'Este campo es requerido.'
    if (!formData.idRol) newErrors.idRol = 'Debe seleccionar un rol.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return { errors, validate }
}
