import React, { useState } from 'react';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle
} from 'react-resizable-panels';
import {
  Building, Search, Filter, Plus, MessageSquare,
  FileText, Megaphone, UserCheck, FileSpreadsheet,
  Calendar, ChevronRight, AlertTriangle, CheckCircle2,
  Clock, Users, X, Eye, ArrowRight, LayoutGrid, List,
  Share2, ExternalLink, Home, Bath, Square, DollarSign,
  Image as ImageIcon, Upload, Bed, MapPin, Bot, Sparkles,
  TrendingUp, Zap, Target, BrainCircuit, ArrowUpRight,
  ArrowDownRight, Percent
} from 'lucide-react';

interface VacantUnit {
  id: string;
  property: string;
  unit: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  lastRent: number;
  availableFrom: string;
  images: string[];
  address: string;
}

interface PublishingPlatform {
  id: string;
  name: string;
  logo: string;
  url: string;
}

export default function RentalManagement() {
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<VacantUnit | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Données simulées des unités vacantes
  const vacantUnits: VacantUnit[] = [
    {
      id: '1',
      property: '123 rue de Paris',
      unit: 'Apt 4B',
      type: '4½',
      bedrooms: 2,
      bathrooms: 1,
      area: 75,
      lastRent: 1200,
      availableFrom: '2024-04-01',
      images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994'],
      address: 'Montréal, QC'
    },
    {
      id: '2',
      property: '45 av. Victor Hugo',
      unit: 'Apt 2C',
      type: '3½',
      bedrooms: 1,
      bathrooms: 1,
      area: 60,
      lastRent: 950,
      availableFrom: '2024-05-01',
      images: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be'],
      address: 'Laval, QC'
    },
    {
      id: '3',
      property: '8 rue du Commerce',
      unit: 'Apt 5A',
      type: '5½',
      bedrooms: 3,
      bathrooms: 2,
      area: 95,
      lastRent: 1500,
      availableFrom: '2024-04-15',
      images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750'],
      address: 'Longueuil, QC'
    }
  ];

  const publishingPlatforms: PublishingPlatform[] = [
    {
      id: 'kijiji',
      name: 'Kijiji',
      logo: '🏠',
      url: 'https://kijiji.ca'
    },
    {
      id: 'marketplace',
      name: 'Facebook Marketplace',
      logo: '📱',
      url: 'https://facebook.com/marketplace'
    },
    {
      id: 'centris',
      name: 'Centris',
      logo: '🏢',
      url: 'https://centris.ca'
    }
  ];

  const handlePublishUnit = (unit: VacantUnit) => {
    setSelectedUnit(unit);
    setShowPublishModal(true);
  };

  const handleCreateListing = (unit?: VacantUnit) => {
    setSelectedUnit(unit || null);
    setShowCreateModal(true);
  };

  const renderAnalyticsPanel = () => (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-600" />
          Performance des annonces
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Vues totales</span>
            <div className="flex items-center gap-2 text-green-600">
              <ArrowUpRight size={16} />
              <span>1,245</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Taux de conversion</span>
            <div className="flex items-center gap-2 text-green-600">
              <Percent size={16} />
              <span>3.2%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Temps moyen</span>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              <span>12 jours</span>
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
              <span className="font-medium">Prix optimal</span>
            </div>
            <p className="text-sm text-purple-600">
              Selon l'analyse du marché, un prix entre 1,250$ et 1,350$ maximiserait vos chances de location rapide.
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700 mb-2">
              <BrainCircuit size={16} />
              <span className="font-medium">Optimisation</span>
            </div>
            <p className="text-sm text-blue-600">
              Ajoutez des photos de la cuisine rénovée pour augmenter l'attractivité de l'annonce.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap size={20} className="text-orange-600" />
          Actions rapides
        </h3>
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-blue-600" />
              <span>Générer une description</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <Share2 size={16} className="text-green-600" />
              <span>Publier partout</span>
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
        <div>
          {/* En-tête */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">Annonces</h1>
              <p className="text-gray-600">Gérez vos annonces de location</p>
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
                onClick={() => handleCreateListing()}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Plus size={20} />
                <span>Nouvelle annonce</span>
              </button>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Building size={20} />
                    Unités vacantes à annoncer
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg ${
                        viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-100'
                      }`}
                    >
                      <LayoutGrid size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg ${
                        viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-100'
                      }`}
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vacantUnits.map((unit) => (
                      <div key={unit.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="aspect-video relative">
                          <img
                            src={unit.images[0]}
                            alt={`${unit.property} ${unit.unit}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white text-sm rounded-full">
                            Disponible
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">{unit.unit} - {unit.property}</h3>
                          <p className="text-gray-600 text-sm mb-4">{unit.address}</p>
                          
                          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Bed size={16} />
                              {unit.bedrooms}
                            </span>
                            <span className="flex items-center gap-1">
                              <Bath size={16} />
                              {unit.bathrooms}
                            </span>
                            <span className="flex items-center gap-1">
                              <Square size={16} />
                              {unit.area}m²
                            </span>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Dernier loyer</p>
                              <p className="text-xl font-bold">{unit.lastRent}$</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Disponible le</p>
                              <p className="font-medium">
                                {new Date(unit.availableFrom).toLocaleDateString('fr-CA')}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleCreateListing(unit)}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              <Plus size={20} />
                              <span>Créer l'annonce</span>
                            </button>
                            <button
                              onClick={() => handlePublishUnit(unit)}
                              className="p-2 border rounded-lg hover:bg-gray-50"
                            >
                              <Share2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {vacantUnits.map((unit) => (
                      <div key={unit.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                        <img
                          src={unit.images[0]}
                          alt={`${unit.property} ${unit.unit}`}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{unit.unit} - {unit.property}</h3>
                          <p className="text-gray-600 text-sm">{unit.address}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Bed size={16} />
                              {unit.bedrooms}
                            </span>
                            <span className="flex items-center gap-1">
                              <Bath size={16} />
                              {unit.bathrooms}
                            </span>
                            <span className="flex items-center gap-1">
                              <Square size={16} />
                              {unit.area}m²
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{unit.lastRent}$</p>
                          <p className="text-sm text-gray-500">
                            Disponible le {new Date(unit.availableFrom).toLocaleDateString('fr-CA')}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCreateListing(unit)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            <Plus size={20} />
                            <span>Créer l'annonce</span>
                          </button>
                          <button
                            onClick={() => handlePublishUnit(unit)}
                            className="p-2 border rounded-lg hover:bg-gray-50"
                          >
                            <Share2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Panel>

      <PanelResizeHandle className="panel-resize-handle" />

      <Panel defaultSize={25} minSize={20}>
        {renderAnalyticsPanel()}
      </Panel>

      {/* Modal de publication */}
      {showPublishModal && selectedUnit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Publier sur des sites externes</h2>
                <button
                  onClick={() => setShowPublishModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-medium mb-2">Unité sélectionnée</h3>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={selectedUnit.images[0]}
                    alt={`${selectedUnit.property} ${selectedUnit.unit}`}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium">{selectedUnit.unit} - {selectedUnit.property}</p>
                    <p className="text-sm text-gray-600">{selectedUnit.type} - {selectedUnit.bedrooms} ch.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {publishingPlatforms.map((platform) => (
                  <a
                    key={platform.id}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{platform.logo}</span>
                      <span className="font-medium">{platform.name}</span>
                    </div>
                    <ExternalLink size={20} className="text-gray-400" />
                  </a>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <button
                  onClick={() => setShowPublishModal(false)}
                  className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de création d'annonce */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Créer une nouvelle annonce</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {/* Sélection du logement */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sélectionner le logement *
                  </label>
                  {selectedUnit ? (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={selectedUnit.images[0]}
                        alt={`${selectedUnit.property} ${selectedUnit.unit}`}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium">{selectedUnit.unit} - {selectedUnit.property}</p>
                        <p className="text-sm text-gray-600">{selectedUnit.type} - {selectedUnit.bedrooms} ch.</p>
                      </div>
                      <button
                        onClick={() => setSelectedUnit(null)}
                        className="ml-auto p-2 hover:bg-gray-200 rounded-full"
                      >
                        <X size={20} className="text-gray-400" />
                      </button>
                    </div>
                  ) : (
                    <select className="w-full p-3 border rounded-lg">
                      <option value="">Choisir un logement</option>
                      {vacantUnits.map(unit => (
                        <option key={unit.id} value={unit.id}>
                          {unit.unit} - {unit.property}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Informations de base */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Informations de base</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prix mensuel *
                      </label>
                      <div className="relative">
                        <DollarSign size={20} className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="number"
                          className="w-full pl-10 p-3 border rounded-lg"
                          placeholder="0"
                          defaultValue={selectedUnit?.lastRent}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date de disponibilité *
                      </label>
                      <input
                        type="date"
                        className="w-full p-3 border rounded-lg"
                        defaultValue={selectedUnit?.availableFrom}
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description de l'annonce *
                  </label>
                  <textarea
                    rows={4}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Décrivez le logement..."
                    defaultValue={selectedUnit ? `${selectedUnit.type} lumineux et spacieux situé à ${selectedUnit.property}. ${selectedUnit.bedrooms} chambres, ${selectedUnit.bathrooms} salle(s) de bain, ${selectedUnit.area}m².` : ''}
                  />
                </div>

                {/* Photos */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Photos</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedUnit?.images.map((image, index) => (
                      <div key={index} className="relative aspect-video">
                        <img
                          src={image}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100">
                          <X size={16} className="text-gray-600" />
                        </button>
                      </div>
                    ))}
                    <label className="aspect-video border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                      <Upload size={24} className="text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Ajouter une photo</span>
                      <input type="file" accept="image/*" className="hidden" />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Format recommandé : JPG, PNG. Taille maximale : 5MB
                  </p>
                </div>

                {/* Options de publication */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Options de publication</h3>
                  <div className="space-y-3">
                    {publishingPlatforms.map((platform) => (
                      <label
                        key={platform.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{platform.logo}</span>
                          <span className="font-medium">{platform.name}</span>
                        </div>
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t flex justify-end gap-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus size={20} />
                  <span>Créer l'annonce</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PanelGroup>
  );
}