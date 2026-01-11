// functions/api/submit.js
import { Resend } from 'resend';

export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const body = await request.json();

        // 1. Validación de Turnstile (Lado Servidor)
        const token = body.token;
        const ip = request.headers.get('CF-Connecting-IP');

        const formData = new FormData();
        formData.append('secret', env.TURNSTILE_SECRET_KEY);
        formData.append('response', token);
        formData.append('remoteip', ip);

        const turnstileResult = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            body: formData,
            method: 'POST',
        });

        const outcome = await turnstileResult.json();
        if (!outcome.success) {
            return new Response(JSON.stringify({ error: 'Fallo de seguridad (Captcha)' }), { status: 403 });
        }

        // 2. Validación de Datos (Simple Check)
        if (!body.email || !body.message) {
            return new Response(JSON.stringify({ error: 'Datos incompletos' }), { status: 400 });
        }

        // 3. Envío con Resend
        const resend = new Resend(env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
            from: 'VDTM Web <onboarding@resend.dev>', // Cambiar por dominio verificado en producción
            to: ['vdtm.cl@gmail.com'], // Email de recepción configurado desde DATA
            subject: `Nuevo contacto de: ${body.name || 'Anónimo'}`,
            html: `<p><strong>Nombre:</strong> ${body.name || 'No proporcionado'}</p><p><strong>Empresa:</strong> ${body.company || 'No proporcionada (Obligatorio en Front)'}</p><p><strong>Email:</strong> ${body.email}</p><p><strong>WhatsApp:</strong> ${body.whatsapp || 'No proporcionado'}</p><p><strong>Mensaje:</strong> ${body.message}</p>`,
        });

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ success: true, id: data.id }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
    }
}
