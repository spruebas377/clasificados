// pages/legal/LegalNoticePage.jsx
import { useEffect } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function LegalNoticePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Aviso Legal - ClasiForm";
  }, []);

  return (
    <>
      <Header />
      <main className="legal-page">
        <div className="container legal-container">
          <div className="legal-header">
            <h1>Aviso Legal</h1>
            <p className="legal-date">
              Última actualización: {new Date().toLocaleDateString("es-AR")}
            </p>
          </div>

          <div className="legal-content">
            <section>
              <h2>Identificación del Titular</h2>
              <p>
                En cumplimiento con la Ley 34/2002 de Servicios de la Sociedad
                de la Información y de Comercio Electrónico (LSSI-CE), te
                informamos que el titular de ClasiForm es:
              </p>
              <ul className="legal-contact-info">
                <li>
                  <strong>Nombre/Titular:</strong> [Tu nombre o razón social]
                </li>
                <li>
                  <strong>NIF/CIF:</strong> [Tu número de identificación fiscal]
                </li>
                <li>
                  <strong>Domicilio:</strong> [Tu dirección completa]
                </li>
                <li>
                  <strong>Email:</strong> info@clasiform.com.ar
                </li>
                <li>
                  <strong>Teléfono:</strong> [Tu teléfono]
                </li>
                <li>
                  <strong>Datos registrales:</strong> [Si aplica, datos de
                  registro mercantil]
                </li>
              </ul>
            </section>

            <section>
              <h2>Condiciones de Uso</h2>
              <p>
                El acceso y uso de ClasiForm implica la aceptación plena de
                nuestras <a href="/terminos">Condiciones Generales de Uso</a>,{" "}
                <a href="/privacidad">Política de Privacidad</a> y{" "}
                <a href="/cookies">Política de Cookies</a>.
              </p>
            </section>

            <section>
              <h2>Propiedad Intelectual e Industrial</h2>
              <p>
                Los derechos de propiedad intelectual sobre el diseño, código,
                logo y nombre "ClasiForm" pertenecen al titular del sitio. Queda
                prohibida la reproducción, distribución o modificación sin
                autorización expresa.
              </p>
            </section>

            <section>
              <h2>Responsabilidad</h2>
              <p>
                ClasiForm actúa como mero intermediario. No nos hacemos
                responsables de:
              </p>
              <ul>
                <li>La veracidad de la información publicada por usuarios</li>
                <li>Las transacciones realizadas entre usuarios</li>
                <li>Daños derivados del uso de la plataforma</li>
                <li>Interrupciones técnicas del servicio</li>
              </ul>
            </section>

            <section>
              <h2>Ley Aplicable y Jurisdicción</h2>
              <p>
                Estas condiciones se rigen por la legislación argentina.
                Cualquier controversia se someterá a los juzgados y tribunales
                de la ciudad de Formosa, Argentina.
              </p>
            </section>

            <section>
              <h2>Contacto para Notificaciones</h2>
              <p>
                Para comunicaciones oficiales o notificaciones judiciales:{" "}
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
