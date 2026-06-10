// hooks/useAgeVerification.js
import { useState, useCallback } from 'react'
import { ADULT_CATEGORY_IDS, isUserAgeVerified } from '../constants/adultCategories'

const STORAGE_KEY = 'age_verified'
const STORAGE_TIMESTAMP_KEY = 'age_verified_timestamp'

export function useAgeVerification() {
  const [showModal, setShowModal] = useState(false)
  const [pendingCategoryId, setPendingCategoryId] = useState(null)
  const [pendingCallback, setPendingCallback] = useState(null)

  const isAlreadyVerified = useCallback(() => {
    return isUserAgeVerified()
  }, [])

  const isAdultCategory = useCallback((categoryId) => {
    return ADULT_CATEGORY_IDS.includes(parseInt(categoryId))
  }, [])

  const requestVerification = useCallback((categoryId, onVerified) => {
    if (!isAdultCategory(categoryId)) {
      onVerified()
      return
    }

    if (isAlreadyVerified()) {
      onVerified()
      return
    }

    setPendingCategoryId(categoryId)
    setPendingCallback(() => onVerified)
    setShowModal(true)
  }, [isAdultCategory, isAlreadyVerified])

  const confirmAge = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true')
    localStorage.setItem(STORAGE_TIMESTAMP_KEY, Date.now().toString())
    
    setShowModal(false)
    if (pendingCallback) {
      pendingCallback()
    }
    setPendingCategoryId(null)
    setPendingCallback(null)
    
    // 🔄 Recargar la página para actualizar los listados
    window.dispatchEvent(new Event('storage')) // Esto activa los hooks que escuchan storage
  }, [pendingCallback])

  const rejectAge = useCallback(() => {
    setShowModal(false)
    setPendingCategoryId(null)
    setPendingCallback(null)
    alert('Lo sentimos, este contenido es solo para mayores de 18 años.')
  }, [])

  return {
    showModal,
    pendingCategoryId,
    requestVerification,
    confirmAge,
    rejectAge,
    isAdultCategory,
    isAlreadyVerified: isAlreadyVerified()
  }
}