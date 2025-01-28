import React, { useState } from 'react';
import { 
  Building, Plus, Search, Filter, MapPin, Home, 
  Users, DollarSign, Percent, MoreVertical, Edit,
  Trash2, FileText, Key, Wrench, Camera, ChevronLeft,
  ChevronRight, AlertTriangle, CheckCircle2
} from 'lucide-react';
import AddPropertyModal from '../components/AddPropertyModal';

interface Property {
  id: string;
  name: string;
  address: string;
  postalCode: string;
  city: string;
  image: string;
  units: number;
  occupancyRate: number;
  monthlyRevenue: number;
  status: 'active' | 'maintenance' | 'vacant';
}

function PropertyManagement() {
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const propertiesPerPage = 5;

  // Données simulées
  const properties: Property[] = [
    {
      id: '1',
      name: '95 Rue Jean-Paul-Lavallée',
      address: '95 Rue Jean-Paul-Lavallée',
      postalCode: 'J5R 6T6',
      city: 'La Prairie',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      units: 12,
      occupancyRate: 92,
      monthlyRevenue: 14400,
      status: 'active'
    },
    {
      id: '2',
      name: '123 rue de Paris',
      address: '123 rue de Paris',
      postalCode: 'H2X 1Y2',
      city: 'Montréal',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
      units: 8,
      occupancyRate: 100,
      monthlyRevenue: 9600,
      status: 'active'
    },
    {
      id: '3',
      name: '45 av. Victor Hugo',
      address: '45 av. Victor Hugo',
      postalCode: 'H3Z 2Y7',
      city: 'Montréal',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
      units: 6,
      occupancyRate: 83,
      monthlyRevenue: 7200,
      status: 'maintenance'
    },
    {
      id: '4',
      name: '8 rue du Commerce',
      address: '8 rue du Commerce',
      postalCode: 'J4K 4Y1',
      city: 'Longueuil',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
      units: 4,
      occupancyRate: 75,
      monthlyRevenue: 4800,
      status: 'active'
    },
    {
      id: '5',
      name: '156 boul. Saint-Joseph',
      address: '156 boul. Saint-Joseph',
      postalCode: 'H2T 2P4',
      city: 'Montréal',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
      units: 10,
      occupancyRate: 90,
      monthlyRevenue: 12000,
      status: 'active'
    },
    {
      id: '6',
      name: '72 rue Wellington',
      address: '72 rue Wellington',
      postalCode: 'J4H 1W7',
      city: 'Sherbrooke',
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
      units: 15,
      occupancyRate: 87,
      monthlyRevenue: 18000,
      status: 'maintenance'
    },
    {
      id: '7',
      name: '234 rue Principale',
      address: '234 rue Principale',
      postalCode: 'J3Y 8J4',
      city: 'Saint-Jean-sur-Richelieu',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
      units: 6,
      occupancyRate: 100,
      monthlyRevenue: 7200,
      status: 'active'
    },
    {
      id: '8',
      name: '445 rue King Ouest',
      address: '445 rue King Ouest',
      postalCode: 'J1H 1P4',
      city: 'Sherbrooke',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
      units: 8,
      occupancyRate: 0,
      monthlyRevenue: 0,
      status: 'vacant'
    }
  ];

  // Filtrer les propriétés
  const filteredProperties = properties.filter(property => {
    const matchesSearch = 
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || property.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculer les statistiques
  const stats = {
    total: properties.length,
    totalUnits: properties.reduce((sum, p) => sum + p.units, 0),
    totalRevenue: properties.reduce((sum, p) => sum + p.monthlyRevenue, 0),
    averageOccupancy: Math.round(
      properties.reduce((sum, p) => sum + p.occupancyRate, 0) / properties.length
    )
  };

  // Pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setShowMenu(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Gérer mon parc</h1>
          <p className="text-gray-600">Gérez vos propriétés et leurs unités</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="search"
              placeholder="Rechercher une propriété..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="maintenance">En maintenance</option>
            <option value="vacant">Vacant</option>
          </select>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>Ajouter une propriété</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Building className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">Propriétés</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <Home className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">Unités</p>
              <p className="text-2xl font-bold">{stats.totalUnits}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Percent className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">Taux d'occupation</p>
              <p className="text-2xl font-bold">{stats.averageOccupancy}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <DollarSign className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">Revenu mensuel</p>
              <p className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()}$</p>
            </div>
          </div>
        </div>
      </div>

      {/* Properties List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Vos propriétés</h2>
        </div>
        
        <div className="p-6">
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b">
              <div className="col-span-4">Propriété</div>
              <div className="col-span-2">Unités</div>
              <div className="col-span-2">Occupation</div>
              <div className="col-span-2">Revenu</div>
              <div className="col-span-2">Actions</div>
            </div>
            
            {currentProperties.map((property) => (
              <div key={property.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 border-b">
                <div className="col-span-4 flex items-center gap-3">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium">{property.name}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin size={14} />
                      {property.city}, {property.postalCode}
                    </p>
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="font-medium">{property.units}</p>
                  <p className="text-sm text-gray-500">unités</p>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block w-2 h-2 rounded-full ${
                      property.occupancyRate >= 90 ? 'bg-green-500' :
                      property.occupancyRate >= 70 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}></span>
                    <span className="font-medium">{property.occupancyRate}%</span>
                  </div>
                  <p className="text-sm text-gray-500">occupé</p>
                </div>
                <div className="col-span-2">
                  <p className="font-medium">{property.monthlyRevenue.toLocaleString()}$</p>
                  <p className="text-sm text-gray-500">par mois</p>
                </div>
                <div className="col-span-2 text-right">
                  <div className="relative inline-block">
                    <button 
                      onClick={() => setShowMenu(showMenu === property.id ? null : property.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <MoreVertical size={20} />
                    </button>
                    
                    {showMenu === property.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-10">
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <Edit size={16} />
                          <span>Modifier</span>
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <Camera size={16} />
                          <span>Ajouter des photos</span>
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <FileText size={16} />
                          <span>Documents</span>
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <Key size={16} />
                          <span>Gestion des clés</span>
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <Wrench size={16} />
                          <span>Maintenance</span>
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                          <Trash2 size={16} />
                          <span>Supprimer</span>
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
              Affichage de {indexOfFirstProperty + 1} à {Math.min(indexOfLastProperty, filteredProperties.length)} sur {filteredProperties.length} propriétés
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

      <AddPropertyModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}

export default PropertyManagement;