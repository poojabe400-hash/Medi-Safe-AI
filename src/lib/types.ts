export type StockStatus = 'In Stock' | 'Low Stock' | 'Critical Risk' | 'Overstocked';

export interface MedicineItem {
  id: string;
  sku: string;
  name: string;
  category: 'Antibiotics' | 'Cardiovascular' | 'Emergency & Critical' | 'Analgesics' | 'Respiratory' | 'Endocrine';
  dosage: string;
  currentStock: number;
  minThreshold: number;
  unit: string;
  batchNumber: string;
  expiryDate: string;
  consumptionVelocity: number; // units/day
  daysRemaining: number;
  riskScore: number; // 0-100%
  predictedStockoutDate: string;
  status: StockStatus;
  leadTimeDays: number;
  coldChainRequired: boolean;
  dvdmsMapped: boolean;
}

export interface AlertItem {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  medicineSku?: string;
  medicineName?: string;
  timestamp: string;
  acknowledged: boolean;
  actionRequired: string;
}

export interface StockLogEntry {
  id: string;
  timestamp: string;
  medicineName: string;
  sku: string;
  openingBalance: number;
  intakeQty: number;
  dispensedQty: number;
  lossDamagedQty: number;
  closingBalance: number;
  loggedBy: string;
  status: 'Verified' | 'Pending Audit';
}

export interface ImportSyncBatch {
  id: string;
  source: 'e-Aushadhi (National)' | 'DVDMS State Portal' | 'Manual CSV Intake';
  timestamp: string;
  recordsSynced: number;
  reconciledCount: number;
  flaggedDiscrepancies: number;
  status: 'Completed' | 'Syncing' | 'Requires Review';
}
