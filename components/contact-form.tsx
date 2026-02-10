"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Send, CheckCircle2, Loader2 } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight-new";

// Helper to open the form from anywhere
export function openContactForm() {
    window.dispatchEvent(new CustomEvent("open-contact-form"));
}

export function ContactForm() {
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const nameRef = useRef<HTMLInputElement>(null);

    // Check if any field has data (to prevent accidental close)
    const hasData = name.trim() !== "" || email.trim() !== "" || phone.trim() !== "" || message.trim() !== "";

    // Listen for external open events
    useEffect(() => {
        const handler = () => setOpen(true);
        window.addEventListener("open-contact-form", handler);
        return () => window.removeEventListener("open-contact-form", handler);
    }, []);

    // Auto-focus name field when form opens
    useEffect(() => {
        if (open && nameRef.current) {
            setTimeout(() => nameRef.current?.focus(), 400);
        }
    }, [open]);

    // Lock body scroll when open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    // Escape to close (only if no data entered)
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && open && !hasData) {
                handleClose();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [open, hasData]);

    const handleClose = () => {
        setOpen(false);
        setSubmitted(false);
        setSending(false);
        setError("");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
    };

    // Backdrop click: only close if no data entered
    const handleBackdropClick = () => {
        if (!hasData) {
            handleClose();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setError("");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, message }),
            });
            if (!res.ok) {
                throw new Error("Odeslání se nezdařilo");
            }
            setSubmitted(true);
        } catch {
            setError("Nepodařilo se odeslat poptávku. Zkuste to prosím znovu.");
        } finally {
            setSending(false);
        }
    };

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                className="bg-white text-black hover:bg-neutral-200 px-8 py-6 text-lg rounded-full cursor-pointer"
            >
                Kontaktujte nás
            </Button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleBackdropClick}
                        />

                        {/* Ambient background gradients */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <motion.div
                                className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vh] rounded-full bg-blue-500/[0.07] blur-[120px]"
                                animate={{
                                    x: [0, 40, 0],
                                    y: [0, -20, 0],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                            <motion.div
                                className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vh] rounded-full bg-purple-500/[0.05] blur-[100px]"
                                animate={{
                                    x: [0, -30, 0],
                                    y: [0, 30, 0],
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </div>

                        {/* Spotlight effect */}
                        <div className="absolute inset-0 pointer-events-none">
                            <Spotlight
                                className="from-blue-500/20 via-blue-400/5 to-transparent"
                                size={400}
                            />
                        </div>

                        {/* Close button */}
                        <motion.button
                            className="absolute top-8 right-8 z-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
                            onClick={handleClose}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ rotate: 90 }}
                        >
                            <X className="w-5 h-5" />
                        </motion.button>

                        {/* Form container */}
                        <motion.div
                            className="relative z-10 w-full max-w-2xl mx-auto px-6 md:px-0"
                            initial={{ opacity: 0, y: 40, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.98 }}
                            transition={{
                                duration: 0.5,
                                ease: [0.22, 1, 0.36, 1],
                                delay: 0.1,
                            }}
                        >
                            <AnimatePresence mode="wait">
                                {!submitted ? (
                                    <motion.form
                                        key="form"
                                        onSubmit={handleSubmit}
                                        className="space-y-10"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Header */}
                                        <motion.div
                                            className="text-center mb-12"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-3">
                                                Napište nám
                                            </h2>
                                            <p className="text-neutral-500 text-lg">
                                                Konzultace je zdarma — ozveme se do
                                                24 hodin
                                            </p>
                                        </motion.div>

                                        {/* Fields */}
                                        <div className="space-y-8">
                                            {/* Name */}
                                            <motion.div
                                                className="group relative"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                <label
                                                    htmlFor="immersive-name"
                                                    className="block text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3 group-focus-within:text-blue-400 transition-colors duration-300"
                                                >
                                                    Jméno
                                                </label>
                                                <input
                                                    ref={nameRef}
                                                    id="immersive-name"
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                    required
                                                    placeholder="Jan Novák"
                                                    className="w-full bg-transparent border-0 border-b border-white/10 pb-3 text-2xl md:text-3xl font-light text-white placeholder:text-neutral-700 focus:outline-none focus:border-blue-500/50 transition-colors duration-500"
                                                />
                                                <motion.div
                                                    className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-blue-500 to-purple-500"
                                                    initial={{ width: "0%" }}
                                                    whileInView={{ width: "0%" }}
                                                    style={{ width: name ? "100%" : "0%" }}
                                                    transition={{ duration: 0.6 }}
                                                />
                                            </motion.div>

                                            {/* Email */}
                                            <motion.div
                                                className="group relative"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4 }}
                                            >
                                                <label
                                                    htmlFor="immersive-email"
                                                    className="block text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3 group-focus-within:text-blue-400 transition-colors duration-300"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    id="immersive-email"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    required
                                                    placeholder="jan@example.com"
                                                    className="w-full bg-transparent border-0 border-b border-white/10 pb-3 text-2xl md:text-3xl font-light text-white placeholder:text-neutral-700 focus:outline-none focus:border-blue-500/50 transition-colors duration-500"
                                                />
                                                <motion.div
                                                    className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-blue-500 to-purple-500"
                                                    style={{
                                                        width: email ? "100%" : "0%",
                                                    }}
                                                    transition={{ duration: 0.6 }}
                                                />
                                            </motion.div>

                                            {/* Phone */}
                                            <motion.div
                                                className="group relative"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.45 }}
                                            >
                                                <label
                                                    htmlFor="immersive-phone"
                                                    className="block text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3 group-focus-within:text-blue-400 transition-colors duration-300"
                                                >
                                                    Telefon
                                                </label>
                                                <input
                                                    id="immersive-phone"
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) =>
                                                        setPhone(e.target.value)
                                                    }
                                                    placeholder="+420 123 456 789"
                                                    className="w-full bg-transparent border-0 border-b border-white/10 pb-3 text-2xl md:text-3xl font-light text-white placeholder:text-neutral-700 focus:outline-none focus:border-blue-500/50 transition-colors duration-500"
                                                />
                                                <motion.div
                                                    className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-blue-500 to-purple-500"
                                                    style={{
                                                        width: phone ? "100%" : "0%",
                                                    }}
                                                    transition={{ duration: 0.6 }}
                                                />
                                            </motion.div>

                                            {/* Message */}
                                            <motion.div
                                                className="group relative"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.5 }}
                                            >
                                                <label
                                                    htmlFor="immersive-message"
                                                    className="block text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3 group-focus-within:text-blue-400 transition-colors duration-300"
                                                >
                                                    Zpráva
                                                </label>
                                                <textarea
                                                    id="immersive-message"
                                                    value={message}
                                                    onChange={(e) =>
                                                        setMessage(e.target.value)
                                                    }
                                                    required
                                                    rows={3}
                                                    placeholder="Popište váš projekt nebo dotaz..."
                                                    className="w-full bg-transparent border-0 border-b border-white/10 pb-3 text-xl md:text-2xl font-light text-white placeholder:text-neutral-700 focus:outline-none focus:border-blue-500/50 transition-colors duration-500 resize-none"
                                                />
                                                <motion.div
                                                    className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-blue-500 to-purple-500"
                                                    style={{
                                                        width: message
                                                            ? "100%"
                                                            : "0%",
                                                    }}
                                                    transition={{ duration: 0.6 }}
                                                />
                                            </motion.div>
                                        </div>

                                        {/* Error message */}
                                        {error && (
                                            <motion.p
                                                className="text-red-400 text-center text-sm"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                {error}
                                            </motion.p>
                                        )}

                                        {/* Submit */}
                                        <motion.div
                                            className="flex justify-center pt-4"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 }}
                                        >
                                            <button
                                                type="submit"
                                                disabled={sending}
                                                className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-black font-medium text-lg hover:bg-neutral-100 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] disabled:opacity-50 cursor-pointer"
                                            >
                                                {sending ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Odesílám...
                                                    </>
                                                ) : (
                                                    <>
                                                        Odeslat poptávku
                                                        <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                                                    </>
                                                )}
                                            </button>
                                        </motion.div>
                                    </motion.form>
                                ) : (
                                    /* Success state */
                                    <motion.div
                                        key="success"
                                        className="text-center py-20"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 200,
                                                damping: 15,
                                                delay: 0.2,
                                            }}
                                        >
                                            <CheckCircle2 className="w-20 h-20 text-green-400 mx-auto mb-8" />
                                        </motion.div>
                                        <motion.h2
                                            className="text-4xl md:text-5xl font-light text-white mb-4"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            Děkujeme!
                                        </motion.h2>
                                        <motion.p
                                            className="text-neutral-400 text-lg max-w-md mx-auto mb-10"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            Vaši poptávku jsme přijali. Ozveme
                                            se vám co nejdříve.
                                        </motion.p>
                                        <motion.button
                                            onClick={handleClose}
                                            className="text-neutral-500 hover:text-white transition-colors duration-300 text-sm uppercase tracking-widest cursor-pointer"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.7 }}
                                        >
                                            Zavřít
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
