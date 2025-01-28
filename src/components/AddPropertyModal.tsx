import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Crop, ChevronDown, Plus, DollarSign } from 'lucide-react';
import { Loader } from '@googlemaps/js-api-loader';
import Cropper from 'react-easy-crop';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Property {
  address: string;
  name: string;
  image: string;
  annualExpenses?: AnnualExpense[];
}

interface AnnualExpense {
  type: string;
  amount: number;
}

const SUGGESTED_EXPENSES = [
  'Taxe municipale',
  'Taxe scolaire',
  'Assurance',
  'Entretien',
  'Autre'
];

const AddPropertyModal: React.FC<AddPropertyModalProps> = ({ isOpen, onClose }) => {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [streetViewImage, setStreetViewImage] = useState('');
  const [customImage, setCustomImage] = useState('');
  const [useCustomImage, setUseCustomImage] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showExpenseDropdown, setShowExpenseDropdown] = useState(false);
  const [annualExpenses, setAnnualExpenses] = useState<AnnualExpense[]>([]);
  const [newExpenseType, setNewExpenseType] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const streetViewRef = useRef(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowExpenseDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const loader = new Loader({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      const input = document.getElementById('address-input') as HTMLInputElement;
      autocompleteRef.current = new google.maps.places.Autocomplete(input, {
        types: ['address'],
        componentRestrictions: { country: 'CA' }
      });

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace();
        if (place.formatted_address) {
          setAddress(place.formatted_address);
          setName(place.name || '');
          
          const location = place.geometry.location;
          const streetViewService = new google.maps.StreetViewService();
          
          streetViewService.getPanorama({
            location: location,
            radius: 50
          }, (data, status) => {
            if (status === 'OK') {
              const imageUrl = `https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${location.lat()},${location.lng()}&key=YOUR_GOOGLE_MAPS_API_KEY`;
              setStreetViewImage(imageUrl);
            }
          });
        }
      });
    });
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleAddExpense = () => {
    if (newExpenseType && newExpenseAmount) {
      setAnnualExpenses([
        ...annualExpenses,
        {
          type: newExpenseType,
          amount: parseFloat(newExpenseAmount)
        }
      ]);
      setNewExpenseType('');
      setNewExpenseAmount('');
      setShowExpenseDropdown(false);
    }
  };

  const handleRemoveExpense = (index: number) => {
    setAnnualExpenses(annualExpenses.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const property: Property = {
      address,
      name,
      image: useCustomImage ? customImage : streetViewImage,
      annualExpenses: annualExpenses.length > 0 ? annualExpenses : undefined
    };
    console.log('Nouvelle propriété:', property);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Ajouter une Propriété</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">DÉTAILS DE LA PROPRIÉTÉ</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address-input" className="block text-sm font-medium text-gray-700 mb-1">
                      * Adresse
                    </label>
                    <input
                      id="address-input"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Entrez l'adresse..."
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="name-input" className="block text-sm font-medium text-gray-700 mb-1">
                      * Nom
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Nom de la propriété"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Image de la propriété</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Utiliser l'image</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={useCustomImage}
                        onChange={(e) => setUseCustomImage(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {showCropper && customImage ? (
                  <div className="relative h-[400px] mb-4">
                    <Cropper
                      image={customImage}
                      crop={crop}
                      zoom={zoom}
                      aspect={3/2}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>
                ) : (
                  <div className="relative mb-4">
                    {streetViewImage ? (
                      <img
                        src={streetViewImage}
                        alt="Street View"
                        className="w-full h-[400px] object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">Aucune image disponible</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end gap-4">
                  <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
                    <Upload size={20} />
                    <span>Utiliser ma propre image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Section des dépenses annuelles */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Dépenses annuelles (optionnel)</h3>
                
                {/* Liste des dépenses ajoutées */}
                {annualExpenses.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {annualExpenses.map((expense, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <DollarSign size={20} className="text-gray-400" />
                          <span className="font-medium">{expense.type}</span>
                          <span className="text-gray-500">${expense.amount.toLocaleString()}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveExpense(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Formulaire d'ajout de dépense */}
                <div className="relative" ref={dropdownRef}>
                  <div className="flex gap-4 mb-2">
                    <div className="flex-1 relative">
                      <div
                        onClick={() => setShowExpenseDropdown(!showExpenseDropdown)}
                        className="w-full p-3 border rounded-lg cursor-pointer flex items-center justify-between"
                      >
                        <span className={newExpenseType ? 'text-gray-900' : 'text-gray-400'}>
                          {newExpenseType || 'Sélectionner le type de dépense'}
                        </span>
                        <ChevronDown size={20} className="text-gray-400" />
                      </div>
                      
                      {showExpenseDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                          <div className="py-1">
                            {SUGGESTED_EXPENSES.map((expense) => (
                              <div
                                key={expense}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  setNewExpenseType(expense);
                                  setShowExpenseDropdown(false);
                                }}
                              >
                                {expense}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="w-48">
                      <div className="relative">
                        <DollarSign size={20} className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="number"
                          value={newExpenseAmount}
                          onChange={(e) => setNewExpenseAmount(e.target.value)}
                          placeholder="Montant"
                          className="w-full pl-10 p-3 border rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddExpense}
                    disabled={!newExpenseType || !newExpenseAmount}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                  >
                    <Plus size={20} />
                    <span>Ajouter une dépense</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                ANNULER
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
              >
                AJOUTER PROPRIÉTÉ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyModal;