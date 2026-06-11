import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFavorites } from '../context/FavoritesContext'
import { supabase } from '../lib/supabase'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import AuthModal from '../components/auth/AuthModal'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import AdGrid from '../components/ads/AdGrid'

export default function MyFavoritesPage() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const { favoriteIds } = useFavorites()
  
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' })
  const [loading, setLoading] = useState(true)
  const [favoriteAds, setFavoriteAds] = useState([])

  useEffect(() => {
    let active = true
    if (!authLoading) {
      if (user) {
        setLoading(true)
        supabase
          .from('favoritos')
          .select('anuncio_id')
          .eq('user_id', user.id)
          .then(({ data: favorites, error: favsError }) => {
            if (!active) return
            if (favsError) throw favsError

            if (!favorites || favorites.length === 0) {
              setFavoriteAds([])
              setLoading(false)
              return null
            }

            const ids = favorites.map(f => f.anuncio_id)
            return supabase
              .from('anuncios')
              .select('*, categorias(*)')
              .in('id', ids)
              .eq('activo', true)
              .order('fecha_publicacion', { ascending: false })
          })
          .then((res) => {
            if (!active || !res) return
            setFavoriteAds(res.data || [])
            setLoading(false)
          })
          .catch((e) => {
            if (!active) return
            console.error('Error fetching favorite ads:', e)
            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    }
    return () => {
      active = false
    }
  }, [user, authLoading, favoriteIds])

  const handleOpenAd = useCallback((adId) => {
    navigate(`/ad/${adId}`)
  }, [navigate])

  const handleShowAuth = useCallback((mode = 'login') => {
    setAuthModal({ open: true, mode })
  }, [])

  return (
    <div className="ad-detail-page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header
        onShowAuth={handleShowAuth}
        onOpenAd={handleOpenAd}
      />

      <main style={{ flex: 1, padding: '3rem 0' }}>
        <div className="container">
          {/* Back button */}
          <button className="btn-back" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-left"></i> Volver
          </button>

          {/* Page Header */}
          <div style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--text-main) 0%, var(--primary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', width: 'fit-content' }}>
              <i className="fas fa-heart" style={{ marginRight: '0.75rem', color: 'var(--primary)' }}></i>
              Mis Favoritos
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              Las publicaciones que guardaste para verlas más tarde.
            </p>
          </div>

          {authLoading || loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem 0' }}>
              <LoadingSpinner />
            </div>
          ) : !user ? (
            /* Not authenticated view */
            <div style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '4rem 2rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-light)',
              maxWidth: '600px',
              margin: '2rem auto'
            }}>
              <i className="fas fa-user-lock" style={{ fontSize: '3.5rem', color: 'var(--primary)', marginBottom: '1.5rem', opacity: 0.8 }}></i>
              <h2 style={{ marginBottom: '1rem', fontWeight: 700 }}>Iniciá sesión para ver tus favoritos</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
                Necesitamos que te identifiques para poder mostrarte tu listado personalizado de favoritos.
              </p>
              <button className="btn-submit" style={{ maxWidth: '250px', margin: '0 auto' }} onClick={() => handleShowAuth('login')}>
                Iniciar Sesión <i className="fas fa-sign-in-alt"></i>
              </button>
            </div>
          ) : favoriteAds.length === 0 ? (
            /* Empty state */
            <div style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '5rem 2rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-light)',
              maxWidth: '650px',
              margin: '2rem auto'
            }}>
              <div style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem',
                fontSize: '2.5rem'
              }}>
                <i className="far fa-heart"></i>
              </div>
              <h2 style={{ marginBottom: '1rem', fontWeight: 700 }}>Aún no tenés favoritos</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6, fontSize: '1.05rem' }}>
                Hacé clic en el corazón de cualquier publicación que te interese para guardarla aquí.
              </p>
              <button className="btn-submit" style={{ maxWidth: '250px', margin: '0 auto' }} onClick={() => navigate('/')}>
                Explorar Publicaciones <i className="fas fa-search"></i>
              </button>
            </div>
          ) : (
            /* Ads Grid */
            <AdGrid
              ads={favoriteAds}
              loading={false}
              onlyMine={false}
              onOpenDetail={handleOpenAd}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          )}
        </div>
      </main>

      <Footer />

      <AuthModal
        isOpen={authModal.open}
        onClose={() => setAuthModal({ open: false, mode: 'login' })}
        initialMode={authModal.mode}
      />
    </div>
  )
}
