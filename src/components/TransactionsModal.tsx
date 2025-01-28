import React, { useState } from 'react';
import { X, Search, Filter, Calendar, DollarSign, ArrowUp, ArrowDown, Download, ChevronLeft, ChevronRight, FileText } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  property?: string;
  unit?: string;
  attachments?: number;
}

interface TransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
}

export default function TransactionsModal({ isOpen, onClose, transactions }: TransactionsModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [amountRange, setAmountRange] = useState({
    min: '',
    max: ''
  });
  const [selectedType, setSelectedType] = useState<'all' | 'income' | 'expense'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  // Filtrer les transactions
  const filteredTransactions = transactions.filter(transaction => {
    // Filtre de recherche
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.property && transaction.property.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filtre de type
    const matchesType = selectedType === 'all' || transaction.type === selectedType;

    // Filtre de date
    const matchesDate = (!dateRange.start || new Date(transaction.date) >= new Date(dateRange.start)) &&
                       (!dateRange.end || new Date(transaction.date) <= new Date(dateRange.end));

    // Filtre de montant
    const matchesAmount = (!amountRange.min || transaction.amount >= parseFloat(amountRange.min)) &&
                         (!amountRange.max || transaction.amount <= parseFloat(amountRange.max));

    return matchesSearch && matchesType && matchesDate && matchesAmount;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-hidden">
      <div className="bg-white dark:bg-gray-800 w-full h-full max-w-7xl max-h-screen flex flex-col">
        {/* En-tête */}
        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold dark:text-white">Transactions</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X size={20} className="dark:text-white" />
          </button>
        </div>

        {/* Filtres */}
        <div className="p-6 border-b dark:border-gray-700 space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <input
                  type="search"
                  placeholder="Rechercher une transaction..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-lg ${
                  selectedType === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 dark:text-white'
                }`}
              >
                Tout
              </button>
              <button
                onClick={() => setSelectedType('income')}
                className={`px-4 py-2 rounded-lg ${
                  selectedType === 'income'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 dark:text-white'
                }`}
              >
                Revenus
              </button>
              <button
                onClick={() => setSelectedType('expense')}
                className={`px-4 py-2 rounded-lg ${
                  selectedType === 'expense'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 dark:text-white'
                }`}
              >
                Dépenses
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-gray-400" />
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <span className="text-gray-500">à</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <DollarSign size={20} className="text-gray-400" />
              <input
                type="number"
                placeholder="Min"
                value={amountRange.min}
                onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
                className="p-2 border rounded-lg w-24 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <span className="text-gray-500">à</span>
              <input
                type="number"
                placeholder="Max"
                value={amountRange.max}
                onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
                className="p-2 border rounded-lg w-24 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-lg">
              <Download size={20} />
              <span>Exporter</span>
            </button>
          </div>
        </div>

        {/* Liste des transactions */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="text-left p-4 text-gray-600 dark:text-gray-400">Date</th>
                <th className="text-left p-4 text-gray-600 dark:text-gray-400">Description</th>
                <th className="text-left p-4 text-gray-600 dark:text-gray-400">Catégorie</th>
                <th className="text-left p-4 text-gray-600 dark:text-gray-400">Propriété</th>
                <th className="text-right p-4 text-gray-600 dark:text-gray-400">Montant</th>
                <th className="text-center p-4 text-gray-600 dark:text-gray-400">Documents</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {currentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-4 dark:text-white">
                    {new Date(transaction.date).toLocaleDateString('fr-CA')}
                  </td>
                  <td className="p-4 dark:text-white">{transaction.description}</td>
                  <td className="p-4 dark:text-white">{transaction.category}</td>
                  <td className="p-4 dark:text-gray-400">
                    {transaction.property}
                    {transaction.unit && <span className="text-sm ml-1">({transaction.unit})</span>}
                  </td>
                  <td className={`p-4 text-right font-medium ${
                    transaction.type === 'income'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{transaction.amount}$
                  </td>
                  <td className="p-4 text-center">
                    {transaction.attachments ? (
                      <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400">
                        <FileText size={16} />
                        <span>{transaction.attachments}</span>
                      </div>
                    ) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t dark:border-gray-700 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Affichage de {(currentPage - 1) * transactionsPerPage + 1} à {Math.min(currentPage * transactionsPerPage, filteredTransactions.length)} sur {filteredTransactions.length} transactions
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronLeft size={20} className="dark:text-white" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`w-8 h-8 rounded-lg ${
                  currentPage === number
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white'
                }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronRight size={20} className="dark:text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}