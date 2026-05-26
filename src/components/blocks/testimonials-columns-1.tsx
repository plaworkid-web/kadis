"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Ucapan {
  id: number;
  nama: string;
  jabatan: string;
  pesan: string;
  created_at: string;
}

function UcapanForm({ onSuccess }: { onSuccess: () => void }) {
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !pesan) return;

    setLoading(true);
    try {
      const res = await fetch("/api/ucapan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, jabatan, pesan }),
      });

      if (res.ok) {
        setNama("");
        setJabatan("");
        setPesan("");
        setSuccess(true);
        onSuccess();
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Gagal mengirim ucapan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nama" className="block text-sm font-semibold text-foreground/80 mb-1">
            Nama <span className="text-destructive">*</span>
          </label>
          <input
            id="nama"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama Anda"
            required
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label htmlFor="jabatan" className="block text-sm font-semibold text-foreground/80 mb-1">
            Jabatan / Instansi
          </label>
          <input
            id="jabatan"
            type="text"
            value={jabatan}
            onChange={(e) => setJabatan(e.target.value)}
            placeholder="Jabatan atau instansi"
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>
      <div>
        <label htmlFor="pesan" className="block text-sm font-semibold text-foreground/80 mb-1">
          Kesan & Pesan <span className="text-destructive">*</span>
        </label>
        <textarea
          id="pesan"
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          placeholder="Tulis kesan dan pesan Anda untuk Pak Sonson..."
          required
          rows={4}
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Mengirim..." : "Kirim Ucapan"}
      </button>
      {success && (
        <p className="text-center text-sm font-medium text-green-500">
          ✓ Ucapan berhasil dikirim. Terima kasih!
        </p>
      )}
    </form>
  );
}

export const TestimonialsColumn = (props: {
  className?: string;
  ucapan: Ucapan[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {Array.from({ length: 2 }).map((_, index) => (
          <React.Fragment key={index}>
            {props.ucapan.map((item) => (
              <div
                className="p-5 md:p-10 rounded-2xl md:rounded-3xl border bg-card text-card-foreground shadow-lg shadow-primary/10 max-w-xs w-full"
                key={`${item.id}-${index}`}
              >
                <div className="text-sm md:text-base">{item.pesan}</div>
                <div className="flex items-center gap-2 mt-4 md:mt-5">
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs md:text-sm shrink-0">
                    {item.nama.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5 text-sm md:text-base">
                      {item.nama}
                    </div>
                    {item.jabatan && (
                      <div className="leading-5 opacity-60 tracking-tight text-xs md:text-sm">
                        {item.jabatan}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export function TestimonialsColumnsSection() {
  const [ucapan, setUcapan] = useState<Ucapan[]>([]);

  const fetchUcapan = async () => {
    try {
      const res = await fetch("/api/ucapan");
      if (res.ok) {
        const data = await res.json();
        setUcapan(data);
      }
    } catch (error) {
      console.error("Gagal mengambil ucapan:", error);
    }
  };

  useEffect(() => {
    fetchUcapan();
  }, []);

  // Split ucapan into columns
  const col1 = ucapan.filter((_, i) => i % 3 === 0);
  const col2 = ucapan.filter((_, i) => i % 3 === 1);
  const col3 = ucapan.filter((_, i) => i % 3 === 2);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-background px-6 py-24 text-foreground md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-foreground/50">
            Kesan & Pesan
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Ucapan dari rekan-rekan seperjuangan.
          </h2>
          <p className="mt-5 text-base leading-8 text-foreground/65">
            Terima kasih atas dedikasi dan pengabdian selama 40 tahun. Semoga masa purna bakti menjadi awal perjalanan baru yang penuh berkah.
          </p>
        </div>

        {/* Form Ucapan */}
        <div className="mt-12 mb-16">
          <h3 className="text-center text-lg font-bold mb-6">Tulis Ucapan Anda</h3>
          <UcapanForm onSuccess={fetchUcapan} />
        </div>

        {/* Display Ucapan */}
        {ucapan.length > 0 && (
          <div className="relative mt-8 flex max-h-[740px] justify-center gap-4 md:gap-6 overflow-hidden">
            <TestimonialsColumn ucapan={col1.length > 0 ? col1 : ucapan.slice(0, 2)} duration={16} />
            <TestimonialsColumn
              ucapan={col2.length > 0 ? col2 : ucapan.slice(0, 2)}
              duration={20}
            />
            <TestimonialsColumn
              ucapan={col3.length > 0 ? col3 : ucapan.slice(0, 2)}
              className="hidden lg:block"
              duration={18}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
          </div>
        )}

        {ucapan.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">
            Belum ada ucapan. Jadilah yang pertama menuliskan kesan dan pesan!
          </p>
        )}
      </div>
    </section>
  );
}
