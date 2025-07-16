/**
 * Vite-specific security configuration for Electron
 * Handles CSP policies that work with Vite's dev server
 */

export const VITE_CSP_POLICY = {
    // CSP that works with Vite dev server (strict - no unsafe-eval)
    development: [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' data:", // Allow inline scripts and data: URIs for Vite
        "style-src 'self' 'unsafe-inline' data:", // Allow inline styles for Tailwind and Vite
        "img-src 'self' data: https: blob:", // Allow images from various sources
        "font-src 'self' data: https:", // Allow fonts
        "connect-src 'self' ws: wss: http://localhost:* http://127.0.0.1:* https://localhost:*", // WebSocket for HMR
        "media-src 'self' data: blob:",
        "object-src 'none'",
        "child-src 'none'",
        "worker-src 'self' blob:", // Allow workers for Vite
        "frame-src 'none'",
        "form-action 'none'",
        "base-uri 'self'",
        "manifest-src 'self'"
    ].join('; '),

    // Strict production CSP
    production: [
        "default-src 'self'",
        "script-src 'self'", // No unsafe-inline or unsafe-eval in production
        "style-src 'self' 'unsafe-inline'", // Still need unsafe-inline for Tailwind
        "img-src 'self' data:",
        "font-src 'self' data:",
        "connect-src 'self'",
        "media-src 'self'",
        "object-src 'none'",
        "child-src 'none'",
        "worker-src 'none'",
        "frame-src 'none'",
        "form-action 'none'",
        "base-uri 'self'",
        "manifest-src 'self'"
    ].join('; ')
};

export const getViteCSPForEnvironment = (isDevelopment: boolean): string => {
    return isDevelopment ? VITE_CSP_POLICY.development : VITE_CSP_POLICY.production;
};
