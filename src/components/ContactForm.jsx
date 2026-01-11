// src/components/ContactForm.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Turnstile from 'react-turnstile';
import { Loader2, Send, CheckCircle, AlertCircle } from 'lucide-react';

// 1. Esquema de Validación (Blindaje de Datos)
const formSchema = z.object({
    name: z.string().min(2, { message: "El nombre es muy corto" }),
    company: z.string().min(2, { message: "El nombre de la empresa es obligatorio" }), // Nuevo campo obligatorio
    email: z.string().email({ message: "Email inválido" }),
    whatsapp: z.string().optional().refine((val) => !val || /^\+?[\d\s]+$/.test(val), { // Nuevo campo opcional
        message: "Número de WhatsApp inválido. Usa solo números, espacios o el signo '+'.",
    }),
    message: z.string().min(10, { message: "Cuéntanos un poco más (mínimo 10 caracteres)" }),
});

export const ContactForm = ({ dark = false }) => {
    const [serverStatus, setServerStatus] = useState('idle'); // idle | submitting | success | error
    const [token, setToken] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    // 2. Manejo del Envío
    const onSubmit = async (data) => {
        if (!token) {
            alert("Por favor completa la verificación de seguridad");
            return;
        }

        setServerStatus('submitting');

        try {
            // El endpoint /api/submit se creará en la Fase 6
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, token }),
            });

            if (!response.ok) throw new Error('Error en el servidor');

            setServerStatus('success');
            reset();
        } catch (error) {
            console.error(error);
            setServerStatus('error');
        }
    };

    return (
        <div className={`w-full max-w-md mx-auto p-4 md:p-6 rounded-xl shadow-sm transition-colors border ${dark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900'}`}>
            <div className="mb-3 md:mb-6">
                <h3 className={`text-xl md:text-2xl font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>Contáctanos</h3>
                <p className={`text-xs md:text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Estamos ansiosos por leerte. 🚀</p>
            </div>

            {serverStatus === 'success' ? (
                <div className={`p-8 rounded-2xl text-center animate-in fade-in zoom-in border shadow-sm ${dark ? 'bg-blue-900/20 border-blue-900/30' : 'bg-blue-50 border-blue-100'}`}>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className={`text-xl font-bold mb-2 ${dark ? 'text-white' : 'text-slate-900'}`}>¡Recibido!</h4>
                    <p className={`leading-relaxed mb-6 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
                        Gracias por tu interés. Hemos recibido tu mensaje correctamente y nuestro equipo lo revisará a la brevedad.
                        <br /><br />
                        ¡Hablamos pronto! 👋
                    </p>
                    <button
                        onClick={() => setServerStatus('idle')}
                        className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        Enviar otro mensaje
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 md:space-y-4">

                    {/* Nombre */}
                    <div>
                        <label className={`block text-[10px] md:text-sm font-medium mb-0.5 ${dark ? 'text-slate-400' : 'text-slate-700'}`}>Nombre</label>
                        <input
                            {...register('name')}
                            type="text"
                            className={`w-full px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${dark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                            placeholder="Tu nombre"
                        />
                        {errors.name && <p className="text-red-500 text-[10px] mt-0.5">{errors.name.message}</p>}
                    </div>

                    {/* Empresa */}
                    <div>
                        <label className={`block text-[10px] md:text-sm font-medium mb-0.5 ${dark ? 'text-slate-400' : 'text-slate-700'}`}>Empresa *</label>
                        <input
                            {...register('company')}
                            type="text"
                            className={`w-full px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${dark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                            placeholder="Organización"
                        />
                        {errors.company && <p className="text-red-500 text-[10px] mt-0.5">{errors.company.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="grid grid-cols-1 gap-2">
                        <div>
                            <label className={`block text-[10px] md:text-sm font-medium mb-0.5 ${dark ? 'text-slate-400' : 'text-slate-700'}`}>Email</label>
                            <input
                                {...register('email')}
                                type="email"
                                className={`w-full px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${dark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                                placeholder="tucorreo@ejemplo.com"
                            />
                            {errors.email && <p className="text-red-500 text-[10px] mt-0.5">{errors.email.message}</p>}
                        </div>
                    </div>

                    {/* WhatsApp (Opcional) */}
                    <div>
                        <label className={`block text-[10px] md:text-sm font-medium mb-0.5 ${dark ? 'text-slate-400' : 'text-slate-700'}`}>WhatsApp (Opcional)</label>
                        <input
                            {...register('whatsapp')}
                            type="tel"
                            className={`w-full px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${dark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                            placeholder="+56 9..."
                        />
                        {errors.whatsapp && <p className="text-red-500 text-[10px] mt-0.5">{errors.whatsapp.message}</p>}
                    </div>

                    {/* Mensaje */}
                    <div>
                        <label className={`block text-[10px] md:text-sm font-medium mb-0.5 ${dark ? 'text-slate-400' : 'text-slate-700'}`}>Mensaje</label>
                        <textarea
                            {...register('message')}
                            rows="2"
                            className={`w-full px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none ${dark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                            placeholder="¿En qué podemos ayudarte?"
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-[10px] mt-0.5">{errors.message.message}</p>}
                    </div>

                    {/* Turnstile (Protección Spam) */}
                    <div className="py-2">
                        <Turnstile
                            sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} // Fallback a Test Key
                            onVerify={(token) => setToken(token)}
                        />
                    </div>

                    {/* Botón de Envío */}
                    <button
                        type="submit"
                        disabled={serverStatus === 'submitting'}
                        className={`w-full flex items-center justify-center py-2 md:py-3 px-4 font-bold rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm md:text-base uppercase tracking-wider ${dark ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                    >
                        {serverStatus === 'submitting' ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Enviando...
                            </>
                        ) : (
                            <>
                                Hablemos
                                <Send className="w-4 h-4 ml-2" />
                            </>
                        )}
                    </button>

                    {serverStatus === 'error' && (
                        <div className="flex items-center text-red-500 text-sm mt-2 bg-red-50 p-3 rounded-lg">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Hubo un error al enviar. Inténtalo de nuevo.
                        </div>
                    )}
                </form>
            )}
        </div>
    );
};
