-- Script para agregar la columna 'destacado_hasta' a la tabla anuncios en Supabase
ALTER TABLE anuncios 
ADD COLUMN IF NOT EXISTS destacado_hasta TIMESTAMPTZ;
