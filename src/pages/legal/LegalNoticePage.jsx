// pages/legal/LegalNoticePage.jsx
import { useEffect } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const emailAdmin = import.meta.env.VITE_ADMIN_EMAIL;

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
            {/* === SECCIÓN 1: IDENTIFICACIÓN === */}
            <section>
              <h2>1. Identificación del Titular</h2>
              <p>
                En cumplimiento con la normativa vigente en la República
                Argentina, incluyendo la Ley N.° 24.240 de Defensa del
                Consumidor y su modificatoria Ley N.° 26.361, la Ley N.° 25.326
                de Protección de Datos Personales y la Resolución N.° 104/2005
                de la Secretaría de Coordinación Técnica del Ministerio de
                Economía y Producción, se informa que el titular de ClasiForm
                es:
              </p>
              <ul className="legal-contact-info">
                <li>
                  <strong>Nombre/Razón Social:</strong> [Tu nombre o razón
                  social]
                </li>
                <li>
                  <strong>CUIT/CUIL:</strong> [Tu número de CUIT/CUIL]
                </li>
                <li>
                  <strong>Domicilio legal:</strong> [Tu dirección completa],
                  Ciudad de Formosa, Provincia de Formosa, República Argentina
                </li>
                <li>
                  <strong>Email:</strong> {emailAdmin}
                </li>
                <li>
                  <strong>Teléfono:</strong> [Tu teléfono]
                </li>
                <li>
                  <strong>Condición ante AFIP:</strong> [Monotributista /
                  Responsable Inscripto / Exento]
                </li>
              </ul>
            </section>

            {/* === SECCIÓN 2: MARCO LEGAL === */}
            <section>
              <h2>2. Marco Legal Aplicable</h2>
              <p>
                El presente sitio web y todos los servicios ofrecidos a través de
                ClasiForm se encuentran regidos por la legislación de la
                República Argentina, en particular:
              </p>
              <ul>
                <li>
                  <strong>Ley N.° 24.240</strong> — Defensa del Consumidor (y
                  sus modificatorias, incluyendo la Ley N.° 26.361)
                </li>
                <li>
                  <strong>Ley N.° 25.326</strong> — Protección de Datos
                  Personales y su Decreto Reglamentario 1558/2001
                </li>
                <li>
                  <strong>Ley N.° 26.032</strong> — Libertad de expresión en
                  Internet
                </li>
                <li>
                  <strong>Ley N.° 27.078</strong> — Argentina Digital
                  (Tecnologías de la Información y las Comunicaciones)
                </li>
                <li>
                  <strong>Resolución N.° 104/2005</strong> — Secretaría de
                  Coordinación Técnica (información al consumidor en comercio
                  electrónico)
                </li>
                <li>
                  <strong>
                    Código Civil y Comercial de la Nación (Ley N.° 26.994)
                  </strong>{" "}
                  — Contratos de consumo (arts. 1092 a 1122)
                </li>
              </ul>
            </section>

            {/* === SECCIÓN 3: CONDICIONES DE USO === */}
            <section>
              <h2>3. Condiciones Generales de Uso</h2>
              <p>
                El acceso y uso de ClasiForm implica la aceptación plena e
                incondicional de nuestras{" "}
                <a href="/terminos">Condiciones Generales de Uso</a>,{" "}
                <a href="/privacidad">Política de Privacidad</a> y{" "}
                <a href="/cookies">Política de Cookies</a>. De conformidad con
                el art. 1105 del Código Civil y Comercial de la Nación, se
                considera que el usuario presta su consentimiento al utilizar la
                plataforma.
              </p>
              <p>
                La publicación de anuncios clasificados en su modalidad básica es{" "}
                <strong>gratuita</strong>. ClasiForm ofrece adicionalmente un
                servicio pago denominado{" "}
                <strong>Publicación Destacada (Premium)</strong>, cuyas
                condiciones se detallan en la sección correspondiente del
                presente aviso legal.
              </p>
            </section>

            {/* === SECCIÓN 4: SERVICIO PREMIUM === */}
            <section>
              <h2>4. Condiciones del Servicio Premium (Publicación Destacada)</h2>

              <h3>4.1. Descripción del Servicio</h3>
              <p>
                El servicio Premium de ClasiForm permite al usuario destacar su
                anuncio para que aparezca en posiciones prioritarias dentro de
                los resultados de búsqueda, con una insignia y marco visual
                diferenciado ("Destacado"). Este servicio es de carácter{" "}
                <strong>opcional</strong> y no condiciona el acceso a las
                funcionalidades básicas y gratuitas de la plataforma.
              </p>

              <h3>4.2. Planes y Precios</h3>
              <p>
                ClasiForm ofrece los siguientes planes Premium, con precios
                expresados en Pesos Argentinos (ARS) e IVA incluido cuando
                corresponda:
              </p>
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>Duración</th>
                    <th>Precio</th>
                    <th>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Exprés</td>
                    <td>1 día (24 horas)</td>
                    <td>$1.000 ARS</td>
                    <td>Visibilidad exprés por 24 horas</td>
                  </tr>
                  <tr>
                    <td>Semanal</td>
                    <td>7 días</td>
                    <td>$3.500 ARS</td>
                    <td>Una semana completa de exposición prioritaria</td>
                  </tr>
                  <tr>
                    <td>Mensual</td>
                    <td>30 días</td>
                    <td>$9.000 ARS</td>
                    <td>Un mes completo en posiciones destacadas</td>
                  </tr>
                </tbody>
              </table>
              <p>
                Los precios podrán ser modificados por ClasiForm con un preaviso
                de al menos <strong>15 (quince) días corridos</strong>,
                conforme al art. 19 de la Ley N.° 24.240. Las modificaciones no
                afectarán a planes ya contratados y vigentes al momento del
                cambio.
              </p>

              <h3>4.3. Medios de Pago</h3>
              <p>
                Los pagos del servicio Premium se procesan a través de{" "}
                <strong>Mercado Pago</strong>, plataforma habilitada por el Banco
                Central de la República Argentina (BCRA) como Proveedor de
                Servicios de Pago (PSP). También se acepta el pago por{" "}
                <strong>transferencia bancaria directa</strong>. En este último
                caso, la activación del servicio queda sujeta a la verificación
                manual del pago por parte del administrador.
              </p>
              <p>
                De conformidad con la Resolución N.° 104/2005, se informa al
                usuario que:
              </p>
              <ul>
                <li>
                  El cargo se realizará en la moneda indicada (ARS — Pesos
                  Argentinos).
                </li>
                <li>
                  El usuario recibirá confirmación del pago y activación del
                  servicio por los medios electrónicos proporcionados.
                </li>
                <li>
                  Los datos de pago son procesados íntegramente por Mercado Pago;
                  ClasiForm no almacena datos de tarjetas de crédito ni
                  credenciales bancarias del usuario.
                </li>
              </ul>

              <h3>4.4. Activación y Vigencia</h3>
              <p>
                El servicio Premium se activa de forma{" "}
                <strong>inmediata</strong> una vez confirmado el pago a través de
                Mercado Pago, o una vez verificado el pago por transferencia
                bancaria por el administrador. La duración del destacado se
                computa desde el momento de la activación y expira
                automáticamente al cumplirse el plazo contratado, sin
                renovación automática ni cargos adicionales.
              </p>

              <h3>4.5. Derecho de Revocación y Reembolsos</h3>
              <p>
                En virtud del <strong>art. 34 de la Ley N.° 24.240</strong>{" "}
                (derecho de revocación en contratos celebrados fuera del
                establecimiento comercial y a distancia), el usuario consumidor
                tiene derecho a revocar la contratación del servicio Premium
                dentro de los{" "}
                <strong>10 (diez) días corridos</strong> contados desde la
                contratación, sin necesidad de indicar motivo y sin penalidad
                alguna.
              </p>
              <p>
                Para ejercer este derecho, el usuario deberá comunicarlo por
                escrito a <strong>{emailAdmin}</strong>. El reembolso se
                efectuará por el mismo medio de pago utilizado, dentro de los{" "}
                <strong>10 (diez) días hábiles</strong> siguientes a la
                recepción de la solicitud.
              </p>
              <p>
                <strong>Excepciones al reembolso:</strong> No procederá el
                reembolso cuando el servicio haya sido completamente prestado
                (el período contratado haya expirado) antes de ejercer el
                derecho de revocación, conforme lo dispuesto por el art. 1116
                del Código Civil y Comercial de la Nación.
              </p>

              <h3>4.6. Cancelación y Suspensión del Servicio Premium</h3>
              <p>
                ClasiForm se reserva el derecho de cancelar o suspender el
                servicio Premium sin reembolso en los siguientes casos:
              </p>
              <ul>
                <li>
                  Incumplimiento de las{" "}
                  <a href="/terminos">Condiciones Generales de Uso</a>
                </li>
                <li>
                  Publicación de contenido prohibido, ilegal o que infrinja
                  derechos de terceros
                </li>
                <li>Conducta fraudulenta o abusiva del usuario</li>
                <li>Denuncia verificada por parte de otros usuarios</li>
              </ul>
              <p>
                En caso de cancelación injustificada por parte de ClasiForm, se
                reembolsará al usuario la parte proporcional del servicio no
                utilizado.
              </p>

              <h3>4.7. Garantía del Servicio</h3>
              <p>
                ClasiForm garantiza que el anuncio destacado será exhibido en
                posiciones prioritarias durante la totalidad del período
                contratado, salvo por interrupciones técnicas de carácter
                excepcional o mantenimiento programado. En caso de
                interrupciones superiores a <strong>24 horas continuas</strong>,
                el período de destacado se extenderá por un lapso equivalente al
                tiempo de interrupción, sin costo adicional para el usuario.
              </p>
            </section>

            {/* === SECCIÓN 5: PROPIEDAD INTELECTUAL === */}
            <section>
              <h2>5. Propiedad Intelectual e Industrial</h2>
              <p>
                De conformidad con la{" "}
                <strong>Ley N.° 11.723 de Propiedad Intelectual</strong> de la
                República Argentina, los derechos de propiedad intelectual sobre
                el diseño, código fuente, logotipo, nombre "ClasiForm", base de
                datos y demás contenidos originales de la plataforma pertenecen
                exclusivamente a su titular. Queda prohibida su reproducción,
                distribución, comunicación pública o transformación sin
                autorización expresa y por escrito.
              </p>
            </section>

            {/* === SECCIÓN 6: PROTECCIÓN DE DATOS === */}
            <section>
              <h2>6. Protección de Datos Personales</h2>
              <p>
                En cumplimiento de la{" "}
                <strong>Ley N.° 25.326 de Protección de Datos Personales</strong>{" "}
                y su Decreto Reglamentario 1558/2001, ClasiForm informa que los
                datos personales recopilados son tratados con la finalidad de
                brindar el servicio solicitado por el usuario, incluyendo la
                gestión de publicaciones, la administración de cuentas y el
                procesamiento de pagos del servicio Premium.
              </p>
              <p>
                El titular de los datos tiene derecho a acceder, rectificar,
                suprimir y actualizar sus datos personales, conforme al art. 14
                de la Ley N.° 25.326. Para ejercer estos derechos, podrá
                dirigirse a <strong>{emailAdmin}</strong>.
              </p>
              <p>
                La Agencia de Acceso a la Información Pública (AAIP), en su
                carácter de Órgano de Control de la Ley N.° 25.326, tiene la
                atribución de atender las denuncias y reclamos que interpongan
                quienes resulten afectados en sus derechos.
              </p>
              <p>
                Para más detalles, consulte nuestra{" "}
                <a href="/privacidad">Política de Privacidad</a>.
              </p>
            </section>

            {/* === SECCIÓN 7: RESPONSABILIDAD === */}
            <section>
              <h2>7. Limitación de Responsabilidad</h2>
              <p>
                ClasiForm actúa como mero intermediario en las operaciones entre
                usuarios, conforme al art. 40 de la Ley N.° 24.240. Sin
                perjuicio de las obligaciones legales aplicables, ClasiForm no
                se hace responsable de:
              </p>
              <ul>
                <li>
                  La veracidad, exactitud o legalidad de la información
                  publicada por los usuarios en sus anuncios
                </li>
                <li>
                  Las transacciones, acuerdos o conflictos que surjan entre
                  usuarios de la plataforma
                </li>
                <li>
                  Daños directos, indirectos o consecuentes derivados del uso de
                  la plataforma
                </li>
                <li>
                  Interrupciones del servicio por causas de fuerza mayor,
                  mantenimiento programado o fallas de terceros proveedores
                </li>
              </ul>
              <p>
                La presente limitación no excluye ni restringe los derechos
                irrenunciables del consumidor establecidos por la Ley N.° 24.240
                y el Código Civil y Comercial de la Nación.
              </p>
            </section>

            {/* === SECCIÓN 8: DEFENSA DEL CONSUMIDOR === */}
            <section>
              <h2>8. Derechos del Consumidor</h2>
              <p>
                En cumplimiento de la normativa argentina de defensa del
                consumidor, se informa:
              </p>
              <ul>
                <li>
                  El usuario tiene derecho a información cierta, clara y
                  detallada de los servicios ofrecidos (art. 4, Ley N.° 24.240).
                </li>
                <li>
                  Queda garantizado el derecho de revocación en los términos del
                  art. 34 de la Ley N.° 24.240 para todos los servicios pagos
                  contratados a distancia.
                </li>
                <li>
                  ClasiForm se compromete a atender reclamos y consultas en un
                  plazo máximo de <strong>10 (diez) días hábiles</strong>.
                </li>
                <li>
                  Ante cualquier controversia no resuelta, el usuario puede
                  acudir al Servicio de Conciliación Previa en las Relaciones de
                  Consumo (COPREC) o a la Dirección de Defensa del Consumidor de
                  la Provincia de Formosa.
                </li>
              </ul>
            </section>

            {/* === SECCIÓN 9: JURISDICCIÓN === */}
            <section>
              <h2>9. Ley Aplicable y Jurisdicción</h2>
              <p>
                El presente aviso legal y todas las relaciones jurídicas
                derivadas de los servicios de ClasiForm, incluyendo el servicio
                Premium, se rigen por las leyes de la{" "}
                <strong>República Argentina</strong>. Para toda controversia que
                no pueda resolverse de manera amigable, las partes se someten a
                la jurisdicción de los{" "}
                <strong>
                  Juzgados Ordinarios de la Ciudad de Formosa, Provincia de
                  Formosa
                </strong>
                , sin perjuicio del derecho del consumidor de elegir el tribunal
                correspondiente a su domicilio, conforme al art. 36 de la Ley
                N.° 24.240.
              </p>
            </section>

            {/* === SECCIÓN 10: CONTACTO === */}
            <section>
              <h2>10. Contacto para Notificaciones y Reclamos</h2>
              <p>
                Para comunicaciones oficiales, notificaciones judiciales,
                ejercicio de derechos de consumidor, solicitudes de reembolso o
                cualquier consulta relacionada con el servicio Premium:
              </p>
              <ul className="legal-contact-info">
                <li>
                  <strong>Email:</strong> {emailAdmin}
                </li>
                <li>
                  <strong>Domicilio legal:</strong> [Tu dirección completa],
                  Ciudad de Formosa, Provincia de Formosa, Argentina
                </li>
                <li>
                  <strong>Horario de atención:</strong> Lunes a viernes de 9:00
                  a 18:00 hs (hora Argentina, GMT-3)
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
