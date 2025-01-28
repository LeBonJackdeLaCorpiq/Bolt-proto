import React, { useState, useEffect } from 'react';
import PropertyManagement from './pages/PropertyManagement';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import AIChat from './components/AIChat';
import Dashboard from './pages/Dashboard';
import AddressBook from './pages/AddressBook';
import Statistics from './pages/Statistics';
import ProfitabilityCalculator from './pages/ProfitabilityCalculator';
import ConciergeService from './pages/ConciergeService';
import TenantPortal from './pages/TenantPortal';
import PortalCustomization from './pages/PortalCustomization';
import SecuritySettings from './pages/SecuritySettings';
import MemberSpace from './pages/MemberSpace';
import MemberNews from './pages/MemberNews';
import MemberEvents from './pages/MemberEvents';
import MemberTraining from './pages/MemberTraining';
import Subscription from './pages/Subscription';
import Profile from './pages/Profile';
import MemberCard from './pages/MemberCard';
import Organization from './pages/Organization';
import Maintenance from './pages/Maintenance';
import Onboarding from './pages/Onboarding';
import RentalManagement from './pages/RentalManagement';
import RentalRequests from './pages/RentalRequests';
import BackgroundCheck from './pages/BackgroundCheck';
import ElectronicLease from './pages/ElectronicLease';
import MemberRewards from './pages/MemberRewards';
import Finance from './pages/Finance';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Handle dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  if (currentPage === 'tenant-portal') {
    return <TenantPortal />;
  }

  if (currentPage === 'onboarding') {
    return <Onboarding onComplete={() => setCurrentPage('dashboard')} />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'property-management':
        return <PropertyManagement />;
      case 'address-book':
        return <AddressBook />;
      case 'statistics':
        return <Statistics />;
      case 'profitability-calculator':
        return <ProfitabilityCalculator />;
      case 'concierge-service':
        return <ConciergeService />;
      case 'portal-customization':
        return <PortalCustomization />;
      case 'settings-security':
        return <SecuritySettings />;
      case 'member-partners':
        return <MemberSpace />;
      case 'member-news':
        return <MemberNews />;
      case 'member-events':
        return <MemberEvents />;
      case 'member-training':
        return <MemberTraining />;
      case 'dashboard':
        return <Dashboard />;
      case 'subscription':
        return <Subscription onMenuClick={(page) => setCurrentPage(page)} />;
      case 'profile':
        return <Profile />;
      case 'member-card':
        return <MemberCard />;
      case 'organization':
        return <Organization />;
      case 'maintenance':
        return <Maintenance />;
      case 'rental-management':
        return <RentalManagement />;
      case 'rental-requests':
        return <RentalRequests />;
      case 'background-check':
        return <BackgroundCheck />;
      case 'lease':
        return <ElectronicLease />;
      case 'member-rewards':
        return <MemberRewards />;
      case 'finance':
        return <Finance />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        onMenuClick={(page) => setCurrentPage(page)}
        currentPage={currentPage}
        darkMode={darkMode}
      />
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-8">
          {/* N'afficher le header que sur le tableau de bord */}
          {currentPage === 'dashboard' && (
            <Header 
              userName="Paul" 
              onToolClick={(page) => setCurrentPage(page)}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          )}
          {renderContent()}
          {currentPage !== 'dashboard' && <AIChat position="right" />}
        </div>
      </div>
    </div>
  );
}