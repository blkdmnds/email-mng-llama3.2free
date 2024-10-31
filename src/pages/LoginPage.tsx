import React, { useState } from 'react';
import { Mail, ArrowRight, Loader2, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { IMAPConfig } from '../services/email';
import { toast } from 'sonner';
import Header from '../components/Header';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginWithImap } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'oauth' | 'imap'>('oauth');
  const [imapConfig, setImapConfig] = useState<IMAPConfig>({
    email: '',
    password: '',
    imapHost: '',
    imapPort: 993,
    smtpHost: '',
    smtpPort: 465,
    secure: true
  });

  const handleImapSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);
      await loginWithImap(imapConfig);
      navigate('/dashboard');
    } catch (error) {
      console.error('IMAP login failed:', error);
      toast.error('Failed to connect. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = () => {
    // Implement OAuth login
    toast.error('OAuth login is not implemented yet');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
      <Header transparent />

      <main className="pt-16">
        <div className="max-w-md mx-auto px-4 py-16">
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-white/80">Sign in to manage your inbox with AI</p>
            </div>

            <div className="space-y-6">
              {/* Login Method Selector */}
              <div className="flex rounded-xl bg-white/5 p-1">
                <button
                  onClick={() => setLoginMethod('oauth')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    loginMethod === 'oauth'
                      ? 'bg-white text-purple-600'
                      : 'text-white hover:bg-white/5'
                  }`}
                >
                  OAuth
                </button>
                <button
                  onClick={() => setLoginMethod('imap')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    loginMethod === 'imap'
                      ? 'bg-white text-purple-600'
                      : 'text-white hover:bg-white/5'
                  }`}
                >
                  IMAP/SMTP
                </button>
              </div>

              {loginMethod === 'oauth' ? (
                <div className="space-y-4">
                  <button
                    onClick={handleOAuthLogin}
                    className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt="Google"
                      className="w-5 h-5 mr-2"
                    />
                    Continue with Google
                  </button>
                  <button
                    onClick={handleOAuthLogin}
                    className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/microsoft.svg"
                      alt="Microsoft"
                      className="w-5 h-5 mr-2"
                    />
                    Continue with Microsoft
                  </button>
                </div>
              ) : (
                <form onSubmit={handleImapSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={imapConfig.email}
                      onChange={(e) =>
                        setImapConfig({ ...imapConfig, email: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white/20 focus:border-transparent"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={imapConfig.password}
                      onChange={(e) =>
                        setImapConfig({ ...imapConfig, password: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white/20 focus:border-transparent"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        IMAP Host
                      </label>
                      <input
                        type="text"
                        value={imapConfig.imapHost}
                        onChange={(e) =>
                          setImapConfig({ ...imapConfig, imapHost: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white/20 focus:border-transparent"
                        placeholder="imap.example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        IMAP Port
                      </label>
                      <input
                        type="number"
                        value={imapConfig.imapPort}
                        onChange={(e) =>
                          setImapConfig({
                            ...imapConfig,
                            imapPort: parseInt(e.target.value)
                          })
                        }
                        className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white/20 focus:border-transparent"
                        placeholder="993"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        SMTP Host
                      </label>
                      <input
                        type="text"
                        value={imapConfig.smtpHost}
                        onChange={(e) =>
                          setImapConfig({ ...imapConfig, smtpHost: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white/20 focus:border-transparent"
                        placeholder="smtp.example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        SMTP Port
                      </label>
                      <input
                        type="number"
                        value={imapConfig.smtpPort}
                        onChange={(e) =>
                          setImapConfig({
                            ...imapConfig,
                            smtpPort: parseInt(e.target.value)
                          })
                        }
                        className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white/20 focus:border-transparent"
                        placeholder="465"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-white text-purple-600 hover:bg-purple-50 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        Connect
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;