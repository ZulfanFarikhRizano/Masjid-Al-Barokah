'use client';

import { useState } from 'react';
import { Copy, Check, QrCode } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/page-header';
import { formatRupiah } from '@/lib/utils';

const nominalOptions = [10000, 50000, 100000, 250000];

export default function InfaqPage() {
  const [nominal, setNominal] = useState<number | null>(50000);
  const [copied, setCopied] = useState(false);
  const rekening = '7123 4567 890';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rekening.replace(/\s/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API tidak tersedia — abaikan secara diam-diam, tombol tetap bisa dicoba lagi
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <PageHeader title="Infaq Digital" description="Scan QRIS atau salin nomor rekening untuk berinfaq." />

      <Card className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center">
        <div
          role="img"
          aria-label="Kode QRIS untuk infaq digital masjid"
          className="flex h-36 w-36 items-center justify-center rounded-2xl border border-border bg-background text-foreground/40"
        >
          <QrCode size={56} strokeWidth={1.2} />
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-foreground/80">Pilih nominal cepat</p>
          <div role="group" aria-label="Pilihan nominal infaq" className="flex flex-wrap gap-2">
            {nominalOptions.map((n) => (
              <button
                key={n}
                type="button"
                aria-pressed={nominal === n}
                onClick={() => setNominal(n)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  nominal === n
                    ? 'border-primary-600 bg-primary-600 text-white'
                    : 'border-border bg-background text-foreground hover:border-primary-400'
                }`}
              >
                {formatRupiah(n)}
              </button>
            ))}
            <button
              type="button"
              aria-pressed={nominal === null}
              onClick={() => setNominal(null)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                nominal === null
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-border bg-background text-foreground hover:border-primary-400'
              }`}
            >
              Nominal lain
            </button>
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm">
            <span className="text-foreground/60">BSI · a.n. DKM Masjid Al-Barokah</span>
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <code className="tabular rounded-lg bg-muted px-2.5 py-1.5 text-sm">{rekening}</code>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Salin nomor rekening"
              className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold hover:bg-muted"
            >
              {copied ? <Check size={13} className="text-primary-600" /> : <Copy size={13} />}
              {copied ? 'Tersalin' : 'Salin'}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
