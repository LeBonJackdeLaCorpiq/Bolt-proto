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
  FileCheck, Briefcase
} from 'lucide-react';

interface BackgroundCheck {
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
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  submittedAt: string;
  creditScore?: number;
  income: {
    annual: number;
    ratio: number;
  };
  employment: {
    status: string;
    employer: string;
    duration: string;
  };
  references: {
    count: number;
    verified: number;
  };
  score?: number;
}

export default function BackgroundCheck() {
  const [selectedCheck, setSelectedCheck] = useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Données simulées
  const checks: BackgroundCheck[] = [
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
      status: 'in_progress',
      submittedAt: '2024-03-15T10:30:00',
      creditScore: 725,
      income: {
        annual: 65000,
        ratio: 32
      },
      employment: {
        status: 'CDI',
        employer: 'ABC Inc.',
        duration: '3 ans'
      },
      references: {
        count: 3,
        verified: 2
      },
      score: 85
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
      status: 'completed',
      submittedAt: '2024-03-14T15:45:00',
      creditScore: 780,
      income: {
        annual: 72000,
        ratio: 28
      },
      employment: {
        status: 'CDI',
        employer: 'XYZ Corp',
        duration: '5 ans'
      },
      references: {
        count: 3,
        verified: 3
      },
      score: 92
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
      status: 'pending',
      submittedAt: '2024-03-13T09:15:00',
      income: {
        annual: 58000,
        ratio: 35
      },
      employment: {
        status: 'Contractuel',
        employer: 'DEF Ltd',
        duration: '1 an'
      },
      references: {
        count: 3,
        verified: 1
      }
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
            <span className="text-gray-600">Taux d'approbation</span>
            <div className="flex items-center gap-2 text-green-600">
              <ArrowUpRight size={16} />
              <span>82%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Temps moyen</span>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              <span>3.5 jours</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Score moyen</span>
            <div className="flex items-center gap-2 text-blue-600">
              <Star size={16} />
              <span>88/100</span>
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
              <span className="font-medium">Vérification prioritaire</span>
            </div>
            <p className="text-sm text-purple-600">
              2 références de Jean Lavoie sont très positives. Recommandation de finaliser la dernière vérification rapidement.
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700 mb-2">
              <BrainCircuit size={16} />
              <span className="font-medium">Attention requise</span>
            </div>
            <p className="text-sm text-blue-600">
              Le ratio revenu/loyer de Sophie Dubois (35%) est légèrement élevé. Une analyse approfondie est recommandée.
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
              <Shield size={16} className="text-green-600" />
              <span>Vérifier tous les antécédents</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-blue-600" />
              <span>Contacter les références</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );

  const getStatusColor = (status: BackgroundCheck['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: BackgroundCheck['status']) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} />;
      case 'in_progress':
        return <Eye size={16} />;
      case 'completed':
        return <CheckCircle2 size={16} />;
      case 'failed':
        return <XCircle size={16} />;
      default:
        return <AlertTriangle size={16} />;
    }
  };

  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={75} minSize={50}>
        <div>
          {/* En-tête */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">Enquête de pré-location</h1>
              <p className="text-gray-600">Gérez les vérifications des candidats locataires</p>
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
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <Plus size={20} />
                <span>Nouvelle enquête</span>
              </button>
            </div>
          </div>

          {/* Liste des enquêtes */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="space-y-4">
                {checks.map((check) => (
                  <div
                    key={check.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-medium">
                        {check.applicant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-medium">{check.applicant.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {check.property.unit} - {check.property.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {new Date(check.submittedAt).toLocaleDateString('fr-CA')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {check.creditScore && (
                        <div className={`px-2 py-1 rounded-full text-sm ${
                          check.creditScore >= 750 ? 'bg-green-100 text-green-700' :
                          check.creditScore >= 650 ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          Score crédit: {check.creditScore}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{check.employment.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{check.income.ratio}% ratio</span>
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${getStatusColor(check.status)}`}>
                        {getStatusIcon(check.status)}
                        <span>
                          {check.status === 'pending' ? 'En attente' :
                           check.status === 'in_progress' ? 'En cours' :
                           check.status === 'completed' ? 'Complété' : 'Échec'}
                        </span>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => setSelectedCheck(selectedCheck === check.id ? null : check.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <MoreVertical size={20} />
                        </button>
                        
                        {selectedCheck === check.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border overflow-hidden z-10">
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Eye size={16} />
                              <span>Voir les détails</span>
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Shield size={16} />
                              <span>Vérifier antécédents</span>
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <MessageSquare size={16} />
                              <span>Contacter références</span>
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Download size={16} />
                              <span>Télécharger rapport</span>
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