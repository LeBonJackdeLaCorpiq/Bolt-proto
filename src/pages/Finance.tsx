import React, { useState } from 'react';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle
} from 'react-resizable-panels';
import {
  DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, 
  Percent, Bot, Target, BrainCircuit, Sparkles, Share2,
  Download, Mail, FileText, Send, Printer, History, Settings,
  Copy, Archive, AlertTriangle, ChevronRight, Eye, Plus,
  Search, Filter, Calendar, Clock, Building, FileCheck,
  Camera, PieChart, BarChart2, LineChart, Calculator,
  FileSpreadsheet
} from 'lucide-react';
import TransactionsModal from '../components/TransactionsModal';
import OCRScanner from '../components/OCRScanner';
import NewTransactionModal from '../components/NewTransactionModal';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  property?: string;
  unit?: string;
  attachments?: number;
}

export default function Finance() {
  const [showTransactionsModal, setShowTransactionsModal] = useState(false);
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);

  // Données simulées des transactions
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'income',
      category: 'Loyer',
      amount: 1200,
      description: 'Loyer Apt 2A - Mars 2024',
      date: '2024-03-01',
      property: '123 rue de Paris',
      unit: 'Apt 2A'
    },
    {
      id: '2',
      type: 'expense',
      category: 'Entretien',
      amount: 250,
      description: 'Réparation plomberie',
      date: '2024-03-05',
      property: '123 rue de Paris',
      unit: 'Apt 1B',
      attachments: 2
    },
    {
      id: '3',
      type: 'income',
      category: 'Loyer',
      amount: 950,
      description: 'Loyer Apt 3C - Mars 2024',
      date: '2024-03-01',
      property: '45 av. Victor Hugo',
      unit: 'Apt 3C'
    }
  ];

  const handleNewTransaction = (transaction: any) => {
    console.log('Nouvelle transaction:', transaction);
    // Ici vous ajouteriez la logique pour sauvegarder la transaction
  };

  const handleScanResult = (result: any) => {
    console.log('Résultat du scan:', result);
    // Ici vous ajouteriez la logique pour traiter le résultat du scan
  };

  const renderAnalyticsPanel = () => (
    <div className="space-y-6">
      {/* Aperçu financier */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
          <TrendingUp size={20} className="text-blue-600 dark:text-blue-400" />
          Aperçu financier
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Revenus mensuels</span>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <ArrowUpRight size={16} />
              <span>2 150$</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Dépenses mensuelles</span>
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <ArrowDownRight size={16} />
              <span>850$</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Ratio dépenses/revenus</span>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Percent size={16} />
              <span>39.5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions de l'IA */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
          <Bot size={20} className="text-purple-600 dark:text-purple-400" />
          Suggestions de l'IA
        </h3>
        <div className="space-y-4">
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 mb-2">
              <Target size={16} />
              <span className="font-medium">Optimisation fiscale</span>
            </div>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              Pensez à regrouper vos factures d'entretien pour optimiser vos déductions fiscales.
            </p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-2">
              <BrainCircuit size={16} />
              <span className="font-medium">Prévisions</span>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Prévoyez une augmentation des dépenses d'entretien pour le prochain trimestre.
            </p>
          </div>
        </div>
      </div>

      {/* Outils rapides */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
          <Sparkles size={20} className="text-orange-600 dark:text-orange-400" />
          Outils rapides
        </h3>
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex items-center gap-2">
              <Calculator size={16} className="text-blue-600 dark:text-blue-400" />
              <span className="dark:text-white">Calculateur de rentabilité</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-green-600 dark:text-green-400" />
              <span className="dark:text-white">Générer un rapport</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex items-center gap-2">
              <PieChart size={16} className="text-purple-600 dark:text-purple-400" />
              <span className="dark:text-white">Analyse des dépenses</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex items-center gap-2">
              <FileSpreadsheet size={16} className="text-orange-600 dark:text-orange-400" />
              <span className="dark:text-white">Générer les relevés 31</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={75} minSize={50}>
        <div className="space-y-8">
          {/* En-tête */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold dark:text-white">Finance</h1>
              <p className="text-gray-600 dark:text-gray-400">Gérez vos revenus et dépenses</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowScannerModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
              >
                <Camera size={20} />
                <span>Scanner</span>
              </button>
              <button 
                onClick={() => setShowNewTransactionModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Plus size={20} />
                <span>Nouvelle transaction</span>
              </button>
            </div>
          </div>

          {/* Bannière d'intégration */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-2">
                  Connectez votre logiciel comptable
                </h2>
                <p className="text-blue-100 mb-4">
                  Synchronisez automatiquement vos transactions avec vos outils préférés
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                    Hopem
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                    Building Stack
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                    QuickBooks
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:block w-px h-16 bg-blue-400"></div>
                <div className="text-center md:text-right">
                  <p className="text-blue-100 mb-2">Commencez en quelques minutes</p>
                  <button className="px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
                    <Share2 size={20} />
                    <span>Connecter une API</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <DollarSign className="text-green-600 dark:text-green-400" size={24} />
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 mb-2">Revenus du mois</h3>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold dark:text-white">2 150$</p>
                <div className="flex items-center gap-1 text-green-500">
                  <ArrowUpRight size={20} />
                  <span>+12.5%</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <DollarSign className="text-red-600 dark:text-red-400" size={24} />
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 mb-2">Dépenses du mois</h3>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold dark:text-white">850$</p>
                <div className="flex items-center gap-1 text-red-500">
                  <ArrowUpRight size={20} />
                  <span>+8.2%</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <TrendingUp className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 mb-2">Taux de rentabilité</h3>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold dark:text-white">8.2%</p>
                <div className="flex items-center gap-1 text-green-500">
                  <ArrowUpRight size={20} />
                  <span>+0.4%</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <AlertTriangle className="text-purple-600 dark:text-purple-400" size={24} />
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 mb-2">Retards de paiement</h3>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold dark:text-white">2</p>
                <div className="flex items-center gap-1 text-red-500">
                  <ArrowUpRight size={20} />
                  <span>+1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions récentes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6 border-b dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold dark:text-white">Transactions récentes</h2>
                <button
                  onClick={() => setShowTransactionsModal(true)}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Voir tout
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {transactions.slice(0, 5).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'income'
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {transaction.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">{transaction.description}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {transaction.property} {transaction.unit && `- ${transaction.unit}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.type === 'income'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{transaction.amount}$
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(transaction.date).toLocaleDateString('fr-CA')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Panel>

      <PanelResizeHandle className="panel-resize-handle" />

      <Panel defaultSize={25} minSize={20}>
        {renderAnalyticsPanel()}
      </Panel>

      {/* Modales */}
      <TransactionsModal
        isOpen={showTransactionsModal}
        onClose={() => setShowTransactionsModal(false)}
        transactions={transactions}
      />

      {showScannerModal && (
        <OCRScanner
          onResult={handleScanResult}
          onClose={() => setShowScannerModal(false)}
        />
      )}

      <NewTransactionModal
        isOpen={showNewTransactionModal}
        onClose={() => setShowNewTransactionModal(false)}
        onSubmit={handleNewTransaction}
      />
    </PanelGroup>
  );
}