import React, { useState, useEffect } from 'react';

export const WordRotator = () => {
    const words = ["Organizaciones", "Empresas", "Instituciones", "Departamentos", "Proyectos", "Profesionales", "Clínicas"];
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % words.length);
                setVisible(true);
            }, 600);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <span
            className="inline-grid transition-all duration-700 ease-in-out align-baseline"
            style={{
                gridTemplateColumns: '1fr',
                transitionProperty: 'width, opacity'
            }}
        >
            <span
                className={`col-start-1 row-start-1 transition-opacity duration-500 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'
                    } text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 px-2 py-1 -my-1`}
            >
                {words[index]}
            </span>
            {/* Elemento invisible para suavizar la transición del ancho y asegurar la línea base */}
            <span className="col-start-1 row-start-1 invisible pointer-events-none px-2 py-1 -my-1">
                {words[index]}
            </span>
        </span>
    );
};
