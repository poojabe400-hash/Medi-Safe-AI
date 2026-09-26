'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState(' ');
  const [facilityId, setFacilityId] = useState('DIST-04-HOSP-CENTRAL');
  const [department, setDepartment] = useState('Central Regional Medical Store');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

 const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();

  if (!email.trim()) {
    alert("Please enter your email.");
    return;
  }

  if (!password.trim()) {
    alert("Please enter your password.");
    return;
  }

  setIsLoading(true);

  // Store the logged-in user only for this browser session
  sessionStorage.setItem("medisafe_user", email.trim());

  setTimeout(() => {
    router.replace("/dashboard");
  }, 800);
};

  const handleDemoFill = () => {
    setEmail('aris.thorne@regionalhealth.gov');
    setPassword('••••••••••••');
    setFacilityId('DIST-04-HOSP-CENTRAL');
    setDepartment('Central Regional Medical Store');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-bright to-surface-container-low flex flex-col justify-between selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Login Top Navigation */}
      <header className="fixed top-0 w-full z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30">
        <div className="h-16 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
              <span className="material-symbols-outlined text-[20px]">health_and_safety</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline font-bold text-sm tracking-tight text-primary leading-none">
                MEDI SAFE AI
              </span>
              <span className="font-label text-[9px] text-on-surface-variant tracking-wider uppercase mt-0.5">
                DIGITAL HEALTHCARE SOLUTIONS
              </span>
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <span className="font-mono text-xs text-tertiary-container flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse" />
              Zero-Trust Guard Active
            </span>
          </nav>
        </div>
      </header>

      {/* Main Login Body */}
      <main className="flex-1 w-full pt-24 pb-12 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-surface-container-lowest p-2 shadow-sm border border-outline-variant/40 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[36px]">shield_with_heart</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-xl font-bold tracking-tight text-primary">
                  MediSafe AI
                </span>
                <span className="font-label text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Enterprise Platform
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed/40 text-on-primary-fixed">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-label text-xs font-semibold tracking-wide uppercase">
                  Clinical Risk Guard
                </span>
              </div>
              <h1 className="font-headline text-4xl sm:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
                Predict. Prevent. Protect.
              </h1>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                AI-powered medicine stockout intelligence for safer, transparent, and resilient healthcare supply chains.
              </p>
            </div>

            {/* Value Props */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/30 shadow-xs">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">analytics</span>
                </div>
                <div>
                  <span className="font-label text-sm text-on-surface font-semibold block">
                    Real-time stockout intelligence
                  </span>
                  <span className="font-body text-xs text-on-surface-variant">
                    Continuous predictive visibility across critical medications and essential formulary.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/30 shadow-xs">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">verified_user</span>
                </div>
                <div>
                  <span className="font-label text-sm text-on-surface font-semibold block">
                    Federated healthcare zero-trust
                  </span>
                  <span className="font-body text-xs text-on-surface-variant">
                    Compliant role-based access for verified medical superintendents and pharmacists.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/30 shadow-xs">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">neurology</span>
                </div>
                <div>
                  <span className="font-label text-sm text-on-surface font-semibold block">
                    Bayesian demand forecasting (ML 4.2)
                  </span>
                  <span className="font-body text-xs text-on-surface-variant">
                    Detects early seasonal surge patterns to prevent clinical disruption.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Login Card Column */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl p-8 sm:p-10 shadow-xl border border-outline-variant/30 relative">
              <div className="mb-6 text-left">
                <div className="flex items-center justify-between">
                  <h2 className="font-headline text-2xl font-bold text-on-surface tracking-tight">
                    Welcome to MediSafe AI
                  </h2>
                  <button
                    type="button"
                    onClick={handleDemoFill}
                    className="text-[11px] font-mono px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-semibold hover:opacity-80 transition-opacity"
                  >
                    Quick Demo Fill
                  </button>
                </div>
                <p className="font-body text-sm text-on-surface-variant mt-1">
                  Sign in to your authorized regional healthcare workspace
                </p>
              </div>

              {/* Google SSO button */}
              <button
                type="button"
                onClick={handleLogin}
                className="w-full h-11 flex items-center justify-center gap-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label text-sm font-semibold transition-all border border-outline-variant/40"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                <span>Continue with Institutional Google ID</span>
              </button>

              <div className="relative flex items-center justify-center my-5">
                <div className="w-full h-px bg-outline-variant/30" />
                <span className="absolute px-3 bg-surface-container-lowest font-label text-[11px] text-on-surface-variant font-medium uppercase tracking-widest">
                  OR CREDENTIALS
                </span>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block font-label text-xs font-semibold text-on-surface mb-1">
                    Clinical / Institutional Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@hospital.org"
                    className="w-full h-11 px-3.5 bg-surface-container-low border border-outline-variant/40 rounded-lg text-on-surface font-body text-sm focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-label text-xs font-semibold text-on-surface">
                      Security Passcode / Token
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-xs text-primary font-medium hover:underline"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 px-3.5 bg-surface-container-low border border-outline-variant/40 rounded-lg text-on-surface font-body text-sm focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-label text-xs font-semibold text-on-surface mb-1">
                      Facility / Node ID
                    </label>
                    <input
                      type="text"
                      value={facilityId}
                      onChange={(e) => setFacilityId(e.target.value)}
                      className="w-full h-10 px-3 bg-surface-container-low border border-outline-variant/40 rounded-lg text-on-surface font-mono text-xs focus:outline-none focus:border-primary focus:bg-surface-container-lowest"
                    />
                  </div>
                  <div>
                    <label className="block font-label text-xs font-semibold text-on-surface mb-1">
                      Department
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full h-10 px-2 bg-surface-container-low border border-outline-variant/40 rounded-lg text-on-surface text-xs focus:outline-none focus:border-primary focus:bg-surface-container-lowest"
                    >
                      <option value="Central Regional Medical Store">Central Regional Store</option>
                      <option value="Emergency & Trauma Pharmacy">Emergency & Trauma</option>
                      <option value="ICU & High Dependency">ICU & Critical Care</option>
                      <option value="Outpatient Formulary">Outpatient Formulary</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 text-xs text-on-surface-variant">
                  <input type="checkbox" defaultChecked id="rememberTerminal" className="rounded text-primary" />
                  <label htmlFor="rememberTerminal">
                    Remember this workstation (HIPAA / DISHA 24h token)
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
                >
                  {isLoading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                      Verifying Medical Credentials...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">lock_open</span>
                      Authorize Clinical Session
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-on-surface-variant/70 font-mono">
        © 2026 MediSafe AI Clinical Intelligence Platform. Authorized Medical Personnel Only.
      </footer>
    </div>
  );
}
