'use server';

import { revalidatePath } from 'next/cache';
import {
  addKas,
  deleteKas,
  addZakat,
  updateZakatStatus,
  addKurban,
  updateKurbanStatus,
  addPengajian,
  deletePengajian,
  addJadwalImam,
  addPengurus,
  deletePengurus,
  addWarta,
  deleteWarta,
  addSaran,
  updateSaranStatus,
  addBooking,
  updateBookingStatus,
  type KasTransaksi,
  type ZakatEntry,
  type KurbanEntry,
  type Pengajian,
  type JadwalImam,
  type Pengurus,
  type WartaPost,
} from '@/lib/data';

// ---------- Kas ----------
export async function addKasAction(formData: FormData) {
  addKas({
    tanggal: String(formData.get('tanggal') || ''),
    keterangan: String(formData.get('keterangan') || ''),
    kategori: formData.get('kategori') as KasTransaksi['kategori'],
    nominal: Number(formData.get('nominal') || 0),
  });
  revalidatePath('/kas');
  revalidatePath('/admin/kas');
  revalidatePath('/');
}

export async function deleteKasAction(id: string) {
  deleteKas(id);
  revalidatePath('/kas');
  revalidatePath('/admin/kas');
  revalidatePath('/');
}

// ---------- Zakat ----------
export async function addZakatAction(formData: FormData) {
  addZakat({
    nama: String(formData.get('nama') || ''),
    jenis: formData.get('jenis') as ZakatEntry['jenis'],
    jumlahJiwa: formData.get('jumlahJiwa') ? Number(formData.get('jumlahJiwa')) : undefined,
    nominal: Number(formData.get('nominal') || 0),
    tanggal: String(formData.get('tanggal') || ''),
    statusSetor: 'Belum Disetor',
  });
  revalidatePath('/zakat');
  revalidatePath('/admin/zakat');
}

export async function toggleZakatStatusAction(id: string, status: ZakatEntry['statusSetor']) {
  updateZakatStatus(id, status);
  revalidatePath('/zakat');
  revalidatePath('/admin/zakat');
}

// ---------- Kurban ----------
export async function addKurbanAction(formData: FormData) {
  addKurban({
    namaPengurban: String(formData.get('namaPengurban') || ''),
    jenisHewan: formData.get('jenisHewan') as KurbanEntry['jenisHewan'],
    jumlahHewan: Number(formData.get('jumlahHewan') || 1),
    atasNama: String(formData.get('atasNama') || ''),
    statusDistribusi: 'Terdaftar',
  });
  revalidatePath('/kurban');
  revalidatePath('/admin/kurban');
}

export async function updateKurbanStatusAction(id: string, status: KurbanEntry['statusDistribusi']) {
  updateKurbanStatus(id, status);
  revalidatePath('/kurban');
  revalidatePath('/admin/kurban');
}

// ---------- Pengajian ----------
export async function addPengajianAction(formData: FormData) {
  addPengajian({
    judul: String(formData.get('judul') || ''),
    ustadz: String(formData.get('ustadz') || ''),
    tanggal: String(formData.get('tanggal') || ''),
    jam: String(formData.get('jam') || ''),
    tempat: String(formData.get('tempat') || ''),
  });
  revalidatePath('/pengajian');
  revalidatePath('/admin/pengajian');
}

export async function deletePengajianAction(id: string) {
  deletePengajian(id);
  revalidatePath('/pengajian');
  revalidatePath('/admin/pengajian');
}

// ---------- Jadwal Imam ----------
export async function addJadwalImamAction(formData: FormData) {
  addJadwalImam({
    jenis: formData.get('jenis') as JadwalImam['jenis'],
    tanggal: String(formData.get('tanggal') || ''),
    imam: String(formData.get('imam') || ''),
    khatib: String(formData.get('khatib') || '') || undefined,
    materi: String(formData.get('materi') || '') || undefined,
  });
  revalidatePath('/imam');
  revalidatePath('/admin/imam');
}

// ---------- Pengurus ----------
export async function addPengurusAction(formData: FormData) {
  addPengurus({
    nama: String(formData.get('nama') || ''),
    jabatan: String(formData.get('jabatan') || ''),
    telepon: String(formData.get('telepon') || ''),
  });
  revalidatePath('/pengurus');
  revalidatePath('/admin/pengurus');
}

export async function deletePengurusAction(id: string) {
  deletePengurus(id);
  revalidatePath('/pengurus');
  revalidatePath('/admin/pengurus');
}

// ---------- Warta ----------
export async function addWartaAction(formData: FormData) {
  addWarta({
    jenis: formData.get('jenis') as WartaPost['jenis'],
    judul: String(formData.get('judul') || ''),
    isi: String(formData.get('isi') || ''),
    tanggal: String(formData.get('tanggal') || ''),
  });
  revalidatePath('/warta');
  revalidatePath('/admin/warta');
  revalidatePath('/');
}

export async function deleteWartaAction(id: string) {
  deleteWarta(id);
  revalidatePath('/warta');
  revalidatePath('/admin/warta');
  revalidatePath('/');
}

// ---------- Saran ----------
export async function addSaranAction(formData: FormData) {
  const isi = String(formData.get('isi') || '').trim();
  if (!isi) return;
  addSaran(isi);
  revalidatePath('/saran');
  revalidatePath('/admin/saran');
}

export async function updateSaranStatusAction(id: string, status: 'Baru' | 'Dibaca' | 'Ditindaklanjuti') {
  updateSaranStatus(id, status);
  revalidatePath('/admin/saran');
}

// ---------- Booking ----------
export async function addBookingAction(formData: FormData) {
  addBooking({
    fasilitasId: String(formData.get('fasilitasId') || ''),
    namaPemesan: String(formData.get('namaPemesan') || ''),
    keperluan: String(formData.get('keperluan') || ''),
    tanggal: String(formData.get('tanggal') || ''),
  });
  revalidatePath('/booking');
  revalidatePath('/admin/booking');
}

export async function updateBookingStatusAction(id: string, status: 'Menunggu' | 'Disetujui' | 'Ditolak') {
  updateBookingStatus(id, status);
  revalidatePath('/booking');
  revalidatePath('/admin/booking');
}
