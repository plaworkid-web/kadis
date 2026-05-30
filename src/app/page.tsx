"use client";

import { Globe, Mail, MapPin, Send } from "lucide-react";

import { TestimonialsColumnsSection } from "@/components/blocks/testimonials-columns-1";
import ShiftingCountdown from "@/components/ui/countdown-timer";
import { CinematicFooter } from "@/components/ui/cinematic-footer";
import { CareerTimeline } from "@/components/ui/career-timeline";
import { EventLocation } from "@/components/ui/event-location";
import { MinimalistHero } from "@/components/ui/minimalist-hero";

export default function Home() {
  return (
    <main>
      <MinimalistHero
        logoText="PURNA BAKTI"
        navLinks={[
          { label: "PROFIL", href: "#about" },
          { label: "KARIER", href: "#career" },
          { label: "COUNTDOWN", href: "#countdown" },
          { label: "KESAN & PESAN", href: "#testimonials" },
          { label: "KONTAK", href: "#contact" },
        ]}
        mainText="Kepala Dinas Komunikasi dan Informatika, Persandian dan Statistik Kab. Sumedang. Mengabdi sejak 1986, memasuki masa purna bakti dengan penuh kebanggaan."
        readMoreLink="#about"
        imageSrc="/foto.png"
        imageAlt="Foto Drs. Sonson Mukhammad Nurikhsan, M.Si"
        overlayText={{ part1: "PURNA", part2: "BAKTI" }}
        socialLinks={[
          { icon: Globe, href: "https://sumedangkab.go.id" },
          { icon: MapPin, href: "https://maps.google.com/?q=Sumedang" },
          { icon: Mail, href: "mailto:diskominfo@sumedangkab.go.id" },
          { icon: Send, href: "#contact" },
        ]}
        locationText="Sumedang, Jawa Barat"
      />
      <CareerTimeline />
      <ShiftingCountdown />
      <EventLocation />
      <TestimonialsColumnsSection />
      <CinematicFooter />
    </main>
  );
}
