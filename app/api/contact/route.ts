import { NextRequest, NextResponse } from "next/server";

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;



export async function POST(req: NextRequest) {
    try {
        if (!SLACK_WEBHOOK_URL) {
            console.error("SLACK_WEBHOOK_URL is not defined");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        const { name, email, phone, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Všechna pole jsou povinná." },
                { status: 400 }
            );
        }

        const now = new Date().toLocaleString("cs-CZ", {
            timeZone: "Europe/Prague",
            dateStyle: "long",
            timeStyle: "short",
        });

        const slackPayload = {
            blocks: [
                {
                    type: "header",
                    text: {
                        type: "plain_text",
                        text: "📩 Nová poptávka z webu",
                        emoji: true,
                    },
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: `*Jméno:*\n${name}`,
                        },
                        {
                            type: "mrkdwn",
                            text: `*Email:*\n${email}`,
                        },
                    ],
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: `*Telefon:*\n${phone || "—"}`,
                        },
                    ],
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `*Zpráva:*\n${message}`,
                    },
                },
                {
                    type: "context",
                    elements: [
                        {
                            type: "mrkdwn",
                            text: `🕐 ${now}`,
                        },
                    ],
                },
            ],
        };

        const slackRes = await fetch(SLACK_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(slackPayload),
        });

        if (!slackRes.ok) {
            console.error("Slack webhook error:", await slackRes.text());
            return NextResponse.json(
                { error: "Nepodařilo se odeslat zprávu." },
                { status: 500 }
            );
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json(
            { error: "Interní chyba serveru." },
            { status: 500 }
        );
    }
}
