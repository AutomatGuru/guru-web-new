"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export function SiteHeader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY < 50);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className="fixed top-6 left-6 z-50 flex items-center gap-3 pointer-events-none transition-all duration-500 ease-in-out"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(-20px)",
                pointerEvents: isVisible ? "auto" : "none",
            }}
        >
            <Link href="/" className="flex items-center gap-3 group pointer-events-auto">
                <div className="relative w-14 h-14 transition-transform group-hover:scale-105">
                    <Image
                        src="/logo.png"
                        alt="AutomatGuru Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <span className="text-2xl font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors">
                    AutomatGuru
                </span>
            </Link>
        </header>
    );
}
