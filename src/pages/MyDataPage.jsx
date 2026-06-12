// pages/MyDataPage.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AuthModal from "../components/auth/AuthModal";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const PROVINCIAS_ARGENTINA = [
  "Formosa",
  "Chaco",
  "Corrientes",
  "Misiones",
  "Salta",
  "Jujuy",
  "Tucumán",
  "Santiago del Estero",
  "Catamarca",
  "La Rioja",
  "San Juan",
  "San Luis",
  "Mendoza",
  "Córdoba",
  "Santa Fe",
  "Entre Ríos",
  "Buenos Aires",
  "CABA",
  "La Pampa",
  "Neuquén",
  "Río Negro",
  "Chubut",
  "Santa Cruz",
  "Tierra del Fuego",
];

export default function MyDataPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading, refreshUser } = useAuth();
  const isOAuthUser = user?.app_metadata?.provider && user?.app_metadata?.provider !== "email";

  const [authModal, setAuthModal] = useState({ open: false, mode: "login" });
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    phone: "",
    ciudad: "",
    provincia: "Formosa",
  });
  const [originalEmail, setOriginalEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
  const [isChangingEmail, setIsChangingEmail] = useState(false);

  // Password change state hooks
  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState({ type: "", text: "" });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const { newPassword, confirmPassword } = passwordForm;

    if (newPassword.length < 6) {
      setPasswordStatus({
        type: "error",
        text: "La contraseña debe tener al menos 6 caracteres.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordStatus({
        type: "error",
        text: "Las contraseñas no coinciden.",
      });
      return;
    }

    setPasswordLoading(true);
    setPasswordStatus({ type: "", text: "" });

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      setPasswordStatus({
        type: "success",
        text: "¡Tu contraseña ha sido actualizada con éxito!",
      });

      setPasswordForm({ newPassword: "", confirmPassword: "" });

      setTimeout(() => {
        setPasswordStatus({ type: "", text: "" });
      }, 5000);
    } catch (err) {
      console.error("Error al cambiar contraseña:", err);
      setPasswordStatus({
        type: "error",
        text: err.message || "Ocurrió un error al intentar cambiar la contraseña.",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const saveToUsersTable = useCallback(async (data) => {
    if (!user) return;

    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    let result;
    if (existingUser) {
      result = await supabase
        .from("users")
        .update({
          full_name: data.full_name,
          phone: data.phone,
          ciudad: data.ciudad,
          provincia: data.provincia,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
    } else {
      result = await supabase.from("users").insert({
        id: user.id,
        email: user.email,
        full_name: data.full_name,
        phone: data.phone,
        ciudad: data.ciudad,
        provincia: data.provincia,
      });
    }

    if (result.error) {
      console.error("Error saving to users table:", result.error);
      throw result.error;
    }

    return result;
  }, [user]);

  const loadUserData = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Cargar email desde auth
      const userEmail = user.email || "";
      setOriginalEmail(userEmail);

      // Intentar obtener datos de la tabla users
      const { data: userData, error } = await supabase
        .from("users")
        .select("full_name, phone, ciudad, provincia")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error loading user data:", error);
      }

      // Establecer datos del formulario
      setFormData({
        email: userEmail,
        full_name: userData?.full_name || "",
        phone: userData?.phone || "",
        ciudad: userData?.ciudad || "",
        provincia: userData?.provincia || "Formosa",
      });

      // Si no hay datos en users pero hay en metadata, guardarlos
      if (
        !userData &&
        (user.user_metadata?.full_name || user.user_metadata?.phone)
      ) {
        const metadata = user.user_metadata || {};
        await saveToUsersTable({
          full_name: metadata.full_name || metadata.nombre_apellido,
          phone: metadata.phone || metadata.telefono,
          ciudad: metadata.ciudad,
          provincia: metadata.provincia,
        });
      }
    } catch (e) {
      console.error("Error loading user data:", e);
    } finally {
      setLoading(false);
    }
  }, [user, saveToUsersTable]);

  // Load user data from the users table and auth
  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user, loadUserData]);

  const saveToAuthMetadata = async (data) => {
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: data.full_name,
        phone: data.phone,
        ciudad: data.ciudad,
        provincia: data.provincia,
      },
    });
    if (error) throw error;
  };

  const updateEmail = async (newEmail) => {
    if (!user) return;

    setIsChangingEmail(true);

    try {
      const { error } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (error) throw error;

      setStatusMessage({
        type: "success",
        text: `📧 Se ha enviado un correo de verificación a ${newEmail} y/o a tu correo actual.\n\n⚠️ IMPORTANTE: Dependiendo de la configuración de seguridad, es posible que debas hacer clic en el enlace de confirmación enviado a AMBAS direcciones de correo (el actual y el nuevo) para que el cambio se complete.`,
      });

      return true;
    } catch (err) {
      console.error("Error updating email:", err);

      let errorMessage = "Error al cambiar el correo electrónico. ";
      if (err.message?.includes("already been registered")) {
        errorMessage += "Este correo ya está registrado en otra cuenta.";
      } else if (err.message?.includes("valid email")) {
        errorMessage += "Por favor ingresa un correo electrónico válido.";
      } else {
        errorMessage += err.message;
      }

      setStatusMessage({
        type: "error",
        text: errorMessage,
      });
      return false;
    } finally {
      setIsChangingEmail(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setStatusMessage({ type: "", text: "" });

    try {
      // Verificar si el email cambió y no está pendiente
      const emailChanged = formData.email !== originalEmail;

      if (emailChanged) {
        const emailUpdated = await updateEmail(formData.email);
        if (emailUpdated) {
          // Restaurar el email original en el formulario hasta que se verifique
          setFormData((prev) => ({ ...prev, email: originalEmail }));
        }
      }

      // Guardar en la tabla users (sin el email, eso se maneja aparte)
      await saveToUsersTable(formData);

      // Sincronizar con auth metadata
      await saveToAuthMetadata(formData);

      // Refrescar el contexto
      if (refreshUser) {
        await refreshUser();
      }

      // Si no hubo cambio de email o fue exitoso
      if (!emailChanged) {
        setStatusMessage({
          type: "success",
          text: "¡Tus datos se actualizaron con éxito!",
        });

        setTimeout(() => {
          setStatusMessage({ type: "", text: "" });
        }, 3000);
      }
    } catch (err) {
      console.error("Error al actualizar datos:", err);
      setStatusMessage({
        type: "error",
        text:
          err.message || "Ocurrió un error al intentar actualizar los datos.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShowAuth = useCallback((mode = "login") => {
    setAuthModal({ open: true, mode });
  }, []);

  const handleOpenAd = useCallback(
    (adId) => {
      navigate(`/ad/${adId}`);
    },
    [navigate],
  );

  if (authLoading) {
    return (
      <div className="loading-page">
        <Header onShowAuth={handleShowAuth} onOpenAd={handleOpenAd} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "5rem 0",
          }}
        >
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div
        className="ad-detail-page"
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header onShowAuth={handleShowAuth} onOpenAd={handleOpenAd} />
        <main style={{ flex: 1, padding: "3rem 0" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <div
              style={{
                background: "var(--surface)",
                borderRadius: "var(--radius-lg)",
                padding: "4rem 2rem",
                textAlign: "center",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <i
                className="fas fa-user-lock"
                style={{
                  fontSize: "3.5rem",
                  color: "var(--primary)",
                  marginBottom: "1.5rem",
                }}
              ></i>
              <h2 style={{ marginBottom: "1rem" }}>
                Iniciá sesión para editar tus datos
              </h2>
              <button
                className="btn-submit"
                style={{ maxWidth: "250px", margin: "0 auto" }}
                onClick={() => handleShowAuth("login")}
              >
                Iniciar Sesión <i className="fas fa-sign-in-alt"></i>
              </button>
            </div>
          </div>
        </main>
        <Footer />
        <AuthModal
          isOpen={authModal.open}
          onClose={() => setAuthModal({ open: false, mode: "login" })}
          initialMode={authModal.mode}
        />
      </div>
    );
  }

  return (
    <div
      className="ad-detail-page"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header onShowAuth={handleShowAuth} onOpenAd={handleOpenAd} />

      <main style={{ flex: 1, padding: "3rem 0" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <button className="btn-back" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-left"></i> Volver
          </button>

          <div style={{ marginBottom: "2.5rem" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 800 }}>
              <i
                className="fas fa-user-circle"
                style={{ marginRight: "0.75rem", color: "var(--primary)" }}
              ></i>
              Mis Datos
            </h1>
            <p style={{ color: "var(--text-muted)" }}>
              Completá tu información de contacto. Estos datos se usarán para
              tus publicaciones y comunicaciones.
            </p>
          </div>

          <div
            style={{
              background: "var(--surface)",
              borderRadius: "var(--radius-lg)",
              padding: "2.5rem",
              boxShadow: "var(--shadow-md)",
            }}
          >
            {statusMessage.text && (
              <div
                style={{
                  padding: "1rem 1.25rem",
                  borderRadius: "var(--radius-md)",
                  marginBottom: "1.5rem",
                  backgroundColor:
                    statusMessage.type === "success"
                      ? "rgba(16, 185, 129, 0.1)"
                      : "rgba(239, 68, 68, 0.1)",
                  color:
                    statusMessage.type === "success"
                      ? "var(--success)"
                      : "#ef4444",
                  border: `1px solid ${statusMessage.type === "success" ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
                  whiteSpace: "pre-line",
                }}
              >
                <i
                  className={`fas ${statusMessage.type === "success" ? "fa-envelope" : "fa-circle-xmark"}`}
                  style={{ marginRight: "0.5rem" }}
                ></i>
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="publish-form"
              style={{ padding: 0 }}
            >
              {/* Campo de Email */}
              <div className="form-group">
                <label htmlFor="email">
                  Correo Electrónico *
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      marginLeft: "0.5rem",
                    }}
                  >
                    (cambiarlo requiere verificación)
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                  required
                  disabled={isChangingEmail || isOAuthUser}
                />
                {isOAuthUser && (
                  <small
                    style={{
                      color: "var(--text-muted)",
                      marginTop: "0.25rem",
                      display: "block",
                    }}
                  >
                    <i className="fas fa-info-circle"></i> Tu correo electrónico está asociado a tu cuenta de {user.app_metadata.provider === "google" ? "Google" : user.app_metadata.provider} y no puede cambiarse desde aquí.
                  </small>
                )}
                {isChangingEmail && (
                  <small
                    style={{
                      color: "var(--primary)",
                      marginTop: "0.25rem",
                      display: "block",
                    }}
                  >
                    <i className="fas fa-spinner fa-spin"></i> Enviando
                    verificación...
                  </small>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="full_name">Nombre y Apellido *</label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  placeholder="Ej. Juan Pérez"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono / WhatsApp *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Ej. 5493704123456"
                  required
                />
                <small
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.75rem",
                    marginTop: "0.25rem",
                    display: "block",
                  }}
                >
                  Incluye código de país y área. Ej: 5493704123456
                </small>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="provincia">Provincia</label>
                  <select
                    id="provincia"
                    name="provincia"
                    value={formData.provincia}
                    onChange={handleInputChange}
                    required
                  >
                    {PROVINCIAS_ARGENTINA.map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="ciudad">Ciudad</label>
                  <input
                    type="text"
                    id="ciudad"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleInputChange}
                    placeholder="Ej. Formosa"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-submit"
                disabled={loading || isChangingEmail}
                style={{ marginTop: "2rem" }}
              >
                {loading || isChangingEmail ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Guardando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i> Guardar Cambios
                  </>
                )}
              </button>
            </form>

            {/* Advertencia sobre cambio de email */}
            <div
              style={{
                marginTop: "2rem",
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                backgroundColor: "rgba(245, 158, 11, 0.08)",
                border: "1px dashed rgba(245, 158, 11, 0.3)",
                fontSize: "0.85rem",
                color: "var(--text-muted)",
              }}
            >
              <i
                className="fas fa-info-circle"
                style={{ color: "#f59e0b", marginRight: "0.5rem" }}
              ></i>
              <strong>Importante:</strong> Si cambias tu correo electrónico,
              recibirás un enlace de verificación. El cambio se aplicará solo
              después de confirmarlo desde tu nuevo correo. Mientras tanto,
              seguirás usando tu email actual.
            </div>

            {/* Estado actual del email */}
            <div
              style={{
                marginTop: "1rem",
                padding: "0.75rem",
                borderRadius: "var(--radius-md)",
                backgroundColor: "rgba(59, 130, 246, 0.05)",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                textAlign: "center",
              }}
            >
              <i
                className="fas fa-check-circle"
                style={{ color: "var(--success)", marginRight: "0.5rem" }}
              ></i>
              Email actual: <strong>{originalEmail}</strong>
            </div>
          </div>

          {/* Card de Cambio de Contraseña */}
          <div
            style={{
              background: "var(--surface)",
              borderRadius: "var(--radius-lg)",
              padding: "2.5rem",
              boxShadow: "var(--shadow-md)",
              marginTop: "2rem",
            }}
          >
            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1.5rem" }}>
              <i className="fas fa-key" style={{ marginRight: "0.75rem", color: "var(--primary)" }}></i>
              Cambiar Contraseña
            </h2>

            {isOAuthUser ? (
              <div
                style={{
                  padding: "1rem",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "rgba(59, 130, 246, 0.05)",
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                  border: "1px solid rgba(59, 130, 246, 0.1)",
                }}
              >
                <i className="fas fa-info-circle" style={{ color: "var(--primary)", marginRight: "0.5rem" }}></i>
                Tu cuenta está vinculada con {user.app_metadata.provider === "google" ? "Google" : user.app_metadata.provider}. No es necesario que configures una contraseña local.
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="publish-form" style={{ padding: 0 }}>
                {passwordStatus.text && (
                  <div
                    style={{
                      padding: "1rem 1.25rem",
                      borderRadius: "var(--radius-md)",
                      marginBottom: "1.5rem",
                      backgroundColor:
                        passwordStatus.type === "success"
                          ? "rgba(16, 185, 129, 0.1)"
                          : "rgba(239, 68, 68, 0.1)",
                      color:
                        passwordStatus.type === "success"
                          ? "var(--success)"
                          : "#ef4444",
                      border: `1px solid ${passwordStatus.type === "success" ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
                      fontSize: "0.9rem",
                    }}
                  >
                    <i
                      className={`fas ${passwordStatus.type === "success" ? "fa-circle-check" : "fa-circle-xmark"}`}
                      style={{ marginRight: "0.5rem" }}
                    ></i>
                    <span>{passwordStatus.text}</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="newPassword">Nueva Contraseña</label>
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordInputChange}
                      placeholder="Mínimo 6 caracteres"
                      required
                      style={{ paddingRight: "2.5rem", width: "100%" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{
                        position: "absolute",
                        right: "0.75rem",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--text-muted)",
                        padding: "0.25rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      title={showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      <i className={`fas ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordInputChange}
                      placeholder="Repite tu nueva contraseña"
                      required
                      style={{ paddingRight: "2.5rem", width: "100%" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        position: "absolute",
                        right: "0.75rem",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--text-muted)",
                        padding: "0.25rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      title={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={passwordLoading}
                  style={{ marginTop: "1rem" }}
                >
                  {passwordLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Actualizando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-lock"></i> Actualizar Contraseña
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <AuthModal
        isOpen={authModal.open}
        onClose={() => setAuthModal({ open: false, mode: "login" })}
        initialMode={authModal.mode}
      />
    </div>
  );
}
