import React, { useState } from 'react';
import { Building, DollarSign, Calculator, TrendingUp, Percent, Info } from 'lucide-react';

interface Property {
  id: string;
  name: string;
  address: string;
  units: Unit[];
}

interface Unit {
  id: string;
  name: string;
  currentRent?: number;
}

export default function ProfitabilityCalculator() {
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [purchasePrice, setPurchasePrice] = useState<string>('');
  const [monthlyRent, setMonthlyRent] = useState<string>('');
  const [expenses, setExpenses] = useState({
    taxes: '',
    insurance: '',
    maintenance: '',
    utilities: '',
    other: ''
  });

  // Données simulées
  const properties: Property[] = [
    {
      id: '1',
      name: '123 rue de Paris',
      address: 'Montréal, QC',
      units: [
        { id: '1-1', name: 'Apt 1A', currentRent: 1200 },
        { id: '1-2', name: 'Apt 1B', currentRent: 1300 }
      ]
    },
    {
      id: '2',
      name: '45 av. Victor Hugo',
      address: 'Laval, QC',
      units: [
        { id: '2-1', name: 'Apt 2A', currentRent: 1100 },
        { id: '2-2', name: 'Apt 2B', currentRent: 1250 }
      ]
    }
  ];

  const handleUnitSelect = (unitId: string) => {
    setSelectedUnit(unitId);
    const unit = properties
      .flatMap(p => p.units)
      .find(u => u.id === unitId);
    
    if (unit?.currentRent) {
      setMonthlyRent(unit.currentRent.toString());
    }
  };

  const calculateMetrics = () => {
    const price = Number(purchasePrice) || 0;
    const rent = Number(monthlyRent) || 0;
    const totalExpenses = Object.values(expenses).reduce(
      (sum, value) => sum + (Number(value) || 0),
      0
    );

    const annualRent = rent * 12;
    const annualExpenses = totalExpenses * 12;
    const netIncome = annualRent - annualExpenses;
    const roi = price > 0 ? (netIncome / price) * 100 : 0;
    const cashFlow = rent - totalExpenses;

    return {
      roi: roi.toFixed(2),
      cashFlow: cashFlow.toFixed(2),
      netIncome: netIncome.toFixed(2)
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Évaluateur de rentabilité</h1>
        <p className="text-gray-600">Analysez la rentabilité de vos unités locatives</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulaire */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sélection de l'unité */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Sélection de l'unité</h2>
            <div className="space-y-4">
              {properties.map((property) => (
                <div key={property.id} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Building size={20} className="text-gray-400" />
                    <h3 className="font-medium">{property.name}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {property.units.map((unit) => (
                      <button
                        key={unit.id}
                        onClick={() => handleUnitSelect(unit.id)}
                        className={`p-3 rounded-lg border text-left transition-colors ${
                          selectedUnit === unit.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <p className="font-medium">{unit.name}</p>
                        {unit.currentRent && (
                          <p className="text-sm text-gray-500">
                            Loyer actuel: {unit.currentRent}$/mois
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Données financières */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Données financières</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix d'achat
                </label>
                <div className="relative">
                  <DollarSign size={20} className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    className="pl-10 w-full p-2 border rounded-lg"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loyer mensuel
                </label>
                <div className="relative">
                  <DollarSign size={20} className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="number"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(e.target.value)}
                    className="pl-10 w-full p-2 border rounded-lg"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dépenses mensuelles */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Dépenses mensuelles</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Taxes municipales et scolaires
                </label>
                <div className="relative">
                  <DollarSign size={20} className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="number"
                    value={expenses.taxes}
                    onChange={(e) => setExpenses({ ...expenses, taxes: e.target.value })}
                    className="pl-10 w-full p-2 border rounded-lg"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assurances
                </label>
                <div className="relative">
                  <DollarSign size={20} className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="number"
                    value={expenses.insurance}
                    onChange={(e) => setExpenses({ ...expenses, insurance: e.target.value })}
                    className="pl-10 w-full p-2 border rounded-lg"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Entretien et réparations
                </label>
                <div className="relative">
                  <DollarSign size={20} className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="number"
                    value={expenses.maintenance}
                    onChange={(e) => setExpenses({ ...expenses, maintenance: e.target.value })}
                    className="pl-10 w-full p-2 border rounded-lg"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Services publics
                </label>
                <div className="relative">
                  <DollarSign size={20} className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="number"
                    value={expenses.utilities}
                    onChange={(e) => setExpenses({ ...expenses, utilities: e.target.value })}
                    className="pl-10 w-full p-2 border rounded-lg"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Autres dépenses
                </label>
                <div className="relative">
                  <DollarSign size={20} className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="number"
                    value={expenses.other}
                    onChange={(e) => setExpenses({ ...expenses, other: e.target.value })}
                    className="pl-10 w-full p-2 border rounded-lg"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Résultats</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={20} className="text-blue-500" />
                    <span className="font-medium">ROI annuel</span>
                  </div>
                  <Info size={16} className="text-gray-400" />
                </div>
                <p className="text-2xl font-bold">{metrics.roi}%</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign size={20} className="text-green-500" />
                    <span className="font-medium">Flux de trésorerie mensuel</span>
                  </div>
                  <Info size={16} className="text-gray-400" />
                </div>
                <p className="text-2xl font-bold">{metrics.cashFlow}$</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calculator size={20} className="text-purple-500" />
                    <span className="font-medium">Revenu net annuel</span>
                  </div>
                  <Info size={16} className="text-gray-400" />
                </div>
                <p className="text-2xl font-bold">{metrics.netIncome}$</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}