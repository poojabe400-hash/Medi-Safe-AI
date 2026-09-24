'use client';

import React from 'react';

const CATEGORY_ANALYTICS = [
  { name: 'Antibiotics', coverageDays: 7.2, risk: 'High Risk', fill: 'bg-error', percent: 45 },
  { name: 'Emergency & Critical', coverageDays: 4.7, risk: 'Critical Deficit', fill: 'bg-error animate-pulse', percent: 25 },
  { name: 'Cardiovascular', coverageDays: 18.5, risk: 'Optimal Buffer', fill: 'bg-emerald-500', percent: 85 },
  { name: 'Respiratory', coverageDays: 8.1, risk: 'Seasonal Surge', fill: 'bg-amber-500', percent: 55 },
  { name: 'Endocrine & Metabolic', coverageDays: 12.4, risk: 'Adequate', fill: 'bg-emerald-500', percent: 70 },
  { name: 'Analgesics & Antipyretics', coverageDays: 20.1, risk: 'High Reserve', fill: 'bg-emerald-500', percent: 95 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Executive Inventory Analytics & AI Metrics
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-mono text-xs font-bold">
              Model Diagnostic Core
            </span>
          </div>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1">
            Empirical diagnostic performance, lead time variance metrics, and supply chain stockout resilience KPIs.
          </p>
        </div>
      </div>

      {/* Primary KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs text-on-surface-variant font-bold uppercase">Forecast Precision Rate</span>
          <div className="text-3xl font-extrabold text-primary font-mono mt-1">96.4%</div>
          <span className="text-[11px] text-tertiary-container font-semibold flex items-center gap-0.5 mt-0.5">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> +1.2% this quarter
          </span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs text-on-surface-variant font-bold uppercase">Mean Absolute Error (MAPE)</span>
          <div className="text-3xl font-extrabold text-secondary font-mono mt-1">3.6%</div>
          <span className="text-[11px] text-on-surface-variant font-mono">Industry benchmark &lt; 5.0%</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs text-on-surface-variant font-bold uppercase">Lead-Time Volatility</span>
          <div className="text-3xl font-extrabold text-on-surface font-mono mt-1">± 1.4 Days</div>
          <span className="text-[11px] text-on-surface-variant font-mono">Supplier transit consistency</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs text-on-surface-variant font-bold uppercase">Stock Expiry Reduction</span>
          <div className="text-3xl font-extrabold text-tertiary-container font-mono mt-1">-34.8%</div>
          <span className="text-[11px] text-tertiary-container font-semibold">Zero expired write-offs in Q3</span>
        </div>
      </div>

      {/* Two Column Grid: Model Feature Breakdown & Category Resilience */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Model Architecture & Telemetry */}
        <div className="lg:col-span-6 bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-6 space-y-4">
          <div className="border-b border-outline-variant/20 pb-3">
            <h2 className="font-headline text-base font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[22px]">neurology</span>
              Bayesian AI v4.2 Feature Attribution
            </h2>
            <p className="text-xs text-on-surface-variant">Weight distribution of multi-variate predictive signals</p>
          </div>

          <div className="space-y-4 pt-1">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-on-surface">Historical Dispensary Burn Velocity</span>
                <span className="font-mono text-primary font-bold">40% Weight</span>
              </div>
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '40%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-on-surface">Epidemiological & OPD Disease Cluster Index</span>
                <span className="font-mono text-secondary font-bold">30% Weight</span>
              </div>
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-secondary" style={{ width: '30%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-on-surface">Regional Supplier Transit & Depot Lead-Time</span>
                <span className="font-mono text-tertiary-container font-bold">20% Weight</span>
              </div>
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-tertiary-container" style={{ width: '20%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-on-surface">Seasonal Climate & Monsoon Respiratory Pattern</span>
                <span className="font-mono text-amber-600 font-bold">10% Weight</span>
              </div>
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: '10%' }} />
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/30 text-xs text-on-surface-variant font-mono space-y-1">
            <div className="flex justify-between">
              <span>Model Checkpoint:</span>
              <span className="font-bold text-on-surface">Bayesian-Net-v4.2-Prod</span>
            </div>
            <div className="flex justify-between">
              <span>Training Samples:</span>
              <span className="font-bold text-on-surface">142,800 Prescriptions</span>
            </div>
            <div className="flex justify-between">
              <span>Cross-Validation Score:</span>
              <span className="font-bold text-tertiary-container">0.982 AUC-ROC</span>
            </div>
          </div>
        </div>

        {/* Category Buffer Health */}
        <div className="lg:col-span-6 bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-6 space-y-4">
          <div className="border-b border-outline-variant/20 pb-3">
            <h2 className="font-headline text-base font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">bar_chart</span>
              Therapeutic Category Resilience
            </h2>
            <p className="text-xs text-on-surface-variant">Average buffer days remaining by clinical specialty</p>
          </div>

          <div className="space-y-3 pt-1">
            {CATEGORY_ANALYTICS.map((cat) => (
              <div key={cat.name} className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-on-surface">{cat.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-on-surface">{cat.coverageDays} Days</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        cat.coverageDays <= 5
                          ? 'bg-error-container text-on-error-container'
                          : cat.coverageDays <= 10
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-tertiary-fixed text-on-tertiary-fixed'
                      }`}
                    >
                      {cat.risk}
                    </span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div className={`h-full ${cat.fill}`} style={{ width: `${cat.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
