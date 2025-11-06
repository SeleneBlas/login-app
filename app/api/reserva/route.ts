import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    console.warn("⚠️ Faltan variables de entorno de Google Sheets.");
}

async function getSheetsClient() {
    const auth = new google.auth.JWT({
        email: CLIENT_EMAIL,
        key: PRIVATE_KEY,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    await auth.authorize();
    return google.sheets({ version: "v4", auth });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { nombre, email, personas, fecha, hora } = body ?? {};

        if (!nombre || !email || !personas || !fecha || !hora) {
            return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
        }

        const sheets = await getSheetsClient();
        const timestamp = new Date().toISOString();
        const values = [[timestamp, nombre, email, String(personas), fecha, hora]];

        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: "Reserva!A:F",
            valueInputOption: "RAW",
            requestBody: { values },
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Reservas La Clave del Chef" <${GMAIL_USER}>`,
            to: email,
            subject: "Confirmación de reserva",
            html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2>Hola ${nombre} 👋</h2>
          <p>Tu reserva fue solicitada correctamente.</p>
          <p><b>Detalles:</b></p>
          <ul>
            <li><b>Personas:</b> ${personas}</li>
            <li><b>Fecha:</b> ${fecha}</li>
            <li><b>Hora:</b> ${hora}</li>
          </ul>
          <p>Gracias por elegirnos 🍷</p>
        </div>
      `,
        });

        return NextResponse.json({
            ok: true,
            message: "Reserva guardada y correo enviado correctamente",
        });
    } catch (error: any) {
        console.error("❌ Error en /api/reserva:", error);
        return NextResponse.json(
            { error: error.message || "Error interno del servidor" },
            { status: 500 }
        );
    }
}
