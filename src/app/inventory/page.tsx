'use client';

import React, { useState } from 'react';
import { useMediSafe } from '@/context/MediSafeContext';
import { MedicineItem } from '@/lib/types';

export default function InventoryPage() {
  const { medicines, setSelectedMedicine, setIsEmergencyModalOpen } = useMediSafe();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [coldChainOnly, setColdChainOnly] = useState(false);
  const [isAddMedModalOpen, setIsAddMedModalOpen] = useState(false);

  // New med state for quick addition
  const [newMedName, setNewMedName] = useState('');
  const [newMedSku, setNewMedSku] = useState('');
  const [newMedCategory, setNewMedCategory] = useState<'Antibiotics' | 'Cardiovascular' | 'Emergency & Critical' | 'Analgesics' | 'Respiratory' | 'Endocrine'>('Antibiotics');
  const [newMedStock, setNewMedStock] = useState(500);

  const filtered = medicines.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.sku.toLowerCase().includes(search.toLowerCase()) ||
      m.batchNumber.toLowerCase().includes(search.toLowerCase()) ||
      m.dosage.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || m.status === selectedStatus;
    const matchesColdChain = !coldChainOnly || m.coldChainRequired;
    return matchesSearch && matchesCategory && matchesStatus && matchesColdChain;
  });

  const criticalCount = medicines.filter((m) => m.status === 'Critical Risk').length;
  const lowCount = medicines.filter((m) => m.status === 'Low Stock').length;
  const normalCount = medicines.filter((m) => m.status === 'In Stock').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Medicine Inventory Catalog
          </h1>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1">
            Comprehensive clinical SKU tracking, batch custody, and formulary balance control.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              const csvContent =
                'data:text/csv;charset=utf-8,' +
                'SKU,Name,Category,Dosage,CurrentStock,Unit,BatchNumber,ExpiryDate,DaysRemaining,Status\n' +
                medicines
                  .map(
                    (m) =>
                      `"${m.sku}","${m.name}","${m.category}","${m.dosage}",${m.currentStock},"${m.unit}","${m.batchNumber}","${m.expiryDate}",${m.daysRemaining},"${m.status}"`
                  )
                  .join('\n');
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement('a');
              link.setAttribute('href', encodedUri);
              link.setAttribute('download', `medisafe-inventory-${new Date().toISOString().slice(0, 10)}.csv`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-colors font-label text-xs font-semibold shadow-xs border border-outline-variant/40"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAddMedModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors font-label text-xs font-bold shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Register New SKU</span>
          </button>
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs text-on-surface-variant font-bold uppercase">Total Tracked SKUs</span>
          <div className="text-2xl font-extrabold text-on-surface font-mono mt-1">{medicines.length}</div>
          <span className="text-[11px] text-on-surface-variant">Across 6 medical categories</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-error-container shadow-xs">
          <span className="text-xs text-error font-bold uppercase">Critical Depletion (&lt; 5d)</span>
          <div className="text-2xl font-extrabold text-error font-mono mt-1">{criticalCount}</div>
          <span className="text-[11px] text-error font-semibold">Immediate reorder required</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-amber-200 shadow-xs">
          <span className="text-xs text-amber-800 font-bold uppercase">Low Stock Warning</span>
          <div className="text-2xl font-extrabold text-amber-700 font-mono mt-1">{lowCount}</div>
          <span className="text-[11px] text-amber-800">5 to 10 days reserve</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-tertiary-fixed shadow-xs">
          <span className="text-xs text-tertiary-container font-bold uppercase">Adequate Stock</span>
          <div className="text-2xl font-extrabold text-tertiary-container font-mono mt-1">{normalCount}</div>
          <span className="text-[11px] text-tertiary-container font-semibold">&gt; 10 days reserve</span>
        </div>
      </div>

      {/* Main Inventory Card */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 overflow-hidden">
        {/* Filter Controls */}
        <div className="p-4 sm:p-5 border-b border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center bg-surface-container-low px-3 py-2 rounded-lg gap-2 text-xs border border-outline-variant/30 flex-1 max-w-md">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">search</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by drug name, SKU, or batch number..."
                className="bg-transparent outline-none w-full text-on-surface placeholder:text-outline"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-on-surface-variant hover:text-on-surface">
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-xs text-on-surface outline-none font-semibold"
            >
              <option value="All">All Statuses</option>
              <option value="Critical Risk">Critical Risk</option>
              <option value="Low Stock">Low Stock</option>
              <option value="In Stock">In Stock</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-on-surface-variant cursor-pointer select-none">
              <input
                type="checkbox"
                checked={coldChainOnly}
                onChange={(e) => setColdChainOnly(e.target.checked)}
                className="rounded text-primary focus:ring-0"
              />
              <span className="flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[16px] text-primary">ac_unit</span>
                Cold-Chain Only (2-8°C)
              </span>
            </label>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="px-4 py-2.5 bg-surface-container-low/40 border-b border-outline-variant/20 flex items-center gap-2 overflow-x-auto">
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant font-label text-[11px] uppercase tracking-wider border-b border-outline-variant/20">
              <tr>
                <th className="py-3 px-4 font-bold">Medication Name & SKU</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Batch & Expiry</th>
                <th className="py-3 px-4 font-bold">Current Reserve</th>
                <th className="py-3 px-4 font-bold">Burn Rate</th>
                <th className="py-3 px-4 font-bold">Runout Date</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filtered.map((med) => (
                <tr
                  key={med.id}
                  onClick={() => setSelectedMedicine(med)}
                  className="hover:bg-surface-container-low/60 cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[18px]">medication</span>
                      </div>
                      <div>
                        <span className="font-bold text-on-surface block group-hover:text-primary transition-colors text-sm">
                          {med.name}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-on-surface-variant">
                          <span>{med.sku}</span>
                          <span>•</span>
                          <span>{med.dosage}</span>
                          {med.coldChainRequired && (
                            <span className="text-primary font-semibold flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[12px]">ac_unit</span> Cold-Chain
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-medium text-on-surface-variant">
                    {med.category}
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    <span className="font-semibold text-on-surface block">{med.batchNumber}</span>
                    <span className="text-[11px] text-on-surface-variant">Exp: {med.expiryDate}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-on-surface text-sm">
                      {med.currentStock.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-on-surface-variant block">{med.unit} on shelf</span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-on-surface-variant">
                    {med.consumptionVelocity} {med.unit}/day
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    <span className="font-bold text-on-surface block">{med.predictedStockoutDate}</span>
                    <span className="text-[10px] text-on-surface-variant">{med.daysRemaining} days left</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-mono text-[10px] font-bold ${
                        med.status === 'Critical Risk'
                          ? 'bg-error-container text-on-error-container'
                          : med.status === 'Low Stock'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-tertiary-fixed text-on-tertiary-fixed'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[12px]">
                        {med.status === 'Critical Risk' ? 'warning' : 'check_circle'}
                      </span>
                      {med.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedMedicine(med)}
                        className="px-2.5 py-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-[11px] transition-colors"
                      >
                        Inspect
                      </button>
                      {med.status === 'Critical Risk' && (
                        <button
                          onClick={() => setIsEmergencyModalOpen(true)}
                          className="px-2.5 py-1 rounded bg-error text-on-error hover:bg-red-700 font-bold text-[11px] transition-colors"
                        >
                          Reorder
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-surface-container-low/40 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant font-mono">
          <span>Showing {filtered.length} of {medicines.length} matching entries</span>
          <span>DVDMS / e-Aushadhi Verified</span>
        </div>
      </div>

      {/* Add New Medicine Modal */}
      {isAddMedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/30 p-6 w-full max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-lg font-bold text-on-surface">Register New Formulary SKU</h3>
              <button
                onClick={() => setIsAddMedModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsAddMedModalOpen(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-semibold text-on-surface mb-1">Medication Generic Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ciprofloxacin HCl"
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/40 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">SKU Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SKU-CIPR-500"
                  value={newMedSku}
                  onChange={(e) => setNewMedSku(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/40 outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">Category</label>
                  <select
                    value={newMedCategory}
                    onChange={(e) => setNewMedCategory(e.target.value as any)}
                    className="w-full h-10 px-2 rounded-lg bg-surface-container-low border border-outline-variant/40 outline-none"
                  >
                    <option value="Antibiotics">Antibiotics</option>
                    <option value="Cardiovascular">Cardiovascular</option>
                    <option value="Emergency & Critical">Emergency & Critical</option>
                    <option value="Analgesics">Analgesics</option>
                    <option value="Respiratory">Respiratory</option>
                    <option value="Endocrine">Endocrine</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">Initial Stock Intake</label>
                  <input
                    type="number"
                    value={newMedStock}
                    onChange={(e) => setNewMedStock(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/40 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setIsAddMedModalOpen(false)}
                  className="px-3.5 py-2 rounded-lg border border-outline-variant/50 text-on-surface font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary font-bold shadow-xs hover:bg-primary-container transition-colors"
                >
                  Save to Formulary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
