import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext({});

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setFavoriteIds(new Set());
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("favoritos")
        .select("anuncio_id")
        .eq("user_id", user.id);

      if (error) throw error;
      setFavoriteIds(new Set(data.map((fav) => fav.anuncio_id)));
    } catch (e) {
      console.error("Error fetching favorites:", e);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const toggleFavorite = useCallback(async (anuncioId) => {
    if (!user) return false;

    const isFav = favoriteIds.has(anuncioId);
    try {
      if (isFav) {
        const { error } = await supabase
          .from("favoritos")
          .delete()
          .eq("user_id", user.id)
          .eq("anuncio_id", anuncioId);

        if (error) throw error;
        setFavoriteIds((prev) => {
          const next = new Set(prev);
          next.delete(anuncioId);
          return next;
        });
      } else {
        const { error } = await supabase
          .from("favoritos")
          .insert({ user_id: user.id, anuncio_id: anuncioId });

        if (error) throw error;
        setFavoriteIds((prev) => {
          const next = new Set(prev);
          next.add(anuncioId);
          return next;
        });
      }
      return true;
    } catch (e) {
      console.error("Error toggling favorite:", e);
      return false;
    }
  }, [user, favoriteIds]);

  const isFavorite = useCallback((anuncioId) => {
    return favoriteIds.has(anuncioId);
  }, [favoriteIds]);

  const value = {
    favoriteIds,
    toggleFavorite,
    isFavorite,
    loading,
    refreshFavorites: fetchFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
