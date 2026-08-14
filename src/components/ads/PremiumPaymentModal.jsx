import { useState, useCallback } from "react";
import Modal from "../ui/Modal";
import { MERCADOPAGO_CONFIG, PREMIUM_PLANS } from "../../config/premiumConfig";
import { createMercadoPagoPreference } from "../../services/paymentService";

export default function PremiumPaymentModal({
  isOpen,
  onClose,
  onConfirmPayment,
  onRequestManualPayment,
  adTitle = "",
  adId = null,
}) {
  const [copiedField, setCopiedField] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState("7days");
  const [loadingMP, setLoadingMP] = useState(false);

  const { alias, cbu, holder } = MERCADOPAGO_CONFIG.bankDetails;
  const supportPhone = MERCADOPAGO_CONFIG.supportPhone;

  const selectedPlan =
    PREMIUM_PLANS.find((p) => p.id === selectedPlanId) || PREMIUM_PLANS[1];

  const handleCopy = useCallback((text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }, []);

  const handleSendWhatsApp = useCallback(() => {
    if (onRequestManualPayment) {
      onRequestManualPayment(selectedPlan);
    }
    const message = encodeURIComponent(
      `¡Hola! Acabo de realizar la transferencia para destacar mi publicación:\n\n` +
        `📌 *Título:* ${adTitle || "Anuncio"}\n` +
        (adId ? `🆔 *ID:* ${adId}\n` : "") +
        `⭐ *Plan Elegido:* ${selectedPlan.name} (${selectedPlan.priceLabel})\n\n` +
        `Adjunto aquí el comprobante de pago.`,
    );
    window.open(`https://wa.me/${supportPhone}?text=${message}`, "_blank");
  }, [adTitle, adId, supportPhone, selectedPlan, onRequestManualPayment]);

  const handleMercadoPagoCheckout = useCallback(async () => {
    setLoadingMP(true);
    try {
      const checkoutUrl = await createMercadoPagoPreference({
        adId,
        adTitle,
        plan: selectedPlan,
      });

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        alert(
          `Configuración de Mercado Pago:\n\n` +
            `Para cobrar automáticamente con Mercado Pago, agrega tu Access Token en "src/config/premiumConfig.js" o en tu archivo .env como VITE_MP_ACCESS_TOKEN.\n\n` +
            `Mientras tanto, puedes realizar la transferencia manual por Alias/CVU y enviar el comprobante por WhatsApp.`,
        );
      }
    } catch (e) {
      console.error("Error Mercado Pago:", e);
      alert("Error al conectar con Mercado Pago: " + e.message);
    } finally {
      setLoadingMP(false);
    }
  }, [adId, adTitle, selectedPlan]);

  const handleConfirm = useCallback(() => {
    if (onRequestManualPayment) {
      onRequestManualPayment(selectedPlan);
    } else if (onConfirmPayment) {
      onConfirmPayment(selectedPlan);
    }
  }, [onRequestManualPayment, onConfirmPayment, selectedPlan]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="600px">
      <div className="modal__header payment-modal__header">
        <div className="payment-modal__icon">
          <i className="fas fa-crown"></i>
        </div>
        <div>
          <h3 style={{ margin: 0 }}>Elige tu Paquete Premium</h3>
          <p
            style={{
              margin: "0.25rem 0 0",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
            }}
          >
            Selecciona la duración para destacar tu publicación
          </p>
        </div>
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
      </div>

      <div className="payment-modal__body">
        {/* Selector de Planes Premium */}
        <div className="premium-plans-grid">
          {PREMIUM_PLANS.map((plan) => {
            const isSelected = plan.id === selectedPlanId;
            return (
              <div
                key={plan.id}
                className={`plan-card ${isSelected ? "plan-card--selected" : ""}`}
                onClick={() => setSelectedPlanId(plan.id)}
              >
                {plan.badge && (
                  <span className="plan-card__badge">{plan.badge}</span>
                )}
                <div className="plan-card__header">
                  <h4 className="plan-card__title">{plan.name}</h4>
                  <strong className="plan-card__price">{plan.priceLabel}</strong>
                </div>
                <p className="plan-card__desc">{plan.desc}</p>
                <div className="plan-card__radio">
                  <i
                    className={`fas ${isSelected ? "fa-circle-dot" : "fa-circle"}`}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>

        {/* Beneficios */}
        <div className="payment-benefits">
          <div className="benefit-item">
            <i className="fas fa-rocket"></i>
            <span>Posicionamiento en los primeros lugares de búsqueda</span>
          </div>
          <div className="benefit-item">
            <div
              style={{
                color: "#f59e0b",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <i className="fas fa-star"></i>
            </div>
            <span>Insignia y marco dorado de anuncio Destacado</span>
          </div>
          <div className="benefit-item">
            <i className="fas fa-eye"></i>
            <span>
              Hasta 5 veces más visualizaciones y consultas por WhatsApp
            </span>
          </div>
        </div>

        {/* Botón Principal Mercado Pago */}
        <div className="mp-checkout-box">
          <button
            type="button"
            className="btn-mp-checkout"
            onClick={handleMercadoPagoCheckout}
            disabled={loadingMP}
          >
            <i className="fas fa-bolt" style={{ color: "#009ee3" }}></i>
            {loadingMP
              ? "Cargando Mercado Pago..."
              : `Pagar con Mercado Pago (${selectedPlan.priceLabel})`}
          </button>
          <span className="mp-checkout-badge">
            ⚡ Pago y activación instantánea 24/7
          </span>
        </div>

        <div className="payment-divider">
          <span>O si preferís transferencia bancaria directa:</span>
        </div>

        {/* Detalles de transferencia directa */}
        <div className="payment-details-box">
          <div className="payment-price-row">
            <span>Monto a transferir (Plan {selectedPlan.name}):</span>
            <strong className="payment-price">{selectedPlan.priceLabel}</strong>
          </div>

          <div className="payment-field">
            <div className="payment-field-info">
              <span className="payment-label">Alias Mercado Pago</span>
              <strong className="payment-value">{alias}</strong>
            </div>
            <button
              type="button"
              className="btn-copy"
              onClick={() => handleCopy(alias, "alias")}
            >
              <i
                className={`fas ${copiedField === "alias" ? "fa-check" : "fa-copy"}`}
              ></i>
              {copiedField === "alias" ? "Copiado" : "Copiar"}
            </button>
          </div>

          <div className="payment-field">
            <div className="payment-field-info">
              <span className="payment-label">CVU / CBU</span>
              <strong className="payment-value">{cbu}</strong>
            </div>
            <button
              type="button"
              className="btn-copy"
              onClick={() => handleCopy(cbu, "cbu")}
            >
              <i
                className={`fas ${copiedField === "cbu" ? "fa-check" : "fa-copy"}`}
              ></i>
              {copiedField === "cbu" ? "Copiado" : "Copiar"}
            </button>
          </div>

          <div className="payment-field-simple">
            <span className="payment-label">Titular de la cuenta:</span>
            <strong>{holder}</strong>
          </div>
        </div>

        {/* Pasos */}
        <div className="payment-steps">
          <h4>Pasos para activar con transferencia:</h4>
          <ol>
            <li>
              Realizá la transferencia de <strong>{selectedPlan.priceLabel}</strong>{" "}
              al Alias o CVU indicado.
            </li>
            <li>Enviá el comprobante por WhatsApp con el plan seleccionado.</li>
            <li>
              ¡Tu anuncio quedará destacado inmediatamente por{" "}
              <strong>{selectedPlan.name}</strong>!
            </li>
          </ol>
        </div>

        {/* Acciones de Transferencia */}
        <div className="payment-actions">
          <button
            type="button"
            className="btn-whatsapp-payment"
            onClick={handleSendWhatsApp}
          >
            <i className="fab fa-whatsapp"></i> Enviar Comprobante por WhatsApp
          </button>
          <button
            type="button"
            className="btn-submit btn-confirm-payment"
            onClick={handleConfirm}
          >
            <i className="fas fa-check-circle"></i> Entendido / Confirmar
            Destacado ({selectedPlan.name})
          </button>
        </div>
      </div>
    </Modal>
  );
}
