"use client";

import dynamic from "next/dynamic";
import { Home, User, Briefcase, FileText, Phone, MessageSquare } from 'lucide-react';
import { NavBar } from "@/components/ui/tubelight-navbar";
import { SiteHeader } from "@/components/ui/site-header";
import { ServicesSection } from "@/components/sections/services-section";
import { ProcessSection } from "@/components/sections/process-section";
import { TeamSection } from "@/components/sections/team-section";
import { ContactSection } from "@/components/sections/contact-section";
import { openContactForm } from "@/components/contact-form";

const InfiniteHero = dynamic(() => import("@/components/ui/infinite-hero"), {
  ssr: false,
});

export default function LandingPage() {
  const navItems = [
    { name: 'Domů', url: '#', icon: Home },
    { name: 'Služby', url: '#sluzby', icon: Briefcase },
    { name: 'Proces', url: '#proces', icon: FileText },
    { name: 'Tým', url: '#tym', icon: User },
    { name: 'Kontakt', url: '#kontakt', icon: Phone },
    { name: 'Poptávka', url: '#', icon: MessageSquare, onClick: openContactForm, isButton: true },
  ];

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <SiteHeader />
      <NavBar items={navItems} />
      <InfiniteHero />
      <ServicesSection />
      <ProcessSection />
      <TeamSection />
      <ContactSection />
    </main>
  );
}
