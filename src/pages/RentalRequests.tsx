import React, { useState } from 'react';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle
} from 'react-resizable-panels';
import {
  Search, Filter, Plus, FileText, Users, MapPin,
  ChevronRight, Eye, Clock, CheckCircle2, AlertTriangle,
  XCircle, MoreVertical, MessageSquare, FileSpreadsheet,
  UserCheck, TrendingUp, ArrowUpRight, ArrowDownRight,
  Percent, Bot, Target, BrainCircuit, Sparkles, Share2,
  Download, Mail, FileCheck, Send, Printer, Upload
} from 'lucide-react';

interface RentalRequest {
  id: string;
  applicant: {
    name: string;
    email: string;
    phone: string;
  };
  property: {
    name: string;
    unit: string;
    address: string;
  };
  status: 'to_complete' | 'to_send' | 'waiting_signature' | 'signed';
  submittedAt: string;
  lastUpdated: string;
  documents: {
    name: string;
    status: 'pending' | 'completed';
  }[];
}

export default function RentalRequests() {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Données simulées
  const requests: RentalRequest[] = [
    {
      id: '1',
      applicant: {
        name: 'Marie Tremblay',
        email: 'marie.t@email.com',
        phone: '514-555-0123'
      },
      property: {
        name: '123 rue de Paris',
        unit: 'Apt 4B',
        address: 'Montréal, QC'
      },
      status: 'signed',
      submittedAt: '2024-03-15T10:30:00',
      lastUpdated: '2024-03-15T14:30:00',
      documents: [
        { name: 'Demande de location', status: 'completed' },
        { name: 'Preuve de revenu', status: 'completed' },
        { name: 'Pièce d\'identité', status: 'completed' }
      ]
    },
    {
      id: '2',
      applicant: {
        name: 'Jean Lavoie',
        email: 'jean.l@email.com',
        phone: '514-555-0124'
      },
      property: {
        name: '45 av. Victor Hugo',
        unit: 'Apt 2C',
        address: 'Laval, QC'
      },
      status: 'waiting_signature',
      submittedAt: '2024-03-14T15:45:00',
      lastUpdated: '2024-03-14T16:45:00',
      documents: [
        { name: 'Demande de location', status: 'completed' },
        { name: 'Preuve de revenu', status: 'pending' }
      ]
    },
    {
      id: '3',
      applicant: {
        name: 'Sophie Dubois',
        email: 'sophie.d@email.com',
        phone: '514-555-0125'
      },
      property: {
        name: '8 rue du Commerce',
        unit: 'Apt 5A',
        address: 'Longueuil, QC'
      },
      status: 'to_send',
      submittedAt: '2024-03-13T09:15:00',
      lastUpdated: '2024-03-13T09:15:00',
      documents: [
        { name: 'Demande de location', status: 'completed' }
      ]
    }
  ];

  const renderAnalyticsPanel = () => (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-600" />
          Performance
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Taux de signature</span>
            <div className="flex items-center gap-2 text-green-600">
              <ArrowUpRight size={16} />
              <span>85%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Temps de signature moyen</span>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              <span>2.5 jours</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Taux de complétion</span>
            <div className="flex items-center gap-2 text-blue-600">
              <Percent size={16} />
              <span>92%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Bot size={20} className="text-purple-600" />
          Suggestions de l'IA
        </h3>
        <div className="space-y-4">
          <div className="p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2 text-purple-700 mb-2">
              <Target size={16} />
              <span className="font-medium">Relance recommandée</span>
            </div>
            <p className="text-sm text-purple-600">
              La demande de Jean Lavoie est en attente de signature depuis 24h. Un rappel pourrait accélérer le processus.
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700 mb-2">
              <BrainCircuit size={16} />
              <span className="font-medium">Documents manquants</span>
            </div>
            <p className="text-sm text-blue-600">
              2 candidats n'ont pas encore fourni tous les documents requis. Une relance automatique peut être envoyée.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles size={20} className="text-orange-600" />
          Actions rapides
        </h3>
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <Send size={16} className="text-blue-600" />
              <span>Envoyer les rappels</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <FileCheck size={16} className="text-green-600" />
              <span>Vérifier les documents</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );

  const getStatusColor = (status: RentalRequest['status']) => {
    switch (status) {
      case 'to_complete':
        return 'bg-yellow-100 text-yellow-700';
      case 'to_send':
        return 'bg-blue-100 text-blue-700';
      case 'waiting_signature':
        return 'bg-purple-100 text-purple-700';
      case 'signed':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: RentalRequest['status']) => {
    switch (status) {
      case 'to_complete':
        return <FileText size={16} />;
      case 'to_send':
        return <Send size={16} />;
      case 'waiting_signature':
        return <Clock size={16} />;
      case 'signed':
        return <CheckCircle2 size={16} />;
      default:
        return <AlertTriangle size={16} />;
    }
  };

  const getStatusText = (status: RentalRequest['status']) => {
    switch (status) {
      case 'to_complete':
        return 'À compléter';
      case 'to_send':
        return 'À envoyer';
      case 'waiting_signature':
        return 'En attente de signature';
      case 'signed':
        return 'Signé';
      default:
        return status;
    }
  };

  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={75} minSize={50}>
        <div>
          {/* En-tête */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">Demandes de location</h1>
              <p className="text-gray-600">Gérez les formulaires de demande de location</p>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                <Filter size={20} />
                <span>Filtres</span>
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Plus size={20} />
                <span>Nouvelle demande</span>
              </button>
            </div>
          </div>

          {/* Liste des demandes */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="space-y-4">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-medium">
                        {request.applicant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-medium">{request.applicant.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {request.property.unit} - {request.property.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            Mis à jour le {new Date(request.lastUpdated).toLocaleDateString('fr-CA')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {request.documents.filter(d => d.status === 'completed').length}/{request.documents.length} documents
                        </span>
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span>{getStatusText(request.status)}</span>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => setSelectedRequest(selectedRequest === request.id ? null : request.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <MoreVertical size={20} />
                        </button>
                        
                        {selectedRequest === request.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border overflow-hidden z-10">
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Eye size={16} />
                              <span>Voir les détails</span>
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Upload size={16} />
                              <span>Ajouter un document</span>
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Send size={16} />
                              <span>Envoyer pour signature</span>
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Printer size={16} />
                              <span>Imprimer</span>
                            </button>
                            {request.status === 'signed' && (
                              <button 
                                onClick={() => onMenuClick('background-check')}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100"
                              >
                                <UserCheck size={16} />
                                <span>Créer une enquête</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
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
    </PanelGroup>
  );
}