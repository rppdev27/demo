import { useLocation } from 'react-router-dom';
import { Menu, Bell, Search, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

const titles = {
  '/dashboard':    'Dashboard',
  '/proyek':       'Manajemen Proyek',
  '/rab':          'RAB & Realisasi',
  '/pengeluaran':  'Pengeluaran',
  '/invoice':      'Invoice & Penagihan',
  '/vendor':       'Vendor & Supplier',
  '/tenagakerja':  'Tenaga Kerja',
};

export default function Header({ onToggle }) {
  const location = useLocation();
  const { currentUser, invoices } = useApp();
  const alerts = invoices.filter(i => i.status === 'unpaid' || i.status === 'overdue').length;
  const title = titles[location.pathname] || 'Dashboard';

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center gap-4 px-4 lg:px-6 sticky top-0 z-10 shadow-sm">
      <button onClick={onToggle} className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500">
        <Menu size={20} />
      </button>
      <h1 className="font-black text-gray-800 text-lg hidden sm:block">{title}</h1>

      <div className="flex-1" />

      <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
        <Search size={15} className="text-gray-400" />
        <input placeholder="Cari..." className="bg-transparent text-sm outline-none w-36 text-gray-600 placeholder-gray-400 font-medium" />
      </div>

      <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500">
        <Bell size={20} />
        {alerts > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-black">{alerts}</span>
        )}
      </button>

      <div className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 rounded-xl px-2 py-1.5 transition-colors">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-sm">
          <span className="text-white text-xs font-black">{currentUser.avatar}</span>
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-bold text-gray-700 leading-tight">{currentUser.nama}</p>
          <p className="text-xs text-gray-400 font-semibold">{currentUser.role}</p>
        </div>
        <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
      </div>
    </header>
  );
}
