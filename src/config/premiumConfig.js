// Configuración centralizada de Mercado Pago y Planes Premium
// Para cambiar la cuenta de Mercado Pago o los precios de los planes, modifica los valores en este archivo.

export const ADMIN_CONFIG = {
  // Lista de emails con permisos de administrador / superusuario
  // Puedes agregar tu email en .env como VITE_ADMIN_EMAIL (separados por coma para múltiples)
  adminEmails: (
    import.meta.env.VITE_ADMIN_EMAIL ||
    "marioadolfozarza@gmail.com"
  )
    .split(",")
    .map((e) => e.trim().toLowerCase()),
};

export const MERCADOPAGO_CONFIG = {
  // Clave pública de Mercado Pago (Client Side)
  publicKey: import.meta.env.VITE_MP_PUBLIC_KEY || "APP_USR-00000000-0000-0000-0000-000000000000",
  // Access Token de Mercado Pago (Server Side / Webhook API)
  accessToken: import.meta.env.VITE_MP_ACCESS_TOKEN || "APP_USR-tu-access-token-aqui",
  // Datos bancarios para transferencias directas
  bankDetails: {
    alias: "clasificados.mp",
    cbu: "0000003100098765432100",
    holder: "Clasificados Formosa",
  },
  // Teléfono de soporte de WhatsApp para notificaciones
  supportPhone: "5493705269608",
};

export const PREMIUM_PLANS = [
  {
    id: "1day",
    days: 1,
    name: "1 Día",
    priceARS: 1000,
    priceLabel: "$1.000 ARS",
    desc: "Visibilidad exprés por 24 horas",
  },
  {
    id: "7days",
    days: 7,
    name: "7 Días",
    priceARS: 3500,
    priceLabel: "$3.500 ARS",
    desc: "Una semana completa de exposición top",
    badge: "Popular",
  },
  {
    id: "30days",
    days: 30,
    name: "30 Días",
    priceARS: 9000,
    priceLabel: "$9.000 ARS",
    desc: "Un mes entero en los primeros puestos",
    badge: "Mejor Oferta",
  },
]
