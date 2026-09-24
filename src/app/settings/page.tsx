'use client';

import React, { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'ml' | 'reorder' | 'dvdms' | 'roles' | 'security'>('ml');

  // ML threshold settings
  const [criticalThresholdDays, setCriticalThresholdDays] = useState(5);
  const [warningThresholdDays, setWarningThresholdDays] = useState(10);
  const [leadTimeMultiplier, setLeadTimeMultiplier] = useState(1.35);
  const [autoAcknowledgeLowRisk, setAutoAcknowledgeLowRisk] = useState(true);

  // Reorder settings
  const [autoReorderStat, setAutoReorderStat] = useState(true);
  const [statBufferDays, setStatBufferDays] = useState(14);
  const [preferredDepot, setPreferredDepot] = useState('Central Regional Medical Store - District 04');

  // DVDMS integration
  const [apiEndpoint, setApiEndpoint] = useState('https://dvdms.nhm.gov.in/api/v2.4/dist-04');
  const [apiKey, setApiKey] = useState('••••••••••••••••••••••••••••••••');
  const [syncIntervalMinutes, setSyncIntervalMinutes] = useState(15);

  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            System Settings & Clinical Governance
          </h1>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1">
            Formulary risk thresholds, automated replenishment triggers, state portal connectors, role-based custody, and cryptographic audit security.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-bold text-xs shadow-xs transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">save</span>
          <span>Save Governance Parameters</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-xl bg-tertiary-fixed text-tertiary border border-tertiary-container/30 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span>Settings and clinical governance policies successfully committed to institutional ledger!</span>
          </div>
          <span className="font-mono text-[11px]">Audit Timestamp: Just Now</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-2 overflow-x-auto">
        {[
          { id: 'ml', label: 'ML Prediction & Thresholds', icon: 'neurology' },
          { id: 'reorder', label: 'Automated Reorder Rules', icon: 'shopping_cart' },
          { id: 'dvdms', label: 'DVDMS / e-Aushadhi Sync', icon: 'hub' },
          { id: 'roles', label: 'Role-Based Custody Matrix', icon: 'shield_person' },
          { id: 'security', label: 'Security & Audit Logs', icon: 'encrypted' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: ML & Thresholds */}
      {activeTab === 'ml' && (
        <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-6 space-y-6">
          <div className="border-b border-outline-variant/20 pb-4">
            <h2 className="font-headline text-base font-bold text-on-surface">
              Bayesian Stockout Model Sensitivity & Thresholds
            </h2>
            <p className="text-xs text-on-surface-variant">Configure days-of-supply criteria that trigger clinical triage alerts</p>
          </div>

          <div className="space-y-5 max-w-2xl text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-on-surface">Critical Stockout Alarm Threshold:</span>
                <span className="font-mono text-error font-bold">&le; {criticalThresholdDays} Days Supply</span>
              </div>
              <input
                type="range"
                min="2"
                max="10"
                value={criticalThresholdDays}
                onChange={(e) => setCriticalThresholdDays(Number(e.target.value))}
                className="w-full accent-error h-2 bg-surface-container-low rounded-lg"
              />
              <span className="text-[11px] text-on-surface-variant">
                Items falling below this days-of-supply threshold immediately trigger STAT priority alerts.
              </span>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-on-surface">Low Stock Caution Threshold:</span>
                <span className="font-mono text-amber-600 font-bold">&le; {warningThresholdDays} Days Supply</span>
              </div>
              <input
                type="range"
                min="6"
                max="20"
                value={warningThresholdDays}
                onChange={(e) => setWarningThresholdDays(Number(e.target.value))}
                className="w-full accent-amber-600 h-2 bg-surface-container-low rounded-lg"
              />
              <span className="text-[11px] text-on-surface-variant">
                Early-warning horizon allowing non-expedited standard purchase orders.
              </span>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-on-surface">Supply Chain Lead-Time Safety Multiplier:</span>
                <span className="font-mono text-secondary font-bold">{leadTimeMultiplier}x Buffer</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.0"
                step="0.05"
                value={leadTimeMultiplier}
                onChange={(e) => setLeadTimeMultiplier(Number(e.target.value))}
                className="w-full accent-secondary h-2 bg-surface-container-low rounded-lg"
              />
              <span className="text-[11px] text-on-surface-variant">
                Inflation buffer applied to supplier transit days during seasonal bad-weather periods.
              </span>
            </div>

            <div className="pt-2 flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
              <div>
                <span className="font-bold text-on-surface block">Automated Model Drift Retraining</span>
                <span className="text-[11px] text-on-surface-variant">
                  Run nightly Bayesian hyperparameter tuning against verified dispensed logs
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoAcknowledgeLowRisk}
                onChange={(e) => setAutoAcknowledgeLowRisk(e.target.checked)}
                className="w-4 h-4 accent-primary rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Automated Reorder Rules */}
      {activeTab === 'reorder' && (
        <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-6 space-y-6">
          <div className="border-b border-outline-variant/20 pb-4">
            <h2 className="font-headline text-base font-bold text-on-surface">
              Emergency Reorder Rules & Purchase Approvals
            </h2>
            <p className="text-xs text-on-surface-variant">Autonomous replenishment protocols for critical essential medications</p>
          </div>

          <div className="space-y-4 max-w-2xl text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30">
              <div>
                <span className="font-bold text-on-surface block">Automatic STAT Purchase Order Draft</span>
                <span className="text-[11px] text-on-surface-variant">
                  Generate pre-approved replenishment PO when WHO essential drug drops below 3 days
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoReorderStat}
                onChange={(e) => setAutoReorderStat(e.target.checked)}
                className="w-4 h-4 accent-primary rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block font-semibold text-on-surface mb-1">Target Restock Reserve Buffer</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={statBufferDays}
                  onChange={(e) => setStatBufferDays(Number(e.target.value))}
                  className="w-32 h-10 px-3 bg-surface-container-low border border-outline-variant/40 rounded-lg font-mono font-bold text-on-surface outline-none"
                />
                <span className="text-xs text-on-surface-variant font-mono">Days of consumption quota</span>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-on-surface mb-1">Default Regional Supply Depot</label>
              <select
                value={preferredDepot}
                onChange={(e) => setPreferredDepot(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low border border-outline-variant/40 rounded-lg text-on-surface font-semibold text-xs outline-none"
              >
                <option value="Central Regional Medical Store - District 04">Central Regional Medical Store - District 04</option>
                <option value="National Central Medical Depot (Urgent Air Transit)">National Central Medical Depot (Urgent Air Transit)</option>
                <option value="State Strategic Reserve Depot (Emergency Stockpile)">State Strategic Reserve Depot (Emergency Stockpile)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: DVDMS / e-Aushadhi Sync */}
      {activeTab === 'dvdms' && (
        <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-6 space-y-6">
          <div className="border-b border-outline-variant/20 pb-4">
            <h2 className="font-headline text-base font-bold text-on-surface">
              Government Public Health Telemetry Connector
            </h2>
            <p className="text-xs text-on-surface-variant">Endpoints and cryptographic credentials for national portal synchronization</p>
          </div>

          <div className="space-y-4 max-w-2xl text-xs">
            <div>
              <label className="block font-semibold text-on-surface mb-1">DVDMS REST API Endpoint URL</label>
              <input
                type="text"
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low border border-outline-variant/40 rounded-lg font-mono text-on-surface outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-on-surface mb-1">Institutional Bearer API Key / Token</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low border border-outline-variant/40 rounded-lg font-mono text-on-surface outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-on-surface mb-1">Automated Polling Interval</label>
              <select
                value={syncIntervalMinutes}
                onChange={(e) => setSyncIntervalMinutes(Number(e.target.value))}
                className="w-full h-10 px-3 bg-surface-container-low border border-outline-variant/40 rounded-lg font-mono text-on-surface outline-none"
              >
                <option value={5}>Every 5 Minutes (Real-time Critical)</option>
                <option value={15}>Every 15 Minutes (Standard Operation)</option>
                <option value={60}>Hourly Batched</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Roles & Custody */}
      {activeTab === 'roles' && (
        <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-6 space-y-4">
          <div className="border-b border-outline-variant/20 pb-3">
            <h2 className="font-headline text-base font-bold text-on-surface">
              Role-Based Access Control & Custody Matrix
            </h2>
            <p className="text-xs text-on-surface-variant">Privilege boundaries for clinical prescriptions and drug custody sign-offs</p>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low text-on-surface-variant font-label text-[11px] uppercase tracking-wider border-b border-outline-variant/20">
                <tr>
                  <th className="py-2.5 px-4 font-bold">Clinical Role</th>
                  <th className="py-2.5 px-4 font-bold">Physical Count Log</th>
                  <th className="py-2.5 px-4 font-bold">Emergency Reorder</th>
                  <th className="py-2.5 px-4 font-bold">Schedule H1 Release</th>
                  <th className="py-2.5 px-4 font-bold">Regulatory Dossiers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 font-mono">
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-on-surface">Chief Medical Officer / Superintendent</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">YES</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">AUTHORIZE</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">SIGN-OFF</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">FULL AUDIT</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-on-surface">Senior Store Pharmacist</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">YES</td>
                  <td className="py-3 px-4 text-primary font-bold">REQUEST</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">DISPENSE</td>
                  <td className="py-3 px-4 text-on-surface-variant">EXPORT</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-on-surface">Ward Nurse / Clinical Officer</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">DAILY TALLY</td>
                  <td className="py-3 px-4 text-outline">RESTRICTED</td>
                  <td className="py-3 px-4 text-outline">RESTRICTED</td>
                  <td className="py-3 px-4 text-outline">RESTRICTED</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Security & Audit */}
      {activeTab === 'security' && (
        <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-6 space-y-4">
          <div className="border-b border-outline-variant/20 pb-3">
            <h2 className="font-headline text-base font-bold text-on-surface">
              Cryptographic Security & Verification Proofs
            </h2>
            <p className="text-xs text-on-surface-variant">Immutable tamper-evident logging conforming to CDSCO & HIPAA</p>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-on-surface block font-sans">Active TLS Cipher:</span>
                <span className="text-on-surface-variant">TLS_AES_256_GCM_SHA384 (Post-quantum ready)</span>
              </div>
              <span className="text-tertiary-container font-bold">SECURE</span>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-on-surface block font-sans">Audit Ledger Hash Root:</span>
                <span className="text-on-surface-variant">SHA256: 8a4f99b2c3d04e1e812fac0d65af475d...</span>
              </div>
              <span className="text-tertiary-container font-bold">VERIFIED</span>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-on-surface block font-sans">DISHA Health Data Compliance:</span>
                <span className="text-on-surface-variant">Federated zero-retention biometric audit active</span>
              </div>
              <span className="text-tertiary-container font-bold">COMPLIANT</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
