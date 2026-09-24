'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMediSafe } from '@/context/MediSafeContext';
import EmergencyReorderModal from '@/components/modals/EmergencyReorderModal';
import CommandKModal from '@/components/modals/CommandKModal';
import MedicineDetailModal from '@/components/modals/MedicineDetailModal';

interface NavItem {
  name: string;
  path: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
}

const CLINICAL_NAV: NavItem[] = [
  { name: 'Dashboard', path: '/', icon: 'dashboard' },
  { name: 'Medicine Inventory', path: '/inventory', icon: 'medication' },
  { name: 'Daily Stock Update', path: '/daily-stock-update', icon: 'inventory_2' },
  { name: 'Sales & Consumption', path: '/sales-and-consumption', icon: 'trending_up' },
  { name: 'AI Predictions', path: '/stockout-predictions', icon: 'neurology', badge: 'ML 4.2', badgeColor: 'bg-secondary-fixed text-on-secondary-fixed' },
  { name: 'Analytics', path: '/analytics', icon: 'analytics' },
  { name: 'Alerts', path: '/alerts', icon: 'warning', badge: '18', badgeColor: 'bg-error-container text-on-error-container' },
];

const ADMIN_NAV: NavItem[] = [
  { name: 'Data Import (e-Aushadhi)', path: '/data-import', icon: 'cloud_download' },
  { name: 'Reports', path: '/reports', icon: 'description' },
  { name: 'Settings', path: '/settings', icon: 'settings' },
];

const DISTRICT_OPTIONS = [
  'Central Regional Medical Store - District 04',
  'North District Depot - Civil Hospital Hub',
  'South Area Medical Storage - District 09',
  'State Strategic Reserve Warehouse - Central',
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {
    alerts,
    activeDistrict,
    setActiveDistrict,
    setIsEmergencyModalOpen,
    setIsCommandKOpen,
    triggerSync,
    isSyncing,
  } = useMediSafe();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);

  // If path is /login, don't show the dashboard shell
  if (pathname === '/login') {
    return <>{children}</>;
  }

  const unreadAlerts = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      {/* Top Fixed Header */}
      <header className="fixed top-0 left-0 right-0 h-16 z-40 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-4 sm:px-6 flex items-center justify-between gap-4 border-b border-outline-variant/30">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg hover:bg-surface-container-low transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-lg shadow-sm">
              <span className="material-symbols-outlined text-[22px]">health_and_safety</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline font-bold text-lg text-primary tracking-tight leading-none group-hover:text-primary-container transition-colors">
                MediSafe AI
              </span>
              <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider hidden sm:block">
                Predictive Inventory Core
              </span>
            </div>
          </Link>

          {/* District Selector Dropdown */}
          <div className="relative hidden xl:block">
            <button
              onClick={() => setIsDistrictDropdownOpen(!isDistrictDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors border border-outline-variant/40 text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">domain</span>
              <span className="truncate max-w-[240px] text-on-surface">{activeDistrict}</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
            {isDistrictDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-80 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/40 py-2 z-50">
                <span className="px-3 py-1 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
                  Select Healthcare Store
                </span>
                {DISTRICT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setActiveDistrict(opt);
                      setIsDistrictDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-surface-container-low transition-colors flex items-center justify-between ${
                      opt === activeDistrict ? 'font-bold text-primary bg-surface-container-low' : 'text-on-surface'
                    }`}
                  >
                    <span>{opt}</span>
                    {opt === activeDistrict && (
                      <span className="material-symbols-outlined text-primary text-[16px]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Global Search Bar (opens ⌘K modal) */}
        <div className="hidden md:flex flex-1 max-w-md items-center mx-4">
          <button
            onClick={() => setIsCommandKOpen(true)}
            className="w-full flex items-center bg-surface-container-low hover:bg-surface-container px-3 py-2 rounded-lg gap-2 text-on-surface-variant transition-colors border border-outline-variant/30 text-left"
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
            <span className="text-xs text-on-surface-variant/80 flex-1">Search medicine, batch ID, or formulation...</span>
            <kbd className="bg-surface-container-lowest px-1.5 py-0.5 rounded text-[11px] font-mono text-on-surface-variant border border-outline-variant/40 shadow-xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-3">
          {/* Emergency Reorder CTA */}
          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-error-container text-on-error-container hover:bg-red-200 transition-colors text-xs font-semibold shadow-xs"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">emergency</span>
            <span className="hidden sm:inline font-bold">Emergency Reorder</span>
          </button>

          {/* Notifications / Alerts Pill */}
          <Link
            href="/alerts"
            className="relative p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
            title="Alerts Center"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadAlerts > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-error text-on-error font-mono text-[10px] font-bold">
                {unreadAlerts}
              </span>
            )}
          </Link>

          <div className="h-6 w-px bg-outline-variant/30 hidden sm:block" />

          {/* User Profile */}
          <Link href="/settings" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="hidden md:flex flex-col text-right leading-tight">
              <span className="text-xs font-bold text-on-surface">Dr. Aris Thorne</span>
              <div className="flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container animate-pulse" />
                <span className="text-[10px] text-on-surface-variant font-medium">Inventory Manager</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Persistent Left Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-surface-container-lowest z-30 flex flex-col justify-between border-r border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-transform duration-200 lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto pt-4 px-3">
          {/* Group 1: Clinical Operations */}
          <div className="px-3 pb-1">
            <span className="font-label text-[11px] font-bold text-on-surface-variant/70 uppercase tracking-wider">
              Clinical Operations
            </span>
          </div>
          <nav className="space-y-0.5">
            {CLINICAL_NAV.map((item) => {
              const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-xs font-semibold ${
                    isActive
                      ? 'bg-primary-container text-on-primary shadow-xs'
                      : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${item.badgeColor || 'bg-surface-container text-on-surface'}`}>
                      {item.name === 'Alerts' ? unreadAlerts : item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Group 2: Administration */}
          <div className="px-3 pt-6 pb-1">
            <span className="font-label text-[11px] font-bold text-on-surface-variant/70 uppercase tracking-wider">
              Administration
            </span>
          </div>
          <nav className="space-y-0.5">
            {ADMIN_NAV.map((item) => {
              const isActive = pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-xs font-semibold ${
                    isActive
                      ? 'bg-primary-container text-on-primary shadow-xs'
                      : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Live Sync Footer Box */}
        <div className="p-3 border-t border-outline-variant/30 bg-surface-container-low m-3 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label text-[10px] font-semibold text-on-surface-variant uppercase">Data Sync</span>
              <span className="font-mono text-xs text-primary font-bold">Live DVDMS Sync</span>
            </div>
            <button
              onClick={triggerSync}
              disabled={isSyncing}
              title="Trigger Immediate Re-sync"
              className="p-1 rounded-lg hover:bg-surface-container transition-colors text-tertiary-container disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-[20px] ${isSyncing ? 'animate-spin' : ''}`}>
                sync
              </span>
            </button>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[10px] text-on-surface-variant font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>State API Connected</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-64 pt-16 min-h-screen">
        <main className="w-full min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 max-w-[1720px] mx-auto">
          {children}
        </main>
      </div>

      {/* Global Modals */}
      <EmergencyReorderModal />
      <CommandKModal />
      <MedicineDetailModal />
    </div>
  );
}
