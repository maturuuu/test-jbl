import { useState } from 'react';
import { AudioStudioSection } from './components/AudioStudioSection';
import { AuthModal } from './components/AuthModal';
import { ControlsAndBoxSection } from './components/ControlsAndBoxSection';
import { FeaturesBento } from './components/FeaturesBento';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { TechSpecsSection } from './components/TechSpecsSection';
import { AuthProvider } from './context/AuthContext';

function TourPro3Landing() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const openAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const scrollToStudio = () => {
    const el = document.getElementById('studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-100">
      <Navbar onOpenAuth={openAuth} onOpenDashboard={scrollToStudio} />

      <main>
        <HeroSection onOpenAuth={openAuth} onOpenDashboard={scrollToStudio} />
        <FeaturesBento />
        <ControlsAndBoxSection />
        <TechSpecsSection />
        <AudioStudioSection onOpenAuth={openAuth} />
      </main>

      <Footer />

      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          setAuthModalOpen(false);
          scrollToStudio();
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TourPro3Landing />
    </AuthProvider>
  );
}
