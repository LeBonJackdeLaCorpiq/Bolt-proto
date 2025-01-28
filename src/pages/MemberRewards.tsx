import React, { useState } from 'react';
import {
  Gift, Star, ChevronRight, Calendar, Tag, 
  Search, Filter, Crown, DollarSign, Sparkles,
  Building, ShoppingBag, Coffee, Car, Plane,
  Percent, Clock, AlertTriangle, Trophy,
  Shield, Zap, Heart, Target, Award,
  Users, CheckCircle2
} from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: any;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  category: 'engagement' | 'paiement' | 'fidelite' | 'special';
}

interface Level {
  number: number;
  points: number;
  benefits: string[];
}

interface Reward {
  id: string;
  title: string;
  description: string;
  partner: string;
  category: string;
  points: number;
  discount: string;
  expiryDate: string;
  isExclusive: boolean;
  image: string;
}

export default function MemberRewards() {
  const [activeTab, setActiveTab] = useState<'badges' | 'rewards' | 'levels'>('badges');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Données des niveaux
  const levels: Level[] = [
    {
      number: 1,
      points: 0,
      benefits: ['Accès aux rabais de base']
    },
    {
      number: 2,
      points: 1000,
      benefits: ['5% de rabais supplémentaires', 'Accès au support prioritaire']
    },
    {
      number: 3,
      points: 2500,
      benefits: ['10% de rabais supplémentaires', 'Invitations événements exclusifs']
    },
    {
      number: 4,
      points: 5000,
      benefits: ['15% de rabais supplémentaires', 'Conciergerie dédiée']
    },
    {
      number: 5,
      points: 10000,
      benefits: ['20% de rabais supplémentaires', 'Statut VIP']
    }
  ];

  // Données des badges
  const badges: Badge[] = [
    {
      id: '1',
      name: 'Premier pas',
      description: 'Première connexion au portail',
      icon: Star,
      unlocked: true,
      category: 'engagement'
    },
    {
      id: '2',
      name: 'Ponctuel',
      description: '12 mois de paiements à temps',
      icon: Clock,
      unlocked: true,
      progress: 12,
      maxProgress: 12,
      category: 'paiement'
    },
    {
      id: '3',
      name: 'Fidèle',
      description: '5 ans de membership',
      icon: Heart,
      unlocked: false,
      progress: 3,
      maxProgress: 5,
      category: 'fidelite'
    },
    {
      id: '4',
      name: 'Pro',
      description: 'Membre Premium',
      icon: Crown,
      unlocked: false,
      category: 'special'
    },
    {
      id: '5',
      name: 'Expert',
      description: '5 formations complétées',
      icon: Award,
      unlocked: false,
      progress: 2,
      maxProgress: 5,
      category: 'engagement'
    },
    {
      id: '6',
      name: 'Communauté',
      description: 'Participation à 3 événements',
      icon: Users,
      unlocked: true,
      category: 'engagement'
    }
  ];

  // Données des récompenses (gardées de votre version précédente)
  const rewards: Reward[] = [
    {
      id: '1',
      title: 'Rabais sur peinture',
      description: '20% de rabais sur toute la gamme de peintures professionnelles',
      partner: 'Peintures Premium',
      category: 'renovation',
      points: 500,
      discount: '20%',
      expiryDate: '2024-12-31',
      isExclusive: true,
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f'
    },
    // ... autres récompenses
  ];

  const currentLevel = 3;
  const currentPoints = 2750;
  const nextLevelPoints = 5000;
  const progressToNextLevel = ((currentPoints - levels[currentLevel - 1].points) / 
    (levels[currentLevel].points - levels[currentLevel - 1].points)) * 100;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* En-tête avec niveau */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Niveau {currentLevel}</h1>
            <p className="text-blue-100">
              {currentPoints} points • Prochain niveau à {nextLevelPoints} points
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100">Points disponibles</div>
            <div className="text-3xl font-bold">{currentPoints}</div>
          </div>
        </div>
        <div className="relative w-full h-2 bg-blue-700 rounded-full overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-white"
            style={{ width: `${progressToNextLevel}%` }}
          />
        </div>
      </div>

      {/* Onglets */}
      <div className="flex gap-4 border-b dark:border-gray-700">
        <button
          onClick={() => setActiveTab('badges')}
          className={`pb-4 px-4 relative ${
            activeTab === 'badges'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <Trophy size={20} />
            <span>Badges</span>
          </div>
          {activeTab === 'badges' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('rewards')}
          className={`pb-4 px-4 relative ${
            activeTab === 'rewards'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <Gift size={20} />
            <span>Récompenses</span>
          </div>
          {activeTab === 'rewards' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('levels')}
          className={`pb-4 px-4 relative ${
            activeTab === 'levels'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <Star size={20} />
            <span>Niveaux</span>
          </div>
          {activeTab === 'levels' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
          )}
        </button>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge) => (
            <div 
              key={badge.id}
              className={`p-6 rounded-xl border ${
                badge.unlocked
                  ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 opacity-75'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${
                  badge.unlocked
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-800'
                }`}>
                  <badge.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1 dark:text-white">{badge.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {badge.description}
                  </p>
                  {badge.progress !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Progression</span>
                        <span className="font-medium dark:text-white">
                          {badge.progress}/{badge.maxProgress}
                        </span>
                      </div>
                      <div className="relative w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="absolute left-0 top-0 h-full bg-blue-600 dark:bg-blue-500"
                          style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'levels' && (
        <div className="space-y-6">
          {levels.map((level, index) => (
            <div 
              key={level.number}
              className={`p-6 rounded-xl border ${
                level.number === currentLevel
                  ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                  : level.number < currentLevel
                  ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 opacity-75'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl ${
                  level.number <= currentLevel
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-800'
                }`}>
                  <Star size={24} />
                </div>
                <div>
                  <h3 className="font-semibold dark:text-white">Niveau {level.number}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {level.points} points requis
                  </p>
                </div>
                {level.number === currentLevel && (
                  <span className="ml-auto px-3 py-1 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400 rounded-full text-sm">
                    Niveau actuel
                  </span>
                )}
              </div>
              <div className="space-y-2">
                {level.benefits.map((benefit, benefitIndex) => (
                  <div 
                    key={benefitIndex}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'rewards' && (
        <>
          {/* Filtres pour les récompenses */}
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="search"
                placeholder="Rechercher une récompense..."
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

          {/* Liste des récompenses */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <div key={reward.id} className="bg-white rounded-xl shadow-sm overflow-hidden dark:bg-gray-800">
                <div className="aspect-video relative">
                  <img
                    src={reward.image}
                    alt={reward.title}
                    className="w-full h-full object-cover"
                  />
                  {reward.isExclusive && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-sm rounded-full flex items-center gap-1">
                      <Crown size={14} />
                      <span>Exclusif</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                    {reward.points} points
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold mb-1 dark:text-white">{reward.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{reward.description}</p>
                    </div>
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                      <Percent size={16} />
                      <span className="font-medium">{reward.discount}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Clock size={16} />
                      <span>Expire le {new Date(reward.expiryDate).toLocaleDateString('fr-CA')}</span>
                    </div>
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                      <span>Utiliser</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}