'use client';

import React, { useState } from 'react';
import { useMediSafe } from '@/context/MediSafeContext';

export default function StockoutPredictionsPage() {
  const { medicines, setIsEmergencyModalOpen, setSelectedMedicine } = useMediSafe();
  const [selectedSku, setSelectedSku] = useState('SKU-AMOX-500');
  const [demandSurgePercent, setDemandSurgePercent] = useState(35);
  const [supplierDelayDays, setSupplierDelayDays] = useState(3);
  const [epidemicMultiplier, setEpidemicMultiplier] = useState(1.2);

  const currentMed = medicines.find((m) => m.sku === selectedSku) || medicines[0];

  // Dynamic calculated prediction based on simulation sliders
  const adjustedVelocity = Math.round(currentMed.consumptionVelocity * (1 + demandSurgePercent / 100) * epidemicMultiplier);
  const simulatedDays = Math.max(0.5, parseFloat((currentMed.currentStock / adjustedVelocity).toFixed(1)));
  const simulatedRunoutDate = new Date(Date.now() + simulatedDays * 86400000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const highRiskMedicines = medicines.filter((m) => m.riskScore > 60);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              AI Stockout Predictions & Demand Forecasting
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-mono text-xs font-bold">
              ML 4.2 Active
            </span>
          </div>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1">
            Bayesian predictive inference engine modeling localized epidemiological trends, supply chain lead times, and seasonal prescription spikes.
          </p>
        </div>

        <button
          onClick={() => setIsEmergencyModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-error text-on-error hover:bg-red-700 transition-colors font-label text-xs font-bold shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">emergency</span>
          <span>Trigger Preventive Restock</span>
        </button>
      </div>

      {/* Model Performance Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs text-on-surface-variant font-bold uppercase">Bayesian Model Precision</span>
          <div className="text-2xl font-extrabold text-secondary font-mono mt-1">96.4%</div>
          <span className="text-[11px] text-on-surface-variant">Validated against historical audits</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs text-on-surface-variant font-bold uppercase">Rolling Forecast Horizon</span>
          <div className="text-2xl font-extrabold text-on-surface font-mono mt-1">30 Days</div>
          <span className="text-[11px] text-on-surface-variant">Continuous 6-hour refresh</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-error-container shadow-xs">
          <span className="text-xs text-error font-bold uppercase">Imminent Stockouts Predicted</span>
          <div className="text-2xl font-extrabold text-error font-mono mt-1">4 SKUs</div>
          <span className="text-[11px] text-error font-semibold">Exhaustion in &lt; 5 days</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-tertiary-fixed shadow-xs">
          <span className="text-xs text-tertiary-container font-bold uppercase">Averted Disruption Rate</span>
          <div className="text-2xl font-extrabold text-tertiary-container font-mono mt-1">99.1%</div>
          <span className="text-[11px] text-tertiary-container font-semibold">Zero critical zero-stock incidents</span>
        </div>
      </div>

      {/* Interactive Simulation Sandbox */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[24px]">tune</span>
              <h2 className="font-headline text-lg font-bold text-on-surface">
                Interactive Stress-Test & Simulation Sandbox
              </h2>
            </div>
            <p className="font-body text-xs text-on-surface-variant">
              Adjust localized epidemiological conditions and supplier delays to evaluate formulary resilience in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-on-surface">Target Molecule:</span>
            <select
              value={selectedSku}
              onChange={(e) => setSelectedSku(e.target.value)}
              className="bg-surface-container-low border border-outline-variant/40 rounded-lg px-3 py-1.5 text-xs text-on-surface font-bold outline-none"
            >
              {medicines.map((m) => (
                <option key={m.id} value={m.sku}>
                  {m.name} ({m.sku})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Simulation Controls & Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">trending_up</span>
                  Anticipated Prescription / OPD Surge:
                </span>
                <span className="font-mono font-bold text-primary">+{demandSurgePercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={demandSurgePercent}
                onChange={(e) => setDemandSurgePercent(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-surface-container-low rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant font-mono mt-1">
                <span>Baseline (0%)</span>
                <span>Moderate (+50%)</span>
                <span>Epidemic Outbreak (+100%)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">local_shipping</span>
                  Supplier Logistics / Transit Delay:
                </span>
                <span className="font-mono font-bold text-secondary">+{supplierDelayDays} Days</span>
              </div>
              <input
                type="range"
                min="0"
                max="14"
                value={supplierDelayDays}
                onChange={(e) => setSupplierDelayDays(Number(e.target.value))}
                className="w-full accent-secondary h-2 bg-surface-container-low rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant font-mono mt-1">
                <span>On-time (0d)</span>
                <span>Transit Bottleneck (+7d)</span>
                <span>Critical Supply Choke (+14d)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-amber-600">coronavirus</span>
                  Seasonal Climate & Epidemiological Factor:
                </span>
                <span className="font-mono font-bold text-amber-700">{epidemicMultiplier}x</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.0"
                step="0.1"
                value={epidemicMultiplier}
                onChange={(e) => setEpidemicMultiplier(Number(e.target.value))}
                className="w-full accent-amber-600 h-2 bg-surface-container-low rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant font-mono mt-1">
                <span>Standard (1.0x)</span>
                <span>Monsoon Respiratory Spike (1.5x)</span>
                <span>Severe Outbreak (2.0x)</span>
              </div>
            </div>
          </div>

          {/* Simulation Output Card */}
          <div className="lg:col-span-5 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/40 space-y-4">
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
              Simulated Forecast Outcome
            </span>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-on-surface">{currentMed.name}</h3>
              <p className="text-xs text-on-surface-variant font-mono">
                Current Reserve: {currentMed.currentStock} {currentMed.unit} • Normal: {currentMed.consumptionVelocity}/day
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface-variant">Simulated Daily Burn:</span>
                <span className="font-mono font-bold text-primary text-sm">{adjustedVelocity} {currentMed.unit}/day</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface-variant">Projected Exhaustion:</span>
                <span
                  className={`font-mono font-bold text-base ${
                    simulatedDays <= 3 ? 'text-error animate-pulse' : simulatedDays <= 7 ? 'text-amber-600' : 'text-emerald-600'
                  }`}
                >
                  {simulatedDays} Days ({simulatedRunoutDate})
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsEmergencyModalOpen(true)}
                className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                Lock Reorder Buffer (+{Math.round(adjustedVelocity * (currentMed.leadTimeDays + supplierDelayDays))} Units)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Stockout Risk Radar Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 overflow-hidden">
        <div className="p-5 border-b border-outline-variant/20">
          <h2 className="font-headline text-lg font-bold text-on-surface">
            Active High-Risk Predictive Radar
          </h2>
          <p className="font-body text-xs text-on-surface-variant">
            Ranked by Bayesian vulnerability factor combining supply depletion, seasonal disease trajectory, and supplier reliability index.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant font-label text-[11px] uppercase tracking-wider border-b border-outline-variant/20">
              <tr>
                <th className="py-3 px-4 font-bold">Medicine & Formulation</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Days to Depletion</th>
                <th className="py-3 px-4 font-bold">Key Risk Factor</th>
                <th className="py-3 px-4 font-bold">Lead Time</th>
                <th className="py-3 px-4 font-bold">AI Probability</th>
                <th className="py-3 px-4 font-bold text-right">Intervention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {highRiskMedicines.map((med) => (
                <tr
                  key={med.id}
                  onClick={() => setSelectedMedicine(med)}
                  className="hover:bg-surface-container-low/60 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-on-surface block text-sm">{med.name}</span>
                    <span className="text-[10px] font-mono text-on-surface-variant">{med.sku} • {med.dosage}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-on-surface-variant">{med.category}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-error">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error-container text-on-error-container">
                      <span className="material-symbols-outlined text-[14px]">warning</span>
                      {med.daysRemaining} Days
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-on-surface max-w-xs">
                    {med.category === 'Antibiotics'
                      ? 'Pediatric OPD seasonal respiratory surge (+48%)'
                      : med.category === 'Emergency & Critical'
                      ? 'Trauma ward acute consumption above minimum buffer'
                      : 'Seasonal viral bronchitis cluster detected'}
                  </td>
                  <td className="py-3.5 px-4 font-mono">{med.leadTimeDays} Days Transit</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-secondary">{med.riskScore}% Probability</td>
                  <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setIsEmergencyModalOpen(true)}
                      className="px-3 py-1 rounded-lg bg-error text-on-error hover:bg-red-700 font-bold text-[11px] transition-colors shadow-2xs"
                    >
                      Dispatch Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
