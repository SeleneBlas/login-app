"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const GaleriaCarrusel: React.FC = () => {
    const images: string[] = ["/images/volcan.png", "/images/chef.png", "/images/vino.png", "/images/plato.png"];
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 2) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="max-w-6xl p-4 flex gap-4 flex-col md:flex-row">
            <div className="relative w-full md:w-1/2 h-64 md:h-[300px]">
                <Image
                    src="/images/restaurante_mesas.png"
                    alt="Imagen fija"
                    fill
                    className="object-cover rounded-lg"
                />
            </div>

            <div className="relative w-full md:w-1/2 flex flex-col gap-4 mt-4 md:mt-0">
                <div className="flex gap-4 h-64 md:h-[300px]">
                    <div className="relative w-1/2 h-full">
                        <Image
                            src={images[index]}
                            alt={`Imagen ${index + 1}`}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                    <div className="relative w-1/2 h-full">
                        <Image
                            src={images[(index + 1) % images.length]}
                            alt={`Imagen ${(index + 2)}`}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GaleriaCarrusel;
