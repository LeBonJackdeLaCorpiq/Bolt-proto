import React, { useState } from 'react';
import {
  Newspaper, Lock, Bookmark, TrendingUp, Building,
  FileText, Crown, ExternalLink, ChevronRight, Star,
  Zap
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  image: string;
  isPro: boolean;
  readTime: string;
}

interface Dossier {
  id: string;
  title: string;
  description: string;
  articles: number;
  image: string;
  isPro: boolean;
}

export default function MemberNews() {
  const [activeTab, setActiveTab] = useState('actualites');

  const articles: Article[] = [
    {
      id: '1',
      title: 'Nouvelles règles pour les propriétaires en 2024',
      description: 'Les changements majeurs qui affectent les propriétaires immobiliers au Québec cette année.',
      category: 'Législation',
      date: '15 mars 2024',
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73',
      isPro: false,
      readTime: '5 min'
    },
    {
      id: '2',
      title: 'Analyse exclusive : Tendances du marché locatif 2024',
      description: 'Étude approfondie des tendances actuelles et prévisions pour les prochains trimestres.',
      category: 'Marché',
      date: '14 mars 2024',
      image: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51',
      isPro: true,
      readTime: '8 min'
    },
    {
      id: '3',
      title: 'Guide complet : Optimisation fiscale immobilière',
      description: 'Stratégies et conseils pour optimiser votre situation fiscale en tant que propriétaire.',
      category: 'Finance',
      date: '13 mars 2024',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
      isPro: true,
      readTime: '12 min'
    }
  ];

  const dossiers: Dossier[] = [
    {
      id: '1',
      title: 'Rénovations et amélioration énergétique',
      description: 'Guide complet sur les rénovations écoénergétiques et les subventions disponibles.',
      articles: 5,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12',
      isPro: false
    },
    {
      id: '2',
      title: 'Gestion locative optimisée',
      description: 'Méthodes avancées et outils pour une gestion locative plus efficace.',
      articles: 8,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
      isPro: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Actualités et ressources</h1>
        <p className="text-gray-600">Restez informé des dernières nouvelles et tendances du secteur immobilier</p>
      </div>

      {/* Onglets */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('actualites')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'actualites'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Actualités
        </button>
        <button
          onClick={() => setActiveTab('dossiers')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'dossiers'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Dossiers thématiques
        </button>
      </div>

      {activeTab === 'actualites' ? (
        <div className="space-y-6">
          {/* Articles en vedette */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map(article => (
              <div 
                key={article.id}
                className={`bg-white rounded-xl shadow-sm overflow-hidden ${
                  article.isPro ? 'relative' : ''
                }`}
              >
                <div className="aspect-video relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                    {article.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">{article.date}</span>
                    <span className="text-sm text-gray-500">{article.readTime} de lecture</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                      <span>Lire l'article</span>
                      <ChevronRight size={16} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Bookmark size={20} className="text-gray-400" />
                    </button>
                  </div>
                </div>
                {article.isPro && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center p-6">
                      <Crown size={40} className="text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">Contenu Pro exclusif</h3>
                      <p className="text-gray-600 mb-4">
                        Débloquez l'accès à du contenu exclusif et des analyses approfondies
                      </p>
                      <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg mx-auto hover:bg-blue-700">
                        <Zap size={20} />
                        <span>Devenir membre Pro</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dossiers.map(dossier => (
            <div 
              key={dossier.id}
              className={`bg-white rounded-xl shadow-sm overflow-hidden ${
                dossier.isPro ? 'relative' : ''
              }`}
            >
              <div className="aspect-video relative">
                <img
                  src={dossier.image}
                  alt={dossier.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{dossier.title}</h3>
                <p className="text-gray-600 mb-4">{dossier.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{dossier.articles} articles</span>
                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                    <span>Explorer le dossier</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              {dossier.isPro && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center p-6">
                    <Crown size={40} className="text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Dossier Pro exclusif</h3>
                    <p className="text-gray-600 mb-4">
                      Accédez à des dossiers thématiques complets et approfondis
                    </p>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg mx-auto hover:bg-blue-700">
                      <Star size={20} />
                      <span>Devenir membre Pro</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}