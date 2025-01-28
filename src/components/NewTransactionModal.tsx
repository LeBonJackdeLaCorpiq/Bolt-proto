import React, { useState } from 'react';
import { X, DollarSign, Calendar, Building, Home, Upload, FileText } from 'lucide-react';

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: any) => void;
}

interface TransactionFormData {
  type: 'income' | 'expense';
  category: string;
  amount: string;
  description: string;
  date: string;
  property?: string;
  unit?: string;
  attachments?: File[];
}

export default function NewTransactionModal({ isOpen, onClose, onSubmit }: NewTransactionModalProps) {
  const [formData, setFormData] = useState<TransactionFormData>({
    type: 'income',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    property: '',
    unit: '',
    attachments: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const categories = {
    income: [
      'Loyer',
      'Frais de retard',
      'Dépôt de garantie',
      'Autre revenu'
    ],
    expense: [
      'Taxe municipale',
      'Taxe scolaire',
      'Assurance',
      'Entretien',
      'Réparations',
      'Services publics',
      'Hypothèque',
      'Frais de gestion',
      'Marketing',
      'Frais juridiques',
      'Autre dépense'
    ]
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-8 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-lg mt-16 mb-8">
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 p-4 sm:p-6 border-b dark:border-gray-700 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-bold dark:text-white">Nouvelle transaction</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X size={20} className="dark:text-white" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          {/* Type de transaction */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type de transaction
            </label>
            <div className="flex gap-4">
              <label className={`flex-1 flex items-center gap-2 p-3 border rounded-lg cursor-pointer ${
                formData.type === 'income'
                  ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}>
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={formData.type === 'income'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
                  className="hidden"
                />
                <span>Revenu</span>
              </label>
              <label className={`flex-1 flex items-center gap-2 p-3 border rounded-lg cursor-pointer ${
                formData.type === 'expense'
                  ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}>
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={formData.type === 'expense'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
                  className="hidden"
                />
                <span>Dépense</span>
              </label>
            </div>
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Catégorie
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories[formData.type].map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Montant */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Montant
            </label>
            <div className="relative">
              <DollarSign size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full pl-10 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Description de la transaction"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <div className="relative">
              <Calendar size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full pl-10 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Propriété */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Propriété
            </label>
            <div className="relative">
              <Building size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={formData.property}
                onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                className="w-full pl-10 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Sélectionner une propriété"
              />
            </div>
          </div>

          {/* Unité */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Unité
            </label>
            <div className="relative">
              <Home size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full pl-10 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Sélectionner une unité"
              />
            </div>
          </div>

          {/* Documents */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Documents
            </label>
            <div className="relative">
              <input
                type="file"
                multiple
                onChange={(e) => setFormData({ ...formData, attachments: Array.from(e.target.files || []) })}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center gap-2 p-3 border border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Upload size={20} className="text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">Ajouter des documents</span>
              </label>
              {formData.attachments && formData.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {Array.from(formData.attachments).map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <FileText size={16} />
                      <span>{file.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-4 pt-4 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}