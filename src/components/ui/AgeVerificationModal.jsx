// components/ui/AgeVerificationModal.jsx
import { useState } from "react";
import Modal from "./Modal";

export default function AgeVerificationModal({
  isOpen,
  onConfirm,
  onReject,
  categoryName,
}) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(true);
    onConfirm();
  };

  const handleReject = () => {
    onReject();
  };

  return (
    <Modal isOpen={isOpen} onClose={onReject} maxWidth="500px">
      <div style={{ textAlign: "center", padding: "1rem" }}>
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(245, 158, 11, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}
        >
          <i
            className="fas fa-exclamation-triangle"
            style={{ fontSize: "2.5rem", color: "#f59e0b" }}
          ></i>
        </div>

        <h2 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>
          Verificación de Edad
        </h2>

        <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
          Estás accediendo a la categoría{" "}
          <strong>{categoryName || "contenido para adultos"}</strong>.
        </p>

        <p
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            padding: "1rem",
            borderRadius: "var(--radius-md)",
            marginBottom: "1.5rem",
            fontSize: "0.9rem",
          }}
        >
          <i className="fas fa-gavel" style={{ marginRight: "0.5rem" }}></i>
          Este contenido es exclusivo para mayores de 18 años.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button
            onClick={handleReject}
            style={{
              fontFamily:
                "'Outfit', 'Inter', system-ui, -apple-system, sans-serif",
              padding: "0.75rem 1.5rem",
              background: "var(--text-light)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Soy menor de 18
          </button>
          <button
            onClick={handleConfirm}
            style={{
              fontFamily:
                "'Outfit', 'Inter', system-ui, -apple-system, sans-serif",
              padding: "0.75rem 1.5rem",
              background: "var(--primary)",
              color: "white",
              border: "none",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Soy mayor de 18
          </button>
        </div>

        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            marginTop: "1.5rem",
          }}
        >
          Al hacer clic en "Soy mayor de 18" confirmas que tienes la mayoría de
          edad legal.
        </p>
      </div>
    </Modal>
  );
}
