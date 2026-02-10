"use client";

import { Search, Compass, Cog, TrendingUp } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

const steps = [
    {
        title: "Analýza",
        description:
            "Provedeme hloubkový audit vašich procesů a identifikujeme úzká hrdla vhodná pro automatizaci.",
        icon: Search,
    },
    {
        title: "Strategie",
        description:
            "Navrhneme architekturu řešení a vybereme vhodné nástroje.",
        icon: Compass,
    },
    {
        title: "Implementace",
        description:
            "Vyvineme, otestujeme a nasadíme AI agenty do vašeho prostředí s minimálním dopadem na provoz.",
        icon: Cog,
    },
    {
        title: "Optimalizace",
        description:
            "Dlouhodobě sledujeme výkon, ladíme modely a rozšiřujeme funkcionalitu podle růstu firmy.",
        icon: TrendingUp,
    },
];

export function ProcessSection() {
    return (
        <section id="proces" className="py-24 bg-black text-white relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
                        Jak proměníme váš byznys?
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Nejsme jen vývojáři. Jsme strategičtí partneři, kteří vás provedou
                        celým procesem digitální transformace.
                    </p>
                </div>

                <div className="relative">


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => (
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
                                    <div className="relative flex flex-1 flex-col justify-start gap-3">
                                        <div className="w-fit rounded-lg border border-white/10 bg-neutral-800/50 p-2 relative z-20">
                                            <step.icon className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-white/90">
                                                <span className="text-blue-500/50 mr-2 text-sm font-mono alignment-baseline">0{index + 1}</span>
                                                {step.title}
                                            </h3>
                                            <h2 className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-neutral-400">
                                                {step.description}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
