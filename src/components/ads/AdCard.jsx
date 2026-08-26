import { memo, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import { formatPrice } from "../../utils/formatters";
import { sanitize } from "../../utils/sanitize";
import { getCategoryImage } from "../../utils/categoryImages";

function getRemainingTimeText(expirationDate) {
  if (!expirationDate) return null;
  const now = new Date();
  const exp = new Date(expirationDate);
  const diffMs = exp - now;
  if (diffMs <= 0) return null;

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 24) {
    return `${Math.max(1, diffHours)}h restantes`;
  }
  const diffDays = Math.ceil(diffHours / 24);
  return `${diffDays}d restantes`;
}

function AdCard({
  ad,
  onOpenDetail,
  onEdit,
  onDelete,
  onFeatureAd,
  onApprovePayment,
  onRejectPayment,
}) {
  const { user, isSuperUser } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isOwner = user && ad.user_id === user.id;
  const canEdit = isOwner;
  const canDelete = isOwner || isSuperUser;
  const favorited = isFavorite(ad.id);
  const isPendingPayment = ad.pago_estado === "pendiente";

  const remainingText = ad.destacado_hasta
    ? getRemainingTimeText(ad.destacado_hasta)
    : null;

  const handleClick = useCallback(() => {
    onOpenDetail(ad.id);
  }, [ad.id, onOpenDetail]);

  const handleWhatsApp = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const handleFavoriteClick = useCallback(
    async (e) => {
      e.stopPropagation();
      if (!user) {
        alert(
          "Debes iniciar sesión para agregar este anuncio a tus favoritos.",
        );
        return;
      }
      await toggleFavorite(ad.id);
    },
    [ad.id, user, toggleFavorite],
  );

  const handleEdit = useCallback(
    (e) => {
      e.stopPropagation();
      onEdit(ad.id);
    },
    [ad.id, onEdit],
  );

  const handleDelete = useCallback(
    (e) => {
      e.stopPropagation();
      if (
        window.confirm("¿Estás seguro de que quieres eliminar este anuncio?")
      ) {
        onDelete(ad.id);
      }
    },
    [ad.id, onDelete],
  );

  const handleFeatureClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (onFeatureAd) {
        onFeatureAd(ad);
      }
    },
    [ad, onFeatureAd],
  );

  const handleApprove = useCallback(
    (e) => {
      e.stopPropagation();
      if (window.confirm("¿Aprobar el pago y destacar esta publicación?")) {
        onApprovePayment(ad.id);
      }
    },
    [ad.id, onApprovePayment],
  );

  const handleReject = useCallback(
    (e) => {
      e.stopPropagation();
      if (
        window.confirm("¿Rechazar la solicitud de pago de esta publicación?")
      ) {
        onRejectPayment(ad.id);
      }
    },
    [ad.id, onRejectPayment],
  );

  return (
    <article
      className={`card ${ad.destacado ? "card--featured" : ""}`}
      onClick={handleClick}
    >
      <div className="card__image-container">
        {ad.destacado && (
          <span
            className="card__badge card__badge--featured"
            title={
              remainingText
                ? `Destacado (${remainingText})`
                : "Publicación Destacada"
            }
          >
            <i className="fas fa-star"></i> Destacado{" "}
            {isOwner && remainingText ? `(${remainingText})` : ""}
          </span>
        )}
        {!ad.destacado && isPendingPayment && (
          <span
            className="card__badge card__badge--pending"
            title="Pago en revisión por el administrador"
          >
            <i className="fas fa-clock"></i> Pago Pendiente ({ad.pago_dias || 7}
            d)
          </span>
        )}
        <span
          className={`card__badge ${ad.destacado || isPendingPayment ? "card__badge--secondary" : ""}`}
        >
          {ad.categorias?.nombre}
        </span>
        <button
          onClick={handleFavoriteClick}
          className={`card__favorite-btn ${favorited ? "active" : ""}`}
          title={favorited ? "Quitar de favoritos" : "Guardar en favoritos"}
          aria-label="Favorito"
        >
          <i className={`${favorited ? "fas" : "far"} fa-heart`}></i>
        </button>
        <div className="card__image">
          <img
            src={
              ad.imagen ||
              getCategoryImage(ad.categorias?.nombre, ad.categorias?.icono)
            }
            alt={sanitize(ad.titulo)}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <div className="card__content">
        <h3 className="card__title">{sanitize(ad.titulo)}</h3>
        <div className="card__price">{formatPrice(ad.precio, ad.moneda)}</div>
        <p className="card__description">{sanitize(ad.descripcion)}</p>
        <div className="card__footer">
          {isOwner ? (
            ""
          ) : (
            <a
              href={`https://wa.me/${ad.contacto}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card__contact"
              onClick={handleWhatsApp}
            >
              <i className="fab fa-whatsapp"></i> WhatsApp
            </a>
          )}
          {(canEdit || canDelete || (isSuperUser && isPendingPayment)) && (
            <>
              {isSuperUser && isPendingPayment && (
                <>
                  <button
                    onClick={handleApprove}
                    className="btn-approve-payment"
                    title="Aprobar Pago y Destacar Anuncio"
                  >
                    <i className="fas fa-check"></i> Aprobar
                  </button>
                  <button
                    onClick={handleReject}
                    className="btn-reject-payment"
                    title="Rechazar Solicitud de Pago"
                  >
                    <i className="fas fa-times"></i> Rechazar
                  </button>
                </>
              )}
              {canEdit && !ad.destacado && !isPendingPayment && (
                <button
                  onClick={handleFeatureClick}
                  className="btn-feature"
                  title="Destacar esta publicación"
                  aria-label="Destacar anuncio"
                >
                  <i className="fas fa-star"></i> Destacar
                </button>
              )}
              {canEdit && (
                <button
                  onClick={handleEdit}
                  className="btn-edit"
                  title="Editar"
                  aria-label="Editar anuncio"
                >
                  <i className="fas fa-edit"></i>
                </button>
              )}
              {canDelete && (
                <button
                  onClick={handleDelete}
                  className="btn-delete"
                  title="Eliminar"
                  aria-label="Eliminar anuncio"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default memo(AdCard);
