import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, DollarSign, Calculator, Wrench, ChevronDown, Ruler, FileSpreadsheet, Scale, Bot, Sliders, Brain, MessageSquare, Zap, Sparkles, Plus, CreditCard, Wallet, Building2, Star } from 'lucide-react';

interface HeaderProps {
  userName: string;
  onToolClick: (page: string) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

function Header({ userName, onToolClick, darkMode, setDarkMode }: HeaderProps) {
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const [showAIMenu, setShowAIMenu] = useState(false);
  const [showBalanceMenu, setShowBalanceMenu] = useState(false);
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [aiSettings, setAiSettings] = useState({
    suggestions: true,
    autoCompletion: true,
    proactiveAlerts: true,
    assistanceLevel: 'balanced' as 'minimal' | 'balanced' | 'proactive'
  });
  
  const toolsMenuRef = useRef<HTMLDivElement>(null);
  const aiMenuRef = useRef<HTMLDivElement>(null);
  const balanceMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target as Node)) {
        setShowToolsMenu(false);
      }
      if (aiMenuRef.current && !aiMenuRef.current.contains(event.target as Node)) {
        setShowAIMenu(false);
      }
      if (balanceMenuRef.current && !balanceMenuRef.current.contains(event.target as Node)) {
        setShowBalanceMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const tools = [
    {
      icon: Calculator,
      title: 'Calculateur augmentation de loyer',
      description: 'Calculez l\'augmentation légale du loyer',
      page: 'rent-calculator'
    },
    {
      icon: Ruler,
      title: 'Calculateur superficie',
      description: 'Mesurez la superficie des unités',
      page: 'area-calculator'
    },
    {
      icon: FileSpreadsheet,
      title: 'Modèles de documents',
      description: 'Accédez aux modèles de documents',
      page: 'document-templates'
    },
    {
      icon: Scale,
      title: 'Évaluateur de rentabilité',
      description: 'Analysez la rentabilité d\'un bien',
      page: 'profitability-calculator'
    },
    {
      icon: Sparkles,
      title: 'Rédacteur de lettre',
      description: 'Générez des lettres avec l\'aide de l\'IA',
      page: 'letter-writer',
      highlight: true
    }
  ];

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold dark:text-white">Bonjour, {userName}</h1>
        <p className="text-gray-600 dark:text-gray-400">Voici un aperçu de votre activité aujourd'hui</p>
      </div>
      <div className="flex gap-4 items-center">
        <div className="relative">
          <input
            type="search"
            placeholder="Rechercher..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        <div className="relative" ref={toolsMenuRef}>
          <button
            onClick={() => setShowToolsMenu(!showToolsMenu)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
          >
            <Wrench size={20} />
            <span>Outils pratiques</span>
            <ChevronDown size={16} className={`transition-transform ${showToolsMenu ? 'rotate-180' : ''}`} />
          </button>

          {showToolsMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border overflow-hidden z-50 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-2">
                {tools.map((tool, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      onToolClick(tool.page);
                      setShowToolsMenu(false);
                    }}
                    className={`w-full flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors dark:hover:bg-gray-700 ${
                      tool.highlight ? 'bg-blue-50 dark:bg-blue-900' : ''
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      tool.highlight ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <tool.icon size={20} className={tool.highlight ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'} />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <p className="font-medium dark:text-white">{tool.title}</p>
                        {tool.highlight && (
                          <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full dark:bg-blue-800 dark:text-blue-400">
                            IA
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{tool.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={aiMenuRef}>
          <button
            onClick={() => setShowAIMenu(!showAIMenu)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isAIEnabled ? 'bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-400' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white'
            }`}
          >
            <Bot size={20} />
            <span>Assistant IA</span>
            <div className="relative ml-2">
              <div className={`w-8 h-4 rounded-full transition-colors ${isAIEnabled ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <div className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform transform ${
                  isAIEnabled ? 'translate-x-4' : ''
                }`} />
              </div>
            </div>
          </button>

          {showAIMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border overflow-hidden z-50 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold dark:text-white">Paramètres de l'IA</h3>
                  <Sliders size={20} className="text-gray-400" />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                      Niveau d'assistance
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['minimal', 'balanced', 'proactive'].map((level) => (
                        <button
                          key={level}
                          onClick={() => setAiSettings({ ...aiSettings, assistanceLevel: level as any })}
                          className={`p-2 text-sm rounded-lg border transition-colors ${
                            aiSettings.assistanceLevel === level
                              ? 'border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-900 dark:text-blue-400'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white'
                          }`}
                        >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Brain size={18} className="text-gray-400" />
                        <span className="text-sm dark:text-white">Suggestions intelligentes</span>
                      </div>
                      <button
                        onClick={() => setAiSettings({ ...aiSettings, suggestions: !aiSettings.suggestions })}
                        className={`w-8 h-4 rounded-full transition-colors ${
                          aiSettings.suggestions ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full bg-white transform transition-transform ${
                          aiSettings.suggestions ? 'translate-x-4' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare size={18} className="text-gray-400" />
                        <span className="text-sm dark:text-white">Auto-complétion</span>
                      </div>
                      <button
                        onClick={() => setAiSettings({ ...aiSettings, autoCompletion: !aiSettings.autoCompletion })}
                        className={`w-8 h-4 rounded-full transition-colors ${
                          aiSettings.autoCompletion ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full bg-white transform transition-transform ${
                          aiSettings.autoCompletion ? 'translate-x-4' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap size={18} className="text-gray-400" />
                        <span className="text-sm dark:text-white">Alertes proactives</span>
                      </div>
                      <button
                        onClick={() => setAiSettings({ ...aiSettings, proactiveAlerts: !aiSettings.proactiveAlerts })}
                        className={`w-8 h-4 rounded-full transition-colors ${
                          aiSettings.proactiveAlerts ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full bg-white transform transition-transform ${
                          aiSettings.proactiveAlerts ? 'translate-x-4' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-800 dark:text-white">
            <Bell size={20} />
          </button>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </div>

        <div className="relative" ref={balanceMenuRef}>
          <button
            onClick={() => setShowBalanceMenu(!showBalanceMenu)}
            className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 dark:bg-green-900 dark:text-green-400 dark:hover:bg-green-800"
          >
            <DollarSign size={20} />
            <div>
              <p className="text-sm font-medium">Solde disponible</p>
              <div className="flex items-center gap-1">
                <p className="text-lg font-bold">49,50 $</p>
                <ChevronDown size={16} className={`transition-transform ${showBalanceMenu ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </button>

          {showBalanceMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border overflow-hidden z-50 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-2 border-b dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">Solde actuel</p>
                <p className="text-base font-bold text-green-700 dark:text-green-400">49,50 $</p>
              </div>
              <div className="p-2 border-b bg-yellow-50 dark:bg-yellow-900 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Points Corpiq</p>
                    <p className="text-base font-bold text-yellow-700 dark:text-yellow-400">2 450</p>
                  </div>
                  <Star size={16} className="text-yellow-500 dark:text-yellow-400" />
                </div>
              </div>
              <div className="p-1">
                <button className="w-full flex items-center gap-2 p-2 text-left hover:bg-gray-50 rounded-lg text-sm dark:hover:bg-gray-700 dark:text-white">
                  <CreditCard size={12} className="text-blue-600 dark:text-blue-400" />
                  <span>Carte de crédit</span>
                </button>
                <button className="w-full flex items-center gap-2 p-2 text-left hover:bg-gray-50 rounded-lg text-sm dark:hover:bg-gray-700 dark:text-white">
                  <Building2 size={12} className="text-purple-600 dark:text-purple-400" />
                  <span>Virement bancaire</span>
                </button>
                <button className="w-full flex items-center gap-2 p-2 text-left hover:bg-gray-50 rounded-lg text-sm dark:hover:bg-gray-700 dark:text-white">
                  <Wallet size={12} className="text-orange-600 dark:text-orange-400" />
                  <span>Portefeuille</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;