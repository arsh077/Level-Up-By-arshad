
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import StoryPage from './components/StoryPage';
import CalculatorPage from './components/CalculatorPage';
import FeaturesPage from './components/FeaturesPage';
import WaitlistPage from './components/WaitlistPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { Page } from './types';
import { WebGLShader } from './components/ui/web-gl-shader';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'story':
        return <StoryPage onNavigate={setCurrentPage} />;
      case 'calculator':
        return <CalculatorPage onNavigate={setCurrentPage} />;
      case 'features':
        return <FeaturesPage onNavigate={setCurrentPage} />;
      case 'waitlist':
        return <WaitlistPage />;
      case 'admin':
        if (isAdminAuthenticated) {
          return <AdminDashboard onLogout={() => setIsAdminAuthenticated(false)} />;
        }
        return <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-navy text-white selection:bg-brand-cyan selection:text-brand-navy font-sans relative">
      <WebGLShader />
      
      {/* Navbar hidden on Admin pages */}
      {currentPage !== 'admin' && (
        <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      )}

      <main>
        {renderPage()}
      </main>

      {currentPage !== 'admin' && (
        <Footer onNavigate={setCurrentPage} />
      )}
    </div>
  );
}

export default App;
