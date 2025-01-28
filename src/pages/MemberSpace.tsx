import React, { useState } from 'react';
import { Percent, Search, Filter, Tag, ExternalLink, MapPin, Phone, Mail, DollarSign, Star, Clock, Shield, CheckCircle, AlertTriangle, Building, Car, ShoppingBag, PenTool as Tools, Home, Briefcase, Heart, Smartphone, Zap, FileText, Users, Wrench, PaintBucket, Truck, Coffee, Sparkles, Crown } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  category: string;
  description: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  discount: {
    value: string;
    description: string;
    expiryDate?: string;
    conditions?: string;
  };
  featured?: boolean;
  logo?: string;
  image?: string;
}

interface Category {
  id: string;
  name: string;
  icon: any;
  description: string;
}

export default function MemberSpace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPartnerDetails, setShowPartnerDetails] = useState<string | null>(null);

  // Catégories basées sur le site CORPIQ
  const categories: Category[] = [
    { 
      id: 'assurance',
      name: 'Assurance',
      icon: Shield,
      description: 'Assurance habitation, responsabilité civile et plus'
    },
    {
      id: 'services-immobiliers',
      name: 'Services immobiliers',
      icon: Building,
      description: 'Évaluation, inspection, gestion immobilière'
    },
    {
      id: 'renovation',
      name: 'Rénovation',
      icon: Tools,
      description: 'Matériaux, entrepreneurs, services de rénovation'
    },
    {
      id: 'services-locatifs',
      name: 'Services locatifs',
      icon: Home,
      description: 'Location, enquête de crédit, bail'
    },
    {
      id: 'services-juridiques',
      name: 'Services juridiques',
      icon: Briefcase,
      description: 'Avocats, huissiers, médiateurs'
    },
    {
      id: 'entretien',
      name: 'Entretien',
      icon: Wrench,
      description: 'Nettoyage, extermination, entretien général'
    },
    {
      id: 'demenagement',
      name: 'Déménagement',
      icon: Truck,
      description: 'Services de déménagement et entreposage'
    },
    {
      id: 'autres',
      name: 'Autres services',
      icon: Star,
      description: 'Téléphonie, énergie, et autres services'
    }
  ];

  // Partenaires basés sur le répertoire CORPIQ
  const partners: Partner[] = [
    {
      id: '1',
      name: 'La Personnelle',
      category: 'assurance',
      description: 'Assurance auto, habitation et entreprise',
      discount: {
        value: 'Jusqu\'à 20%',
        description: 'de rabais sur l\'assurance habitation',
        conditions: 'Offre exclusive aux membres CORPIQ'
      },
      featured: true,
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85'
    },
    {
      id: '2',
      name: 'Lowe\'s Canada',
      category: 'renovation',
      description: 'Matériaux de construction et rénovation',
      discount: {
        value: '15%',
        description: 'sur les achats en magasin',
        conditions: 'Sur présentation de la carte membre'
      },
      featured: true,
      image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f'
    },
    {
      id: '3',
      name: 'Bell',
      category: 'autres',
      description: 'Services de télécommunication',
      discount: {
        value: '20%',
        description: 'sur les forfaits Affaires',
        conditions: 'Engagement de 24 mois requis'
      },
      image: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e'
    },
    {
      id: '4',
      name: 'Garda',
      category: 'services-locatifs',
      description: 'Services de sécurité et enquêtes',
      discount: {
        value: '25%',
        description: 'sur les enquêtes de crédit',
        conditions: 'Pour les nouveaux clients'
      },
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f'
    },
    {
      id: '5',
      name: 'Bétonel',
      category: 'renovation',
      description: 'Peintures et revêtements',
      discount: {
        value: '30%',
        description: 'sur toute la gamme de peintures',
        conditions: 'En magasin uniquement'
      },
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f'
    }
  ];

  // Filtrer les partenaires
  const filteredPartners = partners.filter(partner => {
    const matchesSearch = 
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || partner.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold dark:text-white">Rabais partenaires</h1>
        <p className="text-gray-600 dark:text-gray-400">Profitez d'offres exclusives négociées pour nos membres</p>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="search"
            placeholder="Rechercher un partenaire..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="all">Toutes les catégories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      {/* Catégories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-6 rounded-xl border text-left transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                : 'bg-white hover:bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${
                selectedCategory === category.id
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}>
                <category.icon size={20} />
              </div>
              <h3 className="font-medium dark:text-white">{category.name}</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
          </button>
        ))}
      </div>

      {/* Liste des partenaires */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map((partner) => (
          <div 
            key={partner.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          >
            <div className="aspect-video relative">
              <img
                src={partner.image}
                alt={partner.name}
                className="w-full h-full object-cover"
              />
              {partner.featured && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-sm rounded-full flex items-center gap-1">
                  <Crown size={14} />
                  <span>Partenaire privilégié</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold mb-1 dark:text-white">{partner.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{partner.description}</p>
                </div>
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <Percent size={16} />
                  <span className="font-medium">{partner.discount.value}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {partner.discount.description}
                </p>
                {partner.discount.conditions && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <AlertTriangle size={14} />
                    <span>{partner.discount.conditions}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Partenaire vérifié</span>
                </div>
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  <span>Voir l'offre</span>
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}