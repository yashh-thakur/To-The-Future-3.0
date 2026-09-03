import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Homepage from '../Pages/Homepage';
import Portfolio from '../Pages/PortFolio';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackgroundEffect from '../components/BackgroundEffect';
import ConsultationModal from '../components/ConsultationModal';

// Scroll to top helper on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationService, setConsultationService] = useState('');

  const handleOpenConsultation = (service = '') => {
    setConsultationService(service);
    setIsConsultationOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#02040a] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Ambient background animations & grid */}
      <BackgroundEffect />

      {/* Global Header / Navbar */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* Scroll restoration */}
      <ScrollToTop />

      {/* Page Routes */}
      <main className="relative z-10 min-h-[calc(100vh-200px)]">
        <Routes>
          <Route path="/" element={<Homepage onOpenConsultation={handleOpenConsultation} />} />
          <Route path="/portfolio" element={<Portfolio onOpenConsultation={handleOpenConsultation} />} />
          <Route path="*" element={<Homepage onOpenConsultation={handleOpenConsultation} />} />
        </Routes>
      </main>

      {/* Global Futuristic Footer */}
      <Footer onOpenConsultation={handleOpenConsultation} />

      {/* Global Consultation & Strategy Call Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialService={consultationService}
      />
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default AppRoutes;

