import { useState } from 'react';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';
import { Plus, Pencil, Trash2, Shield, User, Eye, EyeOff } from 'lucide-react';

const ROLES = ['Owner', 'Admin', 'Finance', 'Project Manager', 'Field Staff'];

const roleColors = {
  'Owner':          'bg-violet-50 text-violet-700 border-violet-100',
  'Admin':          'bg-blue-50 text-blue-700 border-blue-100',
  'Finance':        'bg-emerald-50 text-emerald-700 border-emerald-100',
  'Project Manager':'bg-amber-50 text-amber-700 border-amber-100',
  'Field Staff':    'bg-gray-100 text-gray-600 border-gray-200',
};

const rolePerms = {
  'Owner':           ['Dashboard','Proyek','RAB','Pengeluaran','Invoice','Vendor','Tenaga Kerja','Pengaturan'],
  'Admin':           ['Dashboard','Proyek','RAB','Pengeluaran','Invoice','Vendor','Tenaga Kerja'],
  'Finance':         ['Dashboard','Pengeluaran','Invoice'],
  'Project Manager': ['Dashboard','Proyek','RAB','Pengeluaran','Tenaga Kerja'],
  'Field Staff':     ['Dashboard','Pengeluaran'],
};

const initialUsers = [
  { id:'USR-001', nama:'Ahmad Fauzi',    email:'ahmad@siikontraktor.id',  role:'Owner',          status:'aktif',   avatar:'AF' },
  { id:'USR-002', nama:'Rina Marlina',   email:'rina@siikontraktor.id',   role:'Finance',        status:'aktif',   avatar:'RM' },
  { id:'USR-003', nama:'Doni Setiawan',  email:'doni@siikontraktor.id',   role:'Project Manager',status:'aktif',   avatar:'DS' },
  { id:'USR-004', nama:'Ayu Lestari',    email:'ayu@siikontraktor.id',    role:'Admin',          status:'aktif',   avatar:'AL' },
  { id:'USR-005', nama:'Fajar Nugroho',  email:'fajar@siikontraktor.id',  role:'Field Staff',    status:'nonaktif',avatar:'FN' },
];

const EMPTY = { nama:'', email:'', role:'Admin', status:'aktif', password:'' };

export default function Pengaturan() {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [activeTab, setActiveTab] = useState('users');

  const openAdd = () => { setForm(EMPTY); setEditing(null); setShowModal(true); };
  const openEdit = (u) => { setForm({ ...u, password:'' }); setEditing(u.id); setShowModal(true); };
  const handleSave = () => {
    const avatar = form.nama.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
    const data = { ...form, avatar };
    if (editing) {
      setUsers(p => p.map(u => u.id === editing ? { ...u, ...data } : u));
    } else {
      setUsers(p => [...p, { ...data, id:`USR-${String(p.length+1).padStart(3,'0')}` }]);
    }
    setShowModal(false);
  };
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 w-fit shadow-sm">
        {[{id:'users',label:'Pengguna & Akses'},{id:'roles',label:'Info Role'}].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab===t.id ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'users' && (
        <>
          {/* Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ROLES.slice(0,4).map(r => (
              <div key={r} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-xs font-bold text-gray-500">{r}</p>
                <p className="text-2xl font-black text-gray-900 mt-1">{users.filter(u=>u.role===r).length}</p>
                <p className="text-xs text-gray-400 font-semibold">pengguna</p>
              </div>
            ))}
          </div>

          {/* User table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-black text-gray-800">Daftar Pengguna</h3>
              <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700">
                <Plus size={15} /> Tambah User
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {users.map(u => (
                <div key={u.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-white text-xs font-black">{u.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm">{u.nama}</p>
                    <p className="text-xs text-gray-400 font-semibold">{u.email}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${roleColors[u.role] || 'bg-gray-100 text-gray-600'}`}>
                    {u.role}
                  </span>
                  <Badge status={u.status} />
                  <div className="flex gap-1.5">
                    <button onClick={() => openEdit(u)} className="p-1.5 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-lg transition-colors"><Pencil size={14} /></button>
                    {u.role !== 'Owner' && (
                      <button onClick={() => setDeleteTarget(u)} className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-colors"><Trash2 size={14} /></button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'roles' && (
        <div className="grid gap-4">
          {ROLES.map(r => (
            <div key={r} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <Shield size={18} className="text-blue-600" />
                <h3 className="font-black text-gray-800">{r}</h3>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${roleColors[r]}`}>{r}</span>
                <span className="ml-auto text-xs font-bold text-gray-400">{users.filter(u=>u.role===r).length} pengguna</span>
              </div>
              <div className="px-5 py-4">
                <p className="text-xs font-black text-gray-500 mb-3 uppercase tracking-wider">Akses Modul</p>
                <div className="flex flex-wrap gap-2">
                  {['Dashboard','Proyek','RAB','Pengeluaran','Invoice','Vendor','Tenaga Kerja','Pengaturan'].map(m => {
                    const hasAccess = rolePerms[r]?.includes(m);
                    return (
                      <span key={m} className={`text-xs font-bold px-3 py-1 rounded-full border ${hasAccess ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-gray-50 text-gray-300 border-gray-100 line-through'}`}>
                        {m}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add/Edit */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Pengguna' : 'Tambah Pengguna'}>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Nama Lengkap</label>
            <input value={form.nama} onChange={e => set('nama', e.target.value)} placeholder="Nama pengguna"
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Email</label>
            <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@perusahaan.com"
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Role</label>
              <select value={form.role} onChange={e => set('role', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500">
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
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
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">{editing ? 'Password Baru (kosongkan jika tidak diubah)' : 'Password'}</label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 pr-10 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {form.role && (
            <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
              <p className="text-xs font-black text-blue-600 mb-1.5">Akses untuk role <span className="text-blue-800">{form.role}</span>:</p>
              <div className="flex flex-wrap gap-1.5">
                {rolePerms[form.role]?.map(m => (
                  <span key={m} className="text-xs font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">{m}</span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50">Batal</button>
          <button onClick={handleSave} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700">{editing ? 'Simpan' : 'Tambah'}</button>
        </div>
      </Modal>

      {deleteTarget && (
        <Modal isOpen={true} onClose={() => setDeleteTarget(null)} title="Hapus Pengguna" size="sm">
          <p className="text-sm font-medium text-gray-600 mb-1">Hapus pengguna:</p>
          <p className="font-bold text-gray-900 mb-5">"{deleteTarget.nama}"?</p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-600">Batal</button>
            <button onClick={() => { setUsers(p => p.filter(u => u.id !== deleteTarget.id)); setDeleteTarget(null); }}
              className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700">Hapus</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
