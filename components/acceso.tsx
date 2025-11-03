"use client";
import Link from "next/link";
import { Button } from "./ui/button";


const Invitacion: React.FC = () => {

    return (
        <div className="flex flex-col justify-center items-center">
            <p className="mb-6 text-center max-w-xs">Tu acceso personal a La Clave del Chef</p>
            <Button asChild size="sm" variant={"secondary"}>
                <Link href="/auth/login">Ingresar a mi invitación</Link>
            </Button>
        </div>
    );
};

export default Invitacion;