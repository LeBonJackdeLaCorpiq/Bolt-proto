import React, { useState } from 'react';
import { 
  Upload, Palette, Mail, Phone, MessageSquare, 
  AlertTriangle, Image, Globe, Layout, Type,
  Check, X, Eye, Plus
} from 'lucide-react';

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  emergencyPhone: string;
  emergencyEmail: string;
  emergencyHours: string;
}

interface PortalSettings {
  welcomeMessage: string;
  primaryColor: string;
  secondaryColor: string;
  logo: string | null;
  showAIAssistant: boolean;
  showEmergencyContact: boolean;
  showDocuments: boolean;
  showPayments: boolean;
  showMaintenance: boolean;
}

export default function PortalCustomization() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: 'contact@example.com',
    phone: '514-555-0123',
    address: '123 rue Principale, Montréal, QC H2X 1X1',
    emergencyPhone: '514-555-9999',
    emergencyEmail: 'urgence@example.com',
    emergencyHours: '24/7'
  });

  const [settings, setSettings] = useState<PortalSettings>({
    welcomeMessage: 'Bienvenue sur votre portail locataire. Nous sommes heureux de vous compter parmi nos résidents.',
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    logo: null,
    showAIAssistant: true,
    showEmergencyContact: true,
    showDocuments: true,
    showPayments: true,
    showMaintenance: true
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings({ ...settings, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Ici, nous sauvegarderions les paramètres
    console.log('Saving settings:', { contactInfo, settings });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold">Personnalisation du portail</h1>
        <p className="text-gray-600">Personnalisez l'apparence et le contenu de votre portail locataire</p>
      </div>

      <div className="flex gap-8">
        {/* Panneau principal */}
        <div className="flex-1 space-y-6">
          {/* Section Logo */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Image size={20} />
              Logo et marque
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50">
                  {settings.logo ? (
                    <img 
                      src={settings.logo} 
                      alt="Logo" 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Upload className="text-gray-400" size={24} />
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                    <Upload size={20} />
                    <span>Charger un logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    Format recommandé: PNG ou SVG, max 2MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section Couleurs */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Palette size={20} />
              Couleurs et style
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Couleur primaire
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                    className="w-10 h-10 rounded border p-1"
                  />
                  <input
                    type="text"
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                    className="flex-1 p-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Couleur secondaire
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.secondaryColor}
                    onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                    className="w-10 h-10 rounded border p-1"
                  />
                  <input
                    type="text"
                    value={settings.secondaryColor}
                    onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                    className="flex-1 p-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section Message d'accueil */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Type size={20} />
              Message d'accueil
            </h2>
            <textarea
              value={settings.welcomeMessage}
              onChange={(e) => setSettings({ ...settings, welcomeMessage: e.target.value })}
              className="w-full p-3 border rounded-lg h-32 resize-none"
              placeholder="Écrivez votre message d'accueil..."
            />
          </div>

          {/* Section Informations de contact */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Mail size={20} />
              Informations de contact
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse
                </label>
                <input
                  type="text"
                  value={contactInfo.address}
                  onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Section Contacts d'urgence */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle size={20} />
              Contacts d'urgence
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone d'urgence
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.emergencyPhone}
                    onChange={(e) => setContactInfo({ ...contactInfo, emergencyPhone: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email d'urgence
                  </label>
                  <input
                    type="email"
                    value={contactInfo.emergencyEmail}
                    onChange={(e) => setContactInfo({ ...contactInfo, emergencyEmail: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heures de disponibilité
                </label>
                <input
                  type="text"
                  value={contactInfo.emergencyHours}
                  onChange={(e) => setContactInfo({ ...contactInfo, emergencyHours: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Section Fonctionnalités */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Layout size={20} />
              Fonctionnalités du portail
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <MessageSquare size={20} className="text-blue-600" />
                  <div>
                    <p className="font-medium">Assistant IA</p>
                    <p className="text-sm text-gray-500">Activez l'assistant virtuel pour vos locataires</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showAIAssistant}
                  onChange={(e) => setSettings({ ...settings, showAIAssistant: e.target.checked })}
                  className="w-6 h-6 text-blue-600 rounded"
                />
              </label>
              <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={20} className="text-red-600" />
                  <div>
                    <p className="font-medium">Contact d'urgence</p>
                    <p className="text-sm text-gray-500">Affichez les informations de contact d'urgence</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showEmergencyContact}
                  onChange={(e) => setSettings({ ...settings, showEmergencyContact: e.target.checked })}
                  className="w-6 h-6 text-blue-600 rounded"
                />
              </label>
              {/* Ajoutez d'autres options de fonctionnalités ici */}
            </div>
          </div>
        </div>

        {/* Panneau de prévisualisation */}
        <div className="w-80 shrink-0">
          <div className="sticky top-8">
            <div className="bg-white p-6 rounded-xl shadow-sm mb-4">
              <h2 className="text-lg font-semibold mb-4">Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="w-full flex items-center justify-center gap-2 p-2 border rounded-lg hover:bg-gray-50"
                >
                  <Eye size={20} />
                  <span>Prévisualiser</span>
                </button>
                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Check size={20} />
                  <span>Enregistrer</span>
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Suggestions</h2>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium mb-1">Ajoutez des photos</h3>
                  <p className="text-sm text-gray-500">
                    Personnalisez votre portail avec des photos de vos propriétés
                  </p>
                  <button className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-700">
                    <Plus size={16} />
                    <span className="text-sm">Ajouter des photos</span>
                  </button>
                </div>
                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium mb-1">Règlements personnalisés</h3>
                  <p className="text-sm text-gray-500">
                    Ajoutez vos règlements spécifiques pour les locataires
                  </p>
                  <button className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-700">
                    <Plus size={16} />
                    <span className="text-sm">Ajouter des règlements</span>
                  </button>
                </div>
                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium mb-1">Intégration de calendrier</h3>
                  <p className="text-sm text-gray-500">
                    Permettez aux locataires de réserver des espaces communs
                  </p>
                  <button className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-700">
                    <Plus size={16} />
                    <span className="text-sm">Configurer le calendrier</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}