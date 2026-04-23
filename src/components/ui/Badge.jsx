const cfg = {
  ongoing:    { cls:'bg-blue-50 text-blue-700 border-blue-100',   label:'Berjalan' },
  selesai:    { cls:'bg-emerald-50 text-emerald-700 border-emerald-100', label:'Selesai' },
  pending:    { cls:'bg-amber-50 text-amber-700 border-amber-100', label:'Pending' },
  ditunda:    { cls:'bg-gray-100 text-gray-600 border-gray-200',   label:'Ditunda' },
  paid:       { cls:'bg-emerald-50 text-emerald-700 border-emerald-100', label:'Lunas' },
  unpaid:     { cls:'bg-amber-50 text-amber-700 border-amber-100', label:'Belum Bayar' },
  overdue:    { cls:'bg-red-50 text-red-700 border-red-100',       label:'Jatuh Tempo' },
  approved:   { cls:'bg-emerald-50 text-emerald-700 border-emerald-100', label:'Disetujui' },
  aktif:      { cls:'bg-blue-50 text-blue-700 border-blue-100',    label:'Aktif' },
  nonaktif:   { cls:'bg-gray-100 text-gray-600 border-gray-200',   label:'Nonaktif' },
};

export default function Badge({ status }) {
  const c = cfg[status] || { cls:'bg-gray-100 text-gray-600 border-gray-200', label:status };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${c.cls}`}>
      {c.label}
    </span>
  );
}
