// constants/adultCategories.js
export const ADULT_CATEGORY_IDS = [16] // Agregar las id de las categorías para adultos"

// Función helper para verificar si el usuario es mayor de edad
export const isUserAgeVerified = () => {
  const verified = localStorage.getItem('age_verified') === 'true'
  const timestamp = localStorage.getItem('age_verified_timestamp')
  
  if (!verified || !timestamp) return false
  
  const daysSince = (Date.now() - parseInt(timestamp)) / (1000 * 60 * 60 * 24)
  return daysSince <= 30 // Válido por 30 días
}