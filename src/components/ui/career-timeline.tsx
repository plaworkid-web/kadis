"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  eselon?: string;
  type: "career" | "education";
}

const timelineData: TimelineItem[] = [
  {
    year: "2025",
    title: "Kepala Dinas Komunikasi, Informatika, Persandian dan Statistik",
    organization: "Dinas Kominfo, Persandian dan Statistik Kab. Sumedang",
    eselon: "Eselon II.b",
    type: "career",
  },
  {
    year: "2019",
    title: "Sekretaris DPRD",
    organization: "Sekretariat DPRD Kab. Sumedang",
    eselon: "Eselon II.b",
    type: "career",
  },
  {
    year: "2017",
    title: "Kepala Dinas Pendidikan",
    organization: "Dinas Pendidikan Kab. Sumedang",
    eselon: "Eselon II.b",
    type: "career",
  },
  {
    year: "2015",
    title: "Staf Ahli Bidang Pemerintahan, Hukum dan Politik",
    organization: "Sekretariat Daerah Kab. Sumedang",
    eselon: "Eselon II.b",
    type: "career",
  },
  {
    year: "2014",
    title: "Golongan IV/c — Pembina Utama Muda",
    organization: "TMT Golongan",
    type: "career",
  },
  {
    year: "2002",
    title: "S-2 Pascasarjana",
    organization: "Universitas Garut",
    type: "education",
  },
  {
    year: "1991",
    title: "S-1 Ilmu Pemerintahan",
    organization: "Universitas Langlangbuana",
    type: "education",
  },
  {
    year: "1988",
    title: "D-III APDN",
    organization: "Akademi Pemerintahan Dalam Negeri Bandung",
    type: "education",
  },
  {
    year: "1987",
    title: "TMT PNS",
    organization: "Pegawai Negeri Sipil",
    type: "career",
  },
  {
    year: "1986",
    title: "TMT CPNS",
    organization: "Calon Pegawai Negeri Sipil",
    type: "career",
  },
];

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex w-full items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
    >
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`w-full md:w-5/12 ${isLeft ? "md:text-right md:pr-8" : "md:text-left md:pl-8"} pl-12 md:pl-0`}
      >
        <div className="rounded-2xl border bg-card p-6 shadow-lg shadow-primary/5 transition-all hover:shadow-xl hover:shadow-primary/10">
          <div className="mb-2 flex items-center gap-2 md:justify-start">
            {item.type === "career" ? (
              <Briefcase className="h-4 w-4 text-primary" />
            ) : (
              <GraduationCap className="h-4 w-4 text-secondary-foreground" />
            )}
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              {item.year}
            </span>
            {item.eselon && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                {item.eselon}
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-foreground md:text-lg">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{item.organization}</p>
        </div>
      </motion.div>

      {/* Center dot */}
      <div className="absolute left-0 md:relative md:left-auto flex md:w-2/12 justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-primary shadow-lg"
        >
          {item.type === "career" ? (
            <Briefcase className="h-4 w-4 text-primary-foreground" />
          ) : (
            <GraduationCap className="h-4 w-4 text-primary-foreground" />
          )}
        </motion.div>
      </div>

      {/* Empty space for opposite side */}
      <div className="hidden md:block md:w-5/12" />
    </div>
  );
}

export function CareerTimeline() {
  return (
    <section
      id="career"
      className="relative overflow-hidden bg-background px-6 py-24 text-foreground md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-foreground/50">
            Jejak Langkah Pengabdian
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Perjalanan Karier
          </h2>
          <p className="mt-5 text-base leading-8 text-foreground/65">
            40 tahun mengabdi untuk negeri, dari CPNS tahun 1986 hingga Kepala Dinas Kominfo Kabupaten Sumedang.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />

          <div className="flex flex-col gap-8 md:gap-12">
            {timelineData.map((item, index) => (
              <TimelineCard key={`${item.year}-${item.title}`} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
