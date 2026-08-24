import { useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import Modal from "../ui/Modal";

export default function AuthModal({ isOpen, onClose, initialMode = "login" }) {
  const { signInWithPassword, signUp, signInWithGoogle, signInWithFacebook } =
    useAuth();
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSubmitting(true);
      try {
        if (mode === "login") {
          await signInWithPassword(email, password);
          onClose();
        } else {
          const data = await signUp(email, password);
          if (data?.user && !data?.session) {
            alert(
              "Registro exitoso. Por favor, revisa tu correo electrónico para confirmar tu cuenta y poder iniciar sesión.",
            );
          } else {
            alert("Registro exitoso. Ya puedes iniciar sesión.");
          }
          onClose();
        }
        setEmail("");
        setPassword("");
        setAcceptedTerms(false);
      } catch (error) {
        alert(error.message);
      } finally {
        setSubmitting(false);
      }
    },
    [mode, email, password, signInWithPassword, signUp, onClose],
  );

  const handleGoogleLogin = useCallback(async () => {
    if (!acceptedTerms) {
      alert("Debes aceptar los Términos y Condiciones, la Política de Privacidad y el Aviso Legal para continuar.");
      return;
    }
    try {
      await signInWithGoogle();
    } catch (error) {
      alert("Error: " + error.message);
    }
  }, [signInWithGoogle, acceptedTerms]);

  const handleFacebookLogin = useCallback(async () => {
    try {
      await signInWithFacebook();
    } catch (error) {
      alert("Error: " + error.message);
    }
  }, [signInWithFacebook]);

  const toggleMode = useCallback((e) => {
    e.preventDefault();
    setMode((prev) => (prev === "login" ? "register" : "login"));
    setAcceptedTerms(false);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="400px">
      <div className="modal__header">
        <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <i className="fas fa-lock"></i>
          {mode === "login" ? "Iniciar Sesión" : "Registrarse"}
        </h3>
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="modal__icon">
        <i className="fas fa-user-circle"></i>
      </div>
      <form className="publish-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="authEmail">Email</label>
          <input
            type="email"
            id="authEmail"
            required
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="authPassword">Contraseña</label>
          <input
            type="password"
            id="authPassword"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
          />
        </div>
        {mode === "register" && (
          <div className="form-group checkbox-group" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '1rem', marginBottom: '1.5rem' }}>
            <input 
              type="checkbox" 
              id="acceptTerms" 
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              required
              style={{ marginTop: '0.2rem' }}
            />
            <label htmlFor="acceptTerms" style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
              He leído y acepto los <a href="/terminos" target="_blank" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Términos y Condiciones</a>, la <a href="/privacidad" target="_blank" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Política de Privacidad</a> y confirmo haber leído el <a href="/aviso-legal" target="_blank" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Aviso Legal</a>.
            </label>
          </div>
        )}
        <button type="submit" className="btn-submit" disabled={submitting}>
          {submitting
            ? "Procesando..."
            : mode === "login"
              ? "Entrar"
              : "Registrarse"}
        </button>

        <div className="auth-separator">
          <span>O continúa con</span>
        </div>

        {mode === "login" && (
          <div className="form-group checkbox-group" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1rem' }}>
            <input 
              type="checkbox" 
              id="acceptTermsGoogle" 
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              style={{ marginTop: '0.2rem' }}
            />
            <label htmlFor="acceptTermsGoogle" style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
              He leído y acepto los <a href="/terminos" target="_blank" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Términos y Condiciones</a>, la <a href="/privacidad" target="_blank" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Política de Privacidad</a> y confirmo haber leído el <a href="/aviso-legal" target="_blank" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Aviso Legal</a>.
            </label>
          </div>
        )}

        <div className="auth-social-grid">
          <button
            type="button"
            className={`btn-social btn-google${!acceptedTerms ? ' btn-social--disabled' : ''}`}
            onClick={handleGoogleLogin}
            disabled={!acceptedTerms}
            title={!acceptedTerms ? 'Debes aceptar los términos para continuar' : ''}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
            />
            Google
          </button>

          {/*           <button
            type="button"
            className="btn-social btn-facebook"
            onClick={handleFacebookLogin}
          >
            <i className="fab fa-facebook"></i>
            Facebook
          </button> */}
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
          }}
        >
          {mode === "login" ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
          <a
            href="#"
            onClick={toggleMode}
            style={{ color: "var(--primary)", fontWeight: 700 }}
          >
            {mode === "login" ? "Regístrate" : "Inicia Sesión"}
          </a>
        </p>
      </form>
    </Modal>
  );
}
