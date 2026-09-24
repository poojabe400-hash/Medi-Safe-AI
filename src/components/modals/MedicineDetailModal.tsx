'use client';

import React from 'react';
import { useMediSafe } from '@/context/MediSafeContext';

export default function MedicineDetailModal() {
  const { selectedMedicine, setSelectedMedicine, setIsEmergencyModalOpen } = useMediSafe();

  if (!selectedMedicine) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-inverse-surface/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="h-full w-full max-w-md bg-surface-container-lowest shadow-2xl border-l border-outline-variant/40 flex flex-col justify-between overflow-y-auto">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between p-6 border-b border-outline-variant/30">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">medication</span>
              </span>
              <div>
                <h3 className="font-headline-sm font-bold text-on-surface">{selectedMedicine.name}</h3>
                <span className="font-data-mono text-xs text-on-surface-variant">{selectedMedicine.sku}</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedMedicine(null)}
              className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Details Body */}
          <div className="p-6 space-y-6">
            {/* Stock Level Banner */}
            <div
              className={`p-4 rounded-xl border flex items-center justify-between ${
                selectedMedicine.status === 'Critical Risk'
                  ? 'bg-error-container/30 border-error-container text-error'
                  : selectedMedicine.status === 'Low Stock'
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-tertiary-fixed/30 border-tertiary-fixed text-tertiary-container'
              }`}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block">Clinical Status</span>
                <span className="font-headline-md font-bold block">{selectedMedicine.status}</span>
                <span className="text-xs font-mono">
                  {selectedMedicine.daysRemaining} days remaining supply at current velocity
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold font-mono">{selectedMedicine.currentStock}</span>
                <span className="text-xs block text-on-surface-variant">{selectedMedicine.unit} in depot</span>
              </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-body-sm">
              <div className="p-3 rounded-lg bg-surface-container-low">
                <span className="text-on-surface-variant text-xs block">Dosage Form</span>
                <span className="font-semibold text-on-surface">{selectedMedicine.dosage}</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low">
                <span className="text-on-surface-variant text-xs block">Category</span>
                <span className="font-semibold text-on-surface">{selectedMedicine.category}</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low">
                <span className="text-on-surface-variant text-xs block">Batch Identifier</span>
                <span className="font-semibold text-on-surface font-mono">{selectedMedicine.batchNumber}</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low">
                <span className="text-on-surface-variant text-xs block">Expiration Date</span>
                <span className="font-semibold text-on-surface font-mono">{selectedMedicine.expiryDate}</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low">
                <span className="text-on-surface-variant text-xs block">Daily Consumption</span>
                <span className="font-semibold text-on-surface font-mono">~{selectedMedicine.consumptionVelocity} {selectedMedicine.unit}/day</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low">
                <span className="text-on-surface-variant text-xs block">Supplier Lead Time</span>
                <span className="font-semibold text-on-surface font-mono">{selectedMedicine.leadTimeDays} Business Days</span>
              </div>
            </div>

            {/* Special Protocols */}
            <div className="space-y-2">
              <span className="font-label-md font-semibold text-on-surface block">Compliance & Logistics</span>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-low text-xs">
                <span className="material-symbols-outlined text-primary text-[18px]">ac_unit</span>
                <span>Cold-Chain Required: <strong>{selectedMedicine.coldChainRequired ? 'Yes (2°C - 8°C)' : 'Ambient Storage'}</strong></span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-low text-xs">
                <span className="material-symbols-outlined text-tertiary-container text-[18px]">sync</span>
                <span>Government DVDMS / e-Aushadhi: <strong>{selectedMedicine.dvdmsMapped ? 'Active Mapping' : 'Unmapped'}</strong></span>
              </div>
            </div>

            {/* AI Bayesian Forecast Insight */}
            <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30">
              <div className="flex items-center gap-2 text-secondary font-semibold text-label-md mb-1.5">
                <span className="material-symbols-outlined text-[18px]">neurology</span>
                Bayesian AI v4.2 Prediction
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Risk Score: <strong className="text-on-surface">{selectedMedicine.riskScore}%</strong>. Based on localized seasonal incidence trends and hospital OPD distribution velocity, stock is predicted to deplete on <strong className="text-on-surface">{selectedMedicine.predictedStockoutDate}</strong> without interim delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-outline-variant/30 bg-surface-container-low flex items-center gap-3">
          <button
            onClick={() => {
              setSelectedMedicine(null);
              setIsEmergencyModalOpen(true);
            }}
            className="flex-1 py-2.5 px-4 rounded-lg bg-error text-on-error font-label-md font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">emergency</span>
            Emergency Reorder
          </button>
          <button
            onClick={() => setSelectedMedicine(null)}
            className="py-2.5 px-4 rounded-lg border border-outline-variant/60 text-on-surface font-label-md hover:bg-surface-container transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
