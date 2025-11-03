import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import GaleriaCarrusel from "@/components/carrusel";
import Invitacion from "@/components/acceso";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center text-white bg-[#180d02]">
      <div className="bg-[#180d02] flex-1 w-full flex flex-col gap-5 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold text-white">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={40}
                height={40}
              />
              <Link href={"/"}>La Clave del Chef</Link>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Acceso exclusivo por invitación</h1>
            <GaleriaCarrusel />
            <Invitacion />
          </div>

          <main className="flex-1 flex flex-col gap-6 px-4">
            <h2 className="font-medium text-xl mb-4">Información importante sobre La Clave del Chef</h2>
            <p>Esta página es un proyecto ficticio diseñado como demostración de desarrollo web.
              Ninguna reserva o dato ingresado será utilizado fuera de este entorno de prueba.</p>
          </main>
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Página desarrollada por Selene Blas
          </p>
        </footer>
      </div>
    </main>
  );
}
