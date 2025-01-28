import React, { useState } from 'react';
import { 
  Building, Globe, LayoutGrid, Monitor, Mail, Lock, 
  Shield, Home, DollarSign, Bot, ChevronRight, Check,
  Building2, Users, MapPin
} from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

interface OnboardingStep {
  title: string;
  description: string;
  fields: {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    options?: { value: string; label: string }[];
  }[];
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    organizationType: '',
    properties: '',
    units: '',
    city: '',
    goals: []
  });

  const steps: OnboardingStep[] = [
    {
      title: "Type d'organisation",
      description: "Dites-nous en plus sur votre organisation",
      fields: [
        {
          name: 'organizationType',
          label: 'Type de gestionnaire',
          type: 'select',
          options: [
            { value: 'individual', label: 'Propriétaire individuel' },
            { value: 'company', label: 'Société de gestion' },
            { value: 'syndic', label: 'Syndic de copropriété' }
          ]
        }
      ]
    },
    {
      title: "Votre portefeuille",
      description: "Parlez-nous de vos propriétés",
      fields: [
        {
          name: 'properties',
          label: 'Nombre de propriétés',
          type: 'select',
          options: [
            { value: '1-5', label: '1 à 5 propriétés' },
            { value: '6-20', label: '6 à 20 propriétés' },
            { value: '20+', label: 'Plus de 20 propriétés' }
          ]
        },
        {
          name: 'units',
          label: 'Nombre total d\'unités',
          type: 'select',
          options: [
            { value: '1-10', label: '1 à 10 unités' },
            { value: '11-50', label: '11 à 50 unités' },
            { value: '50+', label: 'Plus de 50 unités' }
          ]
        },
        {
          name: 'city',
          label: 'Ville principale',
          type: 'text',
          placeholder: 'Ex: Montréal'
        }
      ]
    }
  ];

  const handleSocialLogin = (provider: 'google' | 'microsoft' | 'apple') => {
    setStep(1);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  // Si nous sommes dans les étapes du questionnaire
  if (step > 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {steps.map((_, index) => (
                <div 
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index < step - 1
                      ? 'bg-green-100 text-green-600'
                      : index === step - 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {index < step - 1 ? (
                    <Check size={16} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Step content */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">{steps[step - 1].title}</h2>
            <p className="text-gray-600">{steps[step - 1].description}</p>
          </div>

          <div className="space-y-6">
            {steps[step - 1].fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    value={formData[field.name as keyof typeof formData]}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionnez une option</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Retour
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {step === steps.length ? 'Terminer' : 'Continuer'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Page de connexion initiale
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Panneau de gauche */}
      <div className="hidden lg:flex lg:flex-col lg:w-1/2 bg-blue-600 text-white p-12">
        <div className="flex items-center gap-3 mb-12">
          <Building size={32} />
          <span className="text-2xl font-bold">CORPIQ</span>
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6">
            Gérez vos biens immobiliers en toute simplicité
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Une solution complète pour les propriétaires et gestionnaires immobiliers.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500 rounded-lg">
                <Home size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Gestion simplifiée</h3>
                <p className="text-blue-100">Gérez vos propriétés et locataires</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500 rounded-lg">
                <DollarSign size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Suivi financier</h3>
                <p className="text-blue-100">Optimisez votre rentabilité</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500 rounded-lg">
                <Bot size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Assistant IA</h3>
                <p className="text-blue-100">Aide intelligente 24/7</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-4">
            <Shield size={20} className="text-blue-200" />
            <p className="text-sm text-blue-200">
              Vos données sont sécurisées et protégées
            </p>
          </div>
        </div>
      </div>

      {/* Panneau de droite */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-12">
        <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Bienvenue !</h2>
            <p className="text-gray-600">
              Connectez-vous pour accéder à votre espace
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleSocialLogin('google')}
              className="w-full flex items-center justify-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
            >
              <Globe size={20} />
              <span>Continuer avec Google</span>
            </button>

            <button
              onClick={() => handleSocialLogin('microsoft')}
              className="w-full flex items-center justify-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
            >
              <LayoutGrid size={20} />
              <span>Continuer avec Microsoft</span>
            </button>

            <button
              onClick={() => handleSocialLogin('apple')}
              className="w-full flex items-center justify-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
            >
              <Monitor size={20} />
              <span>Continuer avec Apple</span>
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-sm text-gray-500 bg-gray-50">ou</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Votre email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="password"
                    className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Votre mot de passe"
                  />
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
                Se connecter
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            En continuant, vous acceptez nos{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Conditions d'utilisation
            </a>{' '}
            et notre{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Politique de confidentialité
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}