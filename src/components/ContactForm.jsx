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

export const ContactForm = () => {
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
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Contáctanos</h3>
                <p className="text-slate-500">Estamos ansiosos por leerte. 🚀</p>
            </div>

            {serverStatus === 'success' ? (
                <div className="p-8 bg-blue-50 rounded-2xl text-center animate-in fade-in zoom-in border border-blue-100 shadow-sm">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">¡Recibido!</h4>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        Gracias por tu interés. Hemos recibido tu mensaje correctamente y nuestro equipo lo revisará a la brevedad.
                        <br /><br />
                        ¡Hablamos pronto! 👋
                    </p>
                    <button
                        onClick={() => setServerStatus('idle')}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        Enviar otro mensaje
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                        <input
                            {...register('name')}
                            type="text"
                            className="w-full px-4 py-2 text-slate-900 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Tu nombre"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Empresa */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Empresa *</label>
                        <input
                            {...register('company')}
                            type="text"
                            className="w-full px-4 py-2 text-slate-900 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Nombre de la empresa que representas"
                        />
                        {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input
                            {...register('email')}
                            type="email"
                            className="w-full px-4 py-2 text-slate-900 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="tucorreo@ejemplo.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    {/* WhatsApp (Opcional) */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp (Opcional)</label>
                        <input
                            {...register('whatsapp')}
                            type="tel"
                            className="w-full px-4 py-2 text-slate-900 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="+56 9 1234 5678"
                        />
                        {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp.message}</p>}
                    </div>

                    {/* Mensaje */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Mensaje</label>
                        <textarea
                            {...register('message')}
                            rows="4"
                            className="w-full px-4 py-2 text-slate-900 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                            placeholder="¿En qué podemos ayudarte?"
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
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
                        className="w-full flex items-center justify-center py-3 px-4 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 focus:ring-4 focus:ring-slate-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {serverStatus === 'submitting' ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                Enviando...
                            </>
                        ) : (
                            <>
                                Enviar Mensaje
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
