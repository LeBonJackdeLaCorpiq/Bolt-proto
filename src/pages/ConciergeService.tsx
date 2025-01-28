import React, { useState } from 'react';
import {
  AlertTriangle, Key, Calendar, Package, Search, Plus,
  Clock, CheckCircle2, MessageSquare, FileText, Shield,
  MoreVertical, Users, Bell, ChevronDown, Zap, ClipboardList,
  Eye, X, Send
} from 'lucide-react';

interface Emergency {
  id: string;
  title: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'resolved';
  timestamp: string;
  assignedTo?: string;
}

interface KeyRegistry {
  id: string;
  keyId: string;
  location: string;
  status: 'available' | 'borrowed';
  borrowedBy?: string;
  borrowedAt?: string;
  returnDue?: string;
}

interface ScheduleEntry {
  id: string;
  employee: string;
  shift: 'morning' | 'afternoon' | 'night';
  date: string;
  status: 'scheduled' | 'in_progress' | 'completed';
}

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  lastRestocked: string;
}

export default function ConciergeService() {
  const [activeTab, setActiveTab] = useState('emergencies');
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(null);

  // Données simulées
  const emergencies: Emergency[] = [
    {
      id: '1',
      title: 'Fuite d\'eau majeure',
      location: 'Apt 2A - 123 rue de Paris',
      priority: 'high',
      status: 'in_progress',
      timestamp: '2024-03-15T10:30:00',
      assignedTo: 'Jean Plombier'
    },
    {
      id: '2',
      title: 'Panne d\'électricité',
      location: 'Apt 3B - 45 av. Victor Hugo',
      priority: 'high',
      status: 'pending',
      timestamp: '2024-03-15T11:15:00'
    }
  ];

  const keyRegistry: KeyRegistry[] = [
    {
      id: '1',
      keyId: 'KEY-001',
      location: 'Apt 2A',
      status: 'borrowed',
      borrowedBy: 'Marc Dupont',
      borrowedAt: '2024-03-15T09:00:00',
      returnDue: '2024-03-15T17:00:00'
    },
    {
      id: '2',
      keyId: 'KEY-002',
      location: 'Apt 3B',
      status: 'available'
    }
  ];

  const schedule: ScheduleEntry[] = [
    {
      id: '1',
      employee: 'Pierre Martin',
      shift: 'morning',
      date: '2024-03-15',
      status: 'in_progress'
    },
    {
      id: '2',
      employee: 'Sophie Dubois',
      shift: 'afternoon',
      date: '2024-03-15',
      status: 'scheduled'
    }
  ];

  const inventory: InventoryItem[] = [
    {
      id: '1',
      name: 'Ampoules LED',
      category: 'Électricité',
      currentStock: 15,
      minStock: 20,
      lastRestocked: '2024-03-01'
    },
    {
      id: '2',
      name: 'Produits de nettoyage',
      category: 'Entretien',
      currentStock: 8,
      minStock: 10,
      lastRestocked: '2024-03-10'
    }
  ];

  const stats = {
    emergencies: {
      total: emergencies.length,
      pending: emergencies.filter(e => e.status === 'pending').length,
      inProgress: emergencies.filter(e => e.status === 'in_progress').length,
      resolved: emergencies.filter(e => e.status === 'resolved').length
    },
    keys: {
      total: keyRegistry.length,
      available: keyRegistry.filter(k => k.status === 'available').length,
      borrowed: keyRegistry.filter(k => k.status === 'borrowed').length
    }
  };

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Service de Conciergerie</h1>
          <p className="text-gray-600">Gérez les urgences et l'entretien de vos propriétés</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="search"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus size={20} />
            <span>Nouvelle urgence</span>
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">Urgences en cours</p>
              <p className="text-2xl font-bold">{stats.emergencies.inProgress}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">En attente</p>
              <p className="text-2xl font-bold">{stats.emergencies.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Key className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">Clés empruntées</p>
              <p className="text-2xl font-bold">{stats.keys.borrowed}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <Package className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">Stock à renouveler</p>
              <p className="text-2xl font-bold">
                {inventory.filter(i => i.currentStock < i.minStock).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b">
          <div className="flex">
            {[
              { id: 'emergencies', icon: AlertTriangle, text: 'Urgences' },
              { id: 'keys', icon: Key, text: 'Gestion des clés' },
              { id: 'schedule', icon: Calendar, text: 'Planning' },
              { id: 'inventory', icon: Package, text: 'Inventaire' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.text}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Contenu des onglets */}
          {activeTab === 'emergencies' && (
            <div className="space-y-4">
              {emergencies.map((emergency) => (
                <div
                  key={emergency.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      emergency.priority === 'high'
                        ? 'bg-red-100'
                        : emergency.priority === 'medium'
                        ? 'bg-yellow-100'
                        : 'bg-green-100'
                    }`}>
                      <AlertTriangle className={
                        emergency.priority === 'high'
                          ? 'text-red-600'
                          : emergency.priority === 'medium'
                          ? 'text-yellow-600'
                          : 'text-green-600'
                      } size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">{emergency.title}</h3>
                      <p className="text-sm text-gray-500">{emergency.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {emergency.assignedTo && (
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{emergency.assignedTo}</span>
                      </div>
                    )}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      emergency.status === 'resolved'
                        ? 'bg-green-100 text-green-700'
                        : emergency.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {emergency.status === 'resolved' ? 'Résolu' :
                       emergency.status === 'in_progress' ? 'En cours' : 'En attente'}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedEmergency(emergency);
                        setShowEmergencyModal(true);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Eye size={20} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'keys' && (
            <div className="space-y-4">
              {keyRegistry.map((key) => (
                <div
                  key={key.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Key className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">{key.keyId}</h3>
                      <p className="text-sm text-gray-500">{key.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {key.borrowedBy && (
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{key.borrowedBy}</span>
                      </div>
                    )}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      key.status === 'available'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {key.status === 'available' ? 'Disponible' : 'Emprunté'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-4">
              {schedule.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Users className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">{entry.employee}</h3>
                      <p className="text-sm text-gray-500">
                        {entry.shift === 'morning' ? 'Matin' :
                         entry.shift === 'afternoon' ? 'Après-midi' : 'Nuit'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(entry.date).toLocaleDateString('fr-CA')}
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      entry.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : entry.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {entry.status === 'completed' ? 'Terminé' :
                       entry.status === 'in_progress' ? 'En cours' : 'Planifié'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-4">
              {inventory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Package className="text-green-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Stock: {item.currentStock} / {item.minStock}
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.currentStock < item.minStock
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {item.currentStock < item.minStock ? 'À commander' : 'OK'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal des détails d'urgence */}
      {showEmergencyModal && selectedEmergency && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Détails de l'urgence</h2>
                <button 
                  onClick={() => setShowEmergencyModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{selectedEmergency.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <AlertTriangle size={16} />
                      Priorité {selectedEmergency.priority === 'high' ? 'haute' : 'moyenne'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {new Date(selectedEmergency.timestamp).toLocaleString('fr-CA')}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Localisation</h4>
                  <p className="text-gray-600">{selectedEmergency.location}</p>
                </div>

                {selectedEmergency.assignedTo && (
                  <div>
                    <h4 className="font-medium mb-2">Assigné à</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users size={16} className="text-blue-600" />
                      </div>
                      <span>{selectedEmergency.assignedTo}</span>
                    </div>
                  </div>
                )}

                <div className="border-t pt-6">
                  <div className="flex gap-4">
                    <textarea
                      placeholder="Ajouter un commentaire..."
                      className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                    <button className="flex-shrink-0 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
                      <Send size={20} />
                    </button>
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