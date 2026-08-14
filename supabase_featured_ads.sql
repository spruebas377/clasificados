-- Script para agregar la columna 'destacado' a la tabla anuncios en Supabase
ALTER TABLE anuncios 
ADD COLUMN IF NOT EXISTS destacado BOOLEAN DEFAULT false;
