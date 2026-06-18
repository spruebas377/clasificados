// pages/legal/PrivacyPage.jsx
import { useEffect } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
const emailAdmin = import.meta.env.VITE_ADMIN_EMAIL;

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Política de Privacidad - ClasiForm";
  }, []);

  return (
    <>
      <Header />
      <main className="legal-page">
        <div className="container legal-container">
          <div className="legal-header">
            <h1>Política de Privacidad</h1>
            <p className="legal-date">
              Última actualización: {new Date().toLocaleDateString("es-AR")}
            </p>
          </div>

          <div className="legal-content">
            <section>
              <h2>1. Información General</h2>
              <p>
                En ClasiForm valoramos tu privacidad y nos comprometemos a
                proteger tus datos personales. Esta política explica cómo
                recopilamos, utilizamos y protegemos tu información cuando
                utilizas nuestra plataforma.
              </p>
              <p>
                <strong>Titular del sitio:</strong> ClasiForm
                <br />
                <strong>Email de contacto:</strong> {emailAdmin}
                <br />
                <strong>Actividad:</strong> Plataforma de clasificados online
              </p>
            </section>

            <section>
              <h2>2. Datos que Recopilamos</h2>
              <h3>2.1 Datos que nos proporcionas directamente:</h3>
              <ul>
                <li>Nombre y apellido</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono/WhatsApp</li>
                <li>Ubicación (provincia y ciudad)</li>
                <li>
                  Contenido de publicaciones (títulos, descripciones, imágenes)
                </li>
                <li>Comentarios y preguntas en publicaciones</li>
              </ul>

              <h3>2.2 Datos recopilados automáticamente:</h3>
              <ul>
                <li>Dirección IP</li>
                <li>Tipo de navegador y versión</li>
                <li>Sistema operativo</li>
                <li>Páginas visitadas y tiempo de navegación</li>
                <li>Cookies y tecnologías similares</li>
              </ul>
            </section>

            <section>
              <h2>3. Base Legal para el Tratamiento</h2>
              <p>
                Tratamos tus datos personales sobre las siguientes bases
                legales:
              </p>
              <ul>
                <li>
                  <strong>Ejecución de contrato:</strong> Para gestionar tu
                  cuenta y publicaciones
                </li>
                <li>
                  <strong>Consentimiento explícito:</strong> Para comunicaciones
                  de marketing
                </li>
                <li>
                  <strong>Interés legítimo:</strong> Para mejorar nuestros
                  servicios y prevenir fraudes
                </li>
                <li>
                  <strong>Cumplimiento legal:</strong> Para cumplir con
                  obligaciones fiscales y legales
                </li>
              </ul>
            </section>

            <section>
              <h2>4. Uso de tu Información</h2>
              <p>Utilizamos tus datos para:</p>
              <ul>
                <li>✅ Crear y gestionar tu cuenta de usuario</li>
                <li>✅ Permitir la publicación de anuncios</li>
                <li>
                  ✅ Facilitar la comunicación entre usuarios (WhatsApp,
                  comentarios)
                </li>
                <li>✅ Enviar notificaciones sobre tus publicaciones</li>
                <li>
                  ✅ Mejorar y personalizar tu experiencia en la plataforma
                </li>
                <li>✅ Prevenir fraudes y actividades sospechosas</li>
                <li>✅ Cumplir con obligaciones legales y fiscales</li>
              </ul>
            </section>

            <section>
              <h2>5. Compartición de Datos</h2>
              <p>
                No vendemos ni alquilamos tus datos personales. Compartimos
                información solo en los siguientes casos:
              </p>
              <ul>
                <li>
                  <strong>Proveedores de servicios:</strong> Supabase
                  (alojamiento de datos), APIs de geolocalización
                </li>
                <li>
                  <strong>Cumplimiento legal:</strong> Cuando sea requerido por
                  ley o proceso legal
                </li>
                <li>
                  <strong>Protección de derechos:</strong> Para proteger los
                  derechos, propiedad o seguridad de ClasiForm y sus usuarios
                </li>
                <li>
                  <strong>Con tu consentimiento:</strong> En cualquier otro
                  caso, te pediremos permiso explícito
                </li>
              </ul>
            </section>

            <section>
              <h2>6. Tus Derechos (GDPR/Argentina)</h2>
              <p>Como titular de datos, tienes los siguientes derechos:</p>
              <ul>
                <li>
                  <strong>Acceso:</strong> Saber qué datos tenemos sobre ti
                </li>
                <li>
                  <strong>Rectificación:</strong> Corregir datos inexactos
                </li>
                <li>
                  <strong>Supresión:</strong> Solicitar la eliminación de tus
                  datos (derecho al olvido)
                </li>
                <li>
                  <strong>Limitación:</strong> Restringir el tratamiento de tus
                  datos
                </li>
                <li>
                  <strong>Portabilidad:</strong> Recibir tus datos en formato
                  estructurado
                </li>
                <li>
                  <strong>Oposición:</strong> Oponente al tratamiento para
                  marketing
                </li>
              </ul>
              <p>
                Para ejercer estos derechos, contáctanos en:{" "}
                <strong>{emailAdmin}</strong>
              </p>
            </section>

            <section>
              <h2>7. Seguridad de los Datos</h2>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas para
                proteger tus datos:
              </p>
              <ul>
                <li>🔒 Cifrado SSL/TLS en todas las comunicaciones</li>
                <li>🔒 Almacenamiento seguro en Supabase</li>
                <li>🔒 Autenticación de dos factores (próximamente)</li>
                <li>🔒 Acceso restringido a datos personales</li>
                <li>🔒 Monitoreo continuo de actividades sospechosas</li>
              </ul>
            </section>

            <section>
              <h2>8. Retención de Datos</h2>
              <p>Conservamos tus datos mientras:</p>
              <ul>
                <li>Mantengas una cuenta activa en ClasiForm</li>
                <li>Sea necesario para los fines descritos en esta política</li>
                <li>
                  Existan obligaciones legales que requieran su conservación
                </li>
              </ul>
              <p>
                Cuando eliminas tu cuenta, tus datos personales se eliminan en
                un plazo máximo de 30 días, excepto aquellos que debamos
                conservar por requisitos legales (ej. facturación).
              </p>
            </section>

            <section>
              <h2>9. Menores de Edad</h2>
              <p>
                ClasiForm no está dirigido a menores de 18 años. No recopilamos
                conscientemente datos de menores. Si eres menor de 18 años, no
                debes registrarte ni usar nuestros servicios. Si descubrimos que
                hemos recopilado datos de un menor, los eliminaremos
                inmediatamente.
              </p>
            </section>

            <section>
              <h2>10. Cambios a esta Política</h2>
              <p>
                Podemos actualizar esta política periódicamente. Te
                notificaremos sobre cambios significativos mediante:
              </p>
              <ul>
                <li>Email a la dirección registrada</li>
                <li>Notificación en la plataforma</li>
                <li>Publicación de la nueva versión en esta página</li>
              </ul>
              <p>
                La fecha de "última actualización" indica cuándo se realizaron
                los últimos cambios.
              </p>
            </section>

            <section>
              <h2>11. Contacto</h2>
              <p>
                Si tienes preguntas sobre esta política o sobre tus datos
                personales, contáctanos:
              </p>
              <ul>
                <li>
                  📧 Email: <a href={emailAdmin}>{emailAdmin}</a>
                </li>
                <li>📞 Teléfono: +54 9 3764 65-1226</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
