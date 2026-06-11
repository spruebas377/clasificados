// components/layout/Footer.jsx
import { memo } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo" aria-label="Pie de página">
      <div className="container">
        <div className="footer__content">
          {/* Logo o marca */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <i className="fas fa-rocket"></i>
              <span>
                Clasi<span className="highlight">Form</span>
              </span>
            </Link>
          </div>

          {/* Enlaces legales - usar nav para accesibilidad */}
          <nav className="footer__nav" aria-label="Enlaces legales">
            <ul className="footer__links">
              <li>
                <Link to="/privacidad" className="footer__link">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="footer__link">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="footer__link">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Copyright */}
        <div className="footer__copyright">
          <p>&copy; {currentYear} ClasiForm - Todos los derechos reservados</p>
          <p className="footer__small">
            Hecho con{" "}
            <i className="fas fa-heart" style={{ color: "#ff4757" }}></i> en
            Formosa
          </p>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
