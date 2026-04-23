import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard,FolderOpen,BarChart2,Receipt,FileText,Truck,Users,Settings,ChevronLeft,Building2,LogOut } from 'lucide-react';

const nav = [
  { path:'/sii-kontraktor/dashboard',    label:'Dashboard',        icon:LayoutDashboard },
  { path:'/sii-kontraktor/proyek',       label:'Proyek',            icon:FolderOpen },
  { path:'/sii-kontraktor/rab',          label:'RAB & Realisasi',   icon:BarChart2 },
  { path:'/sii-kontraktor/pengeluaran',  label:'Pengeluaran',       icon:Receipt },
  { path:'/sii-kontraktor/invoice',      label:'Invoice',           icon:FileText },
  { path:'/sii-kontraktor/vendor',       label:'Vendor & Supplier', icon:Truck },
  { path:'/sii-kontraktor/tenagakerja',  label:'Tenaga Kerja',      icon:Users },
  { path:'/sii-kontraktor/pengaturan',   label:'Pengaturan',        icon:Settings },
];

export default function Sidebar({ isOpen, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={onToggle} />}

      <div className={`fixed top-0 left-0 h-full z-30 flex flex-col bg-[#0F1724] text-white transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-0 lg:w-16'} overflow-hidden`}>
        {/* Logo */}
        <div className="flex items-center gap-3 p-4 min-h-[64px] border-b border-white/10">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Building2 size={18} className="text-white" />
          </div>
          <div className={`transition-all duration-200 ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
            <p className="font-black text-base whitespace-nowrap">SII Kontraktor</p>
            <p className="text-[10px] text-blue-300 font-semibold whitespace-nowrap">Manajemen Keuangan</p>
          </div>
          <button onClick={onToggle} className={`ml-auto p-1 hover:bg-white/10 rounded-lg flex-shrink-0 ${isOpen ? 'flex' : 'hidden'}`}>
            <ChevronLeft size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 overflow-y-auto space-y-0.5">
          {nav.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <button key={path} onClick={() => { navigate(path); if (window.innerWidth < 1024) onToggle(); }}
                title={!isOpen ? label : ''}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-left
                  ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:bg-white/10 hover:text-white'}
                  ${!isOpen ? 'lg:justify-center' : ''}`}>
                <Icon size={18} className="flex-shrink-0" />
                <span className={`font-semibold text-sm whitespace-nowrap transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden lg:hidden'}`}>{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-2 border-t border-white/10 space-y-0.5">
          <button onClick={() => { navigate('/sii-kontraktor'); window.location.reload(); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-all ${!isOpen ? 'lg:justify-center' : ''}`} title={!isOpen ? 'Keluar' : ''}>
            <LogOut size={18} className="flex-shrink-0" />
            <span className={`font-semibold text-sm whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden lg:hidden'}`}>Keluar</span>
          </button>
        </div>
      </div>
    </>
  );
}
