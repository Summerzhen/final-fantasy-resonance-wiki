export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.protocol !== "https:" || url.hostname === "www.final-fantasy-resonance.wiki") {
      url.protocol = "https:";
      url.hostname = "final-fantasy-resonance.wiki";
      return Response.redirect(url.toString(), 301);
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    headers.set("Strict-Transport-Security", "max-age=86400");
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
} satisfies ExportedHandler<Env>;
