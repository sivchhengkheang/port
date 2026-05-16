import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop';
import { lazy, Suspense } from 'react';

// Lazy load the single page
const GamePortal = lazy(() => import('./pages/GamePortal'));

// Loading Fallback
const PageLoader = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 border-4 border-primary/10 rounded-full" />
      <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
    <div className="mt-8 font-mono text-[10px] font-bold tracking-[0.5em] text-primary uppercase animate-pulse">
      Loading...
    </div>
  </div>
);

export default function App() {
  useEffect(() => {
    // Smooth scroll
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-center" expand={false} richColors />
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/*" element={<GamePortal />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}
