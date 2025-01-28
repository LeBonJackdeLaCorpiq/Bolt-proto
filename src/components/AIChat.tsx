import React, { useState, useRef, useEffect } from 'react';
import { Bot, ChevronUp, Send, Paperclip, Image, Mic, Sparkles, MessageSquare, AlertTriangle, Clock, FileText, Mail } from 'lucide-react';

interface AIChatProps {
  position?: 'center' | 'right';
}

interface Message {
  type: 'assistant' | 'user';
  content: string;
  actions?: {
    type: 'buttons';
    options: { label: string; value: string; variant?: 'primary' | 'secondary' }[];
  };
  isEmail?: boolean;
}

function AIChat({ position = 'right' }: AIChatProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'assistant',
      content: "Bonjour! Je suis votre assistant IA. Comment puis-je vous aider aujourd'hui?"
    },
    {
      type: 'assistant',
      content: "⚠️ J'ai détecté que le locataire Marc Dupont du 123 rue de Paris a un retard de paiement de 5 jours. Souhaitez-vous que je vous aide à préparer un courriel recommandé via Pronotif?",
      actions: {
        type: 'buttons',
        options: [
          { label: 'Envoyer le rappel', value: 'send_reminder', variant: 'primary' },
          { label: 'Attendre quelques jours', value: 'wait', variant: 'secondary' }
        ]
      }
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: message }]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response for "Oui"
    if (message.toLowerCase().includes('oui')) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'assistant',
          content: "✅ Le courriel recommandé a été envoyé avec succès via Pronotif. Vous recevrez une confirmation de lecture dès que M. Dupont aura ouvert le courriel. Je continuerai à suivre la situation et vous alerterai si aucune action n'est prise dans les 5 prochains jours."
        }]);
        setIsTyping(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleAction = (value: string) => {
    if (value === 'send_reminder') {
      setMessages(prev => [...prev, {
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
          { label: 'Envoyer via Pronotif', value: 'send_email', variant: 'primary' },
          { label: 'Modifier', value: 'edit_email', variant: 'secondary' }
        ]
      }]);
    } else if (value === 'wait') {
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: "D'accord, je programmerai un rappel dans 3 jours si le paiement n'est toujours pas reçu. Je continuerai à surveiller la situation."
      }]);
    } else if (value === 'send_email') {
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: "✅ Le courriel recommandé a été envoyé avec succès via Pronotif. Vous recevrez une confirmation de lecture dès que M. Dupont aura ouvert le courriel. Je continuerai à suivre la situation et vous alerterai si aucune action n'est prise dans les 5 prochains jours."
      }]);
    }
  };

  return (
    <div 
      className={`fixed bottom-0 ${position === 'center' ? 'left-1/2 -translate-x-1/2' : 'right-8'} 
        w-[400px] bg-white dark:bg-gray-800 rounded-t-xl shadow-lg transition-all duration-300 
        ${isExpanded ? 'h-[600px]' : 'h-14'} z-[9999]`}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer bg-blue-600 text-white rounded-t-xl"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <span className="font-medium">Assistant IA</span>
            {isTyping && (
              <span className="text-xs text-blue-100 block">est en train d'écrire...</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/10 rounded-full">
            <Sparkles size={16} className="text-white" />
          </button>
          <ChevronUp 
            size={20} 
            className={`text-white transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Messages Container */}
          <div className="flex-1 p-4 h-[480px] overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-2 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.type === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-blue-600 dark:text-blue-400" />
                    </div>
                  )}
                  <div className="space-y-3 max-w-[85%]">
                    <div className={`p-4 rounded-lg ${
                      msg.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : msg.isEmail
                        ? 'bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 border shadow-sm'
                        : 'bg-white dark:bg-gray-800 shadow-sm'
                    } ${msg.isEmail ? 'font-mono text-sm dark:text-gray-300' : ''}`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    {msg.actions?.type === 'buttons' && (
                      <div className="flex flex-wrap gap-2">
                        {msg.actions.options.map((option, optionIndex) => (
                          <button
                            key={optionIndex}
                            onClick={() => handleAction(option.value)}
                            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                              option.variant === 'primary'
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                            }`}
                          >
                            {option.label}
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
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Écrivez votre message..."
                  className="w-full p-3 pr-10 border dark:border-gray-700 rounded-lg resize-none max-h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  rows={1}
                  style={{ minHeight: '44px' }}
                />
                <button 
                  onClick={handleSendMessage}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors ${
                    message.trim() 
                      ? 'text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20' 
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!message.trim()}
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Paperclip size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Image size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Mic size={20} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AIChat;