import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdDetailPage from "./pages/AdDetailPage";
import MyQuestionsPage from "./pages/MyQuestionsPage";
import MyDataPage from "./pages/MyDataPage";
import MyFavoritesPage from "./pages/MyFavoritesPage";
import AuthCallback from "./pages/AuthCallback";
import PrivacyPage from "./pages/legal/PrivacyPage";
import TermsPage from "./pages/legal/TermsPage";
import CookiesPage from "./pages/legal/CookiesPage";
import LegalNoticePage from "./pages/legal/LegalNoticePage";

import ScrollToTop from "./components/layout/ScrollToTop";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ad/:id" element={<AdDetailPage />} />
        <Route path="/mis-preguntas" element={<MyQuestionsPage />} />
        <Route path="/mis-datos" element={<MyDataPage />} />
        <Route path="/mis-favoritos" element={<MyFavoritesPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/privacidad" element={<PrivacyPage />} />
        <Route path="/terminos" element={<TermsPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/aviso-legal" element={<LegalNoticePage />} />
      </Routes>
    </Router>
  );
}
