import { MERCADOPAGO_CONFIG } from '../config/premiumConfig'

/**
 * Genera la preferencia de pago de Mercado Pago Checkout Pro
 * @param {Object} params
 * @param {string} params.adId - ID del anuncio a destacar
 * @param {string} params.adTitle - Título del anuncio
 * @param {Object} params.plan - Plan seleccionado (1day, 7days, 30days)
 * @returns {Promise<string>} URL de pago de Mercado Pago (init_point)
 */
export async function createMercadoPagoPreference({ adId, adTitle, plan }) {
  try {
    const accessToken = MERCADOPAGO_CONFIG.accessToken

    // Referencia transparente para identificar el pago y los días en el webhook
    const externalReference = JSON.stringify({
      ad_id: adId || 'new_ad',
      days: plan.days,
      plan_id: plan.id,
      timestamp: Date.now()
    })

    const body = {
      items: [
        {
          id: plan.id,
          title: `Publicación Destacada (${plan.name}) - ${adTitle || 'Anuncio'}`,
          description: plan.desc,
          quantity: 1,
          currency_id: 'ARS',
          unit_price: Number(plan.priceARS),
        },
      ],
      external_reference: externalReference,
      back_urls: {
        success: `${window.location.origin}/?payment=success`,
        failure: `${window.location.origin}/?payment=failure`,
        pending: `${window.location.origin}/?payment=pending`,
      },
      auto_return: 'approved',
      notification_url: `${import.meta.env.VITE_SUPABASE_URL || ''}/functions/v1/mercadopago-webhook`,
    }

    // Si hay Access Token configurado, llamar a la API de Mercado Pago
    if (accessToken && !accessToken.includes('tu-access-token')) {
      const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.message || 'Error al crear la preferencia en Mercado Pago')
      }

      const data = await response.json()
      return data.init_point || data.sandbox_init_point
    }

    // Fallback descriptivo si aún no configuró el Access Token de MP
    console.warn('Mercado Pago Access Token no configurado aún en MERCADOPAGO_CONFIG.')
    return null
  } catch (error) {
    console.error('Error creando preferencia de Mercado Pago:', error)
    throw error
  }
}
