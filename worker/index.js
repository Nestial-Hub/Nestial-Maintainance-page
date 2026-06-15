export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 1. Upstream Server (Your Tunnel Subdomain)
    const UPSTREAM = "https://origin.nestial.in";
    
    // 2. Maintenance Page Host (Cloudflare Pages URL)
    const MAINTENANCE_PAGE = "https://nestial-maintainance-page.pages.dev";
    
    const upstreamUrl = UPSTREAM + url.pathname + url.search;
    
    const headers = new Headers(request.headers);
    
    try {
      // Try to fetch from the main server (tunnel)
      const response = await fetch(upstreamUrl, {
        method: request.method,
        headers: headers,
        body: request.method !== "GET" && request.method !== "HEAD" ? request.body : null,
        redirect: "manual"
      });
      
      // If server returns a 5xx error (e.g., tunnel down 502, 530, 522)
      if (response.status >= 500 && response.status !== 501) {
        return fetchMaintenance(url.pathname + url.search, MAINTENANCE_PAGE, response.status);
      }
      
      return response;
    } catch (err) {
      // If connection fails entirely (DNS or Network issue)
      return fetchMaintenance(url.pathname + url.search, MAINTENANCE_PAGE, 503);
    }
  }
};

async function fetchMaintenance(path, maintenanceHost, originalStatus) {
  const maintenanceUrl = maintenanceHost + path;
  try {
    const res = await fetch(maintenanceUrl);
    
    // Support SPA routing / assets fallback
    if (res.status === 404 && !path.includes("/assets/")) {
      return fetch(maintenanceHost + "/");
    }
    
    const newHeaders = new Headers(res.headers);
    newHeaders.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    
    return new Response(res.body, {
      status: originalStatus || 503,
      statusText: "Service Unavailable (Maintenance)",
      headers: newHeaders
    });
  } catch (e) {
    return new Response("System is under maintenance. Please try again later.", {
      status: 503,
      headers: { "Content-Type": "text/plain" }
    });
  }
}
