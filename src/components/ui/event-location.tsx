"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";
import { LocationMap } from "@/components/ui/expand-map";

export function EventLocation() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-background px-6 py-24 text-foreground md:px-12"
    >
      {/* Gradient blur decorations */}
      <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-yellow-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-[350px] w-[350px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 h-[300px] w-[300px] rounded-full bg-emerald-400/10 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-foreground/50">
            Informasi Acara
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Lokasi & Waktu
          </h2>
          <p className="mt-5 text-base leading-8 text-foreground/65">
            Acara perpisahan purna bakti Drs. H. Sonson Mukamad Nurikhsan, M.Si.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Tanggal */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Tanggal</h3>
                <p className="text-2xl font-[800] text-foreground mt-1">
                  Sabtu, 31 Mei 2026
                </p>
              </div>
            </div>

            {/* Jam */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Waktu</h3>
                <p className="text-2xl font-[800] text-foreground mt-1">
                  09.00 WIB - Selesai
                </p>
              </div>
            </div>

            {/* Lokasi */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Lokasi</h3>
                <p className="text-xl font-[700] text-foreground mt-1">
                  Gedung Tampomas IPP Sumedang
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Kabupaten Sumedang, Jawa Barat
                </p>
              </div>
            </div>

            {/* Button Google Maps */}
            <a
              href="https://maps.app.goo.gl/HGMYGkBEt6vd1arNA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:opacity-90"
            >
              <MapPin className="h-4 w-4" />
              Buka di Google Maps
            </a>
          </motion.div>

          {/* Right - Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center overflow-hidden"
          >
            <LocationMap
              location="Gedung Tampomas IPP Sumedang"
              coordinates="6.8388° S, 107.9188° E"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
