'use client';

import React, { useState } from 'react';
import { useMediSafe } from '@/context/MediSafeContext';

export default function AlertsPage() {
  const { alerts, acknowledgeAlert, setIsEmergencyModalOpen, setSelectedMedicine, medicines } = useMediSafe();
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unacknowledged' | 'acknowledged'>('all');

  const filtered = alerts.filter((alt) => {
    const matchesSev = filterSeverity === 'all' || alt.severity === filterSeverity;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'unacknowledged' && !alt.acknowledged) ||
      (filterStatus === 'acknowledged' && alt.acknowledged);
    return matchesSev && matchesStatus;
  });

  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;
  const warningCount = alerts.filter((a) => a.severity === 'warning').length;
  const infoCount = alerts.filter((a) => a.severity === 'info').length;
  const unreadCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Alerts & Notification Command Center
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-error text-on-error font-mono text-xs font-bold animate-pulse">
                {unreadCount} Active
              </span>
            )}
          </div>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1">
            Real-time clinical supply chain telemetry, stockout early warnings, cold-chain excursions, and regulatory exceptions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alerts.forEach((a) => acknowledgeAlert(a.id))}
            className="px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 hover:bg-surface-container-low transition-colors font-label text-xs font-semibold text-on-surface shadow-xs"
          >
            Mark All Acknowledged
          </button>
          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-error text-on-error hover:bg-red-700 transition-colors font-label text-xs font-bold shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">emergency</span>
            <span>Emergency Action</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs Row */}
      <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterSeverity('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filterSeverity === 'all'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All Alerts ({alerts.length})
          </button>
          <button
            onClick={() => setFilterSeverity('critical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
              filterSeverity === 'critical'
                ? 'bg-error text-on-error shadow-xs'
                : 'bg-error-container/40 text-error hover:bg-error-container'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">warning</span>
            Critical ({criticalCount})
          </button>
          <button
            onClick={() => setFilterSeverity('warning')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
              filterSeverity === 'warning'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">info</span>
            Warnings ({warningCount})
          </button>
          <button
            onClick={() => setFilterSeverity('info')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filterSeverity === 'info'
                ? 'bg-secondary text-on-secondary shadow-xs'
                : 'bg-secondary-fixed/50 text-on-secondary-fixed hover:bg-secondary-fixed'
            }`}
          >
            Informational ({infoCount})
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-on-surface-variant font-medium">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="bg-surface-container-low border border-outline-variant/40 rounded-lg px-2.5 py-1 text-on-surface font-semibold outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="unacknowledged">Action Pending</option>
            <option value="acknowledged">Acknowledged</option>
          </select>
        </div>
      </div>

      {/* Alert Cards List */}
      <div className="space-y-3">
        {filtered.map((alt) => {
          const matchedMed = medicines.find((m) => m.sku === alt.medicineSku);

          return (
            <div
              key={alt.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                alt.acknowledged
                  ? 'bg-surface-container-lowest/60 border-outline-variant/20 opacity-80'
                  : alt.severity === 'critical'
                  ? 'bg-surface-container-lowest border-error-container shadow-sm'
                  : 'bg-surface-container-lowest border-outline-variant/40 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <span
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      alt.severity === 'critical'
                        ? 'bg-error-container text-on-error-container'
                        : alt.severity === 'warning'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-secondary-fixed text-on-secondary-fixed'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      {alt.severity === 'critical'
                        ? 'emergency_home'
                        : alt.severity === 'warning'
                        ? 'warning'
                        : 'notifications'}
                    </span>
                  </span>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-headline font-bold text-sm sm:text-base text-on-surface">
                        {alt.title}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          alt.severity === 'critical'
                            ? 'bg-error text-on-error'
                            : alt.severity === 'warning'
                            ? 'bg-amber-600 text-white'
                            : 'bg-secondary text-white'
                        }`}
                      >
                        {alt.severity}
                      </span>
                      {alt.acknowledged ? (
                        <span className="text-[10px] font-mono text-tertiary-container font-semibold flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">done_all</span> Acknowledged
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-error font-bold flex items-center gap-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping" /> Action Needed
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {alt.message}
                    </p>

                    <div className="pt-2 flex items-center gap-4 text-xs font-mono text-on-surface-variant flex-wrap">
                      <span>Timestamp: <strong>{alt.timestamp}</strong></span>
                      {alt.medicineSku && (
                        <span>
                          Target: <strong>{alt.medicineName} ({alt.medicineSku})</strong>
                        </span>
                      )}
                    </div>

                    <div className="mt-2 p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface">
                      <span className="font-bold text-primary mr-1">Mandated Action:</span>
                      {alt.actionRequired}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-end gap-2 flex-shrink-0">
                  {!alt.acknowledged && (
                    <button
                      onClick={() => acknowledgeAlert(alt.id)}
                      className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs transition-colors"
                    >
                      Acknowledge
                    </button>
                  )}
                  {alt.severity === 'critical' && (
                    <button
                      onClick={() => setIsEmergencyModalOpen(true)}
                      className="px-3.5 py-1.5 rounded-lg bg-error text-on-error hover:bg-red-700 font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">bolt</span>
                      Execute Order
                    </button>
                  )}
                  {matchedMed && (
                    <button
                      onClick={() => setSelectedMedicine(matchedMed)}
                      className="px-3 py-1.5 rounded-lg border border-outline-variant/50 hover:bg-surface-container-low text-on-surface-variant text-xs font-semibold"
                    >
                      Inspect SKU
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-12 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant/30">
            <span className="material-symbols-outlined text-[48px] text-tertiary-container mb-2">
              check_circle
            </span>
            <h3 className="font-headline font-bold text-base text-on-surface">No alerts match current filter</h3>
            <p className="text-xs text-on-surface-variant mt-1">All clinical parameters within tolerance</p>
          </div>
        )}
      </div>
    </div>
  );
}
