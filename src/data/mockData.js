export const initialProjects = [
  { id:'PRJ-001', nama:'Gedung Perkantoran PT Maju Bersama', lokasi:'Jakarta Selatan', client:'PT Maju Bersama', nilaiKontrak:2850000000, status:'ongoing', progress:68, pic:'Budi Santoso', mulai:'2024-01-15', selesai:'2024-09-30', deskripsi:'Pembangunan gedung perkantoran 5 lantai dengan area parkir basement', totalRAB:2600000000, totalRealisasi:1820000000 },
  { id:'PRJ-002', nama:'Renovasi RSUD Harapan Sehat', lokasi:'Bandung', client:'RSUD Harapan Sehat', nilaiKontrak:980000000, status:'ongoing', progress:85, pic:'Dewi Lestari', mulai:'2024-02-01', selesai:'2024-07-31', deskripsi:'Renovasi gedung rawat inap dan instalasi MEP lengkap', totalRAB:920000000, totalRealisasi:840000000 },
  { id:'PRJ-003', nama:'Jembatan Sungai Citarum Km 12', lokasi:'Karawang', client:'Dinas PU Karawang', nilaiKontrak:1500000000, status:'selesai', progress:100, pic:'Agus Prasetyo', mulai:'2023-08-01', selesai:'2024-02-28', deskripsi:'Pembangunan jembatan beton bertulang bentang 45 meter', totalRAB:1450000000, totalRealisasi:1480000000 },
  { id:'PRJ-004', nama:'Perumahan Griya Asri 20 Unit', lokasi:'Depok', client:'PT Properti Indah Nusantara', nilaiKontrak:4200000000, status:'ongoing', progress:25, pic:'Siti Rahmawati', mulai:'2024-03-01', selesai:'2025-03-31', deskripsi:'Pembangunan perumahan cluster 20 unit type 45 dan 60', totalRAB:4000000000, totalRealisasi:950000000 },
  { id:'PRJ-005', nama:'Gedung SDN Sukamaju Baru', lokasi:'Bekasi', client:'Dinas Pendidikan Bekasi', nilaiKontrak:720000000, status:'pending', progress:0, pic:'Hendra Gunawan', mulai:'2024-06-01', selesai:'2024-12-31', deskripsi:'Pembangunan gedung sekolah dasar 6 ruang kelas', totalRAB:690000000, totalRealisasi:0 },
];

