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
            }, 500);
        }, 4000);
        return () => clearInterval(interval);
    }, []);
    return (
        <span className={`inline-block transition-opacity duration-500 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'} text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 pb-2 leading-tight`}>
            {words[index]}
        </span>
    );
};
