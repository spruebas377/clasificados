// context/AuthContext.jsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para refrescar el usuario actual
  const refreshUser = useCallback(async () => {
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();
    setUser(currentUser);
    return currentUser;
  }, []);

  // Función para obtener datos completos del usuario desde la tabla users
  const getUserFromTable = useCallback(async (userId) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) return null;
      return data;
    } catch (e) {
      console.error("Error getting user from table:", e);
      return null;
    }
  }, []);

  // Función para obtener el nombre del usuario
  const getUserName = useCallback(() => {
    if (!user) return "Invitado";
    // Intentar obtener de diferentes lugares posibles
    const name =
      user.user_metadata?.full_name ||
      user.user_metadata?.nombre_apellido ||
      user.email?.split("@")[0] ||
      "Usuario";
    return name;
  }, [user]);

  // Registro con email y password
  const signUp = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          email: email,
        },
      },
    });
    if (error) throw error;
    return data;
  }, []);

  // Inicio de sesión con email y password
  const signInWithPassword = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setUser(data.user);
    return data;
  }, []);

  // Inicio de sesión con Google
  const signInWithGoogle = useCallback(async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
    return data;
  }, []);

  // Inicio de sesión con Facebook
  const signInWithFacebook = useCallback(async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
    return data;
  }, []);

  // Cerrar sesión
  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  }, []);

  // Escuchar cambios en la autenticación
  useEffect(() => {
    // Obtener sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Escuchar cambios
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signUp,
    signInWithPassword,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    getUserName,
    refreshUser, // ← Nueva función
    getUserFromTable, // ← Nueva función
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