export const initialRABItems = [
  { id:'RAB-001', proyekId:'PRJ-001', kategori:'Pekerjaan Persiapan', item:'Mobilisasi & Demobilisasi', satuan:'ls', volume:1, hargaSatuan:50000000, totalRAB:50000000, realisasi:50000000 },
  { id:'RAB-002', proyekId:'PRJ-001', kategori:'Pekerjaan Pondasi', item:'Bored Pile D600', satuan:'m', volume:450, hargaSatuan:900000, totalRAB:405000000, realisasi:395000000 },
  { id:'RAB-003', proyekId:'PRJ-001', kategori:'Pekerjaan Struktur', item:'Beton Kolom K-350', satuan:'m3', volume:320, hargaSatuan:1800000, totalRAB:576000000, realisasi:610000000 },
  { id:'RAB-004', proyekId:'PRJ-001', kategori:'Pekerjaan Struktur', item:'Besi Tulangan D16', satuan:'kg', volume:85000, hargaSatuan:12500, totalRAB:1062500000, realisasi:980000000 },
  { id:'RAB-005', proyekId:'PRJ-001', kategori:'Pekerjaan Arsitektur', item:'Dinding Bata Ringan', satuan:'m2', volume:2400, hargaSatuan:185000, totalRAB:444000000, realisasi:210000000 },
  { id:'RAB-006', proyekId:'PRJ-001', kategori:'MEP', item:'Instalasi Listrik', satuan:'ls', volume:1, hargaSatuan:280000000, totalRAB:280000000, realisasi:150000000 },
  { id:'RAB-007', proyekId:'PRJ-001', kategori:'MEP', item:'Instalasi Plumbing', satuan:'ls', volume:1, hargaSatuan:160000000, totalRAB:160000000, realisasi:80000000 },
  { id:'RAB-008', proyekId:'PRJ-002', kategori:'Pekerjaan Persiapan', item:'Bongkaran & Persiapan Lapangan', satuan:'ls', volume:1, hargaSatuan:35000000, totalRAB:35000000, realisasi:35000000 },
  { id:'RAB-009', proyekId:'PRJ-002', kategori:'Pekerjaan Sipil', item:'Cor Beton Lantai K-300', satuan:'m3', volume:180, hargaSatuan:1500000, totalRAB:270000000, realisasi:265000000 },
  { id:'RAB-010', proyekId:'PRJ-002', kategori:'Pekerjaan Arsitektur', item:'Keramik Lantai 60x60', satuan:'m2', volume:1800, hargaSatuan:250000, totalRAB:450000000, realisasi:430000000 },
  { id:'RAB-011', proyekId:'PRJ-002', kategori:'MEP', item:'Instalasi MEP Lengkap', satuan:'ls', volume:1, hargaSatuan:165000000, totalRAB:165000000, realisasi:110000000 },
  { id:'RAB-012', proyekId:'PRJ-003', kategori:'Pekerjaan Persiapan', item:'Survey & Mobilisasi', satuan:'ls', volume:1, hargaSatuan:45000000, totalRAB:45000000, realisasi:45000000 },
  { id:'RAB-013', proyekId:'PRJ-003', kategori:'Pekerjaan Pondasi', item:'Pondasi Sumuran Beton', satuan:'unit', volume:24, hargaSatuan:18000000, totalRAB:432000000, realisasi:445000000 },
  { id:'RAB-014', proyekId:'PRJ-003', kategori:'Pekerjaan Jembatan', item:'Gelagar Beton Prestress', satuan:'unit', volume:8, hargaSatuan:85000000, totalRAB:680000000, realisasi:695000000 },
  { id:'RAB-015', proyekId:'PRJ-003', kategori:'Pekerjaan Jembatan', item:'Lantai Jembatan Beton', satuan:'m2', volume:540, hargaSatuan:550000, totalRAB:297000000, realisasi:295000000 },
  { id:'RAB-016', proyekId:'PRJ-004', kategori:'Pekerjaan Persiapan', item:'Land Clearing & Urug', satuan:'m2', volume:5000, hargaSatuan:45000, totalRAB:225000000, realisasi:225000000 },
  { id:'RAB-017', proyekId:'PRJ-004', kategori:'Pekerjaan Pondasi', item:'Pondasi Footplat', satuan:'unit', volume:160, hargaSatuan:4500000, totalRAB:720000000, realisasi:380000000 },
  { id:'RAB-018', proyekId:'PRJ-004', kategori:'Pekerjaan Struktur', item:'Struktur Beton Bertulang', satuan:'m3', volume:880, hargaSatuan:1750000, totalRAB:1540000000, realisasi:280000000 },
];

