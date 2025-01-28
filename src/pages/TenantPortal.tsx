import React, { useState } from 'react';
import {
  LogIn, Mail, Lock, Building, FileText, MessageSquare, Wrench,
  DollarSign, Calendar, Bell, FileSpreadsheet, ChevronRight, 
  AlertTriangle, CheckCircle2, Clock, Upload, Download, Eye,
  Users, Camera, Key, Zap, ThermometerSun, Bot, Plus
} from 'lucide-react';

interface TenantDashboard {
  name: string;
  property: string;
  unit: string;
  rent: number;
  nextPayment: string;
  maintenanceRequests: number;
  documents: number;
  messages: number;
}

export default function TenantPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('demo123');

  // Données simulées du tableau de bord
  const dashboardData: TenantDashboard = {
    name: "Marc Dupont",
    property: "123 rue de Paris",
    unit: "Apt 2A",
    rent: 1200,
    nextPayment: "2024-04-01",
    maintenanceRequests: 2,
    documents: 5,
    messages: 3
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'demo@example.com' && password === 'demo123') {
      setIsLoggedIn(true);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Bienvenue, {dashboardData.name}</h1>
            <p className="text-gray-600">{dashboardData.property} - {dashboardData.unit}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {dashboardData.messages}
              </span>
            </button>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <MessageSquare size={20} />
              <span>Contacter le propriétaire</span>
            </button>
          </div>
        </div>

        {/* Cartes d'information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <DollarSign size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-600">Prochain loyer</p>
                <p className="text-2xl font-bold">{dashboardData.rent}$</p>
                <p className="text-sm text-gray-500">Dû le {new Date(dashboardData.nextPayment).toLocaleDateString('fr-CA')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Wrench size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-600">Demandes de travaux</p>
                <p className="text-2xl font-bold">{dashboardData.maintenanceRequests}</p>
                <p className="text-sm text-gray-500">En cours</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <FileText size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600">Documents</p>
                <p className="text-2xl font-bold">{dashboardData.documents}</p>
                <p className="text-sm text-gray-500">Disponibles</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <MessageSquare size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600">Messages</p>
                <p className="text-2xl font-bold">{dashboardData.messages}</p>
                <p className="text-sm text-gray-500">Non lus</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Actions rapides</h2>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <DollarSign size={20} className="text-green-600" />
                  <span>Payer mon loyer</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Wrench size={20} className="text-yellow-600" />
                  <span>Demande de travaux</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-blue-600" />
                  <span>Voir mes documents</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Derniers messages</h2>
            <div className="space-y-4">
              {/* Messages simulés */}
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">Rappel de paiement</p>
                  <span className="text-sm text-gray-500">Aujourd'hui</span>
                </div>
                <p className="text-sm text-gray-600">Votre prochain loyer est dû dans 5 jours.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">Maintenance planifiée</p>
                  <span className="text-sm text-gray-500">Hier</span>
                </div>
                <p className="text-sm text-gray-600">Inspection des détecteurs de fumée prévue le 15 avril.</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Assistant IA</h2>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Bot size={24} className="text-blue-600" />
                <div>
                  <p className="font-medium">Assistant virtuel</p>
                  <p className="text-sm text-blue-600">En ligne</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Je peux vous aider avec vos questions concernant votre location.
              </p>
              <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <MessageSquare size={20} />
                <span>Démarrer une conversation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="text-blue-600" size={32} />
          </div>
          <h1 className="text-2xl font-bold">Portail Locataire</h1>
          <p className="text-gray-600">Connectez-vous à votre espace</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Votre email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Votre mot de passe"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            Se connecter
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
            Mot de passe oublié ?
          </a>
        </div>
      </div>
    </div>
  );
}