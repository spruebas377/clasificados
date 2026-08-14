-- ==============================================================================
-- INSTRUCCIONES PARA CONFIGURAR EL WEBHOOK DE MERCADO PAGO EN SUPABASE
-- ==============================================================================
-- 
-- Mercado Pago notifica a tu servidor cuando el pago se aprueba.
-- El Webhook recibe el 'external_reference' con el JSON: {"ad_id": "...", "days": 7}
-- y ejecuta la activación automática en la tabla 'anuncios'.
--
-- 1. Función PostgreSQL en Supabase para procesar la aprobación del pago:

CREATE OR REPLACE FUNCTION activar_destacado_por_pago(
    p_ad_id UUID,
    p_dias INT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE anuncios
    SET 
        destacado = true,
        destacado_hasta = NOW() + (p_dias || ' days')::INTERVAL
    WHERE id = p_ad_id;
END;
$$;

-- 2. Ejemplo de llamada directa desded un Webhook o Supabase Edge Function:
-- SELECT activar_destacado_por_pago('ID-DEL-ANUNCIO'::UUID, 7);
