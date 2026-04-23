import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { fmt, fmtFull } from '../data/mockData';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';
import { Plus, Pencil, Trash2, Search, CheckCircle, FileText, Eye } from 'lucide-react';

const EMPTY = { proyekId:'', client:'', tanggal:'', jatuhTempo:'', termin:'', jumlah:'', status:'unpaid', dibayar:null };

function InvoicePreview({ inv, proj, onClose }) {
  return (
    <Modal isOpen={true} onClose={onClose} title="Preview Invoice" size="lg">
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 font-mono text-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mb-2">
              <FileText size={20} className="text-white" />
            </div>
            <p className="font-black text-lg text-gray-900 font-sans">SII Kontraktor</p>
            <p className="text-xs text-gray-500 font-sans">Jl. Sudirman No. 45, Jakarta Selatan</p>
            <p className="text-xs text-gray-500 font-sans">Telp: 021-55778899</p>
          </div>
          <div className="text-right">
            <p className="font-black text-2xl text-gray-900 font-sans">{inv.id}</p>
            <Badge status={inv.status} />
          </div>
        </div>
        <div className="border-t border-b border-gray-200 py-4 mb-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400 font-sans font-bold">Ditagihkan Kepada</p>
            <p className="font-black text-gray-900 font-sans">{inv.client}</p>
            {proj && <p className="text-xs text-gray-500 font-sans">{proj.lokasi}</p>}
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 font-sans font-bold">Tanggal / Jatuh Tempo</p>
            <p className="font-bold text-gray-800 font-sans">{inv.tanggal}</p>
            <p className="text-xs text-red-600 font-bold font-sans">{inv.jatuhTempo}</p>
          </div>
        </div>
        <table className="w-full mb-6">
          <thead><tr className="border-b border-gray-200"><th className="text-left py-2 text-xs text-gray-500 font-sans">Deskripsi</th><th className="text-right py-2 text-xs text-gray-500 font-sans">Jumlah</th></tr></thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-3 font-sans">
                <p className="font-bold text-gray-800">{inv.termin}</p>
                {proj && <p className="text-xs text-gray-500">{proj.nama}</p>}
              </td>
              <td className="py-3 text-right font-black text-gray-900 font-sans">{fmtFull(inv.jumlah)}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end">
          <div className="text-right">
            <p className="text-xs text-gray-400 font-sans">TOTAL TAGIHAN</p>
            <p className="text-2xl font-black text-blue-700 font-sans">{fmtFull(inv.jumlah)}</p>
          </div>
        </div>
        {inv.status === 'paid' && (
          <div className="mt-4 border-2 border-emerald-500 rounded-xl p-3 text-center">
            <p className="text-emerald-600 font-black text-lg font-sans">✓ LUNAS</p>
            <p className="text-xs text-emerald-600 font-sans">Dibayar: {inv.dibayar}</p>
          </div>
        )}
      </div>
      <button onClick={onClose} className="w-full mt-4 py-2.5 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50">Tutup</button>
    </Modal>
  );
}