export const initialExpenses = [
  { id:'EXP-001', proyekId:'PRJ-001', tanggal:'2024-03-15', kategori:'Material', deskripsi:'Pembelian Besi Beton 10mm & 13mm', vendor:'PT Krakatau Steel', jumlah:85000000, status:'approved' },
  { id:'EXP-002', proyekId:'PRJ-001', tanggal:'2024-03-18', kategori:'Tenaga Kerja', deskripsi:'Pembayaran upah tukang minggu ke-10', vendor:'-', jumlah:24000000, status:'approved' },
  { id:'EXP-003', proyekId:'PRJ-001', tanggal:'2024-03-20', kategori:'Material', deskripsi:'Semen Portland 500 sak', vendor:'UD Sumber Bangunan', jumlah:35000000, status:'approved' },
  { id:'EXP-004', proyekId:'PRJ-002', tanggal:'2024-03-10', kategori:'Material', deskripsi:'Keramik Mulia 60x60 Roman Series', vendor:'CV Karya Keramik', jumlah:68000000, status:'approved' },
  { id:'EXP-005', proyekId:'PRJ-002', tanggal:'2024-03-22', kategori:'Peralatan', deskripsi:'Sewa Scaffolding 1 bulan', vendor:'PT Rental Alat Berat', jumlah:15000000, status:'approved' },
  { id:'EXP-006', proyekId:'PRJ-004', tanggal:'2024-03-25', kategori:'Material', deskripsi:'Pasir Cor 50 rit dump truck', vendor:'CV Galian Jaya', jumlah:45000000, status:'pending' },
  { id:'EXP-007', proyekId:'PRJ-001', tanggal:'2024-04-01', kategori:'Overhead', deskripsi:'Listrik & Air proyek bulan Maret', vendor:'-', jumlah:4500000, status:'approved' },
  { id:'EXP-008', proyekId:'PRJ-003', tanggal:'2024-02-15', kategori:'Material', deskripsi:'Pengadaan Gelagar Prestress 8 unit', vendor:'PT Wika Beton', jumlah:340000000, status:'approved' },
  { id:'EXP-009', proyekId:'PRJ-002', tanggal:'2024-04-03', kategori:'Tenaga Kerja', deskripsi:'Pembayaran tukang cat interior', vendor:'-', jumlah:18000000, status:'pending' },
  { id:'EXP-010', proyekId:'PRJ-001', tanggal:'2024-04-05', kategori:'Material', deskripsi:'Bata ringan AAC 600 palet', vendor:'UD Sumber Bangunan', jumlah:42000000, status:'approved' },
];

export const initialInvoices = [
  { id:'INV-2024-001', proyekId:'PRJ-001', client:'PT Maju Bersama', tanggal:'2024-01-31', jatuhTempo:'2024-02-28', termin:'Termin 1 (20%)', jumlah:570000000, status:'paid', dibayar:'2024-02-25' },
  { id:'INV-2024-002', proyekId:'PRJ-001', client:'PT Maju Bersama', tanggal:'2024-02-29', jatuhTempo:'2024-03-30', termin:'Termin 2 (30%)', jumlah:855000000, status:'paid', dibayar:'2024-03-28' },
  { id:'INV-2024-003', proyekId:'PRJ-002', client:'RSUD Harapan Sehat', tanggal:'2024-02-15', jatuhTempo:'2024-03-16', termin:'Termin 1 (25%)', jumlah:245000000, status:'paid', dibayar:'2024-03-20' },
  { id:'INV-2024-004', proyekId:'PRJ-003', client:'Dinas PU Karawang', tanggal:'2024-03-01', jatuhTempo:'2024-03-31', termin:'Termin Final (40%)', jumlah:600000000, status:'paid', dibayar:'2024-03-29' },
  { id:'INV-2024-005', proyekId:'PRJ-001', client:'PT Maju Bersama', tanggal:'2024-03-31', jatuhTempo:'2024-04-30', termin:'Termin 3 (20%)', jumlah:570000000, status:'unpaid', dibayar:null },
  { id:'INV-2024-006', proyekId:'PRJ-002', client:'RSUD Harapan Sehat', tanggal:'2024-03-15', jatuhTempo:'2024-04-14', termin:'Termin 2 (40%)', jumlah:392000000, status:'overdue', dibayar:null },
  { id:'INV-2024-007', proyekId:'PRJ-004', client:'PT Properti Indah Nusantara', tanggal:'2024-03-31', jatuhTempo:'2024-04-30', termin:'Uang Muka (20%)', jumlah:840000000, status:'unpaid', dibayar:null },
];

