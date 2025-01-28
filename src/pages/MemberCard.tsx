import React, { useState } from 'react';
import {
  Crown, QrCode, CreditCard, Download, Share2,
  Mail, Phone, Building, Calendar, Percent, Shield,
  Gift, Tag, Wallet, Printer, AlertTriangle, X,
  ChevronRight, Smartphone, Globe, MapPin, DollarSign,
  Truck, CreditCard as CardIcon
} from 'lucide-react';

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  memberNumber: string;
  memberSince: string;
  validUntil: string;
  type: 'standard' | 'pro';
  email: string;
  phone: string;
  company: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

interface Benefit {
  icon: any;
  title: string;
  description: string;
}

export default function MemberCard() {
  const [showQRModal, setShowQRModal] = useState(false);
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '123 rue Principale',
    city: 'Montréal',
    postalCode: 'H2X 1X1',
    country: 'Canada'
  });

  const member: Member = {
    id: '1',
    firstName: 'Paul',
    lastName: 'Martin',
    memberNumber: 'PM123456',
    memberSince: '2024-01-01',
    validUntil: '2025-01-01',
    type: 'pro',
    email: 'paul.martin@example.com',
    phone: '514-555-0123',
    company: 'Gestion Immobilière PM',
    address: {
      street: '123 rue Principale',
      city: 'Montréal',
      postalCode: 'H2X 1X1',
      country: 'Canada'
    }
  };

  const benefits: Benefit[] = [
    {
      icon: Percent,
      title: 'Rabais exclusifs',
      description: 'Profitez de rabais chez nos partenaires'
    },
    {
      icon: Shield,
      title: 'Support prioritaire',
      description: 'Accès à notre support dédié 24/7'
    },
    {
      icon: Gift,
      title: 'Avantages spéciaux',
      description: 'Accès à des événements exclusifs'
    }
  ];

  const handleOrder = () => {
    console.log('Commande de carte physique:', {
      member,
      shippingAddress
    });
    setShowOrderModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold">Carte de membre</h1>
        <p className="text-gray-600">Votre carte de membre numérique</p>
      </div>

      {/* Carte de membre */}
      <div className="flex justify-center">
        <div 
          className="perspective-1000 w-[420px] h-[240px] cursor-pointer"
          onClick={() => setIsCardFlipped(!isCardFlipped)}
        >
          <div className={`relative w-full h-full transform-style-3d transition-transform duration-700 ${
            isCardFlipped ? 'rotate-y-180' : ''
          }`}>
            {/* Face avant */}
            <div className="absolute w-full h-full backface-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-2">
                    <Building size={24} />
                    <span className="font-bold text-lg">CORPIQ</span>
                  </div>
                  {member.type === 'pro' && (
                    <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded">
                      <Crown size={16} />
                      <span className="text-sm font-medium">PRO</span>
                    </div>
                  )}
                </div>
                
                <div className="mb-8">
                  <p className="text-sm text-white/80 mb-1">Membre</p>
                  <p className="text-xl font-bold">{member.firstName} {member.lastName}</p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-white/80 mb-1">Numéro de membre</p>
                    <p className="font-mono">{member.memberNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/80 mb-1">Valide jusqu'au</p>
                    <p>{new Date(member.validUntil).toLocaleDateString('fr-CA')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Face arrière */}
            <div className="absolute w-full h-full backface-hidden rotate-y-180">
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-white shadow-lg">
                <div className="w-full h-16 bg-black/30 rounded mb-4" />
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-white/60">Membre depuis</p>
                    <p className="font-medium">
                      {new Date(member.memberSince).toLocaleDateString('fr-CA')}
                    </p>
                  </div>
                  
                  <div className="flex justify-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${member.memberNumber}`}
                      alt="QR Code"
                      className="w-24 h-24"
                    />
                  </div>

                  <p className="text-xs text-center text-white/60">
                    Scannez pour vérifier la validité
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button
          onClick={() => setShowQRModal(true)}
          className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
        >
          <div className="p-2 bg-purple-100 rounded-lg">
            <QrCode size={24} className="text-purple-600" />
          </div>
          <div className="text-left">
            <h3 className="font-medium">Code QR</h3>
            <p className="text-sm text-gray-500">Afficher le code QR</p>
          </div>
        </button>

        <button
          onClick={() => setShowWalletOptions(true)}
          className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
        >
          <div className="p-2 bg-blue-100 rounded-lg">
            <Wallet size={24} className="text-blue-600" />
          </div>
          <div className="text-left">
            <h3 className="font-medium">Wallet</h3>
            <p className="text-sm text-gray-500">Ajouter au portefeuille</p>
          </div>
        </button>

        <button
          onClick={() => setShowPrintModal(true)}
          className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
        >
          <div className="p-2 bg-green-100 rounded-lg">
            <Printer size={24} className="text-green-600" />
          </div>
          <div className="text-left">
            <h3 className="font-medium">Imprimer</h3>
            <p className="text-sm text-gray-500">Version imprimable</p>
          </div>
        </button>

        <button
          onClick={() => setShowOrderModal(true)}
          className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
        >
          <div className="p-2 bg-orange-100 rounded-lg">
            <CardIcon size={24} className="text-orange-600" />
          </div>
          <div className="text-left">
            <h3 className="font-medium">Commander</h3>
            <p className="text-sm text-gray-500">Carte physique</p>
          </div>
        </button>
      </div>

      {/* Avantages */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-6">Avantages membres</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <benefit.icon size={20} className="text-blue-600" />
                </div>
                <h3 className="font-medium">{benefit.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Informations de contact */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-6">Informations de contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Mail size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{member.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Phone size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Téléphone</p>
              <p className="font-medium">{member.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Building size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Entreprise</p>
              <p className="font-medium">{member.company}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Calendar size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Valide jusqu'au</p>
              <p className="font-medium">
                {new Date(member.validUntil).toLocaleDateString('fr-CA')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal QR Code */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Code QR</h2>
                <button
                  onClick={() => setShowQRModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-6">
                <div className="bg-white p-4 border rounded-lg">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${member.memberNumber}`}
                    alt="QR Code"
                    className="w-48 h-48"
                  />
                </div>
              </div>
              <p className="text-center text-gray-600 mb-6">
                Présentez ce code QR pour accéder à vos avantages membres
              </p>
              <button
                onClick={() => setShowQRModal(false)}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Wallet */}
      {showWalletOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Ajouter au portefeuille</h2>
                <button
                  onClick={() => setShowWalletOptions(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Smartphone size={24} />
                    <span className="font-medium">Apple Wallet</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Globe size={24} />
                    <span className="font-medium">Google Wallet</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Impression */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Imprimer la carte</h2>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 p-4 bg-yellow-50 text-yellow-700 rounded-lg mb-6">
                <AlertTriangle size={20} />
                <p className="text-sm">
                  La version imprimée ne remplace pas la carte numérique officielle.
                </p>
              </div>
              <button
                onClick={() => {
                  // Logique d'impression
                  setShowPrintModal(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Printer size={20} />
                <span>Imprimer</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de commande de carte physique */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Commander une carte physique</h2>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Adresse de livraison</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rue
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.street}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ville
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Code postal
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.postalCode}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                          className="w-full p-3 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pays
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.country}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                          className="w-full p-3 border rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Truck size={20} className="text-gray-400" />
                      <span>Livraison standard (5-7 jours)</span>
                    </div>
                    <span>Gratuit</span>
                  </div>
                  <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span>15.00 CAD</span>
                  </div>
                </div>

                <button
                  onClick={handleOrder}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <DollarSign size={20} />
                  <span>Commander pour 15 CAD</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}