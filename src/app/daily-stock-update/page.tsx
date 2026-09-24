'use client';

import React, { useState } from 'react';
import { useMediSafe } from '@/context/MediSafeContext';

export default function DailyStockUpdatePage() {
  const { medicines, stockLogs, submitStockUpdate } = useMediSafe();

  const [selectedSku, setSelectedSku] = useState(medicines[0]?.sku || 'SKU-AMOX-500');
  const targetMed = medicines.find((m) => m.sku === selectedSku) || medicines[0];

  const [intakeQty, setIntakeQty] = useState(0);
  const [dispensedQty, setDispensedQty] = useState(targetMed.consumptionVelocity || 50);
  const [lossDamagedQty, setLossDamagedQty] = useState(0);
  const [loggedBy, setLoggedBy] = useState('Dr. Aris Thorne');
  const [isScanning, setIsScanning] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Live calculated closing balance
  const closingBalance = Math.max(0, targetMed.currentStock + Number(intakeQty) - Number(dispensedQty) - Number(lossDamagedQty));

  const handleSelectMed = (sku: string) => {
    setSelectedSku(sku);
    const med = medicines.find((m) => m.sku === sku);
    if (med) {
      setDispensedQty(med.consumptionVelocity);
      setIntakeQty(0);
      setLossDamagedQty(0);
    }
  };

  const handleBarcodeScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // pick a random med
      const randomMed = medicines[Math.floor(Math.random() * medicines.length)];
      handleSelectMed(randomMed.sku);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitStockUpdate({
      medicineName: targetMed.name,
      sku: targetMed.sku,
      openingBalance: targetMed.currentStock,
      intakeQty: Number(intakeQty),
      dispensedQty: Number(dispensedQty),
      lossDamagedQty: Number(lossDamagedQty),
      closingBalance,
      loggedBy,
    });
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Daily Stock & Consumption Logging
          </h1>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1">
            Accredited physical count reconciliation, pharmacy dispensing tally, and instant balance audit calculator.
          </p>
        </div>

        <button
          onClick={handleBarcodeScan}
          disabled={isScanning}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 hover:bg-surface-container-low transition-colors text-xs font-bold text-on-surface shadow-xs"
        >
          <span className={`material-symbols-outlined text-[18px] text-primary ${isScanning ? 'animate-spin' : ''}`}>
            {isScanning ? 'progress_activity' : 'barcode_scanner'}
          </span>
          <span>{isScanning ? 'Simulating Scanner...' : 'Scan Medication Barcode'}</span>
        </button>
      </div>

      {/* Success Notification */}
      {showSuccessToast && (
        <div className="p-4 rounded-xl bg-tertiary-fixed text-tertiary border border-tertiary-container/30 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span>Stock update successfully verified and committed to state inventory ledger!</span>
          </div>
          <span className="font-mono text-[11px]">Audit Hash: SHA-256 Verified</span>
        </div>
      )}

      {/* Calculator & Form Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Input Form */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <h2 className="font-headline text-base font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">calculate</span>
              Manual Formulary Entry & Instant Balance Calculator
            </h2>
            <span className="text-xs font-mono bg-surface-container-low px-2.5 py-1 rounded-md text-on-surface-variant font-semibold">
              Live Equation Mode
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-on-surface mb-1">
                Select Medication SKU for Daily Tally
              </label>
              <select
                value={selectedSku}
                onChange={(e) => handleSelectMed(e.target.value)}
                className="w-full h-11 px-3.5 bg-surface-container-low border border-outline-variant/40 rounded-lg text-on-surface font-semibold text-xs focus:bg-surface-container-lowest outline-none"
              >
                {medicines.map((m) => (
                  <option key={m.id} value={m.sku}>
                    {m.name} ({m.sku}) — Current: {m.currentStock} {m.unit}
                  </option>
                ))}
              </select>
            </div>

            {/* Calculations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-surface-container-low/70 border border-outline-variant/30">
              {/* Opening Balance */}
              <div>
                <span className="text-on-surface-variant block mb-1 font-medium">1. Opening Balance</span>
                <div className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg flex items-center font-mono font-bold text-sm text-on-surface">
                  {targetMed.currentStock}
                </div>
                <span className="text-[10px] text-on-surface-variant mt-0.5 block">{targetMed.unit} on shelf</span>
              </div>

              {/* Intake Qty */}
              <div>
                <span className="text-on-surface-variant block mb-1 font-medium">2. Inward Intake (+)</span>
                <input
                  type="number"
                  min="0"
                  value={intakeQty}
                  onChange={(e) => setIntakeQty(Math.max(0, Number(e.target.value)))}
                  className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg font-mono font-bold text-sm text-primary outline-none focus:border-primary"
                />
                <span className="text-[10px] text-primary mt-0.5 block font-semibold">+ Added supply</span>
              </div>

              {/* Dispensed Qty */}
              <div>
                <span className="text-on-surface-variant block mb-1 font-medium">3. Dispensed (-)</span>
                <input
                  type="number"
                  min="0"
                  value={dispensedQty}
                  onChange={(e) => setDispensedQty(Math.max(0, Number(e.target.value)))}
                  className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg font-mono font-bold text-sm text-secondary outline-none focus:border-secondary"
                />
                <span className="text-[10px] text-secondary mt-0.5 block font-semibold">- Wards & OPD</span>
              </div>

              {/* Loss / Damaged */}
              <div>
                <span className="text-on-surface-variant block mb-1 font-medium">4. Loss / Expired (-)</span>
                <input
                  type="number"
                  min="0"
                  value={lossDamagedQty}
                  onChange={(e) => setLossDamagedQty(Math.max(0, Number(e.target.value)))}
                  className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg font-mono font-bold text-sm text-error outline-none focus:border-error"
                />
                <span className="text-[10px] text-error mt-0.5 block font-semibold">- Discard / damage</span>
              </div>
            </div>

            {/* Live Calculated Equation Card */}
            <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold">
                  =
                </span>
                <div>
                  <span className="text-xs font-bold text-on-surface uppercase tracking-wide">
                    Reconciled Closing Stock Balance
                  </span>
                  <p className="text-xs text-on-surface-variant font-mono">
                    {targetMed.currentStock} + {intakeQty} - {dispensedQty} - {lossDamagedQty}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="font-mono text-3xl font-extrabold text-primary">
                  {closingBalance}
                </span>
                <span className="text-xs text-on-surface-variant font-medium block">
                  {targetMed.unit} verified
                </span>
              </div>
            </div>

            {/* Pharmacist & Verification */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block font-semibold text-on-surface mb-1">
                  Responsible Pharmacist / Clinical Custodian
                </label>
                <input
                  type="text"
                  required
                  value={loggedBy}
                  onChange={(e) => setLoggedBy(e.target.value)}
                  className="w-full h-10 px-3 bg-surface-container-low border border-outline-variant/40 rounded-lg text-on-surface outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">
                  Reconciliation Note / Batch Tag
                </label>
                <input
                  type="text"
                  defaultValue={`Physical count verified • Batch ${targetMed.batchNumber}`}
                  className="w-full h-10 px-3 bg-surface-container-low border border-outline-variant/40 rounded-lg text-on-surface outline-none font-mono text-xs"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">fact_check</span>
                Commit & Sign Daily Reconciliation
              </button>
            </div>
          </form>
        </div>

        {/* Right: Custody & Guidelines Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              Regulatory Custody Rules
            </div>
            <ul className="text-xs text-on-surface-variant space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-tertiary-container text-[16px] flex-shrink-0 mt-0.5">check</span>
                <span>All narcotic & Schedule H1 drug tallies require two authorized counter-signatures.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-tertiary-container text-[16px] flex-shrink-0 mt-0.5">check</span>
                <span>Unexplained variance &gt; 3% triggers an automatic audit review in Central Health Portal.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-tertiary-container text-[16px] flex-shrink-0 mt-0.5">check</span>
                <span>Closing balances directly sync to DVDMS state warehouse telemetry nightly.</span>
              </li>
            </ul>
          </div>

          <div className="bg-surface-container-low rounded-2xl border border-outline-variant/30 p-4 text-xs font-mono space-y-2">
            <span className="font-bold text-on-surface block">Terminal Status:</span>
            <div className="flex items-center justify-between text-on-surface-variant">
              <span>DVDMS Connector:</span>
              <span className="text-tertiary-container font-bold">ONLINE</span>
            </div>
            <div className="flex items-center justify-between text-on-surface-variant">
              <span>Last Sync Ledger:</span>
              <span>12 mins ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submitted Logs History */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 overflow-hidden">
        <div className="p-5 border-b border-outline-variant/20 flex items-center justify-between">
          <div>
            <h2 className="font-headline text-base font-bold text-on-surface">
              Today's Submitted Updates Log
            </h2>
            <p className="font-body text-xs text-on-surface-variant">
              Immutable audit ledger of daily intake and consumption entries
            </p>
          </div>
          <span className="text-xs font-mono text-on-surface-variant">
            {stockLogs.length} verified records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant font-label text-[11px] uppercase tracking-wider border-b border-outline-variant/20">
              <tr>
                <th className="py-3 px-4 font-bold">Timestamp</th>
                <th className="py-3 px-4 font-bold">Medicine Name & SKU</th>
                <th className="py-3 px-4 font-bold">Opening</th>
                <th className="py-3 px-4 font-bold">Intake (+)</th>
                <th className="py-3 px-4 font-bold">Dispensed (-)</th>
                <th className="py-3 px-4 font-bold">Losses (-)</th>
                <th className="py-3 px-4 font-bold">Closing Balance</th>
                <th className="py-3 px-4 font-bold">Logged By</th>
                <th className="py-3 px-4 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-mono">
              {stockLogs.map((log) => (
                <tr key={log.id} className="hover:bg-surface-container-low/50">
                  <td className="py-3 px-4 text-on-surface-variant">{log.timestamp}</td>
                  <td className="py-3 px-4 font-sans font-bold text-on-surface">
                    {log.medicineName}
                    <span className="block text-[10px] font-mono text-on-surface-variant font-normal">
                      {log.sku}
                    </span>
                  </td>
                  <td className="py-3 px-4">{log.openingBalance}</td>
                  <td className="py-3 px-4 text-primary font-bold">+{log.intakeQty}</td>
                  <td className="py-3 px-4 text-secondary font-bold">-{log.dispensedQty}</td>
                  <td className="py-3 px-4 text-error font-bold">-{log.lossDamagedQty}</td>
                  <td className="py-3 px-4 text-sm font-extrabold text-on-surface">{log.closingBalance}</td>
                  <td className="py-3 px-4 font-sans text-xs text-on-surface-variant">{log.loggedBy}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold">
                      <span className="material-symbols-outlined text-[12px]">verified</span>
                      {log.status}
                    </span>
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
