'use client';

import React, { useState } from 'react';
import { useMediSafe } from '@/context/MediSafeContext';

export default function DataImportPage() {
  const { syncBatches, triggerSync, isSyncing } = useMediSafe();
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleSimulateUpload = (filename: string) => {
    setUploadedFileName(filename);
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (!prev || prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            triggerSync();
            setUploadProgress(null);
          }, 400);
          return 100;
        }
        return prev + 30;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Data Import & Public Health Sync
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-mono text-xs font-bold">
              Gateway Online
            </span>
          </div>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1">
            Automated bidirectional integration with e-Aushadhi (National Portal), DVDMS state warehouses, and bulk clinical CSV/Excel manifests.
          </p>
        </div>

        <button
          onClick={triggerSync}
          disabled={isSyncing}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-bold text-xs shadow-xs transition-colors disabled:opacity-60"
        >
          <span className={`material-symbols-outlined text-[18px] ${isSyncing ? 'animate-spin' : ''}`}>
            sync
          </span>
          <span>{isSyncing ? 'Connecting Gateway...' : 'Trigger Immediate Sync'}</span>
        </button>
      </div>

      {/* Connection Status Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-on-surface-variant font-bold uppercase block">
              e-Aushadhi National Gateway
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-sm font-bold text-on-surface">SYNCHRONIZED</span>
            </div>
            <span className="text-[11px] text-on-surface-variant font-mono">Response: 42ms • TLS 1.3</span>
          </div>
          <span className="material-symbols-outlined text-[32px] text-tertiary-container">hub</span>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-on-surface-variant font-bold uppercase block">
              State DVDMS Warehouse API
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-sm font-bold text-on-surface">LIVE POLLING</span>
            </div>
            <span className="text-[11px] text-on-surface-variant font-mono">Endpoint: /v2.4/dist-04</span>
          </div>
          <span className="material-symbols-outlined text-[32px] text-primary">cloud_sync</span>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-on-surface-variant font-bold uppercase block">
              Reconciliation Checksum
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-sm font-bold text-tertiary-container">99.88% MATCH</span>
            </div>
            <span className="text-[11px] text-on-surface-variant font-mono">Zero silent discrepancy</span>
          </div>
          <span className="material-symbols-outlined text-[32px] text-secondary">verified_user</span>
        </div>
      </div>

      {/* Drag & Drop File Upload Ingestion Zone */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-6 space-y-4">
        <div>
          <h2 className="font-headline text-base font-bold text-on-surface">
            Bulk Manifest Ingestion & Schema Validator
          </h2>
          <p className="text-xs text-on-surface-variant">
            Upload hospital ERP dispensing exports, physical inventory spreadsheets, or distributor delivery invoices (.csv, .xlsx)
          </p>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            const file = e.dataTransfer.files[0];
            if (file) handleSimulateUpload(file.name);
          }}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all ${
            dragActive
              ? 'border-primary bg-primary-fixed/20'
              : 'border-outline-variant/50 bg-surface-container-low/40 hover:bg-surface-container-low'
          }`}
        >
          <div className="max-w-md mx-auto space-y-3">
            <span className="w-12 h-12 rounded-2xl bg-surface-container text-primary flex items-center justify-center mx-auto shadow-xs">
              <span className="material-symbols-outlined text-[28px]">upload_file</span>
            </span>
            <div>
              <p className="font-headline font-bold text-sm text-on-surface">
                Drag and drop your clinical inventory CSV or Excel manifest
              </p>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Supports CDSCO standard CSV, DVDMS bulk manifest, and SAP/Oracle Health formats
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => handleSimulateUpload('district_04_intake_manifest_sept2026.csv')}
                className="px-4 py-2 rounded-lg bg-primary text-on-primary font-bold text-xs shadow-xs hover:bg-primary-container transition-colors"
              >
                Simulate File Ingestion
              </button>
              <button
                onClick={() => {
                  alert('Standard schema headers: SKU, DrugName, Dosage, BatchNumber, ExpiryDate, OpeningBalance, QtyReceived, Dispensed');
                }}
                className="px-4 py-2 rounded-lg border border-outline-variant/50 bg-surface-container-lowest text-on-surface font-semibold text-xs hover:bg-surface-container transition-colors"
              >
                Download Manifest Schema
              </button>
            </div>
          </div>
        </div>

        {uploadProgress !== null && (
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-on-surface flex items-center gap-1.5 font-mono">
                <span className="material-symbols-outlined text-[16px] text-primary">description</span>
                Ingesting {uploadedFileName}...
              </span>
              <span className="font-mono text-primary font-bold">{uploadProgress}%</span>
            </div>
            <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Sync Ledger History */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 overflow-hidden">
        <div className="p-5 border-b border-outline-variant/20 flex items-center justify-between">
          <div>
            <h2 className="font-headline text-base font-bold text-on-surface">
              Recent Ingestion & Reconciliation History
            </h2>
            <p className="font-body text-xs text-on-surface-variant">
              Complete historical record of automated API sync runs and manual uploads
            </p>
          </div>
          <span className="text-xs font-mono text-on-surface-variant">Live audit ledger</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant font-label text-[11px] uppercase tracking-wider border-b border-outline-variant/20">
              <tr>
                <th className="py-3 px-4 font-bold">Sync Batch ID</th>
                <th className="py-3 px-4 font-bold">Source Portal</th>
                <th className="py-3 px-4 font-bold">Timestamp</th>
                <th className="py-3 px-4 font-bold">SKUs Processed</th>
                <th className="py-3 px-4 font-bold">Reconciled</th>
                <th className="py-3 px-4 font-bold">Discrepancies</th>
                <th className="py-3 px-4 font-bold text-right">Integrity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-mono">
              {syncBatches.map((batch) => (
                <tr key={batch.id} className="hover:bg-surface-container-low/50">
                  <td className="py-3.5 px-4 font-bold text-primary">{batch.id}</td>
                  <td className="py-3.5 px-4 font-sans font-semibold text-on-surface">
                    {batch.source}
                  </td>
                  <td className="py-3.5 px-4 text-on-surface-variant">{batch.timestamp}</td>
                  <td className="py-3.5 px-4">{batch.recordsSynced} SKUs</td>
                  <td className="py-3.5 px-4 text-tertiary-container font-bold">{batch.reconciledCount}</td>
                  <td className="py-3.5 px-4">
                    {batch.flaggedDiscrepancies > 0 ? (
                      <span className="text-error font-bold">{batch.flaggedDiscrepancies} flagged</span>
                    ) : (
                      <span className="text-on-surface-variant">0</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold">
                      <span className="material-symbols-outlined text-[12px]">verified</span>
                      {batch.status}
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
