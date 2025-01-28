import React, { useState, useEffect } from 'react';
import {
  User, Mail, Phone, Building, MapPin, Camera,
  Shield, Bell, Globe, Check, X, AlertTriangle,
  Moon, Sun
} from 'lucide-react';

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  language: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  avatar: string | null;
  darkMode: boolean;
}

export default function Profile() {
  const [profile, setProfile] = useState<Profile>({
    firstName: 'Paul',
    lastName: 'Martin',
    email: 'paul.martin@example.com',
    phone: '514-555-0123',
    company: 'Gestion Immobilière PM',
    address: '123 rue Principale',
    city: 'Montréal',
    postalCode: 'H2X 1X1',
    country: 'Canada',
    language: 'fr',
    notifications: {
      email: true,
      sms: true,
      push: false
    },
    avatar: null,
    darkMode: false
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Effect to initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setProfile(prev => ({ ...prev, darkMode: savedDarkMode }));
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Effect to handle dark mode changes
  useEffect(() => {
    if (profile.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', profile.darkMode.toString());
  }, [profile.darkMode]);

  const toggleDarkMode = () => {
    setProfile(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 dark:bg-gray-900">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold dark:text-white">Mon Profil</h1>
        <p className="text-gray-600 dark:text-gray-400">Gérez vos informations personnelles et vos préférences</p>
      </div>

      {/* Message de succès */}
      {showSuccessMessage && (
        <div className="flex items-center gap-2 p-4 bg-green-100 text-green-700 rounded-lg dark:bg-green-900 dark:text-green-300">
          <Check size={20} />
          <span>Vos modifications ont été enregistrées avec succès</span>
        </div>
      )}

      {/* Photo de profil */}
      <div className="bg-white p-6 rounded-xl shadow-sm dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-6 dark:text-white">Photo de profil</h2>
        <div className="flex items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden dark:bg-gray-700">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={48} className="text-gray-400 dark:text-gray-500" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700">
              <Camera size={20} />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2 dark:text-gray-400">
              Format recommandé: JPG, PNG. Taille maximale: 2MB
            </p>
            {profile.avatar && (
              <button
                onClick={() => setProfile({ ...profile, avatar: null })}
                className="text-red-600 text-sm hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                Supprimer la photo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Préférences d'affichage */}
      <div className="bg-white p-6 rounded-xl shadow-sm dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-6 dark:text-white">Préférences d'affichage</h2>
        <div className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700">
          <div className="flex items-center gap-3">
            {profile.darkMode ? (
              <Moon size={20} className="text-blue-600 dark:text-blue-400" />
            ) : (
              <Sun size={20} className="text-yellow-600" />
            )}
            <div>
              <p className="font-medium dark:text-white">Mode sombre</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ajustez l'apparence de l'application
              </p>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
          >
            <span className="sr-only">Activer le mode sombre</span>
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                profile.darkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Informations personnelles */}
      <div className="bg-white p-6 rounded-xl shadow-sm dark:bg-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold dark:text-white">Informations personnelles</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-lg ${
              isEditing
                ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isEditing ? 'Annuler' : 'Modifier'}
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Prénom
              </label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg disabled:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nom
              </label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg disabled:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg disabled:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg disabled:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Entreprise
            </label>
            <input
              type="text"
              value={profile.company}
              onChange={(e) => setProfile({ ...profile, company: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 border rounded-lg disabled:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Adresse
            </label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 border rounded-lg disabled:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ville
              </label>
              <input
                type="text"
                value={profile.city}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg disabled:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Code postal
              </label>
              <input
                type="text"
                value={profile.postalCode}
                onChange={(e) => setProfile({ ...profile, postalCode: e.target.value })}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg disabled:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pays
              </label>
              <input
                type="text"
                value={profile.country}
                onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg disabled:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-4 pt-4 border-t dark:border-gray-700">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Enregistrer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Préférences */}
      <div className="bg-white p-6 rounded-xl shadow-sm dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-6 dark:text-white">Préférences</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Langue
            </label>
            <select
              value={profile.language}
              onChange={(e) => setProfile({ ...profile, language: e.target.value })}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Notifications</h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-gray-400" />
                  <div>
                    <p className="font-medium dark:text-white">Notifications par email</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Recevez des mises à jour par email</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={profile.notifications.email}
                  onChange={(e) => setProfile({
                    ...profile,
                    notifications: {
                      ...profile.notifications,
                      email: e.target.checked
                    }
                  })}
                  className="w-6 h-6 text-blue-600 rounded dark:bg-gray-700"
                />
              </label>

              <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-gray-400" />
                  <div>
                    <p className="font-medium dark:text-white">Notifications SMS</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Recevez des alertes par SMS</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={profile.notifications.sms}
                  onChange={(e) => setProfile({
                    ...profile,
                    notifications: {
                      ...profile.notifications,
                      sms: e.target.checked
                    }
                  })}
                  className="w-6 h-6 text-blue-600 rounded dark:bg-gray-700"
                />
              </label>

              <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-gray-400" />
                  <div>
                    <p className="font-medium dark:text-white">Notifications push</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Recevez des notifications sur votre navigateur</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={profile.notifications.push}
                  onChange={(e) => setProfile({
                    ...profile,
                    notifications: {
                      ...profile.notifications,
                      push: e.target.checked
                    }
                  })}
                  className="w-6 h-6 text-blue-600 rounded dark:bg-gray-700"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white p-6 rounded-xl shadow-sm dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-6 text-red-600">Zone de danger</h2>
        <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
          <div>
            <h3 className="font-medium text-red-700 dark:text-red-400">Supprimer le compte</h3>
            <p className="text-sm text-red-600 dark:text-red-400">
              Cette action est irréversible. Toutes vos données seront supprimées.
            </p>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Supprimer mon compte
          </button>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md dark:bg-gray-800">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-100 rounded-full dark:bg-red-900">
                  <AlertTriangle size={24} className="text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-xl font-bold dark:text-white">Supprimer le compte</h2>
              </div>
              <p className="text-gray-600 mb-6 dark:text-gray-400">
                Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible
                et toutes vos données seront définitivement supprimées.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    // Logique de suppression du compte
                    setShowDeleteModal(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Supprimer définitivement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}