'use client';

import React, { useState } from 'react';
import { useMediSafe } from '@/context/MediSafeContext';

const WEEKLY_DATA = [
  { day: 'Mon', units: 4120, height: '70%' },
  { day: 'Tue', units: 4450, height: '75%' },
  { day: 'Wed', units: 4890, height: '85%' },
  { day: 'Thu', units: 5120, height: '90%' },
  { day: 'Fri', units: 5400, height: '95%' },
  { day: 'Sat', units: 3800, height: '60%' },
  { day: 'Sun', units: 3200, height: '50%' },
];

const DEPARTMENTS = [
  { name: 'Outpatient Formulary (OPD)', share: '42%', units: 2054, color: 'bg-primary' },
  { name: 'Emergency & Trauma Hub', share: '28%', units: 1369, color: 'bg-error' },
  { name: 'Intensive Care Unit (ICU)', share: '18%', units: 880, color: 'bg-secondary' },
  { name: 'Inpatient Surgical Wards', share: '12%', units: 587, color: 'bg-tertiary-container' },
];

export default function SalesAndConsumptionPage() {
  const { medicines, setSelectedMedicine } = useMediSafe();
  const [timeRange, setTimeRange] = useState('7D');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Formulary Sales & Consumption Telemetry
          </h1>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1">
            Real-time prescription dispensation velocity, departmental burn trajectories, and aggregate therapeutic utilization analytics.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-lg border border-outline-variant/30 text-xs font-semibold">
          {['24H', '7D', '30D', '90D'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                timeRange === range
                  ? 'bg-surface-container-lowest text-on-surface shadow-xs font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs text-on-surface-variant font-bold uppercase">24h Dispensation Velocity</span>
          <div className="text-2xl font-extrabold text-primary font-mono mt-1">4,890 Units</div>
          <span className="text-[11px] text-tertiary-container font-semibold flex items-center gap-0.5 mt-0.5">
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +12.4% vs 7-day avg
          </span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs text-on-surface-variant font-bold uppercase">Peak Utilization Node</span>
          <div className="text-xl font-bold text-on-surface mt-1 truncate">Outpatient Pharmacy</div>
          <span className="text-[11px] text-on-surface-variant font-mono">42% of total hospital draw</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs text-on-surface-variant font-bold uppercase">Top Velocity Molecule</span>
          <div className="text-xl font-bold text-secondary mt-1 truncate">Paracetamol 650mg</div>
          <span className="text-[11px] text-secondary font-mono font-semibold">720 units/day burn</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs text-on-surface-variant font-bold uppercase">Formulary Turnover Rate</span>
          <div className="text-2xl font-extrabold text-tertiary-container font-mono mt-1">4.8x</div>
          <span className="text-[11px] text-tertiary-container font-semibold">Optimal clinical efficiency</span>
        </div>
      </div>

      {/* Charts & Department Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Consumption Velocity Chart */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div>
              <h2 className="font-headline text-base font-bold text-on-surface">
                Consumption Velocity & Burn Trajectory
              </h2>
              <p className="text-xs text-on-surface-variant">Daily aggregate unit dispensations across all hospital departments</p>
            </div>
            <span className="text-xs font-mono text-primary font-bold">Peak: Friday (5,400 units)</span>
          </div>

          {/* Visual Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 pb-2 px-4">
            {WEEKLY_DATA.map((item) => (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[11px] font-mono text-on-surface-variant font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.units}
                </span>
                <div
                  className="w-full bg-primary/20 group-hover:bg-primary transition-all rounded-t-lg relative"
                  style={{ height: item.height }}
                >
                  <div
                    className="absolute inset-x-0 bottom-0 bg-primary rounded-t-lg transition-all"
                    style={{ height: '70%' }}
                  />
                </div>
                <span className="text-xs font-mono font-bold text-on-surface">{item.day}</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 flex items-center justify-between text-xs text-on-surface-variant font-mono">
            <span>Forecast Model ML 4.2 indicates upcoming +18% weekend surge in trauma ward anti-infectives</span>
            <span className="text-primary font-bold">Surge Guard Armed</span>
          </div>
        </div>

        {/* Department Distribution */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-6 space-y-4">
          <div className="border-b border-outline-variant/20 pb-3">
            <h2 className="font-headline text-base font-bold text-on-surface">
              Departmental Utilization Share
            </h2>
            <p className="text-xs text-on-surface-variant">Consumption breakdown by clinical unit</p>
          </div>

          <div className="space-y-4 pt-2">
            {DEPARTMENTS.map((dept) => (
              <div key={dept.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-on-surface">{dept.name}</span>
                  <span className="font-mono font-bold text-on-surface">{dept.share} ({dept.units} u)</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className={`h-full ${dept.color}`} style={{ width: dept.share }} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-outline-variant/20 text-xs text-on-surface-variant">
            <span className="font-bold text-on-surface block mb-1">Observation Note:</span>
            Outpatient pediatric department showed the highest velocity acceleration for oral amoxicillin and cephalosporins.
          </div>
        </div>
      </div>

      {/* High-Velocity Formulary League Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 overflow-hidden">
        <div className="p-5 border-b border-outline-variant/20 flex items-center justify-between">
          <div>
            <h2 className="font-headline text-base font-bold text-on-surface">
              Fast-Moving Formulary Medicines (Top Velocity)
            </h2>
            <p className="font-body text-xs text-on-surface-variant">
              Daily burn rates, inventory runout velocity, and rebalance triggers
            </p>
          </div>
          <span className="text-xs font-mono text-primary font-bold">Ordered by daily consumption</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant font-label text-[11px] uppercase tracking-wider border-b border-outline-variant/20">
              <tr>
                <th className="py-3 px-4 font-bold">Molecule & Formulation</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Daily Burn Rate</th>
                <th className="py-3 px-4 font-bold">Current Reserve</th>
                <th className="py-3 px-4 font-bold">Days Remaining</th>
                <th className="py-3 px-4 font-bold">7-Day Trajectory</th>
                <th className="py-3 px-4 font-bold text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-mono">
              {[...medicines]
                .sort((a, b) => b.consumptionVelocity - a.consumptionVelocity)
                .map((med) => (
                  <tr
                    key={med.id}
                    onClick={() => setSelectedMedicine(med)}
                    className="hover:bg-surface-container-low/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 font-sans font-bold text-on-surface text-sm">
                      {med.name}
                      <span className="block text-[10px] font-mono text-on-surface-variant font-normal">
                        {med.sku} • {med.dosage}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-sans text-on-surface-variant font-medium">
                      {med.category}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-primary text-sm">
                      {med.consumptionVelocity} {med.unit}/day
                    </td>
                    <td className="py-3.5 px-4">
                      {med.currentStock.toLocaleString()} {med.unit}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          med.daysRemaining <= 5
                            ? 'bg-error-container text-on-error-container'
                            : med.daysRemaining <= 10
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-tertiary-fixed text-on-tertiary-fixed'
                        }`}
                      >
                        {med.daysRemaining} Days
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-sans text-xs">
                      {med.consumptionVelocity > 100 ? (
                        <span className="text-error font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">trending_up</span> +18% Surge
                        </span>
                      ) : (
                        <span className="text-tertiary-container font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">trending_flat</span> Stable
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedMedicine(med)}
                        className="px-2.5 py-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold"
                      >
                        View Telemetry
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
