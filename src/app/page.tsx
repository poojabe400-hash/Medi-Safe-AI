'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMediSafe } from '@/context/MediSafeContext';

export default function DashboardPage() {
  const { medicines, alerts, setSelectedMedicine, setIsEmergencyModalOpen, activeDistrict } = useMediSafe();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');

  // Filter medicines
  const filteredMeds = medicines.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.dosage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesRisk =
      riskFilter === 'All' ||
      (riskFilter === 'Critical' && m.status === 'Critical Risk') ||
      (riskFilter === 'Low' && m.status === 'Low Stock') ||
      (riskFilter === 'Stable' && m.status === 'In Stock');
    return matchesSearch && matchesCategory && matchesRisk;
  });

  const criticalCount = medicines.filter((m) => m.status === 'Critical Risk').length;
  const lowCount = medicines.filter((m) => m.status === 'Low Stock').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Executive Stock & Forecast Overview
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-mono text-xs font-bold shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container animate-pulse" />
              LIVE
            </span>
          </div>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant flex items-center gap-2 mt-1">
            <span>Real-time supply chain monitoring & predictive stockout prevention</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <span className="font-mono text-primary font-semibold">{activeDistrict}</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/reports"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-colors font-label text-xs font-semibold shadow-xs border border-outline-variant/40"
          >
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            <span>Export Executive Brief</span>
          </Link>
          <Link
            href="/daily-stock-update"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors font-label text-xs font-bold shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Quick Stock Update</span>
          </Link>
        </div>
      </div>

      {/* Exactly 4 Clean, Prominent Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Medicines */}
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-outline-variant/30 flex flex-col justify-between gap-2 hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label text-xs text-on-surface-variant uppercase tracking-wider font-bold">
              Total Medicines
            </span>
            <span className="w-9 h-9 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">medication</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="font-headline text-3xl font-extrabold text-on-surface leading-none">
              1,248
            </span>
            <span className="font-label text-xs text-on-surface-variant font-medium">Cataloged SKUs</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 text-on-surface-variant border-t border-outline-variant/20">
            <span className="text-tertiary-container font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[15px]">arrow_upward</span> +24 this quarter
            </span>
            <span className="font-mono text-[11px]">Active formulary</span>
          </div>
        </div>

        {/* Card 2: Medicines At Risk */}
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-error-container/60 flex flex-col justify-between gap-2 hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label text-xs text-error uppercase tracking-wider font-bold">
              Medicines At Risk
            </span>
            <span className="w-9 h-9 rounded-lg bg-error-container text-on-error-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="font-headline text-3xl font-extrabold text-error leading-none">
              {criticalCount + lowCount}
            </span>
            <span className="font-label text-xs text-error font-medium">{criticalCount} Critical items</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 text-error border-t border-error-container/40 font-semibold">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-error animate-ping" /> &lt; 5 days supply
            </span>
            <span className="font-mono text-[11px]">Immediate action</span>
          </div>
        </div>

        {/* Card 3: Predicted Stockouts */}
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-secondary-fixed/50 flex flex-col justify-between gap-2 hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label text-xs text-secondary uppercase tracking-wider font-bold">
              Predicted Stockouts
            </span>
            <span className="w-9 h-9 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">neurology</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="font-headline text-3xl font-extrabold text-on-surface leading-none">
              11
            </span>
            <span className="font-label text-xs text-secondary font-medium">Next 7–10 days</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 text-on-surface-variant border-t border-outline-variant/20">
            <span className="text-secondary font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[15px]">psychology</span> Bayesian AI v4.2
            </span>
            <span className="font-mono text-[11px]">96.4% Precision</span>
          </div>
        </div>

        {/* Card 4: Formulary Health Index */}
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-tertiary-fixed/50 flex flex-col justify-between gap-2 hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label text-xs text-tertiary-container uppercase tracking-wider font-bold">
              Health Index
            </span>
            <span className="w-9 h-9 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="font-headline text-3xl font-extrabold text-tertiary-container leading-none">
              94.2%
            </span>
            <span className="font-label text-xs text-on-surface-variant font-medium">Stability score</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 text-on-surface-variant border-t border-outline-variant/20">
            <span className="text-tertiary-container font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[15px]">check</span> In compliance
            </span>
            <span className="font-mono text-[11px]">WHO Essential Stds</span>
          </div>
        </div>
      </div>

      {/* Main Table: AI Stockout Risk Overview */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 sm:p-5 border-b border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-headline text-lg font-bold text-on-surface">AI Stockout Risk Overview</h2>
            <p className="font-body text-xs text-on-surface-variant">
              Triage priority list sorted by projected depletion velocity and buffer deficit
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Search Input */}
            <div className="flex items-center bg-surface-container-low px-3 py-1.5 rounded-lg gap-2 text-xs border border-outline-variant/30">
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter medicines..."
                className="bg-transparent outline-none w-36 sm:w-48 text-on-surface placeholder:text-outline"
              />
            </div>

            {/* Risk filter */}
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="bg-surface-container-low border border-outline-variant/30 rounded-lg px-2.5 py-1.5 text-xs text-on-surface outline-none font-semibold"
            >
              <option value="All">All Risk Tiers</option>
              <option value="Critical">Critical Only (&lt; 5d)</option>
              <option value="Low">Low Stock (&lt; 10d)</option>
              <option value="Stable">Stable Supply</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="px-4 py-2.5 bg-surface-container-low/50 border-b border-outline-variant/20 flex items-center gap-2 overflow-x-auto">
          {['All', 'Antibiotics', 'Emergency & Critical', 'Cardiovascular', 'Respiratory', 'Endocrine', 'Analgesics'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-outline-variant/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant font-label text-[11px] uppercase tracking-wider border-b border-outline-variant/20">
              <tr>
                <th className="py-3 px-4 font-bold">Medicine / SKU</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Current Reserve</th>
                <th className="py-3 px-4 font-bold">Velocity</th>
                <th className="py-3 px-4 font-bold">Days Remaining</th>
                <th className="py-3 px-4 font-bold">AI Risk Dial</th>
                <th className="py-3 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredMeds.map((med) => (
                <tr
                  key={med.id}
                  onClick={() => setSelectedMedicine(med)}
                  className="hover:bg-surface-container-low/60 cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[16px]">medication</span>
                      </span>
                      <div>
                        <span className="font-bold text-on-surface block group-hover:text-primary transition-colors">
                          {med.name}
                        </span>
                        <span className="font-mono text-[10px] text-on-surface-variant">
                          {med.sku} • {med.dosage}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-medium text-on-surface-variant">{med.category}</span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-mono font-bold text-on-surface">
                      {med.currentStock.toLocaleString()} <span className="text-[10px] font-normal text-on-surface-variant">{med.unit}</span>
                    </div>
                    <div className="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full rounded-full ${
                          med.status === 'Critical Risk'
                            ? 'bg-error'
                            : med.status === 'Low Stock'
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(100, (med.currentStock / med.minThreshold) * 100)}%` }}
                      />
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono text-on-surface-variant">
                    {med.consumptionVelocity} <span className="text-[10px]">units/day</span>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[11px] font-bold ${
                        med.status === 'Critical Risk'
                          ? 'bg-error-container text-on-error-container animate-pulse'
                          : med.status === 'Low Stock'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-tertiary-fixed text-on-tertiary-fixed'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {med.status === 'Critical Risk' ? 'warning' : 'schedule'}
                      </span>
                      {med.daysRemaining} Days
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-surface-container rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            med.riskScore > 80 ? 'bg-error' : med.riskScore > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${med.riskScore}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] font-bold text-on-surface">{med.riskScore}%</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    {med.status === 'Critical Risk' ? (
                      <button
                        onClick={() => setIsEmergencyModalOpen(true)}
                        className="px-2.5 py-1 rounded-lg bg-error text-on-error hover:bg-red-700 font-bold text-[11px] transition-colors shadow-2xs"
                      >
                        STAT Reorder
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedMedicine(med)}
                        className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container font-semibold text-[11px] transition-colors border border-outline-variant/30"
                      >
                        Inspect
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-3 bg-surface-container-low/40 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant font-mono">
          <span>Showing {filteredMeds.length} of {medicines.length} formulary medications</span>
          <Link href="/inventory" className="text-primary font-bold hover:underline">
            View Complete Medicine Catalog →
          </Link>
        </div>
      </div>

      {/* Two-Column Analytics & Live Feeds Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Real-Time Telemetry & Alert Feed */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">notifications_active</span>
              <h3 className="font-headline text-base font-bold text-on-surface">Live Operational Triage Feed</h3>
            </div>
            <Link href="/alerts" className="text-xs text-primary font-semibold hover:underline font-mono">
              View All Alerts ({alerts.length})
            </Link>
          </div>

          <div className="space-y-3">
            {alerts.slice(0, 3).map((alt) => (
              <div
                key={alt.id}
                className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                  alt.severity === 'critical'
                    ? 'bg-error-container/20 border-error-container/50'
                    : 'bg-surface-container-low border-outline-variant/30'
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    alt.severity === 'critical'
                      ? 'bg-error-container text-on-error-container'
                      : 'bg-surface-container text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {alt.severity === 'critical' ? 'warning' : 'info'}
                  </span>
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-on-surface">{alt.title}</h4>
                    <span className="text-[10px] font-mono text-on-surface-variant">{alt.timestamp}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5 leading-normal">{alt.message}</p>
                  <span className="inline-block text-[11px] font-semibold text-primary mt-1">
                    Action: {alt.actionRequired}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Rebalance Recommendations */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">swap_horiz</span>
              <h3 className="font-headline text-base font-bold text-on-surface">Regional Rebalance</h3>
            </div>
            <span className="text-[10px] font-mono bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded-full font-bold">
              Inter-depot Link
            </span>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface">District 02 Surplus Transfer</span>
              <span className="text-xs font-mono text-tertiary-container font-bold">+1,000 Caps Available</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              District 02 Central Pharmacy has 42 days buffer of <strong>Amoxicillin 500mg</strong>. Algorithm suggests moving 800 units to District 04 to prevent stockout before batch delivery.
            </p>
            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="w-full py-2 bg-secondary text-on-secondary hover:bg-blue-800 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">local_shipping</span>
              Execute Inter-District Transfer
            </button>
          </div>

          <div className="p-4 rounded-xl bg-tertiary-fixed/20 border border-tertiary-fixed/40 space-y-2">
            <div className="flex items-center gap-2 text-tertiary-container font-bold text-xs">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              Automated Safety Stock Guarantee
            </div>
            <p className="text-xs text-on-surface-variant">
              Every formulary item is backed by live CDSCO & WHO minimum essential quotas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
