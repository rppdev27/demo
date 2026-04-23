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
        <a href="https://www.threads.com/@_ryanpp27" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-3 text-sm font-bold text-slate-400 hover:text-white transition-colors">
          <svg width="16" height="16" viewBox="0 0 192 192" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M141.537 88.988a66.668 66.668 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.168-40.05-7.483-51.24-21.741C35.232 139.966 29.737 120.682 29.498 96c.239-24.682 5.734-43.966 16.325-57.317C56.813 24.425 74.054 17.11 96.863 16.942c22.976.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 96.903 0h-.04C68.596.195 47.081 9.636 32.728 28.08 19.942 44.479 13.284 67.316 13.01 96v.04c.274 28.684 6.932 51.521 19.718 67.92 14.353 18.444 35.868 27.885 63.935 28.08h.04c24.957-.173 42.483-6.692 57.337-21.532 18.916-18.9 18.345-42.552 12.139-57.048-4.36-10.157-12.763-18.43-24.642-23.472ZM98.44 129.507c-10.44.588-21.286-4.098-21.82-14.135-.397-7.442 5.296-15.746 22.461-16.735 1.966-.113 3.895-.169 5.79-.169 6.235 0 12.068.606 17.371 1.765-1.978 24.702-13.58 28.713-23.802 29.274Z"/></svg>
          @_ryanpp27
        </a>
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
