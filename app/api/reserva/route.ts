import { google } from "googleapis";
import { NextResponse } from "next/server";

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    console.warn("Faltan variables de entorno para Google Sheets (SPREADSHEET_ID, GOOGLE_SA_CLIENT_EMAIL, GOOGLE_SA_PRIVATE_KEY).");
}

async function getSheetsClient() {
    const auth = new google.auth.JWT({
        email: CLIENT_EMAIL,
        key: PRIVATE_KEY,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    } as any);

    await auth.authorize();
    return google.sheets({ version: "v4", auth });
}

export async function POST(req: Request) {
    try {
        if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
            return NextResponse.json(
                { error: "Configuración del servidor incompleta para Google Sheets." },
                { status: 500 }
            );
        }

        const body = await req.json();
        const { nombre, email, personas, fecha, hora } = body ?? {};

        if (!nombre || !email || !personas || !fecha || !hora) {
            return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
        }

        const sheets = await getSheetsClient();

        const range = "Reserva!A:F";
        const timestamp = new Date().toISOString();
        const values = [[timestamp, nombre, email, String(personas), fecha, hora]];

        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range,
            valueInputOption: "RAW",
            requestBody: { values },
        });

        return NextResponse.json({ ok: true, message: "Reserva guardada en Sheets" });
    } catch (err: any) {
        console.error("Error en /api/reserva:", err);
        return NextResponse.json(
            { error: err?.message || "Error interno del servidor" },
            { status: 500 }
        );
    }
}
