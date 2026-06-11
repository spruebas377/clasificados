// pages/legal/CookiesPage.jsx
import { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function CookiesPage() {
  const [cookieSettings, setCookieSettings] = useState({
    necesarias: true,
    analiticas: false,
    preferencias: false,
    marketing: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Política de Cookies - ClasiForm";

    // Cargar preferencias guardadas
    const saved = localStorage.getItem("cookie_preferences");
    if (saved) {
      setCookieSettings(JSON.parse(saved));
    }
  }, []);

  const savePreferences = () => {
    localStorage.setItem("cookie_preferences", JSON.stringify(cookieSettings));
    localStorage.setItem("cookies_accepted", "true");
    alert("Preferencias guardadas correctamente");
    window.location.reload();
  };

  const acceptAll = () => {
    const allTrue = {
      necesarias: true,
      analiticas: true,
      preferencias: true,
      marketing: true,
    };
    setCookieSettings(allTrue);
    localStorage.setItem("cookie_preferences", JSON.stringify(allTrue));
    localStorage.setItem("cookies_accepted", "true");
    alert("Has aceptado todas las cookies");
    window.location.reload();
  };

  const rejectAll = () => {
    const allFalse = {
      necesarias: true, // Las necesarias siempre son obligatorias
      analiticas: false,
      preferencias: false,
      marketing: false,
    };
    setCookieSettings(allFalse);
    localStorage.setItem("cookie_preferences", JSON.stringify(allFalse));
    localStorage.setItem("cookies_accepted", "true");
    alert("Solo se utilizarán cookies necesarias");
    window.location.reload();
  };

  return (
    <>
      <Header />
      <main className="legal-page">
        <div className="container legal-container">
          <div className="legal-header">
            <h1>Política de Cookies</h1>
            <p className="legal-date">
              Última actualización: {new Date().toLocaleDateString("es-AR")}
            </p>
          </div>

          <div className="legal-content">
            <section>
              <h2>1. ¿Qué son las Cookies?</h2>
              <p>
                Las cookies son pequeños archivos de texto que los sitios web
                colocan en tu dispositivo para almacenar información sobre tu
                navegación, preferencias y actividades.
              </p>
            </section>

            <section>
              <h2>2. Tipos de Cookies que Utilizamos</h2>

              <div className="cookie-table">
                <div className="cookie-category">
                  <h3>🍪 Cookies Necesarias (siempre activas)</h3>
                  <p>
                    Esenciales para el funcionamiento básico de la web. No
                    pueden desactivarse.
                  </p>
                  <ul>
                    <li>
                      <strong>session_id:</strong> Mantiene tu sesión iniciada
                    </li>
                    <li>
                      <strong>csrf_token:</strong> Protege contra ataques de
                      falsificación
                    </li>
                    <li>
                      <strong>age_verified:</strong> Guarda la verificación de
                      edad
                    </li>
                  </ul>
                </div>

                <div className="cookie-category">
                  <h3>📊 Cookies Analíticas</h3>
                  <p>Nos ayudan a entender cómo usas la web para mejorarla.</p>
                  <label className="cookie-toggle">
                    <input
                      type="checkbox"
                      checked={cookieSettings.analiticas}
                      onChange={(e) =>
                        setCookieSettings({
                          ...cookieSettings,
                          analiticas: e.target.checked,
                        })
                      }
                    />
                    <span>Activar cookies analíticas</span>
                  </label>
                  <ul>
                    <li>
                      <strong>_ga:</strong> Google Analytics - diferencia
                      usuarios
                    </li>
                    <li>
                      <strong>_gid:</strong> Google Analytics - sesiones de
                      usuario
                    </li>
                  </ul>
                </div>

                <div className="cookie-category">
                  <h3>⚙️ Cookies de Preferencias</h3>
                  <p>Recuerdan tus preferencias y configuraciones.</p>
                  <label className="cookie-toggle">
                    <input
                      type="checkbox"
                      checked={cookieSettings.preferencias}
                      onChange={(e) =>
                        setCookieSettings({
                          ...cookieSettings,
                          preferencias: e.target.checked,
                        })
                      }
                    />
                    <span>Activar cookies de preferencias</span>
                  </label>
                  <ul>
                    <li>
                      <strong>theme:</strong> Tu tema preferido (claro/oscuro)
                    </li>
                    <li>
                      <strong>filters:</strong> Últimos filtros de búsqueda
                      usados
                    </li>
                  </ul>
                </div>

                <div className="cookie-category">
                  <h3>🎯 Cookies de Marketing</h3>
                  <p>Se usan para mostrarte publicidad relevante.</p>
                  <label className="cookie-toggle">
                    <input
                      type="checkbox"
                      checked={cookieSettings.marketing}
                      onChange={(e) =>
                        setCookieSettings({
                          ...cookieSettings,
                          marketing: e.target.checked,
                        })
                      }
                    />
                    <span>Activar cookies de marketing</span>
                  </label>
                  <ul>
                    <li>
                      <strong>_fbp:</strong> Facebook Pixel - publicidad
                      personalizada
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2>3. Gestión de Cookies</h2>
              <div className="cookie-buttons">
                <button
                  onClick={acceptAll}
                  className="btn-primary"
                  style={{
                    marginRight: "1rem",
                    fontFamily:
                      "'Outfit', 'Inter', system-ui, -apple-system, sans-serif",
                  }}
                >
                  Aceptar todas
                </button>
                <button
                  onClick={rejectAll}
                  className="btn-secondary"
                  style={{
                    marginRight: "1rem",
                    fontFamily:
                      "'Outfit', 'Inter', system-ui, -apple-system, sans-serif",
                  }}
                >
                  Rechazar todas
                </button>
                <button
                  onClick={savePreferences}
                  className="btn-outline"
                  style={{
                    fontFamily:
                      "'Outfit', 'Inter', system-ui, -apple-system, sans-serif",
                  }}
                >
                  Guardar preferencias
                </button>
              </div>
              <p>También puedes gestionar las cookies desde tu navegador:</p>
              <ul>
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/es/kb/Borrar%20cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Edge
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2>4. Duración de las Cookies</h2>
              <ul>
                <li>
                  <strong>Cookies de sesión:</strong> Se eliminan al cerrar el
                  navegador
                </li>
                <li>
                  <strong>Cookies persistentes:</strong> Permanece hasta 30 días
                  (o hasta que las borres)
                </li>
              </ul>
            </section>

            <section>
              <h2>5. Cookies de Terceros</h2>
              <p>Algunas cookies son de servicios externos que usamos:</p>
              <ul>
                <li>
                  <strong>Supabase:</strong> Autenticación y base de datos
                </li>
                <li>
                  <strong>Google Analytics:</strong> Estadísticas de uso
                </li>
                <li>
                  <strong>Facebook Pixel:</strong> (si activas marketing)
                </li>
              </ul>
            </section>

            <section>
              <h2>6. Contacto</h2>
              <p>
                Para consultas sobre cookies:{" "}
                <strong>cookies@clasiform.com.ar</strong>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
