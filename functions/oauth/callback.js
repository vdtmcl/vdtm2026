export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) return new Response("Error: No code provided", { status: 400 });

    try {
        // 1. Intercambio del código por el token
        const response = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "user-agent": "VDTM-CMS-OAuth", // Requisito de GitHub
                "accept": "application/json",
            },
            body: JSON.stringify({
                client_id: env.GITHUB_CLIENT_ID,
                client_secret: env.GITHUB_CLIENT_SECRET,
                code,
            }),
        });

        const result = await response.json();

        if (result.error) {
            return new Response(JSON.stringify(result), { status: 400 });
        }

        const token = result.access_token;
        const provider = "github";

        // 2. HTML de respuesta que se comunica con la ventana principal
        const html = `
        <!DOCTYPE html>
        <html>
        <body>
        <script>
          (function() {
            function sendMsg() {
              const msg = 'authorization:' + '${provider}:${token}';
              console.log("Enviando token a CMS...");
              
              // Enviamos mensaje 'Legacy' (String)
              // Usamos '*' para asegurar que llegue sin importar el dominio (vdtm.cl o pages.dev)
              window.opener.postMessage(msg, '*');
              
              // Enviamos mensaje 'Moderno' (Objeto)
              window.opener.postMessage({
                authorization: { provider: '${provider}', token: '${token}' }
              }, '*');
            }
            
            // Enviamos el mensaje inmediatamente
            sendMsg();
            
            // Lo repetimos cada 0.5s por si el navegador estaba ocupado
            setInterval(sendMsg, 500);
            
            // Cerramos la ventana a los 2 segundos (tiempo suficiente para leer el éxito)
            setTimeout(() => window.close(), 2000);
          })();
        </script>
        <div style="font-family:sans-serif;text-align:center;margin-top:20%;color:#333;">
          <h1>✅ Autenticación Exitosa</h1>
          <p>Conectando con el CMS... esta ventana se cerrará sola.</p>
        </div>
        </body>
        </html>
      `;

        return new Response(html, { headers: { "content-type": "text/html;charset=UTF-8" } });
    } catch (error) {
        return new Response(`Error del servidor: ${error.message}`, { status: 500 });
    }
}