export const initialVendors = [
  { id:'VND-001', nama:'PT Krakatau Steel', kategori:'Material Besi', kontak:'Bpk. Hartono', telepon:'021-55667788', email:'krakatau@steel.co.id', totalTransaksi:345000000, hutang:0, status:'aktif' },
  { id:'VND-002', nama:'UD Sumber Bangunan', kategori:'Material Umum', kontak:'Ibu Sutrisno', telepon:'022-44332211', email:'sumber@bangunan.com', totalTransaksi:125000000, hutang:35000000, status:'aktif' },
  { id:'VND-003', nama:'CV Karya Keramik', kategori:'Keramik & Tile', kontak:'Bpk. Wibowo', telepon:'0818-445566', email:'karya@keramik.id', totalTransaksi:98000000, hutang:0, status:'aktif' },
  { id:'VND-004', nama:'PT Wika Beton', kategori:'Beton Precast', kontak:'Bpk. Sunaryo', telepon:'021-77889900', email:'order@wikabeton.id', totalTransaksi:680000000, hutang:0, status:'aktif' },
  { id:'VND-005', nama:'PT Rental Alat Berat', kategori:'Sewa Peralatan', kontak:'Bpk. Firmansyah', telepon:'0811-334455', email:'rental@alatberat.com', totalTransaksi:87000000, hutang:15000000, status:'aktif' },
  { id:'VND-006', nama:'CV Galian Jaya', kategori:'Material Galian', kontak:'Bpk. Supardi', telepon:'0815-667788', email:null, totalTransaksi:45000000, hutang:45000000, status:'aktif' },
];

export const initialWorkers = [
  { id:'WRK-001', nama:'Jumari', jabatan:'Mandor', proyekId:'PRJ-001', tipeGaji:'harian', gajiPokok:450000, status:'aktif' },
  { id:'WRK-002', nama:'Slamet Riyadi', jabatan:'Tukang Besi', proyekId:'PRJ-001', tipeGaji:'harian', gajiPokok:350000, status:'aktif' },
  { id:'WRK-003', nama:'Sarwono', jabatan:'Tukang Batu', proyekId:'PRJ-001', tipeGaji:'harian', gajiPokok:320000, status:'aktif' },
  { id:'WRK-004', nama:'Bambang Irawan', jabatan:'Kepala Tukang', proyekId:'PRJ-002', tipeGaji:'harian', gajiPokok:400000, status:'aktif' },
  { id:'WRK-005', nama:'Mursid', jabatan:'Tukang Cat', proyekId:'PRJ-002', tipeGaji:'harian', gajiPokok:300000, status:'aktif' },
  { id:'WRK-006', nama:'Paijo', jabatan:'Kenek', proyekId:'PRJ-004', tipeGaji:'harian', gajiPokok:200000, status:'aktif' },
  { id:'WRK-007', nama:'Sugeng', jabatan:'Operator Excavator', proyekId:'PRJ-004', tipeGaji:'harian', gajiPokok:500000, status:'aktif' },
  { id:'WRK-008', nama:'Triyono', jabatan:'Tukang Las', proyekId:'PRJ-003', tipeGaji:'harian', gajiPokok:375000, status:'nonaktif' },
];

export const cashflowData = [
  { bulan:'Sep', masuk:450, keluar:320 },
  { bulan:'Okt', masuk:680, keluar:510 },
  { bulan:'Nov', masuk:320, keluar:280 },
  { bulan:'Des', masuk:870, keluar:620 },
  { bulan:'Jan', masuk:570, keluar:380 },
  { bulan:'Feb', masuk:245, keluar:190 },
  { bulan:'Mar', masuk:1600, keluar:760 },
];

export const fmt = (v) => {
  if (v >= 1e9) return `Rp ${(v/1e9).toFixed(2)}M`;
  if (v >= 1e6) return `Rp ${(v/1e6).toFixed(0)}jt`;
  return `Rp ${v.toLocaleString('id-ID')}`;
};

export const fmtFull = (v) =>
  new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',minimumFractionDigits:0}).format(v);
