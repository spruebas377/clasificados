-- Política RLS para permitir que el administrador apruebe/rechace pagos
-- Ejecutar en la consola SQL de Supabase

-- Opción 1: Permitir que el admin (por email) actualice cualquier anuncio
CREATE POLICY "admin_update_anuncios"
ON anuncios
FOR UPDATE
USING (
  auth.jwt() ->> 'email' IN (
    'marioadolfozarza@gmail.com'
  )
)
WITH CHECK (
  auth.jwt() ->> 'email' IN (
    'marioadolfozarza@gmail.com'
  )
);

-- NOTA: Si ya tenés una política de UPDATE que permite al dueño editar
-- sus propios anuncios, esta se suma. Supabase evalúa con OR entre políticas
-- del mismo tipo (UPDATE), así que no necesitás modificar la existente.

-- Si querés verificar tus políticas actuales:
-- SELECT * FROM pg_policies WHERE tablename = 'anuncios';
