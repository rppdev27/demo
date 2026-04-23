import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { fmt } from '../data/mockData';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';
import { Plus, Pencil, Trash2, Search, MapPin, User, Calendar } from 'lucide-react';

const EMPTY = { nama:'', lokasi:'', client:'', nilaiKontrak:'', status:'ongoing', progress:0, pic:'', mulai:'', selesai:'', deskripsi:'', totalRAB:'', totalRealisasi:0 };

function ConfirmDelete({ isOpen, onClose, onConfirm, name }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Hapus Proyek" size="sm">
      <p className="text-gray-600 text-sm font-medium mb-1">Yakin ingin menghapus proyek:</p>
      <p className="font-bold text-gray-900 mb-5">"{name}"?</p>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
        <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors">Hapus</button>
      </div>
    </Modal>
  );
}

export default function Proyek() {
  const { projects, addProject, updateProject, deleteProject } = useApp();
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filtered = projects.filter(p => {
    const s = search.toLowerCase();
    return (
      (!filterStatus || p.status === filterStatus) &&
      (!s || p.nama.toLowerCase().includes(s) || p.client.toLowerCase().includes(s) || p.lokasi.toLowerCase().includes(s))
    );
  });

  const openAdd = () => { setForm(EMPTY); setEditing(null); setShowModal(true); };
  const openEdit = (p) => {
    setForm({ ...p, nilaiKontrak: String(p.nilaiKontrak), totalRAB: String(p.totalRAB) });
    setEditing(p.id);
    setShowModal(true);
  };
  const handleSave = () => {
    const data = {
      ...form,
      nilaiKontrak: Number(form.nilaiKontrak) || 0,
      totalRAB: Number(form.totalRAB) || 0,
      progress: Number(form.progress) || 0,
    };
    if (editing) updateProject(editing, data);
    else addProject(data);
    setShowModal(false);
  };
  const handleDelete = () => { deleteProject(deleteTarget.id); setDeleteTarget(null); };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const statusColors = { ongoing:'bg-blue-50 border-l-blue-500', selesai:'bg-emerald-50 border-l-emerald-500', pending:'bg-amber-50 border-l-amber-500', ditunda:'bg-gray-50 border-l-gray-400' };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 flex-1 shadow-sm">
          <Search size={16} className="text-gray-400" />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari proyek, client, lokasi..." className="flex-1 text-sm outline-none font-medium text-gray-700 placeholder-gray-400" />
        </div>
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-600 outline-none shadow-sm">
          <option value="">Semua Status</option>
          <option value="ongoing">Berjalan</option>
          <option value="selesai">Selesai</option>
          <option value="pending">Pending</option>
        </select>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap">
          <Plus size={16} /> Tambah Proyek
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label:'Total Proyek', val:projects.length, color:'text-gray-700' },
          { label:'Berjalan', val:projects.filter(p=>p.status==='ongoing').length, color:'text-blue-600' },
          { label:'Selesai', val:projects.filter(p=>p.status==='selesai').length, color:'text-emerald-600' },
          { label:'Pending', val:projects.filter(p=>p.status==='pending').length, color:'text-amber-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 text-center shadow-sm">
            <p className={`text-3xl font-black ${s.color}`}>{s.val}</p>
            <p className="text-xs text-gray-500 font-bold mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Project cards */}
      <div className="grid gap-4">
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <p className="text-gray-400 font-bold">Tidak ada proyek ditemukan</p>
          </div>
        )}
        {filtered.map(p => {
          const pct = (p.totalRealisasi / p.totalRAB) * 100 || 0;
          const overBudget = p.totalRealisasi > p.totalRAB;
          return (
            <div key={p.id} className={`bg-white rounded-2xl border-l-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${statusColors[p.status] || 'bg-white border-l-gray-300'}`}>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-black text-gray-400">{p.id}</span>
                      <Badge status={p.status} />
                      {overBudget && p.status==='ongoing' && (
                        <span className="text-xs font-black text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">⚠ Over Budget</span>
                      )}
                    </div>
                    <h3 className="font-black text-gray-900 text-base mb-2">{p.nama}</h3>
                    <div className="flex flex-wrap gap-3 text-xs font-semibold text-gray-500">
                      <span className="flex items-center gap-1"><MapPin size={12} />{p.lokasi}</span>
                      <span className="flex items-center gap-1"><User size={12} />{p.pic}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} />{p.mulai} – {p.selesai}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-black text-gray-900">{fmt(p.nilaiKontrak)}</p>
                    <p className="text-xs text-gray-400 font-semibold">Nilai Kontrak</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 font-bold">RAB</p>
                    <p className="text-sm font-black text-gray-700">{fmt(p.totalRAB)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold">Realisasi</p>
                    <p className={`text-sm font-black ${overBudget ? 'text-red-600' : 'text-gray-700'}`}>{fmt(p.totalRealisasi)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold">Progress</p>
                    <p className="text-sm font-black text-blue-600">{p.progress}%</p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs font-bold text-gray-400 mb-1">
                    <span>Progress Fisik</span>
                    <span>{p.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${p.progress >= 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width:`${p.progress}%` }} />
                  </div>
                </div>
              </div>

              <div className="flex border-t border-gray-100 divide-x divide-gray-100">
                <button onClick={() => openEdit(p)} className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-bl-2xl">
                  <Pencil size={13} /> Edit
                </button>
                <button onClick={() => setDeleteTarget(p)} className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors rounded-br-2xl">
                  <Trash2 size={13} /> Hapus
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Proyek' : 'Tambah Proyek Baru'} size="lg">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label:'Nama Proyek', key:'nama', col:2, placeholder:'Contoh: Gedung Kantor PT XYZ' },
            { label:'Client', key:'client', placeholder:'Nama client/owner' },
            { label:'Lokasi', key:'lokasi', placeholder:'Kota / Kabupaten' },
            { label:'Nilai Kontrak (Rp)', key:'nilaiKontrak', type:'number', placeholder:'0' },
            { label:'Total RAB (Rp)', key:'totalRAB', type:'number', placeholder:'0' },
            { label:'PIC', key:'pic', placeholder:'Nama penanggung jawab' },
            { label:'Tanggal Mulai', key:'mulai', type:'date' },
            { label:'Tanggal Selesai', key:'selesai', type:'date' },
          ].map(f => (
            <div key={f.key} className={f.col === 2 ? 'col-span-2' : ''}>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">{f.label}</label>
              <input type={f.type || 'text'} value={form[f.key]} onChange={e=>set(f.key,e.target.value)}
                placeholder={f.placeholder}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500 transition-colors" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Status</label>
            <select value={form.status} onChange={e=>set('status',e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500">
              <option value="ongoing">Berjalan</option>
              <option value="selesai">Selesai</option>
              <option value="pending">Pending</option>
              <option value="ditunda">Ditunda</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Progress ({form.progress}%)</label>
            <input type="range" min="0" max="100" value={form.progress} onChange={e=>set('progress',e.target.value)}
              className="w-full accent-blue-600" />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Deskripsi</label>
            <textarea value={form.deskripsi} onChange={e=>set('deskripsi',e.target.value)} rows={2}
              placeholder="Deskripsi singkat proyek..."
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500 transition-colors resize-none" />
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50">Batal</button>
          <button onClick={handleSave} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700">{editing ? 'Simpan Perubahan' : 'Tambah Proyek'}</button>
        </div>
      </Modal>

      <ConfirmDelete isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} name={deleteTarget?.nama} />
    </div>
  );
}
