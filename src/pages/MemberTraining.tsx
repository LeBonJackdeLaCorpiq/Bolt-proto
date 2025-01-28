import React, { useState } from 'react';
import {
  BookOpen, Search, Filter, DollarSign, Clock, Video, Users, ChevronRight, Download, Star, Crown, Play, Building, Scale, FileText, Shield, Gavel, Calculator, TrendingUp, MessageSquare, Bot, Wrench, PaintBucket, Percent, AlertTriangle, Sparkles, Target, Calendar, Zap, Gift, Check, Brain, BrainCircuit, ArrowUpRight, ArrowDownRight, Rocket, Trophy, GraduationCap, Award
} from 'lucide-react';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle
} from 'react-resizable-panels';

interface Training {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  isPro?: boolean;
  rating?: number;
  students?: number;
  instructor?: string;
  category: string;
  featured?: boolean;
  promo?: {
    enabled: boolean;
    endDate: string;
    discount: number;
  };
}

interface Category {
  id: string;
  name: string;
  icon: any;
  description: string;
}

export default function MemberTraining() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Catégories de formation
  const categories: Category[] = [
    {
      id: 'legal',
      name: 'Juridique et réglementaire',
      icon: Gavel,
      description: 'Lois, règlements et procédures légales'
    },
    {
      id: 'management',
      name: 'Gestion locative',
      icon: Building,
      description: 'Gestion des baux et des locataires'
    },
    {
      id: 'finance',
      name: 'Finance et fiscalité',
      icon: Calculator,
      description: 'Optimisation fiscale et gestion financière'
    },
    {
      id: 'maintenance',
      name: 'Entretien et rénovation',
      icon: Wrench,
      description: 'Maintenance et amélioration des biens'
    },
    {
      id: 'marketing',
      name: 'Marketing immobilier',
      icon: Target,
      description: 'Stratégies de location et visibilité'
    },
    {
      id: 'tech',
      name: 'Technologies et innovation',
      icon: Bot,
      description: 'Outils numériques et solutions innovantes'
    }
  ];

  // Données des formations
  const trainings: Training[] = [
    {
      id: '1',
      title: 'Impacts fiscaux liés à l\'immobilier résidentiel locatif',
      description: 'Cette formation approfondie couvre tous les aspects fiscaux de l\'immobilier locatif, de la déclaration des revenus aux déductions possibles.',
      price: 299,
      duration: '4h',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
      category: 'finance',
      isPro: true,
      rating: 4.8,
      students: 124,
      featured: true,
      promo: {
        enabled: true,
        endDate: '2024-04-30',
        discount: 20
      }
    },
    {
      id: '2',
      title: 'Maîtrisez le bail de logement résidentiel',
      description: 'Une formation complète sur la gestion des baux, de la rédaction à la résiliation.',
      price: 199,
      duration: '3h',
      image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07',
      category: 'legal',
      isPro: true,
      rating: 4.9,
      students: 256,
      featured: true
    },
    {
      id: '3',
      title: 'Intelligence artificielle en immobilier',
      description: 'Découvrez comment l\'IA révolutionne la gestion immobilière et optimise vos processus.',
      price: 399,
      duration: '6h',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
      category: 'tech',
      isPro: true,
      rating: 4.7,
      students: 89,
      featured: true,
      promo: {
        enabled: true,
        endDate: '2024-04-15',
        discount: 25
      }
    },
    {
      id: '4',
      title: 'Marketing digital pour l\'immobilier',
      description: 'Stratégies de marketing digital pour attirer et retenir les locataires.',
      price: 249,
      duration: '4h',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      category: 'marketing',
      rating: 4.6,
      students: 156
    },
    {
      id: '5',
      title: 'Gestion efficace des rénovations',
      description: 'Planification et suivi des travaux de rénovation pour maximiser le ROI.',
      price: 199,
      duration: '3h',
      image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f',
      category: 'maintenance',
      rating: 4.8,
      students: 178
    }
  ];

  // Filtrer les formations
  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = 
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || training.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Formations en vedette
  const featuredTrainings = trainings.filter(t => t.featured);
  
  // Promotions spéciales
  const promotions = trainings.filter(t => t.promo?.enabled);

  const renderAnalyticsPanel = () => (
    <div className="space-y-6">
      {/* Profil d'apprentissage */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
          <Brain size={20} className="text-blue-600 dark:text-blue-400" />
          Votre profil d'apprentissage
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Formations complétées</span>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <ArrowUpRight size={16} />
              <span>3</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Heures de formation</span>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              <span>12.5h</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Taux de complétion</span>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Percent size={16} />
              <span>85%</span>
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
              <span className="font-medium">Formation recommandée</span>
            </div>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              Basé sur votre profil de gestion immobilière, la formation "Optimisation fiscale" pourrait vous intéresser.
            </p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-2">
              <BrainCircuit size={16} />
              <span className="font-medium">Parcours d'apprentissage</span>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Complétez la formation "Gestion locative avancée" pour débloquer le niveau suivant.
            </p>
          </div>
        </div>
      </div>

      {/* Progression et objectifs */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
          <Trophy size={20} className="text-orange-600 dark:text-orange-400" />
          Progression et objectifs
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Niveau actuel</span>
              <span className="font-medium dark:text-white">Intermédiaire</span>
            </div>
            <div className="relative w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-orange-600 dark:bg-orange-500"
                style={{ width: '65%' }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              35 points jusqu'au niveau suivant
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Objectif mensuel</span>
              </div>
              <span className="text-sm font-medium dark:text-white">2/3 formations</span>
            </div>
            <div className="relative w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-blue-600 dark:bg-blue-500"
                style={{ width: '66%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
          <Sparkles size={20} className="text-yellow-600 dark:text-yellow-400" />
          Actions rapides
        </h3>
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex items-center gap-2">
              <Play size={16} className="text-green-600 dark:text-green-400" />
              <span className="dark:text-white">Reprendre la dernière formation</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex items-center gap-2">
              <Award size={16} className="text-blue-600 dark:text-blue-400" />
              <span className="dark:text-white">Voir mes certificats</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex items-center gap-2">
              <Rocket size={16} className="text-purple-600 dark:text-purple-400" />
              <span className="dark:text-white">Créer un plan d'apprentissage</span>
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
            <h1 className="text-2xl font-bold dark:text-white">Formations</h1>
            <p className="text-gray-600 dark:text-gray-400">Développez vos compétences avec nos formations spécialisées</p>
          </div>

          {/* Formations en vedette */}
          <div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white">
              <Crown size={24} className="text-yellow-400" />
              Formations en vedette
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredTrainings.map((training) => (
                <div 
                  key={training.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-yellow-200 dark:border-yellow-800"
                >
                  <div className="aspect-video relative">
                    <img
                      src={training.image}
                      alt={training.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-blue-900 text-sm font-medium rounded-full flex items-center gap-1">
                      <Crown size={14} />
                      <span>Formation PRO</span>
                    </div>
                    {training.promo?.enabled && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                        -{training.promo.discount}%
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">{training.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{training.description}</p>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Clock size={16} />
                        <span>{training.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Video size={16} />
                        <span>Formation en ligne</span>
                      </div>
                      {training.instructor && (
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Users size={16} />
                          <span>{training.instructor}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <Star className="text-yellow-400 fill-current" size={16} />
                        <span className="font-medium dark:text-white">{training.rating}</span>
                        <span className="text-gray-500 dark:text-gray-400">
                          ({training.students} étudiants)
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

          {/* Catégories */}
          <div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white">
              <BookOpen size={24} className="text-blue-600 dark:text-blue-400" />
              Catégories de formation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className={`p-3 rounded-lg ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      <category.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium dark:text-white">{category.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      {trainings.filter(t => t.category === category.id).length} formations
                    </span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Liste des formations */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <input
                  type="search"
                  placeholder="Rechercher une formation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                <Filter size={20} />
                <span>Filtres</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredTrainings.map((training) => (
                <div 
                  key={training.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={training.image}
                        alt={training.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold dark:text-white">{training.title}</h3>
                            {training.isPro && (
                              <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full dark:bg-blue-900 dark:text-blue-400">
                                PRO
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 dark:text-gray-400">{training.description}</p>
                        </div>
                        {training.promo?.enabled ? (
                          <div className="text-right">
                            <span className="text-sm line-through text-gray-400">
                              {training.price}$
                            </span>
                            <span className="ml-2 text-2xl font-bold dark:text-white">
                              {Math.round(training.price * (1 - training.promo.discount / 100))}$
                            </span>
                          </div>
                        ) : (
                          <span className="text-2xl font-bold dark:text-white">${training.price}</span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Clock size={16} />
                          <span>{training.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Video size={16} />
                          <span>Formation en ligne</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Users size={16} />
                          <span>Accès illimité</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                            <Download size={20} />
                            <span>Programme détaillé</span>
                          </button>
                          {training.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="text-yellow-400 fill-current" size={16} />
                              <span className="font-medium dark:text-white">{training.rating}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                ({training.students} étudiants)
                              </span>
                            </div>
                          )}
                        </div>
                        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                          <span>S'inscrire</span>
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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