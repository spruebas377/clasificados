// pages/AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      } else {
        navigate("/");
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <div
      className="loading-spinner"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <i className="fas fa-spinner fa-spin" style={{ fontSize: "2rem" }}></i>
      <p>Completando inicio de sesión...</p>
    </div>
  );
}
