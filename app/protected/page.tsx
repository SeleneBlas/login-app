import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <div className="flex flex-col flex-1 w-full min-h-screen bg-yellow-50 ">
      <div className="text-center py-8 ">
        <h1 className="text-3xl font-bold ">Bienvenido a La Clave del Chef</h1>
        <p className="text-sm mt-2">
          Acceso exclusivo por invitación — Experiencia gastronómica privada
        </p>
      </div>

      <main className="flex flex-col gap-8 items-center px-6 pb-12">
        <div className="bg-white border border-yellow-200 rounded-lg shadow-md p-6 w-full max-w-xl">
          <h2 className="font-bold text-2xl mb-4 text-yellow-900 text-center">Menú exclusivo del Chef</h2>
          <div className="space-y-3 text-gray-700">
            <p><span className="font-semibold">Entrada:</span> Carpaccio de salmón con limón y alcaparras</p>
            <p><span className="font-semibold">Principal:</span> Risotto de hongos con trufa blanca</p>
            <p><span className="font-semibold">Postre:</span> Tiramisú artesanal</p>
            <p><span className="font-semibold">Bebida:</span> Vino Malbec Reserva</p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 w-full max-w-md text-center shadow-sm">
          <h3 className="font-bold text-lg mb-2 text-yellow-900">Detalles de tu reserva</h3>
          <p><span className="font-semibold">Nombre:</span> Invitado Especial</p>
          <p><span className="font-semibold">Mesa:</span> 10</p>
          <p><span className="font-semibold">Horario:</span> 21:30 hs</p>
          <p><span className="font-semibold">Ubicación:</span> Salón Privado “La Clave”</p>
        </div>

        <div className="bg-yellow-100 border border-yellow-200 rounded-md p-4 w-full max-w-md italic shadow-sm">
          <p>“Cada plato fue diseñado para despertar tus sentidos. Gracias por ser parte de esta experiencia exclusiva.”</p>
          <p className="text-right mt-2 font-semibold">— Chef</p>
        </div>
        <p className="text-sm text-gray-500 text-center max-w-md">
          Esta página es parte de un proyecto demostrativo. No se recopilan datos reales.
        </p>
      </main>
    </div>
  );
}
