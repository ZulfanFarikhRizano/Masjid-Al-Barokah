import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addSaranAction } from "@/lib/actions";

export default function SaranPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <PageHeader
        title="Kotak Saran"
        description="Sampaikan aspirasi Anda secara anonim. Masukan Anda langsung diterima pengurus DKM."
      />
      <Card className="p-5">
        <form action={addSaranAction} className="grid gap-4">
          <div>
            <label htmlFor="isi" className="mb-1.5 block text-sm font-semibold text-foreground/80">
              Saran / aspirasi
            </label>
            <Textarea
              id="isi"
              name="isi"
              rows={5}
              required
              aria-required="true"
              placeholder="Tuliskan saran Anda di sini…"
            />
          </div>
          <p className="text-xs text-foreground/45">
            Identitas Anda tidak diminta dan tidak disimpan — saran ini bersifat anonim.
          </p>
          <Button type="submit" className="justify-self-start">
            Kirim Saran
          </Button>
        </form>
      </Card>
    </div>
  );
}
