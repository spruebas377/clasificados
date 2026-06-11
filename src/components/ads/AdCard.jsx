import { memo, useCallback } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useFavorites } from '../../context/FavoritesContext'
import { formatPrice } from '../../utils/formatters'
import { sanitize } from '../../utils/sanitize'
import { getCategoryImage } from '../../utils/categoryImages'

function AdCard({ ad, onOpenDetail, onEdit, onDelete }) {
  const { user, isSuperUser } = useAuth()
  const { isFavorite, toggleFavorite } = useFavorites()
  const isOwner = user && ad.user_id === user.id
  const canEdit = isOwner
  const canDelete = isOwner || isSuperUser
  const favorited = isFavorite(ad.id)

  const handleClick = useCallback(() => {
    onOpenDetail(ad.id)
  }, [ad.id, onOpenDetail])

  const handleWhatsApp = useCallback((e) => {
    e.stopPropagation()
  }, [])

  const handleFavoriteClick = useCallback(async (e) => {
    e.stopPropagation()
    if (!user) {
      alert('Debes iniciar sesión para agregar este anuncio a tus favoritos.')
      return
    }
    await toggleFavorite(ad.id)
  }, [ad.id, user, toggleFavorite])

  const handleEdit = useCallback((e) => {
    e.stopPropagation()
    onEdit(ad.id)
  }, [ad.id, onEdit])

  const handleDelete = useCallback((e) => {
    e.stopPropagation()
    if (window.confirm('¿Estás seguro de que quieres eliminar este anuncio?')) {
      onDelete(ad.id)
    }
  }, [ad.id, onDelete])

  return (
    <article className="card" onClick={handleClick}>
      <div className="card__image-container">
        <span className="card__badge">{ad.categorias?.nombre}</span>
        <button
          onClick={handleFavoriteClick}
          className={`card__favorite-btn ${favorited ? 'active' : ''}`}
          title={favorited ? "Quitar de favoritos" : "Guardar en favoritos"}
          aria-label="Favorito"
        >
          <i className={`${favorited ? 'fas' : 'far'} fa-heart`}></i>
        </button>
        <div className="card__image">
          <img
            src={ad.imagen || getCategoryImage(ad.categorias?.nombre, ad.categorias?.icono)}
            alt={sanitize(ad.titulo)}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <div className="card__content">
        <h3 className="card__title">{sanitize(ad.titulo)}</h3>
        <div className="card__price">
          {formatPrice(ad.precio, ad.moneda)}
        </div>
        <p className="card__description">{sanitize(ad.descripcion)}</p>
        <div className="card__footer">
          <a
            href={`https://wa.me/${ad.contacto}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card__contact"
            onClick={handleWhatsApp}
          >
            <i className="fab fa-whatsapp"></i> WhatsApp
          </a>
          {(canEdit || canDelete) && (
            <>
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
  )
}

export default memo(AdCard)
