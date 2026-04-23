import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { fmt, fmtFull } from '../data/mockData';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';
import { Plus, Pencil, Trash2, Search, Filter, Receipt } from 'lucide-react';

const EMPTY = { proyekId:'', tanggal:'', kategori:'', deskripsi:'', vendor:'', jumlah:'', status:'approved' };
const KATEGORI = ['Material','Tenaga Kerja','Peralatan','Overhead','Transportasi','Administrasi','Lain-lain'];

export default function Pengeluaran() {
  const { projects, expenses, addExpense, updateExpense, deleteExpense } = useApp();
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState('');
  const [filterProj, setFilterProj] = useState('');
  const [filterKat, setFilterKat] = useState('');

  const filtered = expenses.filter(e => {
    const s = search.toLowerCase();
    return (
      (!filterProj || e.proyekId === filterProj) &&
      (!filterKat || e.kategori === filterKat) &&
      (!s || e.deskripsi.toLowerCase().includes(s) || e.vendor.toLowerCase().includes(s))
    );
  }).sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

  const totalFiltered = filtered.reduce((s, e) => s + e.jumlah, 0);

  const openAdd = () => { setForm(EMPTY); setEditing(null); setShowModal(true); };
  const openEdit = (e) => { setForm({ ...e, jumlah: String(e.jumlah) }); setEditing(e.id); setShowModal(true); };
  const handleSave = () => {
    const data = { ...form, jumlah: Number(form.jumlah) || 0 };
    if (editing) updateExpense(editing, data);
    else addExpense(data);
    setShowModal(false);
  };
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const katColors = {
    Material: 'bg-blue-50 text-blue-700',
    'Tenaga Kerja': 'bg-purple-50 text-purple-700',
    Peralatan: 'bg-amber-50 text-amber-700',
    Overhead: 'bg-gray-100 text-gray-600',
    Transportasi: 'bg-emerald-50 text-emerald-700',
    Administrasi: 'bg-pink-50 text-pink-700',
    'Lain-lain': 'bg-slate-50 text-slate-600',
  };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 flex-1 shadow-sm">
          <Search size={16} className="text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari deskripsi, vendor..."
            className="flex-1 text-sm outline-none font-medium text-gray-700 placeholder-gray-400" />
        </div>
        <select value={filterProj} onChange={e => setFilterProj(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-600 outline-none shadow-sm">
          <option value="">Semua Proyek</option>
          {projects.map(p => <option key={p.id} value={p.id}>{p.id}</option>)}
        </select>
        <select value={filterKat} onChange={e => setFilterKat(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-600 outline-none shadow-sm">
          <option value="">Semua Kategori</option>
          {KATEGORI.map(k => <option key={k} value={k}>{k}</option>)}
        </select>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-sm whitespace-nowrap">
          <Plus size={16} /> Tambah
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label:'Total Pengeluaran', val:fmt(expenses.reduce((s,e)=>s+e.jumlah,0)), color:'text-red-600' },
          { label:'Ditampilkan', val:fmt(totalFiltered), color:'text-gray-800' },
          { label:'Disetujui', val:expenses.filter(e=>e.status==='approved').length, color:'text-emerald-600', suffix:'transaksi' },
          { label:'Menunggu', val:expenses.filter(e=>e.status==='pending').length, color:'text-amber-600', suffix:'transaksi' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-500">{s.label}</p>
            <p className={`text-xl font-black mt-1 ${s.color}`}>{s.val}{s.suffix ? '' : ''}</p>
            {s.suffix && <p className="text-xs text-gray-400 font-semibold">{s.suffix}</p>}
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['ID','Tanggal','Proyek','Deskripsi','Vendor','Kategori','Jumlah','Status',''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-black text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(e => {
                const proj = projects.find(p => p.id === e.proyekId);
                return (
                  <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5 text-xs font-black text-gray-400">{e.id}</td>
                    <td className="px-4 py-3.5 text-gray-600 font-semibold whitespace-nowrap">{e.tanggal}</td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs bg-blue-50 text-blue-700 font-black px-2 py-0.5 rounded-full">{e.proyekId}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-gray-800 max-w-[200px] truncate">{e.deskripsi}</p>
                      {proj && <p className="text-xs text-gray-400 font-semibold truncate max-w-[200px]">{proj.nama}</p>}
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 font-semibold whitespace-nowrap">{e.vendor}</td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${katColors[e.kategori] || 'bg-gray-100 text-gray-600'}`}>{e.kategori}</span>
                    </td>
                    <td className="px-4 py-3.5 font-black text-red-600 whitespace-nowrap">-{fmt(e.jumlah)}</td>
                    <td className="px-4 py-3.5"><Badge status={e.status} /></td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1.5">
                        <button onClick={() => openEdit(e)} className="p-1.5 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-lg"><Pencil size={13} /></button>
                        <button onClick={() => setDeleteTarget(e)} className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="text-center py-12 text-gray-400 font-bold">Tidak ada pengeluaran ditemukan</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <p className="text-xs font-bold text-gray-500">{filtered.length} transaksi</p>
          <p className="text-sm font-black text-red-600">Total: {fmtFull(totalFiltered)}</p>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Pengeluaran' : 'Tambah Pengeluaran'}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Proyek</label>
              <select value={form.proyekId} onChange={e => set('proyekId', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500">
                <option value="">-- Pilih Proyek --</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.id} — {p.nama.slice(0,30)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Tanggal</label>
              <input type="date" value={form.tanggal} onChange={e => set('tanggal', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Kategori</label>
              <select value={form.kategori} onChange={e => set('kategori', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500">
                <option value="">-- Pilih Kategori --</option>
                {KATEGORI.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Jumlah (Rp)</label>
              <input type="number" value={form.jumlah} onChange={e => set('jumlah', e.target.value)} placeholder="0"
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Deskripsi</label>
            <input value={form.deskripsi} onChange={e => set('deskripsi', e.target.value)} placeholder="Keterangan pengeluaran..."
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Vendor / Sumber</label>
              <input value={form.vendor} onChange={e => set('vendor', e.target.value)} placeholder="Nama vendor atau '-'"
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500">
                <option value="approved">Disetujui</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50">Batal</button>
          <button onClick={handleSave} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700">{editing ? 'Simpan' : 'Tambah'}</button>
        </div>
      </Modal>

      {deleteTarget && (
        <Modal isOpen={true} onClose={() => setDeleteTarget(null)} title="Hapus Pengeluaran" size="sm">
          <p className="text-sm font-medium text-gray-600 mb-1">Hapus transaksi:</p>
          <p className="font-bold text-gray-900 mb-5">"{deleteTarget.deskripsi}"?</p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-600">Batal</button>
            <button onClick={() => { deleteExpense(deleteTarget.id); setDeleteTarget(null); }} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700">Hapus</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
