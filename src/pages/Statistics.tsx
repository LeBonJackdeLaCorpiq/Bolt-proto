import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  Calendar, DollarSign, TrendingUp, AlertCircle, Download, Building, Filter, 
  Search, Check, Share2, Printer, FileText, ChevronRight, Settings, 
  ArrowUpRight, ArrowDownRight, Percent, Clock, Users, Home, Wrench,
  AlertTriangle, CheckCircle2, BellRing, FileSpreadsheet
} from 'lucide-react';

interface DateRange {
  start: string;
  end: string;
}

interface Property {
  id: string;
  name: string;
  address: string;
}

export default function Statistics() {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: '2024-01-01',
    end: '2024-03-15'
  });
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [showPropertyFilter, setShowPropertyFilter] = useState(false);
  const [searchProperty, setSearchProperty] = useState('');

  // Données simulées des propriétés
  const properties: Property[] = [
    { id: '1', name: '123 rue de Paris', address: 'Montréal' },
    { id: '2', name: '45 av. Victor Hugo', address: 'Laval' },
    { id: '3', name: '8 rue du Commerce', address: 'Québec' }
  ];

  // Données simulées pour les graphiques
  const revenueData = [
    { month: 'Jan', revenue: 15000, expenses: 3000, net: 12000 },
    { month: 'Fév', revenue: 15200, expenses: 3200, net: 12000 },
    { month: 'Mar', revenue: 15100, expenses: 3100, net: 12000 }
  ];

  const occupancyRate = [
    { name: 'Occupé', value: 42 },
    { name: 'Vacant', value: 3 }
  ];

  const paymentStatus = [
    { name: 'À temps', value: 38 },
    { name: 'Retard < 15j', value: 3 },
    { name: 'Retard > 15j', value: 1 }
  ];

  const propertyPerformance = [
    { property: '123 rue Paris', revenue: 5000, expenses: 1000, roi: 8.2 },
    { property: '45 av Hugo', revenue: 4200, expenses: 800, roi: 7.8 },
    { property: '8 Commerce', revenue: 6000, expenses: 1200, roi: 8.5 }
  ];

  const filteredProperties = properties.filter(property => 
    property.name.toLowerCase().includes(searchProperty.toLowerCase()) ||
    property.address.toLowerCase().includes(searchProperty.toLowerCase())
  );

  const toggleProperty = (propertyId: string) => {
    setSelectedProperties(prev => 
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Statistiques</h1>
          <p className="text-gray-600">Analysez la performance de votre portefeuille immobilier</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-gray-400" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="border rounded-lg px-3 py-2"
            />
            <span>à</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="border rounded-lg px-3 py-2"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowPropertyFilter(!showPropertyFilter)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <Building size={20} />
              <span>Immeubles</span>
              {selectedProperties.length > 0 && (
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {selectedProperties.length}
                </span>
              )}
            </button>

            {showPropertyFilter && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-10">
                <div className="p-4">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    <input
                      type="search"
                      placeholder="Rechercher un immeuble..."
                      value={searchProperty}
                      onChange={(e) => setSearchProperty(e.target.value)}
                      className="pl-10 w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {filteredProperties.map((property) => (
                      <label
                        key={property.id}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <div>
                          <p className="font-medium">{property.name}</p>
                          <p className="text-sm text-gray-500">{property.address}</p>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={selectedProperties.includes(property.id)}
                            onChange={() => toggleProperty(property.id)}
                            className="w-5 h-5 border-2 rounded text-blue-600"
                          />
                          {selectedProperties.includes(property.id) && (
                            <Check size={16} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" />
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                  {selectedProperties.length > 0 && (
                    <div className="mt-4 pt-4 border-t flex justify-between">
                      <button
                        onClick={() => setSelectedProperties([])}
                        className="text-sm text-gray-600 hover:text-gray-800"
                      >
                        Tout désélectionner
                      </button>
                      <span className="text-sm text-gray-600">
                        {selectedProperties.length} sélectionné{selectedProperties.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <Download size={20} />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <DollarSign className="text-green-600" size={24} />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
          <h3 className="text-gray-600 mb-2">Revenu mensuel</h3>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold">15 100 $</p>
            <div className="flex items-center gap-1 text-green-500">
              <ArrowUpRight size={20} />
              <span>+2.3%</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">vs. mois dernier</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
          <h3 className="text-gray-600 mb-2">ROI moyen</h3>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold">8.2%</p>
            <div className="flex items-center gap-1 text-green-500">
              <ArrowUpRight size={20} />
              <span>+0.4%</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">vs. année dernière</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Wrench className="text-yellow-600" size={24} />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
          <h3 className="text-gray-600 mb-2">Dépenses maintenance</h3>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold">2 100 $</p>
            <div className="flex items-center gap-1 text-green-500">
              <ArrowDownRight size={20} />
              <span>-8.7%</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">vs. mois dernier</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <AlertTriangle className="text-purple-600" size={24} />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
          <h3 className="text-gray-600 mb-2">Retards de paiement</h3>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold">4</p>
            <div className="flex items-center gap-1 text-red-500">
              <ArrowUpRight size={20} />
              <span>+1</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">vs. mois dernier</div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenus et dépenses */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Revenus et dépenses</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#0088FE" name="Revenus" />
                <Line type="monotone" dataKey="expenses" stroke="#FF8042" name="Dépenses" />
                <Line type="monotone" dataKey="net" stroke="#00C49F" name="Net" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance par propriété */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Performance par propriété</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={propertyPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="property" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#0088FE" name="Revenus" />
                <Bar dataKey="expenses" fill="#FF8042" name="Dépenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Taux d'occupation */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Taux d'occupation</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupancyRate}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {occupancyRate.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#0088FE', '#FF8042'][index % 2]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* État des paiements */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">État des paiements</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#00C49F', '#FFBB28', '#FF8042'][index % 3]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}