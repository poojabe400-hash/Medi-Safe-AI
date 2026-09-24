'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MedicineItem, AlertItem, StockLogEntry, ImportSyncBatch } from '@/lib/types';
import { INITIAL_MEDICINES, INITIAL_ALERTS, INITIAL_LOGS, INITIAL_SYNC_BATCHES } from '@/lib/mockData';

interface MediSafeContextType {
  medicines: MedicineItem[];
  alerts: AlertItem[];
  stockLogs: StockLogEntry[];
  syncBatches: ImportSyncBatch[];
  selectedMedicine: MedicineItem | null;
  setSelectedMedicine: (med: MedicineItem | null) => void;
  isEmergencyModalOpen: boolean;
  setIsEmergencyModalOpen: (open: boolean) => void;
  isCommandKOpen: boolean;
  setIsCommandKOpen: (open: boolean) => void;
  activeDistrict: string;
  setActiveDistrict: (district: string) => void;
  // Actions
  dispatchEmergencyReorder: (sku: string, orderQuantity: number, expeditedSupplier: string) => void;
  submitStockUpdate: (log: Omit<StockLogEntry, 'id' | 'timestamp' | 'status'>) => void;
  acknowledgeAlert: (alertId: string) => void;
  triggerSync: () => Promise<void>;
  isSyncing: boolean;
}

const MediSafeContext = createContext<MediSafeContextType | undefined>(undefined);

export function MediSafeProvider({ children }: { children: React.ReactNode }) {
  const [medicines, setMedicines] = useState<MedicineItem[]>(INITIAL_MEDICINES);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [stockLogs, setStockLogs] = useState<StockLogEntry[]>(INITIAL_LOGS);
  const [syncBatches, setSyncBatches] = useState<ImportSyncBatch[]>(INITIAL_SYNC_BATCHES);
  const [selectedMedicine, setSelectedMedicine] = useState<MedicineItem | null>(null);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isCommandKOpen, setIsCommandKOpen] = useState(false);
  const [activeDistrict, setActiveDistrict] = useState('Central Regional Medical Store - District 04');
  const [isSyncing, setIsSyncing] = useState(false);

  // Global Keyboard listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandKOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const dispatchEmergencyReorder = (sku: string, orderQuantity: number, expeditedSupplier: string) => {
    setMedicines((prev) =>
      prev.map((med) => {
        if (med.sku === sku) {
          const newStock = med.currentStock + orderQuantity;
          const newDays = parseFloat((newStock / med.consumptionVelocity).toFixed(1));
          return {
            ...med,
            currentStock: newStock,
            daysRemaining: newDays,
            riskScore: Math.max(10, med.riskScore - 50),
            status: newDays > 10 ? 'In Stock' : 'Low Stock',
            predictedStockoutDate: `${newDays} Days (${new Date(Date.now() + newDays * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`,
          };
        }
        return med;
      })
    );

    const targetMed = medicines.find((m) => m.sku === sku);
    const newAlert: AlertItem = {
      id: `alt-${Date.now()}`,
      severity: 'info',
      title: `Emergency Dispatch Confirmed: ${targetMed?.name || sku}`,
      message: `Emergency allocation of ${orderQuantity} units dispatched via ${expeditedSupplier}. Estimated arrival: 18 hours.`,
      medicineSku: sku,
      medicineName: targetMed?.name,
      timestamp: 'Just now',
      acknowledged: false,
      actionRequired: 'Inspect incoming courier cold-chain log upon delivery',
    };
    setAlerts((prev) => [newAlert, ...prev]);
  };

  const submitStockUpdate = (logData: Omit<StockLogEntry, 'id' | 'timestamp' | 'status'>) => {
    const newEntry: StockLogEntry = {
      ...logData,
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      status: 'Verified',
    };

    setStockLogs((prev) => [newEntry, ...prev]);

    // Update medicine current stock
    setMedicines((prev) =>
      prev.map((med) => {
        if (med.sku === logData.sku) {
          const updatedStock = logData.closingBalance;
          const updatedDays = parseFloat((updatedStock / med.consumptionVelocity).toFixed(1));
          let status: MedicineItem['status'] = 'In Stock';
          if (updatedDays <= 5) status = 'Critical Risk';
          else if (updatedDays <= 10) status = 'Low Stock';

          return {
            ...med,
            currentStock: updatedStock,
            daysRemaining: updatedDays,
            status,
            riskScore: updatedDays <= 5 ? 92 : updatedDays <= 10 ? 65 : 20,
          };
        }
        return med;
      })
    );
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) => (alert.id === alertId ? { ...alert, acknowledged: true } : alert))
    );
  };

  const triggerSync = async () => {
    setIsSyncing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const newBatch: ImportSyncBatch = {
      id: `SYNC-2026-${Math.floor(100 + Math.random() * 900)}`,
      source: 'DVDMS State Portal',
      timestamp: 'Just now',
      recordsSynced: 1248,
      reconciledCount: 1248,
      flaggedDiscrepancies: 0,
      status: 'Completed',
    };
    setSyncBatches((prev) => [newBatch, ...prev]);
    setIsSyncing(false);
  };

  return (
    <MediSafeContext.Provider
      value={{
        medicines,
        alerts,
        stockLogs,
        syncBatches,
        selectedMedicine,
        setSelectedMedicine,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        isCommandKOpen,
        setIsCommandKOpen,
        activeDistrict,
        setActiveDistrict,
        dispatchEmergencyReorder,
        submitStockUpdate,
        acknowledgeAlert,
        triggerSync,
        isSyncing,
      }}
    >
      {children}
    </MediSafeContext.Provider>
  );
}

export function useMediSafe() {
  const context = useContext(MediSafeContext);
  if (!context) {
    throw new Error('useMediSafe must be used within a MediSafeProvider');
  }
  return context;
}
