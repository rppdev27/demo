import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { fmt, fmtFull } from '../data/mockData';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';
import { Plus, Pencil, Trash2, Search, User, HardHat } from 'lucide-react';

const EMPTY = { nama:'', jabatan:'', proyekId:'', tipeGaji:'harian', gajiPokok:'', status:'aktif' };
const JABATAN = ['Mandor','Kepala Tukang','Tukang Besi','Tukang Batu','Tukang Kayu','Tukang Cat','Tukang Las','Operator Excavator','Operator Crane','Kenek','Pekerja Umum'];

export default function TenagaKerja() {
  const { projects, workers, addWorker, updateWorker, deleteWorker } = useApp();
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState('');
  const [filterProj, setFilterProj] = useState('');

  const filtered = workers.filter(w => {
    const s = search.toLowerCase();
    return (
      (!filterProj || w.proyekId === filterProj) &&
      (!s || w.nama.toLowerCase().includes(s) || w.jabatan.toLowerCase().includes(s))
    );
  });

  const aktif = workers.filter(w => w.status === 'aktif').length;
  const totalGajiHarian = workers.filter(w => w.status === 'aktif').reduce((s, w) => s + w.gajiPokok, 0);

  const openAdd = () => { setForm(EMPTY); setEditing(null); setShowModal(true); };
  const openEdit = (w) => { setForm({ ...w, gajiPokok: String(w.gajiPokok) }); setEditing(w.id); setShowModal(true); };
  const handleSave = () => {
    const data = { ...form, gajiPokok: Number(form.gajiPokok) || 0 };
    if (editing) updateWorker(editing, data);
    else addWorker(data);
    setShowModal(false);
  };
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const jabatanColors = {
    Mandor: 'bg-purple-50 text-purple-700',
    'Kepala Tukang': 'bg-blue-50 text-blue-700',
    'Operator Excavator': 'bg-orange-50 text-orange-700',
    'Operator Crane': 'bg-orange-50 text-orange-700',
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 flex-1 shadow-sm">
          <Search size={16} className="text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama, jabatan..."
            className="flex-1 text-sm outline-none font-medium text-gray-700 placeholder-gray-400" />
        </div>
        <select value={filterProj} onChange={e => setFilterProj(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-600 outline-none shadow-sm">
          <option value="">Semua Proyek</option>
          {projects.map(p => <option key={p.id} value={p.id}>{p.id}</option>)}
        </select>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-sm whitespace-nowrap">
          <Plus size={16} /> Tambah Pekerja
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label:'Total Pekerja', val:workers.length, color:'text-gray-800' },
          { label:'Aktif', val:aktif, color:'text-blue-600' },
          { label:'Gaji/Hari (Aktif)', val:fmt(totalGajiHarian), color:'text-emerald-600' },
          { label:'Est. Gaji/Bulan', val:fmt(totalGajiHarian * 26), color:'text-amber-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-500">{s.label}</p>
            <p className={`text-xl font-black mt-1 ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['ID','Nama','Jabatan','Proyek','Tipe Gaji','Gaji Pokok','Est. Bulanan','Status',''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-black text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(w => {
                const proj = projects.find(p => p.id === w.proyekId);
                return (
                  <tr key={w.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5 text-xs font-black text-gray-400">{w.id}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <HardHat size={14} className="text-slate-500" />
                        </div>
                        <p className="font-bold text-gray-800">{w.nama}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${jabatanColors[w.jabatan] || 'bg-gray-100 text-gray-600'}`}>{w.jabatan}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      {proj ? (
                        <div>
                          <p className="text-xs font-black text-blue-600">{proj.id}</p>
                          <p className="text-xs text-gray-400 font-semibold truncate max-w-[120px]">{proj.nama.split(' ').slice(0,2).join(' ')}</p>
                        </div>
                      ) : <span className="text-gray-300 text-xs">—</span>}
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 font-semibold capitalize">{w.tipeGaji}</td>
                    <td className="px-4 py-3.5 font-black text-gray-800">{fmtFull(w.gajiPokok)}</td>
                    <td className="px-4 py-3.5 font-bold text-gray-600">{fmt(w.gajiPokok * 26)}</td>
                    <td className="px-4 py-3.5"><Badge status={w.status} /></td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1.5">
                        <button onClick={() => openEdit(w)} className="p-1.5 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-lg"><Pencil size={13} /></button>
                        <button onClick={() => setDeleteTarget(w)} className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="text-center py-12 text-gray-400 font-bold">Tidak ada pekerja ditemukan</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-500">{filtered.length} pekerja ditampilkan</p>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Data Pekerja' : 'Tambah Pekerja'}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Nama Lengkap</label>
              <input value={form.nama} onChange={e => set('nama', e.target.value)} placeholder="Nama pekerja"
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Jabatan</label>
              <select value={form.jabatan} onChange={e => set('jabatan', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500">
                <option value="">-- Pilih Jabatan --</option>
                {JABATAN.map(j => <option key={j} value={j}>{j}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Proyek</label>
              <select value={form.proyekId} onChange={e => set('proyekId', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500">
                <option value="">-- Pilih Proyek --</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.id}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Tipe Gaji</label>
              <select value={form.tipeGaji} onChange={e => set('tipeGaji', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500">
                <option value="harian">Harian</option>
                <option value="mingguan">Mingguan</option>
                <option value="bulanan">Bulanan</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Gaji Pokok (Rp)</label>
              <input type="number" value={form.gajiPokok} onChange={e => set('gajiPokok', e.target.value)} placeholder="0"
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500">
                <option value="aktif">Aktif</option>
                <option value="nonaktif">Nonaktif</option>
              </select>
            </div>
          </div>
          {form.gajiPokok && (
            <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
              <p className="text-xs font-bold text-blue-600">
                Estimasi gaji bulanan (26 hari): <span className="text-blue-900">{fmtFull((Number(form.gajiPokok)||0)*26)}</span>
              </p>
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50">Batal</button>
          <button onClick={handleSave} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700">{editing ? 'Simpan' : 'Tambah'}</button>
        </div>
      </Modal>

      {deleteTarget && (
        <Modal isOpen={true} onClose={() => setDeleteTarget(null)} title="Hapus Pekerja" size="sm">
          <p className="text-sm font-medium text-gray-600 mb-1">Hapus data pekerja:</p>
          <p className="font-bold text-gray-900 mb-5">"{deleteTarget.nama}"?</p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-600">Batal</button>
            <button onClick={() => { deleteWorker(deleteTarget.id); setDeleteTarget(null); }} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700">Hapus</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
