"use client";

import { Bot, LineChart, Zap, Brain, Database, Network } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import { useId } from "react";

const services = [
    {
        title: "AI Chatboti & Agenti",
        description:
            "Inteligentní asistenti, kteří vyřeší 80% dotazů zákazníků automaticky a 24/7.",
        icon: Bot,
    },
    {
        title: "Prediktivní Analytika",
        description:
            "Využijte svá data k předvídání trendů a optimalizaci skladových zásob.",
        icon: LineChart,
    },
    {
        title: "Procesní Automatizace",
        description:
            "Propojení systémů (CRM, E-mail, ERP) pro eliminaci manuální administrativy.",
        icon: Zap,
    },
    {
        title: "Vlastní AI Modely",
        description:
            "Fine-tuning LLM modelů přesně pro potřeby vašeho specifického know-how.",
        icon: Brain,
    },
    {
        title: "Strukturování Dat",
        description:
            "Automatické vytěžování dat z faktur, smluv a e-mailů do strukturované podoby.",
        icon: Database,
    },
    {
        title: "Integrace na míru",
        description:
            "Vývoj konektorů a skriptů pro systémy, které spolu běžně nemluví.",
        icon: Network,
    },
];

export function ServicesSection() {
    return (
        <section id="sluzby" className="py-24 bg-neutral-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-neutral-950/0 to-neutral-950/0 pointer-events-none" />
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
                        Co pro vás automatizujeme?
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Naše řešení pokrývají celé spektrum firemních procesů. Od komunikace se
                        zákazníky po backendové operace.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="relative h-full rounded-2xl border border-white/5 p-2">
                            <GlowingEffect
                                spread={40}
                                glow={true}
                                disabled={false}
                                proximity={64}
                                inactiveZone={0.01}
                                borderWidth={3}
                            />
                            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 border-white/10 bg-neutral-900/50 p-6 shadow-sm">
                                <div className="relative flex flex-1 flex-col justify-between gap-3">
                                    <div className="w-fit rounded-lg border border-white/10 bg-neutral-800/50 p-2">
                                        <service.icon className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-white/90">
                                            {service.title}
                                        </h3>
                                        <h2 className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-neutral-400">
                                            {service.description}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
