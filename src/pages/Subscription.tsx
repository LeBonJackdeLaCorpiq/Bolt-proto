import React, { useState } from 'react';
import {
  CreditCard, Download, FileText, Clock, Check,
  AlertTriangle, Plus, Trash2, ChevronRight, Zap,
  Building, Users, Bot, MessageSquare, Shield,
  BarChart2, Calendar, Phone, Crown, X, CreditCard as CardIcon
} from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  billing: 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  number: string;
}

interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export default function Subscription({ onMenuClick }: { onMenuClick: (page: string) => void }) {
  const [activeTab, setActiveTab] = useState('plans');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showAddCard, setShowAddCard] = useState(false);

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 0,
      billing: 'monthly',
      features: [
        'Jusqu\'à 5 propriétés',
        'Gestion des locataires',
        'Documents de base',
        'Support par email'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29.99,
      billing: 'monthly',
      features: [
        'Propriétés illimitées',
        'Gestion avancée',
        'Documents premium',
        'Support prioritaire 24/7',
        'Assistant IA',
        'Analyses avancées'
      ],
      isPopular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99.99,
      billing: 'monthly',
      features: [
        'Tout Pro +',
        'API personnalisée',
        'Gestionnaire de compte dédié',
        'Formation sur mesure',
        'SLA garanti'
      ]
    }
  ];

  const invoices: Invoice[] = [
    {
      id: '1',
      date: '2024-03-01',
      amount: 29.99,
      status: 'paid',
      number: 'INV-2024-001'
    },
    {
      id: '2',
      date: '2024-02-01',
      amount: 29.99,
      status: 'paid',
      number: 'INV-2024-002'
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'card',
      last4: '4242',
      expiry: '12/24',
      isDefault: true
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold">Abonnement Pro</h1>
        <p className="text-gray-600">Gérez votre abonnement et vos informations de paiement</p>
      </div>

      {/* Onglets */}
      <div className="border-b">
        <div className="flex space-x-8">
          {[
            { id: 'plans', text: 'Forfaits' },
            { id: 'billing', text: 'Facturation' },
            { id: 'payment', text: 'Paiement' },
            { id: 'member-card', text: 'Carte de membre' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'member-card') {
                  onMenuClick('member-card');
                } else {
                  setActiveTab(tab.id);
                }
              }}
              className={`py-4 px-2 relative ${
                activeTab === tab.id
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.text}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'plans' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white p-6 rounded-xl shadow-sm border-2 ${
                plan.isPopular ? 'border-blue-600' : 'border-transparent'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    Populaire
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-gray-500">/mois</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full py-2 rounded-lg ${
                  plan.isPopular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {plan.price === 0 ? 'Commencer' : 'Choisir'}
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Historique des factures</h2>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FileText size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{invoice.number}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(invoice.date).toLocaleDateString('fr-CA')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      invoice.status === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : invoice.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {invoice.status === 'paid' ? 'Payée' :
                       invoice.status === 'pending' ? 'En attente' : 'Échec'}
                    </span>
                    <span className="font-medium">${invoice.amount}</span>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Download size={20} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'payment' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Moyens de paiement</h2>
              <button
                onClick={() => setShowAddCard(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus size={20} />
                <span>Ajouter une carte</span>
              </button>
            </div>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <CardIcon size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">•••• {method.last4}</p>
                      <p className="text-sm text-gray-500">Expire {method.expiry}</p>
                    </div>
                    {method.isDefault && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        Par défaut
                      </span>
                    )}
                  </div>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal d'ajout de carte */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Ajouter une carte</h2>
                <button
                  onClick={() => setShowAddCard(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Numéro de carte
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date d'expiration
                    </label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom sur la carte
                  </label>
                  <input
                    type="text"
                    placeholder="JEAN DUPONT"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setShowAddCard(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    // Logique d'ajout de carte
                    setShowAddCard(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}