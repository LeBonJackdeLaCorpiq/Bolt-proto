import React, { useState } from 'react';
import {
  Building, Mail, Phone, MapPin, DollarSign, FileText,
  Users, Plus, Check, X, AlertTriangle, Clock, Send,
  UserPlus, UserMinus, Settings, Shield
} from 'lucide-react';

interface OrganizationInfo {
  name: string;
  taxNumber: string;
  billingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  accountingContact: {
    name: string;
    email: string;
    phone: string;
  };
  billingEmail: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  status: 'active' | 'pending' | 'invited';
  invitedAt?: string;
  joinedAt?: string;
}

export default function Organization() {
  const [activeTab, setActiveTab] = useState('info');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'member'>('member');

  const [organizationInfo, setOrganizationInfo] = useState<OrganizationInfo>({
    name: 'Gestion Immobilière PM',
    taxNumber: 'TPS/TVH: 123456789 RT0001',
    billingAddress: {
      street: '123 rue Principale',
      city: 'Montréal',
      postalCode: 'H2X 1X1',
      country: 'Canada'
    },
    accountingContact: {
      name: 'Marie Tremblay',
      email: 'comptabilite@example.com',
      phone: '514-555-0199'
    },
    billingEmail: 'factures@example.com'
  });

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Paul Martin',
      email: 'paul.martin@example.com',
      role: 'admin',
      status: 'active',
      joinedAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Sophie Dubois',
      email: 'sophie.d@example.com',
      role: 'member',
      status: 'active',
      joinedAt: '2024-02-15'
    },
    {
      id: '3',
      name: 'Jean Tremblay',
      email: 'jean.t@example.com',
      role: 'member',
      status: 'invited',
      invitedAt: '2024-03-15'
    }
  ]);

  const handleInvite = () => {
    console.log('Inviting:', { email: inviteEmail, role: inviteRole });
    setShowInviteModal(false);
    setInviteEmail('');
    setInviteRole('member');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold">Mon organisation</h1>
        <p className="text-gray-600">Gérez les informations et l'équipe de votre organisation</p>
      </div>

      {/* Onglets */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab('info')}
              className={`flex items-center gap-2 px-6 py-4 font-medium ${
                activeTab === 'info'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Building size={20} />
              <span>Informations</span>
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`flex items-center gap-2 px-6 py-4 font-medium ${
                activeTab === 'team'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users size={20} />
              <span>Équipe</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'info' && (
            <div className="space-y-8">
              {/* Informations de l'organisation */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Informations de l'organisation</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom de l'organisation
                    </label>
                    <input
                      type="text"
                      value={organizationInfo.name}
                      onChange={(e) => setOrganizationInfo({ ...organizationInfo, name: e.target.value })}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Numéro de taxe
                    </label>
                    <input
                      type="text"
                      value={organizationInfo.taxNumber}
                      onChange={(e) => setOrganizationInfo({ ...organizationInfo, taxNumber: e.target.value })}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Adresse de facturation */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Adresse de facturation</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rue
                    </label>
                    <input
                      type="text"
                      value={organizationInfo.billingAddress.street}
                      onChange={(e) => setOrganizationInfo({
                        ...organizationInfo,
                        billingAddress: {
                          ...organizationInfo.billingAddress,
                          street: e.target.value
                        }
                      })}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ville
                    </label>
                    <input
                      type="text"
                      value={organizationInfo.billingAddress.city}
                      onChange={(e) => setOrganizationInfo({
                        ...organizationInfo,
                        billingAddress: {
                          ...organizationInfo.billingAddress,
                          city: e.target.value
                        }
                      })}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Code postal
                    </label>
                    <input
                      type="text"
                      value={organizationInfo.billingAddress.postalCode}
                      onChange={(e) => setOrganizationInfo({
                        ...organizationInfo,
                        billingAddress: {
                          ...organizationInfo.billingAddress,
                          postalCode: e.target.value
                        }
                      })}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Contact comptabilité */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Contact comptabilité</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom du contact
                    </label>
                    <input
                      type="text"
                      value={organizationInfo.accountingContact.name}
                      onChange={(e) => setOrganizationInfo({
                        ...organizationInfo,
                        accountingContact: {
                          ...organizationInfo.accountingContact,
                          name: e.target.value
                        }
                      })}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={organizationInfo.accountingContact.email}
                      onChange={(e) => setOrganizationInfo({
                        ...organizationInfo,
                        accountingContact: {
                          ...organizationInfo.accountingContact,
                          email: e.target.value
                        }
                      })}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={organizationInfo.accountingContact.phone}
                      onChange={(e) => setOrganizationInfo({
                        ...organizationInfo,
                        accountingContact: {
                          ...organizationInfo.accountingContact,
                          phone: e.target.value
                        }
                      })}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email pour les factures
                    </label>
                    <input
                      type="email"
                      value={organizationInfo.billingEmail}
                      onChange={(e) => setOrganizationInfo({
                        ...organizationInfo,
                        billingEmail: e.target.value
                      })}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-end gap-4 pt-4 border-t">
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                  Annuler
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Enregistrer
                </button>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              {/* En-tête de l'équipe */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">Membres de l'équipe</h2>
                  <p className="text-sm text-gray-500">
                    Gérez les accès et les rôles des membres de votre équipe
                  </p>
                </div>
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <UserPlus size={20} />
                  <span>Inviter un membre</span>
                </button>
              </div>

              {/* Liste des membres */}
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {member.role === 'admin' ? 'Administrateur' : 'Membre'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : member.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {member.status === 'active' ? 'Actif' :
                         member.status === 'pending' ? 'En attente' : 'Invité'}
                      </span>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Settings size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal d'invitation */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Inviter un membre</h2>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rôle
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as 'admin' | 'member')}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="member">Membre</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="text-blue-600 mt-1" size={20} />
                    <div>
                      <h3 className="font-medium text-blue-900">Permissions</h3>
                      <p className="text-sm text-blue-700">
                        Les membres peuvent accéder aux fonctionnalités de base.
                        Les administrateurs ont accès à toutes les fonctionnalités
                        et peuvent gérer les membres de l'équipe.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={handleInvite}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Send size={20} />
                  <span>Envoyer l'invitation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}