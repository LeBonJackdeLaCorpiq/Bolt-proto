import React, { useState } from 'react';
import { 
  Users, Search, Filter, Plus, Upload, Bot, 
  Building, Phone, Mail, Calendar, MapPin,
  MoreVertical, FileSpreadsheet, MessageSquare,
  FileText, AlertTriangle, CheckCircle2, X,
  ChevronLeft, ChevronRight, Archive
} from 'lucide-react';

interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  unit?: {
    id: string;
    name: string;
    property: string;
  };
  startDate?: string;
  status: 'active' | 'pending' | 'archived';
}

function AddressBook() {
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tenantsPerPage = 5;

  const tenants: Tenant[] = [
    {
      id: '1',
      firstName: 'Marc',
      lastName: 'Dupont',
      email: 'marc.dupont@email.com',
      phone: '514-555-0123',
      unit: {
        id: 'unit1',
        name: 'Apt 2A',
        property: '123 rue de Paris'
      },
      startDate: '2023-01-01',
      status: 'active'
    },
    {
      id: '2',
      firstName: 'Sophie',
      lastName: 'Tremblay',
      email: 'sophie.t@email.com',
      phone: '514-555-0124',
      unit: {
        id: 'unit2',
        name: 'Apt 3B',
        property: '45 av. Victor Hugo'
      },
      startDate: '2023-03-15',
      status: 'active'
    },
    {
      id: '3',
      firstName: 'Jean',
      lastName: 'Lavoie',
      email: 'jean.lavoie@email.com',
      phone: '514-555-0125',
      unit: {
        id: 'unit3',
        name: 'Apt 1C',
        property: '123 rue de Paris'
      },
      startDate: '2023-02-01',
      status: 'active'
    },
    {
      id: '4',
      firstName: 'Marie',
      lastName: 'Côté',
      email: 'marie.cote@email.com',
      phone: '514-555-0126',
      unit: {
        id: 'unit4',
        name: 'Apt 4A',
        property: '45 av. Victor Hugo'
      },
      startDate: '2023-04-01',
      status: 'pending'
    },
    {
      id: '5',
      firstName: 'Pierre',
      lastName: 'Gagnon',
      email: 'pierre.g@email.com',
      phone: '514-555-0127',
      unit: {
        id: 'unit5',
        name: 'Apt 2B',
        property: '8 rue du Commerce'
      },
      startDate: '2023-05-01',
      status: 'active'
    },
    {
      id: '6',
      firstName: 'Isabelle',
      lastName: 'Roy',
      email: 'isabelle.roy@email.com',
      phone: '514-555-0128',
      unit: {
        id: 'unit6',
        name: 'Apt 1A',
        property: '8 rue du Commerce'
      },
      startDate: '2023-06-01',
      status: 'active'
    },
    {
      id: '7',
      firstName: 'Michel',
      lastName: 'Bergeron',
      email: 'michel.b@email.com',
      phone: '514-555-0129',
      unit: {
        id: 'unit7',
        name: 'Apt 3C',
        property: '123 rue de Paris'
      },
      startDate: '2023-07-01',
      status: 'archived'
    },
    {
      id: '8',
      firstName: 'Julie',
      lastName: 'Morin',
      email: 'julie.morin@email.com',
      phone: '514-555-0130',
      unit: {
        id: 'unit8',
        name: 'Apt 5B',
        property: '45 av. Victor Hugo'
      },
      startDate: '2023-08-01',
      status: 'active'
    },
    {
      id: '9',
      firstName: 'François',
      lastName: 'Lemieux',
      email: 'francois.l@email.com',
      phone: '514-555-0131',
      unit: {
        id: 'unit9',
        name: 'Apt 2C',
        property: '8 rue du Commerce'
      },
      startDate: '2023-09-01',
      status: 'pending'
    },
    {
      id: '10',
      firstName: 'Caroline',
      lastName: 'Bouchard',
      email: 'caroline.b@email.com',
      phone: '514-555-0132',
      unit: {
        id: 'unit10',
        name: 'Apt 4C',
        property: '123 rue de Paris'
      },
      startDate: '2023-10-01',
      status: 'active'
    },
    {
      id: '11',
      firstName: 'Robert',
      lastName: 'Pelletier',
      email: 'robert.p@email.com',
      phone: '514-555-0133',
      unit: {
        id: 'unit11',
        name: 'Apt 6A',
        property: '45 av. Victor Hugo'
      },
      startDate: '2023-11-01',
      status: 'active'
    },
    {
      id: '12',
      firstName: 'Anne',
      lastName: 'Leblanc',
      email: 'anne.l@email.com',
      phone: '514-555-0134',
      unit: {
        id: 'unit12',
        name: 'Apt 3A',
        property: '8 rue du Commerce'
      },
      startDate: '2023-12-01',
      status: 'active'
    }
  ];

  // Calcul pour la pagination
  const totalPages = Math.ceil(tenants.length / tenantsPerPage);
  const indexOfLastTenant = currentPage * tenantsPerPage;
  const indexOfFirstTenant = indexOfLastTenant - tenantsPerPage;
  const currentTenants = tenants.slice(indexOfFirstTenant, indexOfLastTenant);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setSelectedTenant(null);
  };

  // Statistiques des locataires
  const stats = {
    total: tenants.length,
    active: tenants.filter(t => t.status === 'active').length,
    pending: tenants.filter(t => t.status === 'pending').length,
    archived: tenants.filter(t => t.status === 'archived').length
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Carnet d'adresses</h1>
          <p className="text-gray-600">Gérez vos locataires et leurs informations</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="search"
              placeholder="Rechercher un locataire..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <Filter size={20} />
            <span>Filtres</span>
          </button>
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Upload size={20} />
            <span>Importer</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus size={20} />
            <span>Ajouter un locataire</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">Total locataires</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">Baux actifs</p>
              <p className="text-2xl font-bold">{stats.active}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">En attente</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <Archive className="text-gray-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">Archivés</p>
              <p className="text-2xl font-bold">{stats.archived}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tenants List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Liste des locataires</h2>
        </div>
        
        <div className="p-6">
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b">
              <div className="col-span-3">Locataire</div>
              <div className="col-span-3">Unité</div>
              <div className="col-span-2">Contact</div>
              <div className="col-span-2">Date d'entrée</div>
              <div className="col-span-1">Statut</div>
              <div className="col-span-1">Actions</div>
            </div>
            
            {currentTenants.map((tenant) => (
              <div key={tenant.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 border-b">
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    {tenant.firstName[0]}{tenant.lastName[0]}
                  </div>
                  <div>
                    <p className="font-medium">{tenant.firstName} {tenant.lastName}</p>
                    <p className="text-sm text-gray-500">{tenant.email}</p>
                  </div>
                </div>
                <div className="col-span-3">
                  {tenant.unit ? (
                    <div className="flex items-center gap-2">
                      <Building size={16} className="text-gray-400" />
                      <div>
                        <p className="font-medium">{tenant.unit.name}</p>
                        <p className="text-sm text-gray-500">{tenant.unit.property}</p>
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400">Non assigné</span>
                  )}
                </div>
                <div className="col-span-2">
                  <div className="space-y-1">
                    <p className="text-sm flex items-center gap-1">
                      <Phone size={14} className="text-gray-400" />
                      {tenant.phone}
                    </p>
                    <p className="text-sm flex items-center gap-1">
                      <Mail size={14} className="text-gray-400" />
                      Email
                    </p>
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="text-sm flex items-center gap-1">
                    <Calendar size={14} className="text-gray-400" />
                    {new Date(tenant.startDate || '').toLocaleDateString('fr-CA')}
                  </p>
                </div>
                <div className="col-span-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    tenant.status === 'active' 
                      ? 'bg-green-100 text-green-700'
                      : tenant.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {tenant.status === 'active' ? 'Actif' : 
                     tenant.status === 'pending' ? 'En attente' : 'Archivé'}
                  </span>
                </div>
                <div className="col-span-1">
                  <div className="relative">
                    <button 
                      onClick={() => setSelectedTenant(selectedTenant === tenant.id ? null : tenant.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <MoreVertical size={20} />
                    </button>
                    
                    {selectedTenant === tenant.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-10">
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <FileText size={16} />
                          <span>Voir le bail</span>
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <Building size={16} />
                          <span>Changer d'unité</span>
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <MessageSquare size={16} />
                          <span>Envoyer un message</span>
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                          <X size={16} />
                          <span>Archiver</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">
              Affichage de {indexOfFirstTenant + 1} à {Math.min(indexOfLastTenant, tenants.length)} sur {tenants.length} locataires
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-8 h-8 rounded-lg ${
                    currentPage === number
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressBook;