"use client";

import { Mail, Phone, ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export function ContactSection() {
    return (
        <section id="kontakt" className="py-24 bg-black text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <blockquote className="text-2xl md:text-3xl font-light leading-snug mb-8 text-neutral-200">
                            &ldquo;Technologie by měla lidem uvolňovat ruce pro kreativitu, ne je
                            svazovat rutinou.&rdquo;
                        </blockquote>
                        <cite className="text-sm text-neutral-500 not-italic uppercase tracking-widest">
                            — AutomatGuru Philosophy
                        </cite>
                    </div>

                    <div className="lg:border-l border-white/10 lg:pl-16">
                        <h2 className="text-3xl font-light mb-6">Připraveni na start?</h2>
                        <p className="text-neutral-400 mb-10 max-w-md">
                            Konzultace je zdarma. Zjistíme, kde vám utíkají peníze a navrhneme
                            řešení.
                        </p>

                        <div className="space-y-6">
                            <a
                                href="mailto:info@automatguru.cz"
                                className="flex items-center gap-4 text-lg hover:text-blue-400 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-blue-500/30 transition-colors">
                                    <Mail className="w-5 h-5 text-neutral-300 group-hover:text-blue-400" />
                                </div>
                                <span>info@automatguru.cz</span>
                            </a>

                            <a
                                href="tel:+420777123456"
                                className="flex items-center gap-4 text-lg hover:text-blue-400 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-blue-500/30 transition-colors">
                                    <Phone className="w-5 h-5 text-neutral-300 group-hover:text-blue-400" />
                                </div>
                                <span>+420 777 123 456</span>
                            </a>
                        </div>

                        <div className="mt-10">
                            <ContactForm />
                        </div>

                        <div className="mt-12">
                            <p className="text-neutral-600 text-sm">
                                © 2026 AutomatGuru. Všechna práva vyhrazena.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
