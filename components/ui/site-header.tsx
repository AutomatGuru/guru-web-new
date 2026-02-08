import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
    return (
        <header className="fixed top-6 left-6 z-50 flex items-center gap-3 pointer-events-none">
            <Link href="/" className="flex items-center gap-3 group pointer-events-auto">
                <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
                    <Image
                        src="/logo.png"
                        alt="AutomatGuru Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <span className="text-xl font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors">
                    AutomatGuru
                </span>
            </Link>
        </header>
    );
}
