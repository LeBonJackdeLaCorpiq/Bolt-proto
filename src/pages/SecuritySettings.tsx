import React, { useState } from 'react';
import {
  Shield, Smartphone, Mail, QrCode, Key, Lock,
  AlertTriangle, CheckCircle2, Info, Eye, EyeOff,
  LogIn, Globe, Monitor, LayoutGrid
} from 'lucide-react';

interface SecuritySettings {
  twoFactorEnabled: boolean;
  twoFactorMethod: '2fa-app' | '2fa-email' | '2fa-sms' | null;
  socialLogins: {
    google: boolean;
    apple: boolean;
    microsoft: boolean;
  };
  lastPasswordChange: string;
  securityScore: number;
}

export default function SecuritySettings() {
  const [settings, setSettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    twoFactorMethod: null,
    socialLogins: {
      google: false,
      apple: false,
      microsoft: false
    },
    lastPasswordChange: '2024-02-15',
    securityScore: 65
  });

  const [showQRCode, setShowQRCode] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [setupStep, setSetupStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');

  const handleEnable2FA = (method: '2fa-app' | '2fa-email' | '2fa-sms') => {
    setSettings(prev => ({
      ...prev,
      twoFactorEnabled: true,
      twoFactorMethod: method
    }));
    setShowSetupModal(true);
    setSetupStep(1);
  };

  const handleDisable2FA = () => {
    setSettings(prev => ({
      ...prev,
      twoFactorEnabled: false,
      twoFactorMethod: null
    }));
  };

  const handleToggleSocialLogin = (provider: 'google' | 'apple' | 'microsoft') => {
    setSettings(prev => ({
      ...prev,
      socialLogins: {
        ...prev.socialLogins,
        [provider]: !prev.socialLogins[provider]
      }
    }));
  };

  const verifyAndComplete2FASetup = () => {
    if (verificationCode.length === 6) {
      setShowSetupModal(false);
      setVerificationCode('');
      setSetupStep(1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold">Paramètres de sécurité</h1>
        <p className="text-gray-600">Gérez la sécurité de votre compte et vos méthodes d'authentification</p>
      </div>

      {/* Score de sécurité */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Shield size={20} />
            Score de sécurité
          </h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            settings.securityScore >= 80 ? 'bg-green-100 text-green-700' :
            settings.securityScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {settings.securityScore}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${
              settings.securityScore >= 80 ? 'bg-green-500' :
              settings.securityScore >= 60 ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
            style={{ width: `${settings.securityScore}%` }}
          ></div>
        </div>
        <div className="mt-4 space-y-2">
          {!settings.twoFactorEnabled && (
            <div className="flex items-center gap-2 text-sm text-yellow-600">
              <AlertTriangle size={16} />
              <span>Activez l'authentification à deux facteurs pour améliorer votre sécurité</span>
            </div>
          )}
          {Object.values(settings.socialLogins).every(v => !v) && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Info size={16} />
              <span>Ajoutez des méthodes de connexion alternatives pour plus de flexibilité</span>
            </div>
          )}
        </div>
      </div>

      {/* Authentification à deux facteurs */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Key size={20} />
          Authentification à deux facteurs (2FA)
        </h2>
        
        <div className="space-y-4">
          {/* Application d'authentification */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <QrCode size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Application d'authentification</h3>
                <p className="text-sm text-gray-500">
                  Utilisez une application comme Google Authenticator
                </p>
              </div>
            </div>
            <button
              onClick={() => settings.twoFactorMethod === '2fa-app' 
                ? handleDisable2FA()
                : handleEnable2FA('2fa-app')
              }
              className={`px-4 py-2 rounded-lg ${
                settings.twoFactorMethod === '2fa-app'
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              {settings.twoFactorMethod === '2fa-app' ? 'Désactiver' : 'Activer'}
            </button>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Mail size={24} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-sm text-gray-500">
                  Recevez un code de vérification par email
                </p>
              </div>
            </div>
            <button
              onClick={() => settings.twoFactorMethod === '2fa-email'
                ? handleDisable2FA()
                : handleEnable2FA('2fa-email')
              }
              className={`px-4 py-2 rounded-lg ${
                settings.twoFactorMethod === '2fa-email'
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              {settings.twoFactorMethod === '2fa-email' ? 'Désactiver' : 'Activer'}
            </button>
          </div>

          {/* SMS */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <Smartphone size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">SMS</h3>
                <p className="text-sm text-gray-500">
                  Recevez un code de vérification par SMS
                </p>
              </div>
            </div>
            <button
              onClick={() => settings.twoFactorMethod === '2fa-sms'
                ? handleDisable2FA()
                : handleEnable2FA('2fa-sms')
              }
              className={`px-4 py-2 rounded-lg ${
                settings.twoFactorMethod === '2fa-sms'
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              {settings.twoFactorMethod === '2fa-sms' ? 'Désactiver' : 'Activer'}
            </button>
          </div>
        </div>
      </div>

      {/* Connexion sociale */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <LogIn size={20} />
          Connexion sociale
        </h2>
        
        <div className="space-y-4">
          {/* Google */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-50 rounded-lg">
                <Globe size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-medium">Google</h3>
                <p className="text-sm text-gray-500">
                  Connectez-vous avec votre compte Google
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggleSocialLogin('google')}
              className={`px-4 py-2 rounded-lg ${
                settings.socialLogins.google
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              {settings.socialLogins.google ? 'Déconnecter' : 'Connecter'}
            </button>
          </div>

          {/* Apple */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gray-900 rounded-lg">
                <Monitor size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-medium">Apple</h3>
                <p className="text-sm text-gray-500">
                  Connectez-vous avec votre compte Apple
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggleSocialLogin('apple')}
              className={`px-4 py-2 rounded-lg ${
                settings.socialLogins.apple
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              {settings.socialLogins.apple ? 'Déconnecter' : 'Connecter'}
            </button>
          </div>

          {/* Microsoft */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <LayoutGrid size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Microsoft</h3>
                <p className="text-sm text-gray-500">
                  Connectez-vous avec votre compte Microsoft
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggleSocialLogin('microsoft')}
              className={`px-4 py-2 rounded-lg ${
                settings.socialLogins.microsoft
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              {settings.socialLogins.microsoft ? 'Déconnecter' : 'Connecter'}
            </button>
          </div>
        </div>
      </div>

      {/* Modal de configuration 2FA */}
      {showSetupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Configuration de l'authentification à deux facteurs</h2>
            </div>
            
            <div className="p-6">
              {setupStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Info size={16} />
                    <span>Entrez votre mot de passe actuel pour continuer</span>
                  </div>
                  
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full p-3 pr-10 border rounded-lg"
                      placeholder="Mot de passe actuel"
                    />
                    <button
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  <button
                    onClick={() => setSetupStep(2)}
                    disabled={!currentPassword}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continuer
                  </button>
                </div>
              )}

              {setupStep === 2 && (
                <div className="space-y-4">
                  {settings.twoFactorMethod === '2fa-app' && (
                    <>
                      <div className="flex justify-center">
                        <div className="p-4 bg-gray-100 rounded-lg">
                          <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth://totp/Example:alice@google.com?secret=JBSWY3DPEHPK3PXP&issuer=Example"
                            alt="QR Code"
                            className="w-40 h-40"
                          />
                        </div>
                      </div>
                      <p className="text-sm text-center text-gray-600">
                        Scannez ce QR code avec votre application d'authentification
                      </p>
                    </>
                  )}

                  {settings.twoFactorMethod === '2fa-email' && (
                    <p className="text-sm text-center text-gray-600">
                      Un code de vérification a été envoyé à votre adresse email
                    </p>
                  )}

                  {settings.twoFactorMethod === '2fa-sms' && (
                    <p className="text-sm text-center text-gray-600">
                      Un code de vérification a été envoyé à votre numéro de téléphone
                    </p>
                  )}

                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5, 6].map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        className="w-12 h-12 text-center border rounded-lg text-xl"
                        value={verificationCode[index] || ''}
                        onChange={(e) => {
                          const newCode = verificationCode.split('');
                          newCode[index] = e.target.value;
                          setVerificationCode(newCode.join(''));
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={verifyAndComplete2FASetup}
                    disabled={verificationCode.length !== 6}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Vérifier et activer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}