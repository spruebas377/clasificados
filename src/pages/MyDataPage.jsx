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

  const [authModal, setAuthModal] = useState({ open: false, mode: "login" });
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    ciudad: "",
    provincia: "Formosa",
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  // Load user data from the users table
  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Intentar obtener datos de la tabla users
      const { data: userData, error } = await supabase
        .from("users")
        .select("full_name, phone, ciudad, provincia")
        .eq("id", user.id)
        .maybeSingle(); // Usar maybeSingle en lugar de single para evitar error 406

      if (error) {
        console.error("Error loading user data:", error);
      }

      if (userData) {
        // Datos existen en la tabla users
        setFormData({
          full_name: userData.full_name || "",
          phone: userData.phone || "",
          ciudad: userData.ciudad || "",
          provincia: userData.provincia || "Formosa",
        });
      } else {
        // No hay datos en users, usar metadata
        const metadata = user.user_metadata || {};
        setFormData({
          full_name: metadata.full_name || metadata.nombre_apellido || "",
          phone: metadata.phone || metadata.telefono || "",
          ciudad: metadata.ciudad || "",
          provincia: metadata.provincia || "Formosa",
        });

        // Si hay metadata, intentar guardar en users
        if (metadata.full_name || metadata.phone) {
          try {
            await saveToUsersTable({
              full_name: metadata.full_name || metadata.nombre_apellido,
              phone: metadata.phone || metadata.telefono,
              ciudad: metadata.ciudad,
              provincia: metadata.provincia,
            });
          } catch (e) {
            console.error("Error saving metadata to users:", e);
          }
        }
      }
    } catch (e) {
      console.error("Error loading user data:", e);
    } finally {
      setLoading(false);
    }
  };

  const saveToUsersTable = async (data) => {
    if (!user) return;

    // Primero verificar si el usuario ya existe
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking user:", checkError);
    }

    let result;
    if (existingUser) {
      // Actualizar usuario existente
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
      // Insertar nuevo usuario
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
  };

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
      // Guardar en la tabla users
      await saveToUsersTable(formData);

      // Sincronizar con auth metadata
      await saveToAuthMetadata(formData);

      // Refrescar el contexto
      if (refreshUser) {
        await refreshUser();
      }

      setStatusMessage({
        type: "success",
        text: "¡Tus datos se actualizaron con éxito!",
      });

      setTimeout(() => {
        setStatusMessage({ type: "", text: "" });
      }, 3000);
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
              tus publicaciones.
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
                }}
              >
                <i
                  className={`fas ${statusMessage.type === "success" ? "fa-circle-check" : "fa-circle-xmark"}`}
                  style={{ marginRight: "0.5rem" }}
                ></i>
                {statusMessage.text}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="publish-form"
              style={{ padding: 0 }}
            >
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
                disabled={loading}
                style={{ marginTop: "2rem" }}
              >
                {loading ? (
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
