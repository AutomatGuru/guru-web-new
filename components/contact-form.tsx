"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log("Form submitted");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="bg-white text-black hover:bg-neutral-200 px-8 py-6 text-lg rounded-full"
                >
                    Kontaktujte nás
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-neutral-900 border-neutral-800 text-white">
                <DialogHeader>
                    <DialogTitle>Kontaktujte nás</DialogTitle>
                    <DialogDescription className="text-neutral-400">
                        Máte dotaz nebo zájem o spolupráci? Napište nám.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-neutral-200">
                            Jméno
                        </Label>
                        <Input
                            id="name"
                            placeholder="Jan Novák"
                            className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-neutral-500"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-neutral-200">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="jan@example.com"
                            className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-neutral-500"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="message" className="text-neutral-200">
                            Zpráva
                        </Label>
                        <Textarea
                            id="message"
                            placeholder="Vaše zpráva..."
                            className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-neutral-500 min-h-[100px]"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="bg-white text-black hover:bg-neutral-200 w-full sm:w-auto">
                            Odeslat zprávu
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
