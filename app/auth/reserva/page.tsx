"use client";

import { FormEvent, useState } from "react";

export default function ReservaPage() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [personas, setPersonas] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setMensaje("");

        try {
            const form = { nombre, email, personas, fecha, hora };

            const response = await fetch("/api/reserva", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
                credentials: "include",
            });

            const contentType = response.headers.get("content-type") || "";

            if (!response.ok) {
                const text = await response.text().catch(() => "");
                throw new Error(text || `HTTP ${response.status}`);
            }

            if (contentType.includes("application/json")) {
                const data = await response.json();
                setMensaje("✅ Su reserva fue solicitada. Será contactado para confirmar la disponibilidad. ¡Gracias!");
                setNombre("");
                setEmail("");
                setPersonas("");
                setFecha("");
                setHora("");

                setTimeout(() => {
                    window.location.href = "/";
                }, 3000);

            } else {
                const text = await response.text();
                setMensaje("Respuesta inesperada del servidor. Revisa la consola.");
            }

        } catch (err: any) {
            setMensaje("Error inesperado al enviar la reserva, intenta nuevamente más tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#180d02] flex flex-col items-center py-12 px-6 text-white">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-white">Reserva tu Experiencia</h1>
                <p className="text-gray-300 mt-2">
                    Completa el formulario para reservar.
                </p>
            </div>

            <form
                className="bg-white text-black shadow-lg rounded-lg p-8 w-full max-w-md border border-black space-y-5"
                onSubmit={handleSubmit}
            >
                <div>
                    <label htmlFor="nombre" className="block text-sm font-semibold mb-1">
                        Nombre completo
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ej: Sofía Álvarez"
                        className="w-full border border-black bg-white rounded-md px-3 py-2 focus:ring-[#d4a15c] focus:border-[#d4a15c]"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-1">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ej: sofia@example.com"
                        className="w-full border border-black bg-white rounded-md px-3 py-2 focus:ring-[#d4a15c] focus:border-[#d4a15c]"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="personas" className="block text-sm font-semibold mb-1">
                        Número de personas
                    </label>
                    <select
                        id="personas"
                        value={personas}
                        onChange={(e) => setPersonas(e.target.value)}
                        className="w-full border border-black bg-white rounded-md px-3 py-2 focus:ring-[#d4a15c] focus:border-[#d4a15c] text-[#808080]"
                        required
                    >
                        <option value="">Seleccionar...</option>
                        <option value="2">2 personas</option>
                        <option value="4">4 personas</option>
                        <option value="6">6 personas</option>
                        <option value="8">8 personas</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="fecha" className="block text-sm font-semibold mb-1">
                        Fecha de reserva
                    </label>
                    <input
                        type="date"
                        id="fecha"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className="w-full border border-black bg-white rounded-md px-3 py-2 focus:ring-[#d4a15c] focus:border-[#d4a15c] text-[#808080]"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="hora" className="block text-sm font-semibold mb-1">
                        Hora
                    </label>
                    <input
                        type="time"
                        id="hora"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        className="w-full border border-black bg-white rounded-md px-3 py-2 focus:ring-[#d4a15c] focus:border-[#d4a15c] text-[#808080]"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-[#d4a15c] text-black font-semibold py-2 px-4 rounded-md transition-colors ${isLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-[#b38f4c]"}`}
                >
                    {isLoading ? "Reservando..." : "Reservar mesa"}
                </button>
            </form>

            {mensaje && (
                <p className="text-sm text-gray-200 text-center mt-6 max-w-md">{mensaje}</p>
            )}
        </main>
    );
}
