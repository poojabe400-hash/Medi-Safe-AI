'use client';

import React, { useState } from 'react';

interface ReportArchiveItem {
  id: string;
  title: string;
  category: string;
  generatedDate: string;
  fileFormat: 'PDF' | 'XLSX' | 'CSV';
  fileSize: string;
  certifiedBy: string;
}

const INITIAL_REPORTS: ReportArchiveItem[] = [
  {
    id: 'REP-2026-088',
    title: 'WHO Model List of Essential Medicines (EML) Compliance Dossier',
    category: 'Regulatory',
    generatedDate: 'Today, 07:00 AM',
    fileFormat: 'PDF',
    fileSize: '3.4 MB',
    certifiedBy: 'Dr. Aris Thorne (Chief Custodian)',
  },
  {
    id: 'REP-2026-087',
    title: 'CDSCO Schedule H1 Antibiotic & Narcotic Dispensing Audit',
    category: 'Statutory Ledger',
    generatedDate: 'Yesterday, 06:30 PM',
    fileFormat: 'XLSX',
    fileSize: '1.8 MB',
    certifiedBy: 'Pharmacist M. Patel',
  },
  {
    id: 'REP-2026-085',
    title: '30-Day Predictive Stockout & Demand Surge Risk Assessment',
    category: 'AI Telemetry',
    generatedDate: 'Sept 20, 09:15 AM',
    fileFormat: 'PDF',
    fileSize: '4.9 MB',
    certifiedBy: 'MediSafe AI Engine (Auto-sign)',
  },
  {
    id: 'REP-2026-081',
    title: 'Cold-Chain Refrigerator Telemetry & Temperature Log (2-8°C)',
    category: 'Quality Control',
    generatedDate: 'Sept 18, 08:00 AM',
    fileFormat: 'CSV',
    fileSize: '620 KB',
    certifiedBy: 'IoT Sensor Node Unit 02',
  },
];

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportArchiveItem[]>(INITIAL_REPORTS);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [generatingTemplate, setGeneratingTemplate] = useState<string | null>(null);

  const handleDownload = (rep: ReportArchiveItem) => {
    setDownloadingId(rep.id);
    setTimeout(() => {
      // Simulate file download
      const element = document.createElement('a');
      const file = new Blob([`MediSafe AI Certified Report: ${rep.title}\nID: ${rep.id}\nGenerated: ${rep.generatedDate}\nCertified: ${rep.certifiedBy}`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${rep.id}-${rep.title.slice(0, 20)}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setDownloadingId(null);
    }, 600);
  };

  const handleGenerateTemplate = (title: string, category: string, fileFormat: 'PDF' | 'XLSX' | 'CSV') => {
    setGeneratingTemplate(title);
    setTimeout(() => {
      const newRep: ReportArchiveItem = {
        id: `REP-2026-${Math.floor(100 + Math.random() * 900)}`,
        title,
        category,
        generatedDate: 'Just now',
        fileFormat,
        fileSize: '2.8 MB',
        certifiedBy: 'Dr. Aris Thorne (Signed Session)',
      };
      setReports([newRep, ...reports]);
      setGeneratingTemplate(null);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Regulatory & Inventory Reports Hub
          </h1>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1">
            Automated compliance dossiers, WHO Essential Drug fulfillment summaries, CDSCO Schedule H1 registers, and custom data extracts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            FDA 21 CFR Part 11 Electronic Signature Ready
          </span>
        </div>
      </div>

      {/* 4 Standard Dossier Templates */}
      <div className="space-y-3">
        <h2 className="font-headline text-base font-bold text-on-surface">
          Standard Regulatory & Clinical Dossier Templates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Template 1 */}
          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col justify-between gap-3 hover:shadow-sm transition-shadow">
            <div className="space-y-1.5">
              <span className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </span>
              <h3 className="font-bold text-xs text-on-surface">
                WHO Essential Medicines (EML) Dossier
              </h3>
              <p className="text-[11px] text-on-surface-variant leading-normal">
                Validates depot adherence to the Model List of Essential Drugs and emergency reserves.
              </p>
            </div>
            <button
              onClick={() => handleGenerateTemplate('WHO Essential Medicines (EML) Audit', 'Regulatory', 'PDF')}
              disabled={generatingTemplate !== null}
              className="w-full py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-colors disabled:opacity-50"
            >
              {generatingTemplate === 'WHO Essential Medicines (EML) Audit' ? 'Generating...' : 'Generate PDF'}
            </button>
          </div>

          {/* Template 2 */}
          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col justify-between gap-3 hover:shadow-sm transition-shadow">
            <div className="space-y-1.5">
              <span className="w-8 h-8 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">lock</span>
              </span>
              <h3 className="font-bold text-xs text-on-surface">
                CDSCO Schedule H1 Antibiotic Register
              </h3>
              <p className="text-[11px] text-on-surface-variant leading-normal">
                Mandatory statutory ledger of restricted antimicrobials and prescribing physicians.
              </p>
            </div>
            <button
              onClick={() => handleGenerateTemplate('CDSCO Schedule H1 Register', 'Statutory Ledger', 'XLSX')}
              disabled={generatingTemplate !== null}
              className="w-full py-1.5 rounded-lg bg-secondary text-on-secondary text-xs font-bold hover:bg-blue-800 transition-colors disabled:opacity-50"
            >
              {generatingTemplate === 'CDSCO Schedule H1 Register' ? 'Generating...' : 'Generate Excel'}
            </button>
          </div>

          {/* Template 3 */}
          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col justify-between gap-3 hover:shadow-sm transition-shadow">
            <div className="space-y-1.5">
              <span className="w-8 h-8 rounded-lg bg-error-container text-on-error-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">warning</span>
              </span>
              <h3 className="font-bold text-xs text-on-surface">
                30-Day Predictive Stockout Assessment
              </h3>
              <p className="text-[11px] text-on-surface-variant leading-normal">
                Detailed Bayesian prediction digest highlighting top vulnerabilities and buffer deficits.
              </p>
            </div>
            <button
              onClick={() => handleGenerateTemplate('30-Day Stockout Vulnerability Audit', 'AI Telemetry', 'PDF')}
              disabled={generatingTemplate !== null}
              className="w-full py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/40 hover:bg-surface-container text-on-surface text-xs font-bold transition-colors disabled:opacity-50"
            >
              {generatingTemplate === '30-Day Stockout Vulnerability Audit' ? 'Generating...' : 'Generate PDF'}
            </button>
          </div>

          {/* Template 4 */}
          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col justify-between gap-3 hover:shadow-sm transition-shadow">
            <div className="space-y-1.5">
              <span className="w-8 h-8 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">ac_unit</span>
              </span>
              <h3 className="font-bold text-xs text-on-surface">
                Cold-Chain Excursion Quality Audit
              </h3>
              <p className="text-[11px] text-on-surface-variant leading-normal">
                Continuous IoT sensor temperature logs for biologics, insulins, and critical vaccines.
              </p>
            </div>
            <button
              onClick={() => handleGenerateTemplate('Cold-Chain Sensor Audit', 'Quality Control', 'CSV')}
              disabled={generatingTemplate !== null}
              className="w-full py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/40 hover:bg-surface-container text-on-surface text-xs font-bold transition-colors disabled:opacity-50"
            >
              {generatingTemplate === 'Cold-Chain Sensor Audit' ? 'Generating...' : 'Generate CSV'}
            </button>
          </div>
        </div>
      </div>

      {/* Recent Generated Reports Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 overflow-hidden">
        <div className="p-5 border-b border-outline-variant/20 flex items-center justify-between">
          <div>
            <h2 className="font-headline text-base font-bold text-on-surface">
              Recent Generated Reports & Audit Archive
            </h2>
            <p className="font-body text-xs text-on-surface-variant">
              Cryptographically signed archive of official healthcare submissions
            </p>
          </div>
          <span className="text-xs font-mono text-on-surface-variant">Immutable Archive</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant font-label text-[11px] uppercase tracking-wider border-b border-outline-variant/20">
              <tr>
                <th className="py-3 px-4 font-bold">Dossier ID</th>
                <th className="py-3 px-4 font-bold">Report Title</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Timestamp</th>
                <th className="py-3 px-4 font-bold">Format</th>
                <th className="py-3 px-4 font-bold">Certified Sign-Off</th>
                <th className="py-3 px-4 font-bold text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-mono">
              {reports.map((rep) => (
                <tr key={rep.id} className="hover:bg-surface-container-low/50">
                  <td className="py-3.5 px-4 font-bold text-primary">{rep.id}</td>
                  <td className="py-3.5 px-4 font-sans font-bold text-on-surface text-sm">
                    {rep.title}
                  </td>
                  <td className="py-3.5 px-4 font-sans text-on-surface-variant">
                    {rep.category}
                  </td>
                  <td className="py-3.5 px-4 text-on-surface-variant">{rep.generatedDate}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-bold text-[10px]">
                      {rep.fileFormat} ({rep.fileSize})
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-sans text-on-surface text-xs">
                    {rep.certifiedBy}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDownload(rep)}
                      disabled={downloadingId === rep.id}
                      className="px-3 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-bold text-xs transition-colors flex items-center gap-1.5 ml-auto border border-outline-variant/30"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {downloadingId === rep.id ? 'downloading' : 'download'}
                      </span>
                      <span>{downloadingId === rep.id ? 'Fetching...' : 'Download'}</span>
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
