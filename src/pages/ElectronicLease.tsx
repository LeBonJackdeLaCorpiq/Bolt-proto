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
  Download, Mail, DollarSign, Building, Shield, Star,
  FileCheck, Calendar, Send, Printer, History, Settings,
  Copy, Archive
} from 'lucide-react';

interface Lease {
  id: string;
  tenant: {
    name: string;
    email: string;
    phone: string;
  };
  property: {
    name: string;
    unit: string;
    address: string;
  };
  status: 'draft' | 'to_send' | 'waiting_signature' | 'signed' | 'active' | 'expired' | 'terminated';
  type: 'new' | 'renewal';
  rent: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  lastUpdated: string;
  signatories: {
    name: string;
    status: 'pending' | 'signed';
    signedAt?: string;
  }[];
  documents: {
    name: string;
    status: 'pending' | 'completed';
  }[];
}

export default function ElectronicLease() {
  const [selectedLease, setSelectedLease] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Données simulées
  const leases: Lease[] = [
    {
      id: '1',
      tenant: {
        name: 'Marie Tremblay',
        email: 'marie.t@email.com',
        phone: '514-555-0123'
      },
      property: {
        name: '123 rue de Paris',
        unit: 'Apt 4B',
        address: 'Montréal, QC'
      },
      status: 'waiting_signature',
      type: 'new',
      rent: 1200,
      startDate: '2024-07-01',
      endDate: '2025-06-30',
      createdAt: '2024-03-15T10:30:00',
      lastUpdated: '2024-03-15T14:30:00',
      signatories: [
        { name: 'Marie Tremblay', status: 'signed', signedAt: '2024-03-15T11:30:00' },
        { name: 'Paul Martin', status: 'pending' }
      ],
      documents: [
        { name: 'Bail', status: 'completed' },
        { name: 'Règlement immeuble', status: 'completed' },
        { name: 'Annexe services', status: 'pending' }
      ]
    },
    {
      id: '2',
      tenant: {
        name: 'Jean Lavoie',
        email: 'jean.l@email.com',
        phone: '514-555-0124'
      },
      property: {
        name: '45 av. Victor Hugo',
        unit: 'Apt 2C',
        address: 'Laval, QC'
      },
      status: 'active',
      type: 'renewal',
      rent: 950,
      startDate: '2024-05-01',
      endDate: '2025-04-30',
      createdAt: '2024-03-10T15:45:00',
      lastUpdated: '2024-03-14T16:45:00',
      signatories: [
        { name: 'Jean Lavoie', status: 'signed', signedAt: '2024-03-12T10:30:00' },
        { name: 'Paul Martin', status: 'signed', signedAt: '2024-03-12T11:15:00' }
      ],
      documents: [
        { name: 'Bail', status: 'completed' },
        { name: 'Règlement immeuble', status: 'completed' },
        { name: 'Annexe services', status: 'completed' }
      ]
    },
    {
      id: '3',
      tenant: {
        name: 'Sophie Dubois',
        email: 'sophie.d@email.com',
        phone: '514-555-0125'
      },
      property: {
        name: '8 rue du Commerce',
        unit: 'Apt 5A',
        address: 'Longueuil, QC'
      },
      status: 'draft',
      type: 'new',
      rent: 1500,
      startDate: '2024-06-01',
      endDate: '2025-05-31',
      createdAt: '2024-03-13T09:15:00',
      lastUpdated: '2024-03-13T09:15:00',
      signatories: [
        { name: 'Sophie Dubois', status: 'pending' },
        { name: 'Paul Martin', status: 'pending' }
      ],
      documents: [
        { name: 'Bail', status: 'pending' },
        { name: 'Règlement immeuble', status: 'pending' }
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
              <span>95%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Temps moyen signature</span>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              <span>1.5 jours</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Baux actifs</span>
            <div className="flex items-center gap-2 text-blue-600">
              <FileText size={16} />
              <span>42</span>
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
              <span className="font-medium">Renouvellements à venir</span>
            </div>
            <p className="text-sm text-purple-600">
              5 baux arrivent à échéance dans les 90 prochains jours. Commencez le processus de renouvellement maintenant.
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700 mb-2">
              <BrainCircuit size={16} />
              <span className="font-medium">Rappels de signature</span>
            </div>
            <p className="text-sm text-blue-600">
              2 baux sont en attente de signature depuis plus de 48h. Un rappel automatique peut être envoyé.
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
              <Calendar size={16} className="text-green-600" />
              <span>Planifier renouvellements</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );

  const getStatusColor = (status: Lease['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      case 'to_send':
        return 'bg-blue-100 text-blue-700';
      case 'waiting_signature':
        return 'bg-yellow-100 text-yellow-700';
      case 'signed':
        return 'bg-green-100 text-green-700';
      case 'active':
        return 'bg-purple-100 text-purple-700';
      case 'expired':
        return 'bg-orange-100 text-orange-700';
      case 'terminated':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: Lease['status']) => {
    switch (status) {
      case 'draft':
        return <FileText size={16} />;
      case 'to_send':
        return <Send size={16} />;
      case 'waiting_signature':
        return <Clock size={16} />;
      case 'signed':
        return <CheckCircle2 size={16} />;
      case 'active':
        return <Shield size={16} />;
      case 'expired':
        return <AlertTriangle size={16} />;
      case 'terminated':
        return <XCircle size={16} />;
      default:
        return <AlertTriangle size={16} />;
    }
  };

  const getStatusText = (status: Lease['status']) => {
    switch (status) {
      case 'draft':
        return 'Brouillon';
      case 'to_send':
        return 'À envoyer';
      case 'waiting_signature':
        return 'En attente de signature';
      case 'signed':
        return 'Signé';
      case 'active':
        return 'Actif';
      case 'expired':
        return 'Expiré';
      case 'terminated':
        return 'Résilié';
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
              <h1 className="text-2xl font-bold">Bail électronique</h1>
              <p className="text-gray-600">Gérez vos baux et leurs signatures électroniques</p>
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
                <span>Nouveau bail</span>
              </button>
            </div>
          </div>

          {/* Liste des baux */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="space-y-4">
                {leases.map((lease) => (
                  <div
                    key={lease.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-medium">
                        {lease.tenant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{lease.tenant.name}</h3>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            lease.type === 'renewal' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {lease.type === 'renewal' ? 'Renouvellement' : 'Nouveau'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {lease.property.unit} - {lease.property.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(lease.startDate).toLocaleDateString('fr-CA')} au {new Date(lease.endDate).toLocaleDateString('fr-CA')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{lease.rent}$/mois</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {lease.documents.filter(d => d.status === 'completed').length}/{lease.documents.length}
                        </span>
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${getStatusColor(lease.status)}`}>
                        {getStatusIcon(lease.status)}
                        <span>{getStatusText(lease.status)}</span>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => setSelectedLease(selectedLease === lease.id ? null : lease.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <MoreVertical size={20} />
                        </button>
                        
                        {selectedLease === lease.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border overflow-hidden z-10">
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Eye size={16} />
                              <span>Voir les détails</span>
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Send size={16} />
                              <span>Envoyer pour signature</span>
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <History size={16} />
                              <span>Historique</span>
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Download size={16} />
                              <span>Télécharger</span>
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Copy size={16} />
                              <span>Dupliquer</span>
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Settings size={16} />
                              <span>Paramètres</span>
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                              <Archive size={16} />
                              <span>Archiver</span>
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
        </div>
      </Panel>

      <PanelResizeHandle className="panel-resize-handle" />

      <Panel defaultSize={25} minSize={20}>
        {renderAnalyticsPanel()}
      </Panel>
    </PanelGroup>
  );
}