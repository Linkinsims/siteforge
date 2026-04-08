'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2, Copy, Check, Mail } from 'lucide-react';
import { Toaster } from 'sonner';

type AuthMode = 'login' | 'signup';
type UserRole = 'agency' | 'client';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

interface SignupFormData {
  firstName: string;
  lastName: string;
  agencyName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  terms: boolean;
}

const DEMO_CREDENTIALS = [
  { role: 'Agency Owner', email: 'marcus@siteforge.io', password: 'Agency2026!' },
  { role: 'Client', email: 'claire@hartwelllegal.com', password: 'Client2026!' },
];

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="p-1 rounded hover:bg-gray-100 transition-colors"
      title="Copy"
    >
      {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} className="text-gray-400" />}
    </button>
  );
}

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('agency');

  const loginForm = useForm<LoginFormData>({
    defaultValues: { email: '', password: '', remember: false },
  });

  const signupForm = useForm<SignupFormData>({
    defaultValues: { firstName: '', lastName: '', agencyName: '', email: '', password: '', confirmPassword: '', role: 'agency', terms: false },
  });

  const handleLogin = async (data: LoginFormData) => {
    // Backend integration: POST /api/auth/login
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const valid = DEMO_CREDENTIALS.some(
      (c) => c.email === data.email && c.password === data.password
    );

    if (!valid) {
      toast.error('Invalid credentials — use the demo accounts below to sign in');
      setIsLoading(false);
      return;
    }

    toast.success('Welcome back to SiteForge!');
    setTimeout(() => router.push('/projects-dashboard'), 800);
    setIsLoading(false);
  };

  const handleSignup = async (data: SignupFormData) => {
    // Backend integration: POST /api/auth/signup
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    toast.success('Account created! Redirecting to your dashboard…');
    setTimeout(() => router.push('/projects-dashboard'), 1000);
    setIsLoading(false);
  };

  const handleSocialAuth = async (provider: 'google' | 'github') => {
    // Backend integration: GET /api/auth/oauth/{provider}
    toast.info(`Redirecting to ${provider === 'google' ? 'Google' : 'GitHub'} authentication…`);
  };

  const autofillCredentials = (cred: typeof DEMO_CREDENTIALS[0]) => {
    loginForm.setValue('email', cred.email);
    loginForm.setValue('password', cred.password);
    toast.success(`Autofilled ${cred.role} credentials`);
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-[hsl(40,20%,98%)] min-h-screen lg:min-h-0">
      <Toaster position="bottom-right" richColors />
      <div className="w-full max-w-[420px]">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
          <div className="w-8 h-8 rounded-lg bg-[hsl(215,35%,14%)] flex items-center justify-center">
            <span className="text-xs font-bold text-amber-400">SF</span>
          </div>
          <span className="font-bold text-lg text-foreground">SiteForge</span>
        </div>

        {/* Mode toggle */}
        <div className="flex bg-secondary rounded-xl p-1 mb-8">
          {(['login', 'signup'] as AuthMode[]).map((m) => (
            <button
              key={`mode-${m}`}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                mode === m
                  ? 'bg-white text-foreground shadow-card'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {m === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-1">
            {mode === 'login' ? 'Welcome back' : 'Start building today'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {mode === 'login' ?'Sign in to your SiteForge workspace' :'Create your agency account — free for 14 days'}
          </p>
        </div>

        {/* Social auth */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            type="button"
            onClick={() => handleSocialAuth('google')}
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground bg-white hover:bg-secondary transition-all duration-150 active:scale-[0.98]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialAuth('github')}
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground bg-white hover:bg-secondary transition-all duration-150 active:scale-[0.98]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 48 48"
              className="text-gray-400"
            >
              <path
                fill="#333333"
                d="M24 9.55993V18.6599C14.6214 18.6599 7.98854 15.027 7.98854 7.39459C7.98854 3.53832 11.5266 0 15.3829 0C18.2392 0 21 2.7608 21 6.61111V9.55993"
              />
              <path
                fill="#4078C0"
                d="M26.5607 5.38281C26.5607 2.36047 24.2003 0 21 0C14.6954 0 8.56206 5.13328 8.56206 11.5556V18.6599C8.56206 24.0823 11.9253 27.4456 15.3829 27.4456C15.6834 27.4456 15.9671 27.3304 16.1266 27.1719L21 28.5607V36.5607C21 39.6504 23.3497 42 26.5607 42C29.7717 42 32.1214 39.6504 32.1214 36.5607V27.1719C32.2809 27.3304 32.5646 27.4456 32.8651 27.4456C33.1656 27.4456 33.4493 27.3304 33.6088 27.1719L38.4864 22.2943C38.4864 21.8338 38.4012 21.3886 38.2207 21.0081L33.6088 16.4062C33.4283 16.1257 33.3431 15.6805 33.3431 15.1001V11.5556C33.3431 10.9752 33.4283 10.5299 33.6088 10.2494L38.2207 5.64752C38.3012 5.46703 38.3864 5.30185 38.4864 5.12136L26.5607 5.38281Z"
              />
            </svg>
            GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <hr className="flex-1 border-border" />
          <span className="text-xs text-muted-foreground font-medium">or continue with email</span>
          <hr className="flex-1 border-border" />
        </div>

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="login-email">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="you@agency.com"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition-all duration-150 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                  loginForm.formState.errors.email ? 'border-red-400' : 'border-border'
                }`}
                {...loginForm.register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                })}
              />
              {loginForm.formState.errors.email && (
                <p className="mt-1 text-xs text-red-500">{loginForm.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-foreground" htmlFor="login-password">
                  Password
                </label>
                <button type="button" className="text-xs text-primary hover:underline font-medium">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`w-full px-3.5 py-2.5 pr-10 rounded-xl border text-sm bg-white transition-all duration-150 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                    loginForm.formState.errors.password ? 'border-red-400' : 'border-border'
                  }`}
                  {...loginForm.register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Minimum 6 characters' },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {loginForm.formState.errors.password && (
                <p className="mt-1 text-xs text-red-500">{loginForm.formState.errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-border accent-primary"
                {...loginForm.register('remember')}
              />
              <label htmlFor="remember" className="text-sm text-muted-foreground">
                Keep me signed in
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[hsl(215,35%,18%)] hover:bg-[hsl(215,35%,24%)] text-white text-sm font-semibold rounded-xl transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign In to SiteForge'
              )}
            </button>
          </form>
        )}

        {/* SIGNUP FORM */}
        {mode === 'signup' && (
          <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
            {/* Role selector */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                I am a…
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['agency', 'client'] as UserRole[]).map((role) => (
                  <button
                    key={`role-${role}`}
                    type="button"
                    onClick={() => {
                      setSelectedRole(role);
                      signupForm.setValue('role', role);
                    }}
                    className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-all duration-150 ${
                      selectedRole === role
                        ? 'border-primary bg-primary/5 text-primary' :'border-border text-muted-foreground hover:border-primary/40'
                    }`}
                  >
                    {role === 'agency' ? '🏢 Web Agency' : '👤 Client'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="firstName">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Marcus"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  {...signupForm.register('firstName', { required: 'Required' })}
                />
                {signupForm.formState.errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">{signupForm.formState.errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="lastName">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Reid"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  {...signupForm.register('lastName', { required: 'Required' })}
                />
                {signupForm.formState.errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">{signupForm.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>

            {selectedRole === 'agency' && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="agencyName">
                  Agency name
                </label>
                <input
                  id="agencyName"
                  type="text"
                  placeholder="Pixel & Co. Studio"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  {...signupForm.register('agencyName')}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="signup-email">
                Work email
              </label>
              <input
                id="signup-email"
                type="email"
                placeholder="you@agency.com"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                  signupForm.formState.errors.email ? 'border-red-400' : 'border-border'
                }`}
                {...signupForm.register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                })}
              />
              {signupForm.formState.errors.email && (
                <p className="mt-1 text-xs text-red-500">{signupForm.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="signup-password">
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-border text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  {...signupForm.register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Minimum 8 characters' },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {signupForm.formState.errors.password && (
                <p className="mt-1 text-xs text-red-500">{signupForm.formState.errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="confirmPassword">
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Repeat password"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-border text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  {...signupForm.register('confirmPassword', {
                    validate: (v) =>
                      v === signupForm.getValues('password') || 'Passwords do not match',
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {signupForm.formState.errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{signupForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-start gap-2">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 mt-0.5 rounded border-border accent-primary"
                {...signupForm.register('terms', { required: 'You must accept the terms' })}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                I agree to the{' '}
                <a href="#" className="text-primary hover:underline font-medium">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary hover:underline font-medium">Privacy Policy</a>
              </label>
            </div>
            {signupForm.formState.errors.terms && (
              <p className="text-xs text-red-500">{signupForm.formState.errors.terms.message}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[hsl(215,35%,18%)] hover:bg-[hsl(215,35%,24%)] text-white text-sm font-semibold rounded-xl transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating account…
                </>
              ) : (
                'Create SiteForge Account'
              )}
            </button>
          </form>
        )}

        {/* Demo Credentials */}
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
          <p className="text-xs font-semibold text-amber-800 mb-3 flex items-center gap-1.5">
            <Mail size={12} />
            Demo Accounts — click to autofill
          </p>
          <div className="space-y-2">
            {DEMO_CREDENTIALS.map((cred) => (
              <div
                key={`demo-${cred.role}`}
                className="flex items-center justify-between gap-2 bg-white rounded-lg px-3 py-2 border border-amber-100 cursor-pointer hover:border-amber-300 transition-colors"
                onClick={() => mode === 'login' && autofillCredentials(cred)}
              >
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-amber-700 uppercase tracking-wide">{cred.role}</p>
                  <p className="text-xs font-mono text-gray-600 truncate">{cred.email}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <CopyButton value={cred.email} />
                  <CopyButton value={cred.password} />
                </div>
              </div>
            ))}
          </div>
          {mode === 'signup' && (
            <p className="mt-2 text-[10px] text-amber-600">Switch to Sign In to autofill credentials</p>
          )}
        </div>

        {/* Switch mode link */}
        <p className="text-center text-sm text-muted-foreground mt-5">
          {mode === 'login' ? (
            <>
              No account yet?{' '}
              <button onClick={() => setMode('signup')} className="text-primary font-semibold hover:underline">
                Create one free
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={() => setMode('login')} className="text-primary font-semibold hover:underline">
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}