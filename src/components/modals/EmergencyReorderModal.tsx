'use client';

import React, { useState } from 'react';
import { useMediSafe } from '@/context/MediSafeContext';

export default function EmergencyReorderModal() {
  const { isEmergencyModalOpen, setIsEmergencyModalOpen, medicines, dispatchEmergencyReorder } = useMediSafe();
  const [selectedSku, setSelectedSku] = useState('SKU-AMOX-500');
  const [orderQty, setOrderQty] = useState(1500);
  const [supplier, setSupplier] = useState('National Central Medical Depot (Urgent Air Transit)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  if (!isEmergencyModalOpen) return null;

  const targetMed = medicines.find((m) => m.sku === selectedSku);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      dispatchEmergencyReorder(selectedSku, Number(orderQty), supplier);
      setIsSubmitting(false);
      setSuccessNotice(true);
      setTimeout(() => {
        setSuccessNotice(false);
        setIsEmergencyModalOpen(false);
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-error-container/40 border-b border-error-container">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-error-container text-on-error-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">emergency</span>
            </span>
            <div>
              <h3 className="font-headline-sm font-bold text-on-surface">Emergency Reorder Protocol</h3>
              <p className="font-body-sm text-on-surface-variant">Expedited formulary dispatch for critical stockout prevention</p>
            </div>
          </div>
          <button
            onClick={() => setIsEmergencyModalOpen(false)}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Content */}
        {successNotice ? (
          <div className="p-8 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <h4 className="font-headline-sm font-bold text-on-surface">Emergency Order Dispatched!</h4>
            <p className="font-body-sm text-on-surface-variant max-w-sm">
              Successfully allocated {orderQty} units of {targetMed?.name}. Tracking ID assigned and stock levels updated.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block font-label-md font-semibold text-on-surface mb-1.5">
                Target Medication / SKU
              </label>
              <select
                value={selectedSku}
                onChange={(e) => setSelectedSku(e.target.value)}
                className="w-full h-11 px-3.5 bg-surface-container-low border border-outline-variant/50 rounded-lg text-on-surface font-body-md focus:outline-none focus:border-primary focus:bg-surface-container-lowest"
              >
                {medicines.map((m) => (
                  <option key={m.id} value={m.sku}>
                    {m.name} ({m.sku}) — Current: {m.currentStock} {m.unit} ({m.daysRemaining} days left)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-label-md font-semibold text-on-surface mb-1.5">
                  Emergency Allocation Qty
                </label>
                <input
                  type="number"
                  min="50"
                  step="50"
                  value={orderQty}
                  onChange={(e) => setOrderQty(Number(e.target.value))}
                  required
                  className="w-full h-11 px-3.5 bg-surface-container-low border border-outline-variant/50 rounded-lg text-on-surface font-body-md focus:outline-none focus:border-primary focus:bg-surface-container-lowest font-mono"
                />
              </div>

              <div>
                <label className="block font-label-md font-semibold text-on-surface mb-1.5">
                  Priority Tier
                </label>
                <div className="h-11 px-3.5 bg-error-container/30 border border-error/30 rounded-lg text-error font-semibold flex items-center gap-2 text-label-md">
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                  STAT (Express 18h)
                </div>
              </div>
            </div>

            <div>
              <label className="block font-label-md font-semibold text-on-surface mb-1.5">
                Designated State / National Depot
              </label>
              <select
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="w-full h-11 px-3.5 bg-surface-container-low border border-outline-variant/50 rounded-lg text-on-surface font-body-md focus:outline-none focus:border-primary focus:bg-surface-container-lowest"
              >
                <option value="National Central Medical Depot (Urgent Air Transit)">National Central Medical Depot (Urgent Air Transit)</option>
                <option value="Regional Medical Warehouse District 02 (Inter-district Rebalance)">Regional Medical Warehouse District 02 (Inter-district Rebalance)</option>
                <option value="State Strategic Reserve Depot (Emergency Stockpile)">State Strategic Reserve Depot (Emergency Stockpile)</option>
              </select>
            </div>

            {targetMed && (
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between text-body-sm">
                <div>
                  <span className="text-on-surface-variant">Post-reorder reserve projection:</span>
                  <p className="font-semibold text-tertiary-container font-mono">
                    +{orderQty} units → {targetMed.currentStock + Number(orderQty)} {targetMed.unit} ({( (targetMed.currentStock + Number(orderQty)) / targetMed.consumptionVelocity ).toFixed(1)} days reserve)
                  </p>
                </div>
                <span className="material-symbols-outlined text-tertiary-container text-[24px]">verified</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant/20">
              <button
                type="button"
                onClick={() => setIsEmergencyModalOpen(false)}
                className="px-4 py-2.5 rounded-lg border border-outline-variant/60 text-on-surface font-label-md hover:bg-surface-container-low transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-error text-on-error font-label-md font-bold shadow-md hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                    Authorizing Dispatch...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    Authorize Emergency Dispatch
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
