import React, { useState, useEffect } from 'react';

export const WordRotator = () => {
    const words = ["Organizaciones", "Empresas", "Instituciones", "Departamentos", "Proyectos", "Profesionales", "Clínicas"];
    const [index, setIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % words.length);
                setIsTransitioning(false);
            }, 400); // Duración de la salida
        }, 3000); // Velocidad aumentada (de 4000 a 3000)

        return () => clearInterval(interval);
    }, []);

    return (
        <span className="inline-block relative overflow-hidden align-bottom">
            <span
                className={`inline-block transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${isTransitioning
                        ? 'opacity-0 -translate-y-4'
                        : 'opacity-100 translate-y-0'
                    } text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 pb-1 leading-tight`}
            >
                {words[index]}
            </span>
        </span>
    );
};
