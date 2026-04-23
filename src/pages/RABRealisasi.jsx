import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { fmt, fmtFull } from '../data/mockData';
import Modal from '../components/ui/Modal';
import { Plus, Pencil, Trash2, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const EMPTY = { proyekId:'', kategori:'', item:'', satuan:'', volume:'', hargaSatuan:'', realisasi:'' };
const KATEGORI = ['Pekerjaan Persiapan','Pekerjaan Pondasi','Pekerjaan Struktur','Pekerjaan Arsitektur','MEP','Pekerjaan Sipil','Pekerjaan Jembatan','Finishing','Lain-lain'];

export default function RABRealisasi() {
  const { projects, rabItems, addRABItem, updateRABItem, deleteRABItem } = useApp();
  const [selectedProj, setSelectedProj] = useState(projects[0]?.id || '');
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const proj = projects.find(p => p.id === selectedProj);
  const items = rabItems.filter(r => r.proyekId === selectedProj);

  const totalRAB = items.reduce((s, r) => s + r.totalRAB, 0);
  const totalReal = items.reduce((s, r) => s + r.realisasi, 0);
  const variance = totalReal - totalRAB;
  const pct = totalRAB > 0 ? (totalReal / totalRAB) * 100 : 0;

  // Group by kategori
  const byKat = items.reduce((acc, r) => {
    if (!acc[r.kategori]) acc[r.kategori] = [];
    acc[r.kategori].push(r);
    return acc;
  }, {});

  const openAdd = () => { setForm({ ...EMPTY, proyekId: selectedProj }); setEditing(null); setShowModal(true); };
  const openEdit = (r) => {
    setForm({ ...r, volume: String(r.volume), hargaSatuan: String(r.hargaSatuan), realisasi: String(r.realisasi) });
    setEditing(r.id); setShowModal(true);
  };
  const handleSave = () => {
    const vol = Number(form.volume) || 0;
    const harga = Number(form.hargaSatuan) || 0;
    const data = { ...form, proyekId: selectedProj, volume: vol, hargaSatuan: harga, totalRAB: vol * harga, realisasi: Number(form.realisasi) || 0 };
    if (editing) updateRABItem(editing, data);
    else addRABItem(data);
    setShowModal(false);
  };
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="space-y-5">
      {/* Project selector */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex-1">
            <label className="block text-xs font-black text-gray-500 mb-1.5">Pilih Proyek</label>
            <select value={selectedProj} onChange={e => setSelectedProj(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-700 outline-none focus:border-blue-500">
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.id} — {p.nama}</option>
              ))}
            </select>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 whitespace-nowrap self-end">
            <Plus size={16} /> Tambah Item RAB
          </button>
        </div>
      </div>

      {/* Summary */}
      {proj && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label:'Total RAB', val:fmt(totalRAB), sub:'anggaran', color:'text-gray-800' },
            { label:'Total Realisasi', val:fmt(totalReal), sub:'pengeluaran aktual', color: totalReal > totalRAB ? 'text-red-600' : 'text-emerald-600' },
            { label:'Variance', val:fmt(Math.abs(variance)), sub: variance > 0 ? '⚠ Over Budget' : '✓ Under Budget', color: variance > 0 ? 'text-red-600' : 'text-emerald-600' },
            { label:'Persentase RAB', val:`${pct.toFixed(1)}%`, sub:'realisasi vs RAB', color: pct > 100 ? 'text-red-600' : 'text-blue-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-500">{s.label}</p>
              <p className={`text-xl font-black mt-1 ${s.color}`}>{s.val}</p>
              <p className="text-xs text-gray-400 font-semibold mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* Overall progress bar */}
      {proj && (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex justify-between text-sm font-black text-gray-700 mb-2">
            <span>Penyerapan Anggaran — {proj.nama}</span>
            <span className={pct > 100 ? 'text-red-600' : 'text-blue-600'}>{pct.toFixed(1)}%</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-700 ${pct > 100 ? 'bg-red-500' : pct > 80 ? 'bg-amber-500' : 'bg-blue-500'}`}
              style={{ width: `${Math.min(pct, 100)}%` }} />
          </div>
          <div className="flex justify-between text-xs font-semibold text-gray-400 mt-1.5">
            <span>RAB: {fmtFull(totalRAB)}</span>
            <span>Realisasi: {fmtFull(totalReal)}</span>
          </div>
        </div>
      )}

      {/* Items by category */}
      {Object.entries(byKat).map(([kat, katItems]) => {
        const katRAB = katItems.reduce((s, r) => s + r.totalRAB, 0);
        const katReal = katItems.reduce((s, r) => s + r.realisasi, 0);
        const katPct = katRAB > 0 ? (katReal / katRAB) * 100 : 0;
        const over = katReal > katRAB;
        return (
          <div key={kat} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className={`flex items-center justify-between px-5 py-3.5 border-b ${over ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
              <div className="flex items-center gap-2">
                {over && <AlertTriangle size={15} className="text-red-500" />}
                <h3 className="font-black text-gray-800 text-sm">{kat}</h3>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="text-gray-500">RAB: {fmt(katRAB)}</span>
                <span className={over ? 'text-red-600' : 'text-emerald-600'}>Real: {fmt(katReal)}</span>
                <span className={`flex items-center gap-1 ${over ? 'text-red-600' : 'text-emerald-600'}`}>
                  {over ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {katPct.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Item Pekerjaan','Sat','Vol','Harga Satuan','Total RAB','Realisasi','Selisih',''].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-xs font-black text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {katItems.map(r => {
                    const selisih = r.realisasi - r.totalRAB;
                    return (
                      <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-semibold text-gray-800">{r.item}</td>
                        <td className="px-4 py-3 text-gray-500 font-semibold">{r.satuan}</td>
                        <td className="px-4 py-3 text-gray-600 font-bold">{r.volume.toLocaleString()}</td>
                        <td className="px-4 py-3 text-gray-600 font-semibold">{fmt(r.hargaSatuan)}</td>
                        <td className="px-4 py-3 font-bold text-gray-800">{fmt(r.totalRAB)}</td>
                        <td className="px-4 py-3 font-bold text-gray-800">{fmt(r.realisasi)}</td>
                        <td className={`px-4 py-3 font-black ${selisih > 0 ? 'text-red-600' : selisih < 0 ? 'text-emerald-600' : 'text-gray-400'}`}>
                          {selisih > 0 ? '+' : ''}{fmt(Math.abs(selisih))}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5">
                            <button onClick={() => openEdit(r)} className="p-1.5 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-lg transition-colors"><Pencil size={13} /></button>
                            <button onClick={() => setDeleteTarget(r)} className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-colors"><Trash2 size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {items.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
          <p className="text-gray-400 font-bold">Belum ada item RAB untuk proyek ini.</p>
          <button onClick={openAdd} className="mt-3 text-blue-600 font-bold text-sm hover:underline">+ Tambah item pertama</button>
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Item RAB' : 'Tambah Item RAB'} size="lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Kategori</label>
            <select value={form.kategori} onChange={e => set('kategori', e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500">
              <option value="">-- Pilih Kategori --</option>
              {KATEGORI.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Satuan</label>
            <input value={form.satuan} onChange={e => set('satuan', e.target.value)} placeholder="m3, kg, ls, unit..."
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500" />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Item Pekerjaan</label>
            <input value={form.item} onChange={e => set('item', e.target.value)} placeholder="Nama item pekerjaan..."
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500" />
          </div>
          {[
            { label:'Volume', key:'volume', placeholder:'0' },
            { label:'Harga Satuan (Rp)', key:'hargaSatuan', placeholder:'0' },
            { label:'Realisasi (Rp)', key:'realisasi', placeholder:'0' },
          ].map(f => (
            <div key={f.key} className={f.key==='realisasi' ? 'col-span-2' : ''}>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">{f.label}</label>
              <input type="number" value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500" />
            </div>
          ))}
          {form.volume && form.hargaSatuan && (
            <div className="col-span-2 bg-blue-50 rounded-xl p-3 border border-blue-100">
              <p className="text-xs font-bold text-blue-600">Total RAB (kalkulasi): <span className="text-blue-800">{fmtFull((Number(form.volume)||0) * (Number(form.hargaSatuan)||0))}</span></p>
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50">Batal</button>
          <button onClick={handleSave} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700">{editing ? 'Simpan' : 'Tambah'}</button>
        </div>
      </Modal>

      {deleteTarget && (
        <Modal isOpen={true} onClose={() => setDeleteTarget(null)} title="Hapus Item RAB" size="sm">
          <p className="text-sm font-medium text-gray-600 mb-1">Hapus item:</p>
          <p className="font-bold text-gray-900 mb-5">"{deleteTarget.item}"?</p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-600">Batal</button>
            <button onClick={() => { deleteRABItem(deleteTarget.id); setDeleteTarget(null); }} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700">Hapus</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
