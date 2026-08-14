-- Script para agregar columnas de control de estado de pago manual a la tabla anuncios
ALTER TABLE anuncios 
ADD COLUMN IF NOT EXISTS pago_estado VARCHAR(20) DEFAULT 'ninguno',
ADD COLUMN IF NOT EXISTS pago_dias INT DEFAULT 7;
