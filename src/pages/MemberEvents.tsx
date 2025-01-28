import React, { useState } from 'react';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle
} from 'react-resizable-panels';
import {
  Calendar, MapPin, Users, Video, Clock, Filter,
  Search, Tag, ChevronRight, ExternalLink, Crown,
  Zap, Globe, Monitor, TrendingUp, ArrowUpRight,
  ArrowDownRight, Percent, Bot, Target, BrainCircuit,
  Sparkles, Share2, Download, Mail, DollarSign, Building,
  Shield, Star, FileCheck, Calendar as CalendarIcon
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  type: 'presentiel' | 'online' | 'hybrid';
  date: string;
  time: string;
  location?: string;
  price: number;
  capacity: number;
  registrations: number;
  category: string;
  image: string;
  featured?: boolean;
  promo?: {
    enabled: boolean;
    endDate: string;
    discount: number;
  };
}

export default function MemberEvents() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Données simulées des événements
  const events: Event[] = [
    {
      id: '1',
      title: 'Lunch immobilier : Tendances du marché 2024',
      description: 'Rejoignez-nous pour un déjeuner-conférence sur les tendances du marché immobilier.',
      type: 'presentiel',
      date: '2024-04-15',
      time: '12:00',
      location: 'Restaurant Le Central, Montréal',
      price: 45,
      capacity: 50,
      registrations: 35,
      category: 'Lunch immobilier',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678',
      featured: true,
      promo: {
        enabled: true,
        endDate: '2024-03-31',
        discount: 20
      }
    },
    {
      id: '2',
      title: 'Soirée réseautage virtuelle',
      description: 'Connectez-vous avec d\'autres propriétaires lors de notre soirée réseautage en ligne.',
      type: 'online',
      date: '2024-04-20',
      time: '19:00',
      price: 0,
      capacity: 100,
      registrations: 65,
      category: 'Soirée virtuelle',
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7',
      featured: true
    },
    {
      id: '3',
      title: 'Conférence : L\'avenir de l\'immobilier',
      description: 'Une journée complète dédiée aux nouvelles technologies dans l\'immobilier.',
      type: 'hybrid',
      date: '2024-05-01',
      time: '09:00',
      location: 'Palais des congrès + En ligne',
      price: 150,
      capacity: 200,
      registrations: 180,
      category: 'Conférence',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678',
      featured: true
    }
  ];

  // Filtrer les événements
  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Événements en vedette
  const featuredEvents = events.filter(event => event.featured);
  
  // Promotions spéciales
  const promotions = events.filter(event => event.promo?.enabled);

  const renderAnalyticsPanel = () => (
    <div className="space-y-6">
      {/* Performance des événements */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
          <TrendingUp size={20} className="text-blue-600 dark:text-blue-400" />
          Performance
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Taux de participation</span>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <ArrowUpRight size={16} />
              <span>85%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Satisfaction moyenne</span>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-400" />
              <span>4.8/5</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Événements à venir</span>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <CalendarIcon size={16} />
              <span>12</span>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions de l'IA */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
          <Bot size={20} className="text-purple-600 dark:text-purple-400" />
          Recommandations personnalisées
        </h3>
        <div className="space-y-4">
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 mb-2">
              <Target size={16} />
              <span className="font-medium">Événement suggéré</span>
            </div>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              Basé sur votre profil, le prochain lunch immobilier pourrait vous intéresser.
            </p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-2">
              <BrainCircuit size={16} />
              <span className="font-medium">Tendances</span>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Les événements hybrides sont très populaires dans votre région.
            </p>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
          <Sparkles size={20} className="text-orange-600 dark:text-orange-400" />
          Actions rapides
        </h3>
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-blue-600 dark:text-blue-400" />
              <span className="dark:text-white">Voir mon agenda</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex items-center gap-2">
              <Share2 size={16} className="text-green-600 dark:text-green-400" />
              <span className="dark:text-white">Inviter des collègues</span>
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
        <div className="max-w-7xl mx-auto space-y-8">
          {/* En-tête */}
          <div>
            <h1 className="text-2xl font-bold dark:text-white">Événements</h1>
            <p className="text-gray-600 dark:text-gray-400">Découvrez nos événements à venir</p>
          </div>

          {/* Événements en vedette */}
          <div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white">
              <Crown size={24} className="text-yellow-400" />
              Événements en vedette
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredEvents.map((event) => (
                <div 
                  key={event.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-yellow-200 dark:border-yellow-800"
                >
                  <div className="aspect-video relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    {event.promo?.enabled && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-sm rounded-full">
                        -{event.promo.discount}%
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">{event.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{event.description}</p>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Calendar size={16} />
                        <span>{new Date(event.date).toLocaleDateString('fr-CA')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Clock size={16} />
                        <span>{event.time}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <MapPin size={16} />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {event.registrations}/{event.capacity} places
                        </span>
                      </div>
                      <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                        <span>S'inscrire</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="search"
                placeholder="Rechercher un événement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <option value="all">Tous les formats</option>
                <option value="presentiel">Présentiel</option>
                <option value="online">En ligne</option>
                <option value="hybrid">Hybride</option>
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <option value="all">Toutes les catégories</option>
                <option value="Lunch immobilier">Lunch immobilier</option>
                <option value="Soirée virtuelle">Soirée virtuelle</option>
                <option value="Conférence">Conférence</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                <Filter size={20} />
                <span>Plus de filtres</span>
              </button>
            </div>
          </div>

          {/* Liste des événements */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div 
                key={event.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
              >
                <div className="aspect-video relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                    {event.category}
                  </div>
                  <div className={`absolute top-4 right-4 px-3 py-1 text-sm rounded-full ${
                    event.type === 'presentiel'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                      : event.type === 'online'
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  }`}>
                    <div className="flex items-center gap-1">
                      {event.type === 'presentiel' ? (
                        <MapPin size={14} />
                      ) : event.type === 'online' ? (
                        <Video size={14} />
                      ) : (
                        <Globe size={14} />
                      )}
                      <span>
                        {event.type === 'presentiel'
                          ? 'Présentiel'
                          : event.type === 'online'
                          ? 'En ligne'
                          : 'Hybride'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{event.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{event.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar size={16} />
                      <span>{new Date(event.date).toLocaleDateString('fr-CA')}</span>
                      <Clock size={16} className="ml-2" />
                      <span>{event.time}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin size={16} />
                        <span>{event.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Users size={16} />
                      <span>{event.registrations}/{event.capacity} places</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                    <div className="font-semibold dark:text-white">
                      {event.price === 0 ? 'Gratuit' : `${event.price}$`}
                    </div>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                      <span>S'inscrire</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
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