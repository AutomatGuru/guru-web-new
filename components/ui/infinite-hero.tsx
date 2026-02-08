"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
// NOTE: SplitText is a GSAP Premium plugin. If not using GSAP Club, this will error.
// If you don't have SplitText, you might need to use a fallback or remove the split animation.
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight-new";

// gsap.registerPlugin(SplitText); // Removed as SplitText is not used anymore

export default function InfiniteHero() {
    const rootRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.set(bgRef.current, { filter: "blur(0px)", opacity: 0 });

            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

            // Animate background in
            tl.to(bgRef.current, { opacity: 1, duration: 1.5 }, 0);
        },
        { scope: rootRef },
    );

    return (
        <div
            ref={rootRef}
            className="relative h-svh w-full overflow-hidden bg-black text-white"
        >
            <Spotlight
                className="z-30 from-white/50 via-white/20 to-transparent"
                size={300}
                springOptions={{
                    stiffness: 26.7,
                    damping: 4.1,
                    mass: 0.2,
                }}
            />

            <div className="absolute inset-0 z-0" ref={bgRef}>
                <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                />
            </div>

            {/* Gradient overlay to ensure text readability */}
            <div className="pointer-events-none absolute inset-0 z-10 [background:radial-gradient(120%_80%_at_50%_50%,_transparent_40%,_black_100%)] opacity-50" />
        </div>
    );
}
