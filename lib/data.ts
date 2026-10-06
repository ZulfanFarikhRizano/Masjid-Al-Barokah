// Lapisan data terpusat.
//
// PENTING: Ini adalah in-memory store (hidup selama proses server berjalan,
// reset saat server restart) — cukup untuk mendemonstrasikan struktur & alur
// CRUD admin -> publik secara konsisten. Untuk produksi, ganti isi setiap
// fungsi di bawah ini dengan query ke database sungguhan (disarankan
// Supabase/Postgres) tanpa perlu mengubah tipe atau pemanggil di komponen.

export type KasTransaksi = {
  id: string;
  tanggal: string; // ISO date
  keterangan: string;
  kategori: "Pemasukan" | "Pengeluaran";
  nominal: number;
};

export type ZakatEntry = {
  id: string;
  nama: string;
  jenis: "Zakat Fitrah" | "Zakat Maal" | "Infaq BAZNAS";
  jumlahJiwa?: number;
  nominal: number;
  tanggal: string;
  statusSetor: "Belum Disetor" | "Sudah Disetor ke BAZNAS";
};

export type KurbanEntry = {
  id: string;
  namaPengurban: string;
  jenisHewan: "Sapi" | "Kambing" | "Domba";
  jumlahHewan: number;
  atasNama: string;
  statusDistribusi: "Terdaftar" | "Sudah Disembelih" | "Sudah Didistribusikan";
};

export type Pengajian = {
  id: string;
  judul: string;
  ustadz: string;
  tanggal: string;
  jam: string;
  tempat: string;
};

export type JadwalImam = {
  id: string;
  jenis: "Jumat" | "Tarawih";
  tanggal: string;
  imam: string;
  khatib?: string;
  materi?: string;
};

export type Pengurus = {
  id: string;
  nama: string;
  jabatan: string;
  telepon: string;
  foto?: string;
};

export type WartaPost = {
  id: string;
  jenis: "Duka Cita" | "Pengumuman";
  judul: string;
  isi: string;
  tanggal: string;
};

export type Saran = {
  id: string;
  isi: string;
  tanggal: string;
  status: "Baru" | "Dibaca" | "Ditindaklanjuti";
};

export type Fasilitas = {
  id: string;
  nama: string;
  deskripsi: string;
};

export type BookingEntry = {
  id: string;
  fasilitasId: string;
  namaPemesan: string;
  keperluan: string;
  tanggal: string;
  status: "Menunggu" | "Disetujui" | "Ditolak";
};

// ---------- Seed data ----------

let kas: KasTransaksi[] = [
  { id: "k1", tanggal: "2026-09-16", keterangan: "Infaq Jumat", kategori: "Pemasukan", nominal: 3240000 },
  { id: "k2", tanggal: "2026-09-15", keterangan: "Listrik & air masjid", kategori: "Pengeluaran", nominal: 850000 },
  { id: "k3", tanggal: "2026-09-12", keterangan: "Donasi renovasi tempat wudhu", kategori: "Pemasukan", nominal: 5000000 },
  { id: "k4", tanggal: "2026-09-10", keterangan: "Honor kebersihan", kategori: "Pengeluaran", nominal: 600000 },
];

let zakat: ZakatEntry[] = [
  { id: "z1", nama: "Keluarga Bpk. Slamet", jenis: "Zakat Fitrah", jumlahJiwa: 4, nominal: 140000, tanggal: "2026-09-14", statusSetor: "Sudah Disetor ke BAZNAS" },
  { id: "z2", nama: "Ibu Ratna", jenis: "Zakat Maal", nominal: 2500000, tanggal: "2026-09-15", statusSetor: "Belum Disetor" },
];

let kurban: KurbanEntry[] = [
  { id: "q1", namaPengurban: "Bpk. Hendra", jenisHewan: "Kambing", jumlahHewan: 1, atasNama: "Alm. Ibu Siti", statusDistribusi: "Terdaftar" },
  { id: "q2", namaPengurban: "Keluarga Wijaya (patungan 7 orang)", jenisHewan: "Sapi", jumlahHewan: 1, atasNama: "Keluarga Wijaya", statusDistribusi: "Terdaftar" },
];

let pengajian: Pengajian[] = [
  { id: "p1", judul: "Kajian Ahad Pagi: Fiqih Muamalah", ustadz: "Ust. Fajar Ramadhan", tanggal: "2026-09-20", jam: "06.00", tempat: "Aula Utama" },
  { id: "p2", judul: "Tafsir Al-Qur'an Ba'da Maghrib", ustadz: "Ust. Zainal Abidin", tanggal: "2026-09-22", jam: "18.10", tempat: "Ruang Utama" },
];

let jadwalImam: JadwalImam[] = [
  { id: "i1", jenis: "Jumat", tanggal: "2026-09-19", imam: "Ust. Fajar Ramadhan", khatib: "Ust. Fajar Ramadhan", materi: "Menjaga Amanah dalam Bermasyarakat" },
];

let pengurus: Pengurus[] = [
  { id: "u1", nama: "H. Suparman", jabatan: "Ketua DKM", telepon: "0812-3456-7890" },
  { id: "u2", nama: "Ahmad Fauzi", jabatan: "Bendahara", telepon: "0813-2233-4455" },
  { id: "u3", nama: "Ust. Fajar Ramadhan", jabatan: "Imam Besar", telepon: "0857-1122-3344" },
];

