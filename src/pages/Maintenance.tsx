import React, { useState } from 'react';
import { 
  Wrench, Search, Filter, Plus, Building, Calendar,
  AlertTriangle, CheckCircle2, Clock, MessageSquare,
  MoreVertical, FileText, DollarSign, Users,
  ChevronDown, X, Send
} from 'lucide-react';

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'urgent';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  property: string;
  unit: string;
  requestedBy: string;
  estimatedCost?: number;
  assignedTo?: string;
}

export default function Maintenance() {
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);

  // Données simulées pour les demandes de travaux
  const maintenanceRequests: MaintenanceRequest[] = [
    {
      id: '1',
      title: 'Fuite robinet salle de bain',
      description: 'Le robinet de la salle de bain principale fuit constamment',
      status: 'urgent',
      priority: 'high',
      createdAt: '2024-03-15',
      property: '123 rue de Paris',
      unit: 'Apt 2A',
      requestedBy: 'Marc Dupont',
      estimatedCost: 150,
      assignedTo: 'Jean Plombier'
    },
    {
      id: '2',
      title: 'Peinture chambre principale',
      description: 'Rafraîchissement de la peinture nécessaire',
      status: 'pending',
      priority: 'low',
      createdAt: '2024-03-14',
      property: '45 av. Victor Hugo',
      unit: 'Apt 3B',
      requestedBy: 'Sophie Tremblay'
    },
    {
      id: '3',
      title: 'Problème chauffage',
      description: 'Le radiateur du salon ne chauffe pas correctement',
      status: 'in_progress',
      priority: 'medium',
      createdAt: '2024-03-13',
      property: '123 rue de Paris',
      unit: 'Apt 1C',
      requestedBy: 'Jean Lavoie',
      assignedTo: 'Pierre Chauffagiste'
    }
  ];

  // Calcul des statistiques
  const stats = {
    total: maintenanceRequests.length,
    urgent: maintenanceRequests.filter(r => r.status === 'urgent').length,
    pending: maintenanceRequests.filter(r => r.status === 'pending').length,
    inProgress: maintenanceRequests.filter(r => r.status === 'in_progress').length,
    completed: maintenanceRequests.filter(r => r.status === 'completed').length
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Gestion des travaux</h1>
          <p className="text-gray-600">Suivez et gérez les travaux de vos propriétés</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="search"
              placeholder="Rechercher des travaux..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <Filter size={20} />
            <span>Filtres</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus size={20} />
            <span>Nouveau travail</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">Urgents</p>
              <p className="text-2xl font-bold">{stats.urgent}</p>
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
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Wrench className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">En cours</p>
              <p className="text-2xl font-bold">{stats.inProgress}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">Complétés</p>
              <p className="text-2xl font-bold">{stats.completed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Requests List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Liste des travaux</h2>
        </div>
        
        <div className="p-6">
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b">
              <div className="col-span-3">Travail</div>
              <div className="col-span-2">Propriété</div>
              <div className="col-span-2">Demandeur</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Statut</div>
              <div className="col-span-1">Actions</div>
            </div>
            
            {maintenanceRequests.map((request) => (
              <div key={request.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 border-b">
                <div className="col-span-3">
                  <p className="font-medium">{request.title}</p>
                  <p className="text-sm text-gray-500">{request.description}</p>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <Building size={16} className="text-gray-400" />
                    <div>
                      <p className="font-medium">{request.unit}</p>
                      <p className="text-sm text-gray-500">{request.property}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-400" />
                    <span>{request.requestedBy}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="text-sm flex items-center gap-1">
                    <Calendar size={14} className="text-gray-400" />
                    {new Date(request.createdAt).toLocaleDateString('fr-CA')}
                  </p>
                </div>
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    request.status === 'urgent' 
                      ? 'bg-red-100 text-red-700'
                      : request.status === 'in_progress'
                      ? 'bg-blue-100 text-blue-700'
                      : request.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {request.status === 'urgent' ? 'Urgent' : 
                     request.status === 'in_progress' ? 'En cours' :
                     request.status === 'completed' ? 'Complété' : 'En attente'}
                  </span>
                </div>
                <div className="col-span-1">
                  <div className="relative">
                    <button 
                      onClick={() => setShowMenu(showMenu === request.id ? null : request.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <MoreVertical size={20} />
                    </button>
                    
                    {showMenu === request.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-10">
                        <button 
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowCommunicationModal(true);
                            setShowMenu(null);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <MessageSquare size={16} />
                          <span>Communiquer</span>
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <FileText size={16} />
                          <span>Détails</span>
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <DollarSign size={16} />
                          <span>Ajouter devis</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Communication Modal */}
      {showCommunicationModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Communication - {selectedRequest.title}</h2>
                <button 
                  onClick={() => setShowCommunicationModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4 mb-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users size={20} className="text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-lg p-4">
                    <p className="font-medium mb-1">{selectedRequest.requestedBy}</p>
                    <p>{selectedRequest.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(selectedRequest.createdAt).toLocaleDateString('fr-CA')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex gap-4">
                  <textarea
                    placeholder="Écrivez votre message..."
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
      )}
    </div>
  );
}