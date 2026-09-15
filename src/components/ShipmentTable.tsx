import React, { useState } from 'react';
import { 
  Shipment, 
  RiskLevel 
} from '../types';
import { 
  Search, 
  Filter, 
  AlertOctagon, 
  Clock, 
  DollarSign, 
  Sparkles, 
  MapPin, 
  CheckCircle,
  Truck,
  Ship,
  Train,
  Plane,
  ArrowUpDown,
  FileSpreadsheet
} from 'lucide-react';

interface ShipmentTableProps {
  shipments: Shipment[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  onOpenMitigateModal: (shipment: Shipment) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ShipmentTable: React.FC<ShipmentTableProps> = ({
  shipments,
  activeFilter,
  setActiveFilter,
  onOpenMitigateModal,
  searchQuery,
  setSearchQuery,
}) => {
  const [sortField, setSortField] = useState<'predictedDelayDays' | 'financialImpact'>('predictedDelayDays');
  const [sortAsc, setSortAsc] = useState(false);

  // Filter by Risk Level
  const filteredShipments = shipments.filter((s) => {
    const matchesFilter = 
      activeFilter === 'all' ? true : s.riskLevel === activeFilter;

    const matchesSearch = 
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.riskDriver.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Sort
  const sortedShipments = [...filteredShipments].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    return sortAsc ? valA - valB : valB - valA;
  });

  const toggleSort = (field: 'predictedDelayDays' | 'financialImpact') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const getTransportIcon = (mode: Shipment['transportMode']) => {
    switch (mode) {
      case 'Maritime': return <Ship className="h-3.5 w-3.5 text-cyan-400" title="Maritime Freight" />;
      case 'Rail': return <Train className="h-3.5 w-3.5 text-amber-400" title="Intermodal Rail" />;
      case 'Air': return <Plane className="h-3.5 w-3.5 text-blue-400" title="Air Cargo" />;
      case 'Road': return <Truck className="h-3.5 w-3.5 text-emerald-400" title="Heavy Road Freight" />;
      default: return <Truck className="h-3.5 w-3.5 text-slate-400" />;
    }
  };

  const criticalCount = shipments.filter((s) => s.riskLevel === 'critical').length;
  const mediumCount = shipments.filter((s) => s.riskLevel === 'medium').length;
  const lowCount = shipments.filter((s) => s.riskLevel === 'low').length;

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/70 backdrop-blur-md shadow-xl">
      
      {/* Header Controls: Filters & Search */}
      <div className="flex flex-col gap-4 border-b border-slate-800/80 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        
        {/* Left: Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5" /> Risk Filter:
          </span>

          {/* All Tab */}
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-1 ring-blue-400'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            All Shipments
            <span className="ml-1 rounded-full bg-slate-900/60 px-1.5 py-0.2 font-mono text-[10px]">
              {shipments.length}
            </span>
          </button>

          {/* Critical (Red) Tab */}
          <button
            onClick={() => setActiveFilter('critical')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeFilter === 'critical'
                ? 'bg-red-600 text-white shadow-md shadow-red-500/25 ring-1 ring-red-400'
                : 'bg-red-950/30 text-red-300 border border-red-900/40 hover:bg-red-900/40'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-red-400 animate-ping" />
            Critical Risk
            <span className="ml-1 rounded-full bg-red-900/60 px-1.5 py-0.2 font-mono text-[10px] text-red-200">
              {criticalCount}
            </span>
          </button>

          {/* Medium (Amber) Tab */}
          <button
            onClick={() => setActiveFilter('medium')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeFilter === 'medium'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-500/25 ring-1 ring-amber-400'
                : 'bg-amber-950/30 text-amber-300 border border-amber-900/40 hover:bg-amber-900/40'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Medium Risk
            <span className="ml-1 rounded-full bg-amber-900/60 px-1.5 py-0.2 font-mono text-[10px] text-amber-200">
              {mediumCount}
            </span>
          </button>

          {/* Low (Green) Tab */}
          <button
            onClick={() => setActiveFilter('low')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeFilter === 'low'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25 ring-1 ring-emerald-400'
                : 'bg-emerald-950/30 text-emerald-300 border border-emerald-900/40 hover:bg-emerald-900/40'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Nominal / Low
            <span className="ml-1 rounded-full bg-emerald-900/60 px-1.5 py-0.2 font-mono text-[10px] text-emerald-200">
              {lowCount}
            </span>
          </button>
        </div>

        {/* Right: Live Search Input */}
        <div className="relative min-w-[240px] sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search PO, Material, Supplier..."
            className="w-full rounded-lg border border-slate-700 bg-slate-800/80 py-1.5 pl-9 pr-3 text-xs text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-800 bg-slate-900/90 font-mono text-[11px] uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-4 py-3 sm:px-6 font-semibold">Shipment ID</th>
              <th className="px-4 py-3 font-semibold">SAP Material & PO</th>
              <th className="px-4 py-3 font-semibold">Supplier</th>
              <th className="px-4 py-3 font-semibold">Transit Route</th>
              <th 
                className="px-4 py-3 font-semibold cursor-pointer hover:text-blue-400 transition-colors"
                onClick={() => toggleSort('predictedDelayDays')}
              >
                <div className="flex items-center gap-1">
                  <span>ML Predicted Delay</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th 
                className="px-4 py-3 font-semibold cursor-pointer hover:text-blue-400 transition-colors"
                onClick={() => toggleSort('financialImpact')}
              >
                <div className="flex items-center gap-1">
                  <span>Financial Impact ($)</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="px-4 py-3 font-semibold">Risk Driver</th>
              <th className="px-4 py-3 sm:px-6 text-right font-semibold">Resolution Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/60">
            {sortedShipments.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FileSpreadsheet className="h-8 w-8 text-slate-600" />
                    <p className="font-medium text-sm">No shipments matched the current filter or search criteria.</p>
                    <button
                      onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
                      className="text-xs text-blue-400 hover:underline"
                    >
                      Reset filter to All Shipments
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              sortedShipments.map((s) => {
                const isCritical = s.riskLevel === 'critical';
                const isMedium = s.riskLevel === 'medium';

                return (
                  <tr 
                    key={s.id}
                    className={`transition-colors hover:bg-slate-800/50 ${
                      s.status === 'Mitigated' ? 'opacity-70 bg-emerald-950/10' : ''
                    }`}
                  >
                    {/* 1. Shipment ID */}
                    <td className="whitespace-nowrap px-4 py-3.5 sm:px-6 font-mono font-bold">
                      <div className="flex items-center gap-2">
                        <span className={isCritical ? 'text-red-400' : isMedium ? 'text-amber-400' : 'text-emerald-400'}>
                          {s.id}
                        </span>
                        <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-800">
                          {getTransportIcon(s.transportMode)}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                        {s.lastUpdated}
                      </div>
                    </td>

                    {/* 2. SAP Material & PO */}
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-slate-200 max-w-[210px] truncate" title={s.material}>
                        {s.material}
                      </div>
                      <div className="font-mono text-[11px] text-blue-400 flex items-center gap-1 mt-0.5">
                        <span>{s.poNumber}</span>
                        {s.status === 'Mitigated' && (
                          <span className="text-[10px] font-sans rounded bg-emerald-500/20 text-emerald-300 px-1 py-0.2 border border-emerald-500/30">
                            Mitigated
                          </span>
                        )}
                      </div>
                    </td>

                    {/* 3. Supplier */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="font-medium text-slate-200">{s.supplier}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <MapPin className="h-2.5 w-2.5 text-slate-500" />
                        {s.supplierLocation}
                      </div>
                    </td>

                    {/* 4. Transit Route */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="text-slate-300 font-mono text-[11px]">
                        {s.route}
                      </div>
                      <div className="text-[10px] text-slate-500 capitalize">
                        Mode: {s.transportMode}
                      </div>
                    </td>

                    {/* 5. ML Predicted Delay */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className={`h-3.5 w-3.5 ${
                          isCritical ? 'text-red-400' : isMedium ? 'text-amber-400' : 'text-emerald-400'
                        }`} />
                        <span className={`font-mono text-sm font-bold ${
                          isCritical ? 'text-red-400' : isMedium ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                          {s.predictedDelayDays > 0 ? `+${s.predictedDelayDays} Days` : 'On Schedule (0d)'}
                        </span>
                      </div>
                      {s.predictedDelayDays > 0 && (
                        <div className="text-[10px] text-slate-500">
                          Horizon: 7-14d pred.
                        </div>
                      )}
                    </td>

                    {/* 6. Financial Impact ($) */}
                    <td className="px-4 py-3.5 whitespace-nowrap font-mono">
                      <div className={`font-bold ${
                        isCritical ? 'text-red-300 text-sm' : isMedium ? 'text-amber-300' : 'text-slate-400'
                      }`}>
                        {s.financialImpact > 0 ? `$${s.financialImpact.toLocaleString()}` : '$0 (Nominal)'}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {s.financialImpact > 500000 ? 'Severe Line Risk' : s.financialImpact > 0 ? 'Cost Exposure' : 'Protected'}
                      </div>
                    </td>

                    {/* 7. Risk Driver */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        isCritical
                          ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                          : isMedium
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {isCritical && <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />}
                        {s.riskDriver}
                      </span>
                    </td>

                    {/* 8. Action Button */}
                    <td className="px-4 py-3.5 sm:px-6 text-right whitespace-nowrap">
                      <button
                        onClick={() => onOpenMitigateModal(s)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all shadow-sm ${
                          isCritical
                            ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-500 hover:to-rose-500 shadow-red-500/20'
                            : isMedium
                            ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white hover:from-amber-500 hover:to-yellow-500 shadow-amber-500/20'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        <Sparkles className="h-3 w-3" />
                        <span>View & Mitigate</span>
                      </button>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 bg-slate-900/90 px-4 py-2.5 sm:px-6 text-xs text-slate-400">
        <div>
          Showing <strong className="text-white">{sortedShipments.length}</strong> of {shipments.length} tracked SAP consignments
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1 text-slate-500">
            SAP S/4HANA PO Sync: Real-time OData v4
          </span>
        </div>
      </div>

    </div>
  );
};
