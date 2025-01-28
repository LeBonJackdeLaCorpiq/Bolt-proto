import React, { useState } from 'react';
import { 
  Home, Users, MessageSquare, Settings, PieChart, 
  Building, Wallet, Menu, X, ClipboardList, BookOpen, 
  BarChart2, FileText, Wrench, Archive, Calculator, 
  ClipboardCheck, ChevronUp, UserCircle, CreditCard, 
  HelpCircle, LogOut, Package, Zap, Shield, Bot,
  DoorOpen, Sparkles, Palette, Newspaper, Calendar,
  GraduationCap, Percent, Crown, CreditCard as CardIcon,
  Megaphone, UserCheck, FileSpreadsheet, RefreshCw,
  Briefcase, Gift, PlayCircle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onMenuClick: (page: string) => void;
  currentPage: string;
  darkMode: boolean;
}

interface MenuItem {
  icon: any;
  text: string;
  page?: string;
  submenu?: MenuItem[];
  isPro?: boolean;
}

interface MenuItemProps {
  item: MenuItem;
  isOpen: boolean;
  isActive: boolean;
  onClick: (page?: string) => void;
  currentPage: string;
}

function MenuItem({ item, isOpen, isActive, onClick, currentPage }: MenuItemProps) {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleClick = () => {
    if (item.submenu) {
      setShowSubmenu(!showSubmenu);
    }
    if (item.page) {
      onClick(item.page);
    }
  };

  return (
    <div>
      <div 
        className={`flex items-center p-3 rounded-lg cursor-pointer
          ${isActive ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
        onClick={handleClick}
      >
        <item.icon size={20} />
        {isOpen && (
          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center gap-2">
              <span className="ml-3 dark:text-gray-200">{item.text}</span>
              {item.isPro && (
                <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded">PRO</span>
              )}
            </div>
            {item.submenu && (
              <ChevronUp
                size={16}
                className={`transition-transform dark:text-gray-300 ${showSubmenu ? 'rotate-180' : ''}`}
              />
            )}
          </div>
        )}
      </div>

      {isOpen && showSubmenu && item.submenu && (
        <div className="ml-7 mb-2 space-y-1">
          {item.submenu.map((subItem, subIndex) => (
            <div
              key={subIndex}
              className={`flex items-center p-2 rounded-lg text-sm cursor-pointer
                ${subItem.isPro ? 'opacity-75' : ''}
                ${currentPage === subItem.page ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              onClick={() => {
                if (subItem.page) {
                  onClick(subItem.page);
                }
              }}
            >
              <subItem.icon size={16} />
              <div className="flex items-center justify-between flex-1">
                <span className="ml-2">{subItem.text}</span>
                {subItem.isPro && (
                  <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded">PRO</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ isOpen, setIsOpen, onMenuClick, currentPage, darkMode }: SidebarProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleMenuClick = (page?: string) => {
    if (page) {
      onMenuClick(page);
    }
  };

  const menuItems: MenuItem[] = [
    { icon: Home, text: 'Tableau de bord', page: 'dashboard' },
    { 
      icon: ClipboardList, 
      text: 'Gestion',
      submenu: [
        { icon: Building, text: 'Gérer mon parc', page: 'property-management' },
        { icon: BookOpen, text: 'Carnet d\'adresses', page: 'address-book' },
        { icon: BarChart2, text: 'Statistiques', page: 'statistics' },
        { icon: FileText, text: 'Rapports', page: 'reports', isPro: true },
        { icon: Wrench, text: 'Travaux', page: 'maintenance' },
        { icon: Archive, text: 'Stockage et Archives', page: 'storage' },
        { icon: Calculator, text: 'Évaluateur de rentabilité', page: 'profitability-calculator' },
        { icon: ClipboardCheck, text: 'États des lieux', page: 'property-inspection', isPro: true }
      ]
    },
    { 
      icon: RefreshCw, 
      text: 'Cycle locatif',
      submenu: [
        { icon: Megaphone, text: 'Annonces', page: 'rental-management' },
        { icon: FileText, text: 'Demandes de location', page: 'rental-requests' },
        { icon: UserCheck, text: 'Enquête de pré-location', page: 'background-check' },
        { icon: FileSpreadsheet, text: 'Bail électronique', page: 'lease' },
        { icon: Calendar, text: 'Reconduction de bail', page: 'renewal' }
      ]
    },
    { icon: Wallet, text: 'Finance', page: 'finance', isPro: true },
    { icon: MessageSquare, text: 'Communication', page: 'communication' },
    { 
      icon: Users, 
      text: 'Espace Membre',
      submenu: [
        { icon: Percent, text: 'Rabais partenaires', page: 'member-partners' },
        { icon: Gift, text: 'Mes récompenses', page: 'member-rewards' },
        { icon: Newspaper, text: 'Actualités', page: 'member-news' },
        { icon: Calendar, text: 'Événements', page: 'member-events' },
        { icon: GraduationCap, text: 'Formations', page: 'member-training' },
        { icon: CardIcon, text: 'Carte de membre', page: 'member-card' }
      ]
    },
    { icon: Wrench, text: 'Conciergerie', page: 'concierge-service', isPro: true },
    { 
      icon: Settings, 
      text: 'Paramètres',
      submenu: [
        { icon: UserCircle, text: 'Profil', page: 'profile' },
        { icon: Briefcase, text: 'Mon organisation', page: 'organization', isPro: true },
        { icon: Shield, text: 'Sécurité', page: 'settings-security' },
        { icon: Palette, text: 'Personnaliser le portail', page: 'portal-customization' }
      ]
    }
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 flex flex-col dark:bg-gray-800 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        {isOpen ? (
          <img 
            src="https://www.corpiq.com/gx/corpiq-logo.png" 
            alt="CORPIQ Logo" 
            className="h-8"
          />
        ) : (
          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <Building size={20} className="text-gray-600 dark:text-gray-300" />
          </div>
        )}
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          {isOpen ? <X size={20} className="dark:text-gray-300" /> : <Menu size={20} className="dark:text-gray-300" />}
        </button>
      </div>
      
      <nav className="p-4 flex-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            isOpen={isOpen}
            isActive={item.page === currentPage || (item.submenu?.some(subItem => subItem.page === currentPage))}
            onClick={handleMenuClick}
            currentPage={currentPage}
          />
        ))}
      </nav>

      <div className="p-4 border-t dark:border-gray-700 bg-blue-50 dark:bg-blue-900">
        <button
          onClick={() => handleMenuClick('tenant-portal')}
          className="w-full flex items-center gap-3 p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
        >
          <DoorOpen size={20} />
          {isOpen && (
            <span className="flex-1 text-left">Voir le portail locataire</span>
          )}
        </button>
      </div>

      <AccountMenu isOpen={isOpen} onMenuClick={handleMenuClick} />

      <div className="px-4 py-2 border-t dark:border-gray-700">
        <button
          onClick={() => setShowVideoModal(true)}
          className="w-full flex items-center gap-3 p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
        >
          <PlayCircle size={16} />
          {isOpen && (
            <span className="flex-1 text-left">Visite guidée</span>
          )}
        </button>
      </div>

      {/* Modal de la visite guidée */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-4xl">
            <div className="p-6 border-b dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold dark:text-white">Visite guidée</h2>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <X size={20} className="dark:text-white" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold dark:text-white">Fonctionnalités de base</h3>
                  <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg">
                    {/* Intégrer ici la vidéo de présentation des fonctionnalités de base */}
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/VIDEO_ID_1"
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold dark:text-white">Fonctionnalités avancées</h3>
                  <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg">
                    {/* Intégrer ici la vidéo des fonctionnalités avancées */}
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/VIDEO_ID_2"
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AccountMenu({ isOpen, onMenuClick }: { isOpen: boolean; onMenuClick: (page: string) => void }) {
  const [showMenu, setShowMenu] = useState(false);
  
  const menuItems = [
    { icon: UserCircle, text: 'Mon Profil', page: 'profile' },
    { icon: Crown, text: 'Abonnement Pro', page: 'subscription' },
    { icon: CardIcon, text: 'Carte de membre', page: 'member-card' },
    { icon: HelpCircle, text: 'Aide' },
    { icon: LogOut, text: 'Déconnexion' }
  ];

  return (
    <div className="relative mt-auto p-4 border-t dark:border-gray-700">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center w-full p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            PM
          </div>
          {isOpen && (
            <>
              <div className="flex-1">
                <p className="font-medium dark:text-gray-200">Paul Martin</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Essayer Pro</p>
              </div>
              <ChevronUp
                size={20}
                className={`transition-transform dark:text-gray-300 ${showMenu ? 'rotate-180' : ''}`}
              />
            </>
          )}
        </div>
      </button>

      {showMenu && isOpen && (
        <div className="absolute bottom-full left-0 w-full p-2 mb-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 overflow-hidden">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => {
                  if (item.page) {
                    onMenuClick(item.page);
                  }
                  setShowMenu(false);
                }}
              >
                <item.icon size={16} />
                <span>{item.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}