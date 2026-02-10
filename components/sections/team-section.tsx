"use client";

import Image from "next/image";

const team = [
    {
        name: "Marek Babka",
        role: "CEO & Founder",
        image: "/marek_.png",
        imagePosition: "40% center",
    },
    {
        name: "Zdeněk Jungvirt",
        role: "CEO & Founder",
        image: "/zdenek_.png",
    },
    {
        name: "Claude Code",
        role: "Senior AI Developer",
        image: "/claude_.png",
        imageScale: 0.7,
    },
];

export function TeamSection() {
    return (
        <section id="tym" className="py-24 bg-neutral-950 text-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
                        Náš tým
                    </h2>
                    <p className="text-neutral-400">
                        Kombinujeme lidskou kreativitu s nekonečným výkonem umělé inteligence.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-10">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="group flex flex-col items-center"
                        >
                            <div className="w-48 h-48 rounded-full bg-neutral-900 border border-white/5 overflow-hidden mb-6 relative grayscale group-hover:grayscale-0 transition-all duration-500">
                                {member.image ? (
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                        style={{
                                            ...(member.imagePosition ? { objectPosition: member.imagePosition } : {}),
                                            ...(member.imageScale ? { transform: `scale(${member.imageScale})` } : {}),
                                        }}
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950 flex items-center justify-center text-4xl font-thin text-white/10 group-hover:text-white/20 transition-colors">
                                        {member.name.substring(0, 1)}
                                    </div>
                                )}
                            </div>
                            <h3 className="text-lg font-medium text-white mb-1">
                                {member.name}
                            </h3>
                            <p className="text-sm text-blue-400/80 uppercase tracking-widest font-mono text-[10px]">
                                {member.role}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
