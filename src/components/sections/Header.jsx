import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { DATA } from '../../data';

export const Header = ({ currentSection, onContactClick, onNavigate }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const scrollTo = (id) => {
        setMobileMenuOpen(false);
        onNavigate(id);
    };
    const isScrolled = currentSection > 0;
    const headerClass = isScrolled ? 'bg-slate-950 text-white shadow-lg py-3 border-b border-slate-800' : 'bg-white/90 backdrop-blur-md text-slate-900 py-4 shadow-sm';
    const linkClass = isScrolled ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-sky-500';
    return (
        <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ease-in-out ${headerClass}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-12 flex justify-between items-center">
                <div className="cursor-pointer" onClick={() => scrollTo('hero')}>
                    <img
                        src={isScrolled ? "https://res.cloudinary.com/vdtm-cl/image/upload/v1769143172/LOGO_VDTM_2026_FONDO_OSCURO_iff971.png" : "https://res.cloudinary.com/vdtm-cl/image/upload/v1769143016/LOGO_VDTM_2026_yt8wxy.png"}
                        alt="VDTM Logo"
                        className="h-10 w-auto transition-all duration-300"
                    />
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    {DATA.menu.map(item => (
                        <button key={item.id} onClick={() => scrollTo(item.id)} className={`text-sm font-medium transition-colors ${linkClass}`}>{item.label}</button>
                    ))}
                    <Button variant="primary" onClick={onContactClick} className="!py-2 !px-5 text-sm">Hablemos</Button>
                </nav>
                <button className={`md:hidden p-2 ${isScrolled ? 'text-white' : 'text-slate-700'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white text-slate-900 shadow-xl border-t border-slate-100 p-4 flex flex-col gap-2 md:hidden h-screen">
                    {DATA.menu.map(item => (
                        <button key={item.id} onClick={() => scrollTo(item.id)} className="w-full text-left p-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700 text-lg">{item.label}</button>
                    ))}
                    <div className="h-px bg-slate-100 my-4"></div>
                    <Button variant="primary" onClick={() => { setMobileMenuOpen(false); onContactClick(); }} className="w-full">Hablemos</Button>
                </div>
            )}
        </header>
    );
};
