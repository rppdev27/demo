import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { cashflowData, fmt } from '../data/mockData';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FolderOpen, TrendingUp, TrendingDown, AlertTriangle, DollarSign, FileText, Clock, Activity } from 'lucide-react';

function StatCard({ title, value, sub, icon: Icon, color, trend }) {
  const colors = {
    blue:    'from-blue-500 to-blue-600',
    emerald: 'from-emerald-500 to-emerald-600',
    amber:   'from-amber-500 to-amber-600',
    red:     'from-red-500 to-red-600',
  };
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-500 truncate">{title}</p>
          <p className="text-2xl font-black text-gray-900 mt-1 truncate">{value}</p>
          {sub && <p className="text-xs text-gray-400 font-semibold mt-0.5">{sub}</p>}
        </div>
        <div className={`w-12 h-12 bg-gradient-to-br ${colors[color]} rounded-xl flex items-center justify-center flex-shrink-0 ml-3 shadow-lg`}>
          <Icon size={22} className="text-white" />
        </div>
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 mt-3 text-xs font-bold ${trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
          {trend >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {Math.abs(trend)}% dari bulan lalu
        </div>
      )}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xl text-xs font-bold">
        <p className="text-gray-600 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>
            {p.name}: Rp {p.value.toLocaleString('id-ID')} jt
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { projects, expenses, invoices } = useApp();

  const totalNilai = projects.reduce((s, p) => s + p.nilaiKontrak, 0);
  const totalExp = expenses.reduce((s, e) => s + e.jumlah, 0);
  const outstanding = invoices.filter(i => i.status !== 'paid').reduce((s, i) => s + i.jumlah, 0);
  const activeProj = projects.filter(p => p.status === 'ongoing').length;

  const overBudget = projects.filter(p => p.totalRealisasi > p.totalRAB && p.status === 'ongoing');
  const overdueInv = invoices.filter(i => i.status === 'overdue');
  const recentExp = [...expenses].sort((a,b) => new Date(b.tanggal) - new Date(a.tanggal)).slice(0, 5);

  const statusData = [
    { name: 'Berjalan', value: projects.filter(p=>p.status==='ongoing').length, fill: '#3B82F6' },
    { name: 'Selesai',  value: projects.filter(p=>p.status==='selesai').length, fill: '#10B981' },
    { name: 'Pending',  value: projects.filter(p=>p.status==='pending').length, fill: '#F59E0B' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Proyek Aktif"    value={activeProj}      sub={`dari ${projects.length} total`} icon={FolderOpen}  color="blue"    trend={12} />
        <StatCard title="Total Nilai"     value={fmt(totalNilai)} sub="semua proyek"                     icon={DollarSign}  color="emerald" trend={8} />
        <StatCard title="Total Pengeluaran" value={fmt(totalExp)} sub="bulan ini"                        icon={Activity}    color="amber"   trend={-3} />
        <StatCard title="Outstanding"     value={fmt(outstanding)} sub="belum tertagih"                  icon={FileText}    color="red"     trend={5} />
      </div>

      {/* Alerts */}
      {(overBudget.length > 0 || overdueInv.length > 0) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {overBudget.map(p => (
            <div key={p.id} className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
              <AlertTriangle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-700 text-sm">Over Budget!</p>
                <p className="text-xs text-red-600 font-medium">{p.nama} — realisasi melebihi RAB sebesar {fmt(p.totalRealisasi - p.totalRAB)}</p>
              </div>
            </div>
          ))}
          {overdueInv.map(inv => (
            <div key={inv.id} className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <Clock size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-700 text-sm">Invoice Jatuh Tempo!</p>
                <p className="text-xs text-amber-600 font-medium">{inv.id} · {inv.client} · {fmt(inv.jumlah)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cashflow Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-black text-gray-800">Arus Kas</h3>
              <p className="text-xs text-gray-400 font-semibold">7 bulan terakhir (juta rupiah)</p>
            </div>
            <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold">2023–2024</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={cashflowData} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="gMasuk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gKeluar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="bulan" tick={{ fontSize: 11, fontWeight: 700, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontWeight: 700, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="masuk"  name="Cash In"  stroke="#3B82F6" strokeWidth={2.5} fill="url(#gMasuk)" dot={{ r:4, fill:'#3B82F6', strokeWidth:0 }} />
              <Area type="monotone" dataKey="keluar" name="Cash Out" stroke="#EF4444" strokeWidth={2.5} fill="url(#gKeluar)" dot={{ r:4, fill:'#EF4444', strokeWidth:0 }} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3 justify-center">
            {[{color:'bg-blue-500',label:'Cash In'},{color:'bg-red-500',label:'Cash Out'}].map(l=>(
              <div key={l.label} className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                <span className={`w-2.5 h-2.5 rounded-full ${l.color}`} />{l.label}
              </div>
            ))}
          </div>
        </div>

        {/* Status & Projects */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-black text-gray-800 mb-4">Status Proyek</h3>
          <div className="space-y-3">
            {statusData.map(s => (
              <div key={s.name}>
                <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                  <span>{s.name}</span>
                  <span>{s.value} proyek</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width:`${(s.value/projects.length)*100}%`, backgroundColor:s.fill }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100">
            <h4 className="font-black text-gray-700 text-sm mb-3">Progress Proyek</h4>
            <div className="space-y-3">
              {projects.filter(p=>p.status==='ongoing').map(p => (
                <div key={p.id}>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-gray-700 truncate pr-2" style={{maxWidth:'65%'}}>{p.nama.split(' ').slice(0,3).join(' ')}</span>
                    <span className="text-blue-600">{p.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width:`${p.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-black text-gray-800">Transaksi Terbaru</h3>
          <button onClick={() => navigate('/pengeluaran')} className="text-xs text-blue-600 font-bold hover:underline">Lihat Semua</button>
        </div>
        <div className="divide-y divide-gray-50">
          {recentExp.map(e => {
            const proj = projects.find(p => p.id === e.proyekId);
            return (
              <div key={e.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  e.kategori==='Material'?'bg-blue-50 text-blue-600':
                  e.kategori==='Tenaga Kerja'?'bg-purple-50 text-purple-600':
                  e.kategori==='Peralatan'?'bg-amber-50 text-amber-600':'bg-gray-100 text-gray-500'
                }`}>
                  <Activity size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">{e.deskripsi}</p>
                  <p className="text-xs text-gray-400 font-semibold truncate">{proj?.nama || e.proyekId} · {e.tanggal}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-black text-red-600">-{fmt(e.jumlah)}</p>
                  <p className="text-xs text-gray-400 font-semibold">{e.kategori}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
