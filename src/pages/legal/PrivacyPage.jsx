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
              <h2>1. Información General y Marco Legal</h2>
              <p>
                En ClasiForm valoramos tu privacidad y nos comprometemos a
                proteger tus datos personales. Esta Política de Privacidad se 
                rige por la normativa de la República Argentina, en especial la 
                <strong>Ley N.° 25.326 de Protección de Datos Personales</strong>, 
                su Decreto Reglamentario N.° 1558/2001 y las disposiciones de la 
                Agencia de Acceso a la Información Pública (AAIP).
              </p>
              <p>
                <strong>Responsable de la Base de Datos:</strong> ClasiForm
                <br />
                <strong>Email de contacto:</strong> {emailAdmin}
                <br />
                <strong>Actividad:</strong> Plataforma de intermediación de anuncios clasificados online
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
                El tratamiento de tus datos personales se realiza de manera lícita, 
                siendo la base principal tu <strong>consentimiento libre, expreso e informado</strong> 
                (Art. 5, Ley N.° 25.326), el cual otorgas al registrarte o utilizar nuestros servicios. 
                Asimismo, tratamos tus datos sobre las siguientes bases:
              </p>
              <ul>
                <li>
                  <strong>Ejecución de contrato:</strong> Para brindarte el servicio de publicación de anuncios y gestión de cuenta.
                </li>
                <li>
                  <strong>Interés legítimo:</strong> Para mejorar nuestros servicios, mantener la seguridad técnica de la plataforma y prevenir el fraude.
                </li>
                <li>
                  <strong>Cumplimiento legal:</strong> Para cumplir con obligaciones fiscales, legales o responder a requerimientos de autoridades competentes.
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
              <h2>5. Compartición y Transferencia Internacional de Datos</h2>
              <p>
                No vendemos ni alquilamos tus datos personales. Compartimos
                información solo en los siguientes casos:
              </p>
              <ul>
                <li>
                  <strong>Proveedores de servicios (Transferencia Internacional):</strong> 
                  Utilizamos proveedores de infraestructura en la nube (como Supabase) 
                  que pueden alojar datos en servidores ubicados fuera de la República Argentina. 
                  Al aceptar esta política, <strong>prestas tu consentimiento expreso para la 
                  transferencia internacional de tus datos</strong> (Art. 12, Ley N.° 25.326) 
                  a jurisdicciones que cuenten con niveles de protección adecuados o bajo 
                  mecanismos contractuales aprobados.
                </li>
                <li>
                  <strong>Cumplimiento legal y autoridades:</strong> Cuando sea formalmente requerido por 
                  jueces, fiscales o autoridades gubernamentales competentes.
                </li>
                <li>
                  <strong>Protección de derechos:</strong> Para proteger los derechos, propiedad o seguridad de ClasiForm, sus usuarios o el público general frente a actividades ilícitas.
                </li>
              </ul>
            </section>

            <section>
              <h2>6. Tus Derechos (Ley N.° 25.326)</h2>
              <p>
                Conforme a los arts. 14, 15 y 16 de la Ley N.° 25.326, como titular de los datos personales tienes derecho a:
              </p>
              <ul>
                <li>
                  <strong>Acceso:</strong> Solicitar y obtener información sobre tus datos almacenados de forma gratuita a intervalos no inferiores a seis meses (salvo interés legítimo).
                </li>
                <li>
                  <strong>Rectificación y Actualización:</strong> Corregir o actualizar datos falsos, inexactos o incompletos.
                </li>
                <li>
                  <strong>Supresión (Derecho al olvido):</strong> Solicitar la eliminación de tus datos cuando ya no sean necesarios o desees retirar tu consentimiento.
                </li>
              </ul>
              <p>
                Para ejercer estos derechos, debes enviar un correo a <strong>{emailAdmin}</strong> acreditando tu identidad.
              </p>
              <p>
                <strong>Información Legal Obligatoria:</strong> "LA AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales."
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
