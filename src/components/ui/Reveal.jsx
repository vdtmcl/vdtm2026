import React, { useState, useEffect, useRef } from 'react';
export const Reveal = ({ children, className = "", delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);
    return (
        <div ref={ref} style={{ transitionDuration: '2000ms', transitionDelay: `${delay}ms` }} className={`transition-all ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}>
            {children}
        </div>
    );
};
