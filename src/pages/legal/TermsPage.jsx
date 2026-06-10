// pages/legal/TermsPage.jsx
import { useEffect } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Términos y Condiciones - ClasiForm";
  }, []);

  return (
    <>
      <Header />
      <main className="legal-page">
        <div className="container legal-container">
          <div className="legal-header">
            <h1>Términos y Condiciones de Uso</h1>
            <p className="legal-date">
              Última actualización: {new Date().toLocaleDateString("es-AR")}
            </p>
          </div>

          <div className="legal-content">
            <section>
              <h2>1. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar ClasiForm, aceptas cumplir con estos
                Términos y Condiciones. Si no estás de acuerdo con alguna parte,
                no debes utilizar nuestra plataforma.
              </p>
            </section>

            <section>
              <h2>2. Descripción del Servicio</h2>
              <p>
                ClasiForm es una plataforma de anuncios clasificados que permite
                a los usuarios publicar, buscar y contactar sobre productos y
                servicios. Actuamos como un intermediario y no somos parte de
                ninguna transacción entre usuarios.
              </p>
            </section>

            <section>
              <h2>3. Elegibilidad</h2>
              <p>Para usar ClasiForm, debes:</p>
              <ul>
                <li>Tener al menos 18 años de edad</li>
                <li>Ser capaz de celebrar contratos legalmente vinculantes</li>
                <li>Proporcionar información veraz y actualizada</li>
                <li>
                  No estar prohibido de usar el servicio por leyes aplicables
                </li>
              </ul>
            </section>

            <section>
              <h2>4. Registro y Cuenta</h2>
              <h3>4.1 Responsabilidades de la Cuenta</h3>
              <p>Eres responsable de:</p>
              <ul>
                <li>Mantener la confidencialidad de tu contraseña</li>
                <li>Todas las actividades que ocurran en tu cuenta</li>
                <li>
                  Notificarnos inmediatamente sobre accesos no autorizados
                </li>
                <li>Proporcionar información precisa y actualizada</li>
              </ul>

              <h3>4.2 Suspensión de Cuenta</h3>
              <p>Podemos suspender o terminar tu cuenta si:</p>
              <ul>
                <li>Violas estos términos</li>
                <li>Publicas contenido prohibido</li>
                <li>Realizas actividades fraudulentas</li>
                <li>Recibimos múltiples quejas sobre tus publicaciones</li>
              </ul>
            </section>

            <section>
              <h2>5. Reglas de Publicación</h2>
              <h3>5.1 Contenido Permitido</h3>
              <p>
                Puedes publicar anuncios sobre productos y servicios legales,
                siempre que:
              </p>
              <ul>
                <li>El producto/servicio sea legal en Argentina</li>
                <li>La descripción sea veraz y no engañosa</li>
                <li>Las imágenes correspondan al producto real</li>
                <li>El precio sea claro y no incluya costos ocultos</li>
              </ul>

              <h3>5.2 Contenido Prohibido</h3>
              <p>
                <strong>No está permitido publicar:</strong>
              </p>
              <ul>
                <li>❌ Productos ilegales (drogas, armas sin permiso, etc.)</li>
                <li>❌ Contenido discriminatorio u ofensivo</li>
                <li>❌ Información falsa o engañosa</li>
                <li>❌ Material protegido por derechos de autor sin permiso</li>
                <li>❌ Esquemas piramidales o estafas</li>
                <li>
                  ❌ Servicios sexuales explícitos (excepto acompañantes +18 con
                  verificación)
                </li>
                <li>❌ Datos personales de terceros</li>
              </ul>
            </section>

            <section>
              <h2>6. Contenido para Adultos (+18)</h2>
              <p>
                Las publicaciones en la categoría "Servicios +18" están sujetas
                a reglas adicionales:
              </p>
              <ul>
                <li>
                  Solo visibles para usuarios que hayan verificado ser mayores
                  de 18 años
                </li>
                <li>
                  No se permite contenido ilegal o explícitamente sexual gráfico
                </li>
                <li>Los anuncios deben ser profesionales y respetuosos</li>
                <li>
                  ClasiForm no se hace responsable de acuerdos entre usuarios
                </li>
              </ul>
            </section>

            <section>
              <h2>7. Propiedad Intelectual</h2>
              <h3>7.1 Nuestro Contenido</h3>
              <p>
                El diseño, logo, nombre "ClasiForm" y código de la plataforma
                son propiedad de ClasiForm y están protegidos por derechos de
                autor.
              </p>

              <h3>7.2 Tu Contenido</h3>
              <p>
                Conservas la propiedad de tus publicaciones, pero nos otorgas
                una licencia para mostrar, distribuir y promocionar tu contenido
                en la plataforma.
              </p>
            </section>

            <section>
              <h2>8. Limitación de Responsabilidad</h2>
              <p>
                <strong>ClasiForm no se hace responsable de:</strong>
              </p>
              <ul>
                <li>
                  Transacciones entre usuarios (somos solo un intermediario)
                </li>
                <li>La veracidad de la información en los anuncios</li>
                <li>Daños derivados del uso de la plataforma</li>
                <li>
                  Interrupciones del servicio por mantenimiento o causas
                  externas
                </li>
              </ul>
              <p>
                El uso de la plataforma es bajo tu propio riesgo. Recomendamos
                tomar precauciones al concretar transacciones con desconocidos.
              </p>
            </section>

            <section>
              <h2>9. Conducta del Usuario</h2>
              <p>Al usar ClasiForm, aceptas:</p>
              <ul>
                <li>No acosar, intimidar o dañar a otros usuarios</li>
                <li>No usar la plataforma para actividades ilegales</li>
                <li>No manipular precios o votaciones</li>
                <li>No usar bots o scripts automatizados</li>
                <li>No publicar información falsa sobre otros usuarios</li>
              </ul>
            </section>

            <section>
              <h2>10. Precios y Pagos</h2>
              <p>
                Actualmente, publicar anuncios es gratuito. Nos reservamos el
                derecho de introducir servicios de pago en el futuro, con
                notificación previa y opciones gratuitas alternativas.
              </p>
            </section>

            <section>
              <h2>11. Modificaciones del Servicio</h2>
              <p>
                Podemos modificar, suspender o discontinuar el servicio en
                cualquier momento. Los cambios sustanciales serán notificados
                con al menos 15 días de anticipación.
              </p>
            </section>

            <section>
              <h2>12. Ley Aplicable</h2>
              <p>
                Estos términos se rigen por las leyes de la República Argentina.
                Cualquier disputa será resuelta por los tribunales de la ciudad
                de Formosa, Argentina.
              </p>
            </section>

            <section>
              <h2>13. Contacto</h2>
              <p>
                Para preguntas sobre estos términos, contáctanos en:{" "}
                <strong>legal@clasiform.com.ar</strong>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
