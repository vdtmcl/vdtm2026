export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);

    // 1. Capturamos los datos vitales que envía Decap CMS
    // Si no pasamos el 'state', Decap rechazará el login por seguridad
    const scope = url.searchParams.get("scope") || "repo,user";
    const state = url.searchParams.get("state");
    const client_id = env.GITHUB_CLIENT_ID;

    // 2. Validación básica
    if (!client_id) {
        return new Response("Error: GITHUB_CLIENT_ID no configurado", { status: 500 });
    }

    // 3. Construimos la URL de GitHub pasando el 'state' intacto
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}&state=${state}&response_type=code`;

    // 4. Redirigimos al usuario a GitHub
    return Response.redirect(githubUrl);
}
