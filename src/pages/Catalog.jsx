import { useNavigate } from 'react-router-dom';

export default function Catalog() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0d1117] text-white" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Header */}
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-2xl font-black mx-auto mb-5 shadow-lg shadow-blue-600/30">
          R
        </div>
        <p className="text-[#58a6ff] text-sm font-bold mb-3 tracking-widest uppercase">@rppdev27</p>
        <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Demo Web Apps
        </h1>
        <p className="text-slate-400 font-semibold text-base max-w-md mx-auto leading-relaxed">
          Kumpulan demo aplikasi web yang bisa langsung dicoba. Semua menggunakan mock data.
        </p>
      </div>

      {/* Label */}
      <div className="max-w-4xl mx-auto px-6 pb-4 flex items-center gap-3">
        <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Web Applications</span>
        <div className="flex-1 h-px bg-[#21262d]" />
      </div>

      {/* Grid */}
      <div className="max-w-4xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* SII Kontraktor */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col gap-4 hover:border-blue-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 transition-all duration-200 group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-2xl flex-shrink-0">
              🏗️
            </div>
            <div>
              <p className="font-black text-white text-base">SII Kontraktor</p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Project · Finance</p>
            </div>
          </div>
          <p className="text-slate-400 text-sm font-semibold leading-relaxed flex-1">
            Sistem manajemen keuangan proyek untuk usaha kontraktor. Dashboard, RAB vs realisasi, invoice, vendor & tenaga kerja.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {['React','Tailwind','Recharts','Vite'].map(t => (
              <span key={t} className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#21262d] text-slate-500 border border-[#30363d]">{t}</span>
            ))}
          </div>
          <button
            onClick={() => navigate('/sii-kontraktor')}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Lihat Demo
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M7 17L17 7M7 7h10v10"/></svg>
          </button>
        </div>

        {/* Coming Soon */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col gap-4 opacity-40">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-2xl flex-shrink-0">📦</div>
            <div>
              <p className="font-black text-white text-base">Coming Soon</p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">TBD</p>
            </div>
          </div>
          <p className="text-slate-400 text-sm font-semibold leading-relaxed flex-1">Proyek berikutnya sedang dalam pengembangan.</p>
          <div className="flex gap-1.5">
            <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#21262d] text-slate-500 border border-[#30363d]">TBD</span>
          </div>
          <div className="w-full py-2.5 bg-[#21262d] text-slate-600 font-bold text-sm rounded-xl text-center">Segera Hadir</div>
        </div>

      </div>

      <footer className="border-t border-[#21262d] text-center py-5 text-slate-600 text-xs font-semibold">
        Built by <span className="text-slate-400">rppdev27</span> · Mock data only
      </footer>
    </div>
  );
}