export default function Invoice() {
  const { projects, invoices, addInvoice, updateInvoice, deleteInvoice } = useApp();
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [preview, setPreview] = useState(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filtered = invoices.filter(inv => {
    const s = search.toLowerCase();
    return (
      (!filterStatus || inv.status === filterStatus) &&
      (!s || inv.id.toLowerCase().includes(s) || inv.client.toLowerCase().includes(s))
    );
  }).sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

  const totals = {
    all: invoices.reduce((s, i) => s + i.jumlah, 0),
    paid: invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.jumlah, 0),
    unpaid: invoices.filter(i => i.status === 'unpaid').reduce((s, i) => s + i.jumlah, 0),
    overdue: invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.jumlah, 0),
  };

  const openAdd = () => { setForm(EMPTY); setEditing(null); setShowModal(true); };
  const openEdit = (inv) => { setForm({ ...inv, jumlah: String(inv.jumlah) }); setEditing(inv.id); setShowModal(true); };
  const handleSave = () => {
    const data = { ...form, jumlah: Number(form.jumlah) || 0 };
    if (editing) updateInvoice(editing, data);
    else addInvoice(data);
    setShowModal(false);
  };
  const markPaid = (inv) => updateInvoice(inv.id, { status: 'paid', dibayar: new Date().toISOString().slice(0,10) });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 flex-1 shadow-sm">
          <Search size={16} className="text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari invoice, client..."
            className="flex-1 text-sm outline-none font-medium text-gray-700 placeholder-gray-400" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-600 outline-none shadow-sm">
          <option value="">Semua Status</option>
          <option value="paid">Lunas</option>
          <option value="unpaid">Belum Bayar</option>
          <option value="overdue">Jatuh Tempo</option>
        </select>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-sm whitespace-nowrap">
          <Plus size={16} /> Buat Invoice
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:'Total Invoice', val:fmt(totals.all), color:'text-gray-800' },
          { label:'Sudah Lunas', val:fmt(totals.paid), color:'text-emerald-600' },
          { label:'Belum Bayar', val:fmt(totals.unpaid), color:'text-amber-600' },
          { label:'Jatuh Tempo', val:fmt(totals.overdue), color:'text-red-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-500">{s.label}</p>
            <p className={`text-xl font-black mt-1 ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Invoice list */}
      <div className="grid gap-3">
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <p className="text-gray-400 font-bold">Tidak ada invoice ditemukan</p>
          </div>
        )}
        {filtered.map(inv => {
          const proj = projects.find(p => p.id === inv.proyekId);
          const borderColor = inv.status === 'paid' ? 'border-l-emerald-500' : inv.status === 'overdue' ? 'border-l-red-500' : 'border-l-amber-500';
          return (
            <div key={inv.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 p-5">
                <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <p className="text-xs font-black text-gray-400">{inv.id}</p>
                    <p className="font-black text-gray-900 text-sm mt-0.5 truncate">{inv.client}</p>
                    {proj && <p className="text-xs text-gray-400 font-semibold truncate">{proj.nama.split(' ').slice(0,3).join(' ')}</p>}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400">Termin</p>
                    <p className="text-sm font-bold text-gray-700">{inv.termin}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400">Tanggal / Jatuh Tempo</p>
                    <p className="text-sm font-bold text-gray-700">{inv.tanggal}</p>
                    <p className={`text-xs font-bold ${inv.status === 'overdue' ? 'text-red-600' : 'text-gray-400'}`}>{inv.jatuhTempo}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400">Jumlah</p>
                    <p className="text-lg font-black text-gray-900">{fmt(inv.jumlah)}</p>
                    <Badge status={inv.status} />
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => setPreview(inv)} className="p-2 hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded-xl transition-colors" title="Preview">
                    <Eye size={16} />
                  </button>
                  {inv.status !== 'paid' && (
                    <button onClick={() => markPaid(inv)} className="p-2 hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 rounded-xl transition-colors" title="Tandai Lunas">
                      <CheckCircle size={16} />
                    </button>
                  )}
                  <button onClick={() => openEdit(inv)} className="p-2 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-xl transition-colors">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => setDeleteTarget(inv)} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-xl transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Invoice' : 'Buat Invoice Baru'}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Proyek</label>
              <select value={form.proyekId} onChange={e => { set('proyekId', e.target.value); const p = projects.find(x=>x.id===e.target.value); if(p) set('client', p.client); }}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500">
                <option value="">-- Pilih Proyek --</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.id}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Client</label>
              <input value={form.client} onChange={e => set('client', e.target.value)} placeholder="Nama client"
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Tanggal Invoice</label>
              <input type="date" value={form.tanggal} onChange={e => set('tanggal', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Jatuh Tempo</label>
              <input type="date" value={form.jatuhTempo} onChange={e => set('jatuhTempo', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Termin / Keterangan</label>
            <input value={form.termin} onChange={e => set('termin', e.target.value)} placeholder="Contoh: Termin 1 (20%)"
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Jumlah (Rp)</label>
              <input type="number" value={form.jumlah} onChange={e => set('jumlah', e.target.value)} placeholder="0"
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500">
                <option value="unpaid">Belum Bayar</option>
                <option value="paid">Lunas</option>
                <option value="overdue">Jatuh Tempo</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50">Batal</button>
          <button onClick={handleSave} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700">{editing ? 'Simpan' : 'Buat Invoice'}</button>
        </div>
      </Modal>

      {preview && <InvoicePreview inv={preview} proj={projects.find(p=>p.id===preview.proyekId)} onClose={() => setPreview(null)} />}

      {deleteTarget && (
        <Modal isOpen={true} onClose={() => setDeleteTarget(null)} title="Hapus Invoice" size="sm">
          <p className="text-sm font-medium text-gray-600 mb-1">Hapus invoice:</p>
          <p className="font-bold text-gray-900 mb-5">"{deleteTarget.id} — {deleteTarget.client}"?</p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-600">Batal</button>
            <button onClick={() => { deleteInvoice(deleteTarget.id); setDeleteTarget(null); }} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700">Hapus</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
