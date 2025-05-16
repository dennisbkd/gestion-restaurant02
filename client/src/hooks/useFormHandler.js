import { useState } from 'react'

export function useFormHandler(initialValues, onSubmit) {
  const [formData, setFormData] = useState(initialValues)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    if (event) event.preventDefault()
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    formData,
    handleInputChange,
    handleSubmit,
    setFormData 
  }
}
