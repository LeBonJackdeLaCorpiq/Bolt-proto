import React, { useState } from 'react';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle
} from 'react-resizable-panels';
import { 
  Plus, Bot, ChevronRight, Send, Paperclip, Image, Mic, Sparkles, MessageSquare, AlertTriangle, Clock, FileText, Mail,
  TrendingUp, ArrowUpRight, ArrowDownRight, Percent, Users, Home, Wrench, Shield, Zap, Target, BrainCircuit
} from 'lucide-react';

export default function Dashboard() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'assistant',
      content: "Bonjour! Je suis votre assistant IA. Comment puis-je vous aider aujourd'hui?"
    },
    {
      type: 'assistant',
      content: "⚠️ J'ai détecté que le locataire Marc Dupont du 123 rue de Paris a un retard de paiement de 5 jours. Souhaitez-vous que je vous aide à préparer un courriel recommandé via Pronotif?",
      actions: [
        { label: 'Oui, préparer le courriel', value: 'prepare_email' },
        { label: 'Non, attendre encore', value: 'wait' }
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const stats = [
    { title: 'Biens gérés', value: '47', change: '+2' },
    { title: 'Taux d\'occupation', value: '94%', change: '+1.2%' },
    { title: 'Loyers impayés', value: '3', change: '-1' },
    { title: 'Visites prévues', value: '12', change: '+4' }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setChatMessages(prev => [...prev, { type: 'user', content: message }]);
    setMessage('');
    setIsTyping(true);

    setTimeout(() => {
      if (message.toLowerCase().includes('oui') || message.toLowerCase().includes('préparer')) {
        setChatMessages(prev => [...prev, {
          type: 'assistant',
          content: `J'ai préparé un projet de courriel recommandé pour M. Dupont :

Objet : Avis de retard de paiement de loyer - 123 rue de Paris

Cher M. Dupont,

Nous constatons que le paiement de votre loyer du mois en cours, d'un montant de 1 200$, n'a pas été reçu à la date d'échéance prévue dans votre bail (1er du mois).

Conformément à l'article 1904 du Code civil du Québec, nous vous prions de bien vouloir régulariser cette situation dans les plus brefs délais.

En l'absence de paiement sous 5 jours ouvrables, nous serons dans l'obligation d'entamer des procédures légales auprès du Tribunal administratif du logement.

Pour effectuer votre paiement ou discuter d'un arrangement, veuillez nous contacter dans les plus brefs délais.

Cordialement,
Paul Martin
Gestionnaire immobilier`,
          isEmail: true,
          actions: [
            { label: 'Envoyer via Pronotif', value: 'send_email' },
            { label: 'Modifier', value: 'edit_email' }
          ]
        }]);
      } else if (message.toLowerCase().includes('envoyer')) {
        setChatMessages(prev => [...prev, {
          type: 'assistant',
          content: "✅ Le courriel recommandé a été envoyé avec succès via Pronotif. Vous recevrez une confirmation de lecture dès que M. Dupont aura ouvert le courriel. Je continuerai à suivre la situation et vous alerterai si aucune action n'est prise dans les 5 prochains jours."
        }]);
      } else if (message.toLowerCase().includes('attendre')) {
        setChatMessages(prev => [...prev, {
          type: 'assistant',
          content: "D'accord, je programmerai un rappel dans 3 jours si le paiement n'est toujours pas reçu. Je continuerai à surveiller la situation."
        }]);
      } else {
        setChatMessages(prev => [...prev, {
          type: 'assistant',
          content: "Je n'ai pas bien compris votre demande. Souhaitez-vous que je vous aide à préparer un courriel recommandé pour M. Dupont ?",
          actions: [
            { label: 'Oui, préparer le courriel', value: 'prepare_email' },
            { label: 'Non, attendre encore', value: 'wait' }
          ]
        }]);
      }
      setIsTyping(false);
    }, 1000);
  };

  const handleAction = (value: string) => {
    switch (value) {
      case 'prepare_email':
        setChatMessages(prev => [...prev, {
          type: 'assistant',
          content: `J'ai préparé un projet de courriel recommandé pour M. Dupont :

Objet : Avis de retard de paiement de loyer - 123 rue de Paris

Cher M. Dupont,

Nous constatons que le paiement de votre loyer du mois en cours, d'un montant de 1 200$, n'a pas été reçu à la date d'échéance prévue dans votre bail (1er du mois).

Conformément à l'article 1904 du Code civil du Québec, nous vous prions de bien vouloir régulariser cette situation dans les plus brefs délais.

En l'absence de paiement sous 5 jours ouvrables, nous serons dans l'obligation d'entamer des procédures légales auprès du Tribunal administratif du logement.

Pour effectuer votre paiement ou discuter d'un arrangement, veuillez nous contacter dans les plus brefs délais.

Cordialement,
Paul Martin
Gestionnaire immobilier`,
          isEmail: true,
          actions: [
            { label: 'Envoyer via Pronotif', value: 'send_email' },
            { label: 'Modifier', value: 'edit_email' }
          ]
        }]);
        break;

      case 'send_email':
        setChatMessages(prev => [...prev, {
          type: 'assistant',
          content: "✅ Le courriel recommandé a été envoyé avec succès via Pronotif. Vous recevrez une confirmation de lecture dès que M. Dupont aura ouvert le courriel. Je continuerai à suivre la situation et vous alerterai si aucune action n'est prise dans les 5 prochains jours."
        }]);
        break;

      case 'wait':
        setChatMessages(prev => [...prev, {
          type: 'assistant',
          content: "D'accord, je programmerai un rappel dans 3 jours si le paiement n'est toujours pas reçu. Je continuerai à surveiller la situation."
        }]);
        break;
    }
  };

  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={65} minSize={40}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm dark:bg-gray-800">
              <h3 className="text-gray-600 dark:text-gray-400 mb-2">{stat.title}</h3>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold dark:text-white">{stat.value}</span>
                <span className={`text-sm ${
                  stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden dark:bg-gray-800">
          <div className="p-6 border-b dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Bot size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold dark:text-white">Assistant IA</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Votre assistant personnel</p>
              </div>
            </div>
          </div>

          <div className="p-6 max-h-[400px] overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="space-y-4">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-2 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.type === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Bot size={16} className="text-blue-600 dark:text-blue-400" />
                    </div>
                  )}
                  <div className="space-y-3 max-w-[85%]">
                    <div className={`p-4 rounded-lg ${
                      msg.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : msg.isEmail
                        ? 'bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 border shadow-sm font-mono text-sm dark:text-gray-300'
                        : 'bg-white dark:bg-gray-800 shadow-sm dark:text-gray-300'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    {msg.actions && (
                      <div className="flex flex-wrap gap-2">
                        {msg.actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={() => handleAction(action.value)}
                            className={`px-4 py-2 rounded-lg text-sm ${
                              action.value === 'send_email'
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                            }`}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Bot size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm inline-block">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-t dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Posez votre question à l'assistant..."
                  className="w-full p-4 pr-12 border-2 border-gray-200 dark:border-gray-700 rounded-xl resize-none bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm dark:text-white"
                  rows={1}
                />
                <button 
                  onClick={handleSendMessage}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${
                    message.trim() 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700'
                  }`}
                  disabled={!message.trim()}
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="flex gap-2">
                <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  <Paperclip size={20} />
                </button>
                <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  <Image size={20} />
                </button>
                <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  <Mic size={20} />
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
              Appuyez sur Entrée pour envoyer votre message
            </p>
          </div>
        </div>
      </Panel>

      <PanelResizeHandle className="panel-resize-handle" />

      <Panel defaultSize={35} minSize={25}>
        <div className="space-y-6">
          {/* Messages et demandes */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold dark:text-white">Messages et demandes</h2>
              <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                Voir tous les messages
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg flex-shrink-0">
                  <AlertTriangle size={20} className="text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium dark:text-white">Marc Dupont</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">123 rue de Paris, Apt 2A</p>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">Il y a 1h</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    Problème de chauffage dans la salle de bain
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex-shrink-0">
                  <FileText size={20} className="text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium dark:text-white">Sophie Tremblay</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">45 av. Victor Hugo, Apt 3B</p>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">Il y a 3h</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    Demande de renouvellement de bail
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg flex-shrink-0">
                  <Mail size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium dark:text-white">Jean Lavoie</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">8 rue du Commerce, Apt 1C</p>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">Hier</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    Question concernant le paiement du loyer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Prochaines actions */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-6 dark:text-white">Prochaines actions</h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex-1">
                  <h3 className="font-semibold dark:text-white">Visite appartement</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">123 rue de Paris</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">14:00</span>
              </div>
              <div className="flex items-center p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex-1">
                  <h3 className="font-semibold dark:text-white">Signature bail</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">45 av. Victor Hugo</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">16:30</span>
              </div>
              <div className="flex items-center p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex-1">
                  <h3 className="font-semibold dark:text-white">État des lieux</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">8 rue du Commerce</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Demain 10:00</span>
              </div>
            </div>
          </div>

          {/* Assistant vocal (ElevenLabs Convai Widget) */}
          <div className="bg-white p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
              <Bot size={20} className="text-purple-600 dark:text-purple-400" />
              Assistant vocal
            </h3>
            <div id="elevenlabs-widget-container">
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 mb-2">
                  <Bot size={20} />
                  <span className="font-medium">Assistant IA</span>
                </div>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  L'assistant vocal est en cours de chargement. Si le widget ne s'affiche pas, vous pouvez toujours utiliser l'assistant textuel.
                </p>
              </div>
              <elevenlabs-convai agent-id="6UlhULUHrZrUfq5YZdHF"></elevenlabs-convai>
            </div>
          </div>
        </div>
      </Panel>
    </PanelGroup>
  );
}