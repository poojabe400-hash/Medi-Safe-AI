'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMediSafe } from '@/context/MediSafeContext';

const NAV_SHORTCUTS = [
  { name: 'Dashboard Overview', path: '/', icon: 'dashboard', section: 'Clinical Operations' },
  { name: 'Medicine Inventory', path: '/inventory', icon: 'medication', section: 'Clinical Operations' },
  { name: 'Daily Stock & Consumption Logging', path: '/daily-stock-update', icon: 'inventory_2', section: 'Clinical Operations' },
  { name: 'Sales & Consumption Telemetry', path: '/sales-and-consumption', icon: 'trending_up', section: 'Clinical Operations' },
  { name: 'AI Stockout Predictions (ML 4.2)', path: '/stockout-predictions', icon: 'neurology', section: 'Clinical Operations' },
  { name: 'Executive Inventory Analytics', path: '/analytics', icon: 'analytics', section: 'Clinical Operations' },
  { name: 'Alerts & Notifications Command', path: '/alerts', icon: 'warning', section: 'Clinical Operations' },
  { name: 'Data Import (e-Aushadhi / DVDMS)', path: '/data-import', icon: 'cloud_download', section: 'Administration' },
  { name: 'Reports & Regulatory Hub', path: '/reports', icon: 'description', section: 'Administration' },
  { name: 'System Settings & Governance', path: '/settings', icon: 'settings', section: 'Administration' },
];

export default function CommandKModal() {
  const router = useRouter();
  const { isCommandKOpen, setIsCommandKOpen, medicines, setSelectedMedicine } = useMediSafe();
  const [query, setQuery] = useState('');

  if (!isCommandKOpen) return null;

  const filteredNav = NAV_SHORTCUTS.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredMeds = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.sku.toLowerCase().includes(query.toLowerCase()) ||
      m.category.toLowerCase().includes(query.toLowerCase()) ||
      m.batchNumber.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectNav = (path: string) => {
    setIsCommandKOpen(false);
    router.push(path);
  };

  const handleSelectMed = (med: typeof medicines[0]) => {
    setIsCommandKOpen(false);
    setSelectedMedicine(med);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-inverse-surface/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-outline-variant/30 gap-3">
          <span className="material-symbols-outlined text-on-surface-variant text-[22px]">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            placeholder="Search medications, batch IDs, clinical formulations, or jump to page..."
            className="w-full bg-transparent outline-none font-body-md text-on-surface placeholder:text-outline text-base"
          />
          <kbd className="px-2 py-0.5 rounded bg-surface-container-low text-on-surface-variant font-mono text-xs border border-outline-variant/40">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="overflow-y-auto p-3 space-y-4">
          {filteredMeds.length > 0 && (
            <div>
              <span className="px-3 py-1 font-label-sm uppercase tracking-wider text-on-surface-variant/80 font-bold block">
                Medicines & SKUs ({filteredMeds.length})
              </span>
              <div className="space-y-1 mt-1">
                {filteredMeds.slice(0, 6).map((med) => (
                  <button
                    key={med.id}
                    onClick={() => handleSelectMed(med)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-surface-container-low transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">medication</span>
                      </span>
                      <div>
                        <span className="font-label-md font-semibold text-on-surface block group-hover:text-primary">
                          {med.name}
                        </span>
                        <span className="font-body-sm text-on-surface-variant text-xs font-mono">
                          {med.sku} • Batch {med.batchNumber} • {med.dosage}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          med.status === 'Critical Risk'
                            ? 'bg-error-container text-on-error-container'
                            : med.status === 'Low Stock'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-tertiary-fixed text-on-tertiary-fixed'
                        }`}
                      >
                        {med.status} ({med.daysRemaining}d)
                      </span>
                      <span className="material-symbols-outlined text-outline-variant text-[18px]">arrow_forward</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredNav.length > 0 && (
            <div>
              <span className="px-3 py-1 font-label-sm uppercase tracking-wider text-on-surface-variant/80 font-bold block">
                Navigation Shortcuts
              </span>
              <div className="space-y-1 mt-1">
                {filteredNav.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleSelectNav(item.path)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-surface-container-low transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
                        <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      </span>
                      <div>
                        <span className="font-label-md font-semibold text-on-surface block group-hover:text-primary">
                          {item.name}
                        </span>
                        <span className="font-body-sm text-on-surface-variant text-xs">
                          {item.section}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-outline-variant font-mono">Jump</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredMeds.length === 0 && filteredNav.length === 0 && (
            <div className="p-8 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[36px] text-outline mb-2">search_off</span>
              <p className="font-body-md">No medications or routes matched "{query}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-between text-xs text-on-surface-variant font-mono">
          <span>Use ⌘K or Ctrl+K anywhere</span>
          <button onClick={() => setIsCommandKOpen(false)} className="hover:text-on-surface">Close Dialog</button>
        </div>
      </div>
    </div>
  );
}