let warta: WartaPost[] = [
  { id: "w1", jenis: "Duka Cita", judul: "Bpk. H. Ahmad Sujono (Warga RT 04)", isi: "Innalillahi wa inna ilaihi raji'un. Sholat jenazah ba'da Dzuhur di Masjid Al-Barokah.", tanggal: "2026-09-17" },
  { id: "w2", jenis: "Pengumuman", judul: "Pendaftaran Kurban Idul Adha 1448 H", isi: "Pendaftaran dibuka hingga 10 Dzulhijjah. Hubungi panitia untuk info lengkap.", tanggal: "2026-09-10" },
];

let saran: Saran[] = [
  { id: "s1", isi: "Mohon parkir motor ditata lebih rapi saat sholat Jumat.", tanggal: "2026-09-15", status: "Baru" },
];

const fasilitas: Fasilitas[] = [
  { id: "f1", nama: "Aula Serbaguna", deskripsi: "Kapasitas 150 orang, cocok untuk akad nikah & acara keluarga." },
  { id: "f2", nama: "Lapangan Masjid", deskripsi: "Area outdoor untuk acara komunitas & olahraga warga." },
];

let booking: BookingEntry[] = [
  { id: "b1", fasilitasId: "f1", namaPemesan: "Keluarga Ramadhan", keperluan: "Akad Nikah", tanggal: "2026-10-05", status: "Disetujui" },
];

// ---------- Fungsi akses (nanti diganti query DB) ----------

export const getKas = () => kas;
export const addKas = (item: Omit<KasTransaksi, "id">) => {
  kas = [{ ...item, id: crypto.randomUUID() }, ...kas];
  return kas;
};
export const deleteKas = (id: string) => {
  kas = kas.filter((k) => k.id !== id);
  return kas;
};

export const getZakat = () => zakat;
export const addZakat = (item: Omit<ZakatEntry, "id">) => {
  zakat = [{ ...item, id: crypto.randomUUID() }, ...zakat];
  return zakat;
};
export const updateZakatStatus = (id: string, status: ZakatEntry["statusSetor"]) => {
  zakat = zakat.map((z) => (z.id === id ? { ...z, statusSetor: status } : z));
  return zakat;
};

export const getKurban = () => kurban;
export const addKurban = (item: Omit<KurbanEntry, "id">) => {
  kurban = [{ ...item, id: crypto.randomUUID() }, ...kurban];
  return kurban;
};
export const updateKurbanStatus = (id: string, status: KurbanEntry["statusDistribusi"]) => {
  kurban = kurban.map((k) => (k.id === id ? { ...k, statusDistribusi: status } : k));
  return kurban;
};

export const getPengajian = () => pengajian;
export const addPengajian = (item: Omit<Pengajian, "id">) => {
  pengajian = [{ ...item, id: crypto.randomUUID() }, ...pengajian];
  return pengajian;
};
export const deletePengajian = (id: string) => {
  pengajian = pengajian.filter((p) => p.id !== id);
  return pengajian;
};

export const getJadwalImam = () => jadwalImam;
export const addJadwalImam = (item: Omit<JadwalImam, "id">) => {
  jadwalImam = [{ ...item, id: crypto.randomUUID() }, ...jadwalImam];
  return jadwalImam;
};

export const getPengurus = () => pengurus;
export const addPengurus = (item: Omit<Pengurus, "id">) => {
  pengurus = [{ ...item, id: crypto.randomUUID() }, ...pengurus];
  return pengurus;
};
export const deletePengurus = (id: string) => {
  pengurus = pengurus.filter((p) => p.id !== id);
  return pengurus;
};

export const getWarta = () => warta;
export const addWarta = (item: Omit<WartaPost, "id">) => {
  warta = [{ ...item, id: crypto.randomUUID() }, ...warta];
  return warta;
};
export const deleteWarta = (id: string) => {
  warta = warta.filter((w) => w.id !== id);
  return warta;
};

export const getSaran = () => saran;
export const addSaran = (isi: string) => {
  saran = [{ id: crypto.randomUUID(), isi, tanggal: new Date().toISOString().slice(0, 10), status: "Baru" }, ...saran];
  return saran;
};
export const updateSaranStatus = (id: string, status: Saran["status"]) => {
  saran = saran.map((s) => (s.id === id ? { ...s, status } : s));
  return saran;
};

export const getFasilitas = () => fasilitas;

export const getBooking = () => booking;
export const addBooking = (item: Omit<BookingEntry, "id" | "status">) => {
  booking = [{ ...item, id: crypto.randomUUID(), status: "Menunggu" }, ...booking];
  return booking;
};
export const updateBookingStatus = (id: string, status: BookingEntry["status"]) => {
  booking = booking.map((b) => (b.id === id ? { ...b, status } : b));
  return booking;
};

// Jadwal sholat statis contoh (produksi: hitung via lib khusus / API Aladhan
// berdasarkan lokasi & tanggal aktual).
// Koordinat & nama lokasi masjid — dipakai bareng oleh jadwal sholat (ambil
// data real-time dari API) dan kompas kiblat (fallback saat GPS ditolak).
export const LOKASI_MASJID = {
  nama: "Bogor",
  lat: -6.595038,
  lng: 106.816635,
};

export const jadwalSholatHariIni = {
  lokasi: LOKASI_MASJID.nama,
  // HANYA dipakai sebagai cadangan kalau fetch ke API jadwal sholat gagal
  // (mis. tidak ada internet) — jam sesungguhnya diambil real-time dari
  // Aladhan API di components/prayer-card.tsx.
  waktuCadangan: [
    { nama: "Subuh", jam: "04:32" },
    { nama: "Dzuhur", jam: "11:52" },
    { nama: "Ashar", jam: "15:14" },
    { nama: "Maghrib", jam: "17:58" },
    { nama: "Isya", jam: "19:08" },
  ],
};