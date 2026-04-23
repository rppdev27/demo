import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { fmt, fmtFull } from '../data/mockData';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';
import { Plus, Pencil, Trash2, Search, Phone, Mail, Truck } from 'lucide-react';

const EMPTY = { nama:'', kategori:'', kontak:'', telepon:'', email:'', totalTransaksi:'', hutang:'', status:'aktif' };
const KATEGORI_VENDOR = ['Material Besi','Material Umum','Keramik & Tile','Beton Precast','Sewa Peralatan','Material Galian','Cat & Finishing','MEP','Lain-lain'];

export default function Vendor() {
  const { vendors, addVendor, updateVendor, deleteVendor } = useApp();
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = vendors.filter(v => {
    const s = search.toLowerCase();
    return !s || v.nama.toLowerCase().includes(s) || v.kategori.toLowerCase().includes(s) || v.kontak.toLowerCase().includes(s);
  });

  const totalHutang = vendors.reduce((s, v) => s + v.hutang, 0);
  const totalTx = vendors.reduce((s, v) => s + v.totalTransaksi, 0);

  const openAdd = () => { setForm(EMPTY); setEditing(null); setShowModal(true); };
  const openEdit = (v) => { setForm({ ...v, totalTransaksi: String(v.totalTransaksi), hutang: String(v.hutang) }); setEditing(v.id); setShowModal(true); };
  const handleSave = () => {
    const data = { ...form, totalTransaksi: Number(form.totalTransaksi) || 0, hutang: Number(form.hutang) || 0 };
    if (editing) updateVendor(editing, data);
    else addVendor(data);
    setShowModal(false);
  };
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 flex-1 shadow-sm">
          <Search size={16} className="text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari vendor, kategori, kontak..."
            className="flex-1 text-sm outline-none font-medium text-gray-700 placeholder-gray-400" />
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-sm whitespace-nowrap">
          <Plus size={16} /> Tambah Vendor
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label:'Total Vendor', val:vendors.length, sub:'terdaftar', color:'text-gray-800' },
          { label:'Total Transaksi', val:fmt(totalTx), sub:'semua vendor', color:'text-emerald-600' },
          { label:'Total Hutang', val:fmt(totalHutang), sub:'belum lunas', color: totalHutang > 0 ? 'text-red-600' : 'text-gray-400' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-500">{s.label}</p>
            <p className={`text-xl font-black mt-1 ${s.color}`}>{s.val}</p>
            <p className="text-xs text-gray-400 font-semibold">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3">
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <p className="text-gray-400 font-bold">Tidak ada vendor ditemukan</p>
          </div>
        )}
        {filtered.map(v => (
          <div key={v.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Truck size={22} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-black text-gray-900">{v.nama}</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-full">{v.kategori}</span>
                    <Badge status={v.status} />
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs font-semibold text-gray-500">
                    <span className="flex items-center gap-1"><Phone size={12} />{v.telepon}</span>
                    {v.email && <span className="flex items-center gap-1"><Mail size={12} />{v.email}</span>}
                    <span>PIC: {v.kontak}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-black text-gray-800">{fmt(v.totalTransaksi)}</p>
                  <p className="text-xs text-gray-400 font-semibold">Total Transaksi</p>
                  {v.hutang > 0 && (
                    <p className="text-sm font-black text-red-600 mt-1">{fmt(v.hutang)} hutang</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex border-t border-gray-100 divide-x divide-gray-100">
              <button onClick={() => openEdit(v)} className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-bl-2xl">
                <Pencil size={13} /> Edit
              </button>
              <button onClick={() => setDeleteTarget(v)} className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors rounded-br-2xl">
                <Trash2 size={13} /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Vendor' : 'Tambah Vendor Baru'}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label:'Nama Vendor', key:'nama', col:2, placeholder:'PT / CV / UD ...' },
              { label:'Kategori', key:'kategori', type:'select', options:KATEGORI_VENDOR },
              { label:'Status', key:'status', type:'select', options:[{v:'aktif',l:'Aktif'},{v:'nonaktif',l:'Nonaktif'}] },
              { label:'Nama Kontak', key:'kontak', placeholder:'Nama PIC' },
              { label:'No. Telepon', key:'telepon', placeholder:'021-...' },
              { label:'Email', key:'email', placeholder:'email@vendor.com' },
              { label:'Total Transaksi (Rp)', key:'totalTransaksi', type:'number', placeholder:'0' },
              { label:'Hutang (Rp)', key:'hutang', type:'number', placeholder:'0' },
            ].map(f => (
              <div key={f.key} className={f.col === 2 ? 'col-span-2' : ''}>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">{f.label}</label>
                {f.type === 'select' ? (
                  <select value={form[f.key]} onChange={e => set(f.key, e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500">
                    {(f.options || []).map(o => typeof o === 'string'
                      ? <option key={o} value={o}>{o}</option>
                      : <option key={o.v} value={o.v}>{o.l}</option>
                    )}
                  </select>
                ) : (
                  <input type={f.type || 'text'} value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50">Batal</button>
          <button onClick={handleSave} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700">{editing ? 'Simpan' : 'Tambah'}</button>
        </div>
      </Modal>

      {deleteTarget && (
        <Modal isOpen={true} onClose={() => setDeleteTarget(null)} title="Hapus Vendor" size="sm">
          <p className="text-sm font-medium text-gray-600 mb-1">Hapus vendor:</p>
          <p className="font-bold text-gray-900 mb-5">"{deleteTarget.nama}"?</p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-600">Batal</button>
            <button onClick={() => { deleteVendor(deleteTarget.id); setDeleteTarget(null); }} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700">Hapus</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
