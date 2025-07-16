/**
 * Security configuration for Electron app
 * Content Security Policy and other security headers
 */

export const CSP_POLICY = {
    // Development CSP (more permissive for hot reloading)
    development: [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline'", // Remove unsafe-eval, only keep unsafe-inline for dev
        "style-src 'self' 'unsafe-inline'", // unsafe-inline needed for Tailwind
        "img-src 'self' data: https:",
        "font-src 'self' data:",
        "connect-src 'self' ws: wss: http://localhost:* http://127.0.0.1:*", // WebSocket for hot reloading
        "media-src 'self'",
        "object-src 'none'",
        "child-src 'none'",
        "worker-src 'none'",
        "frame-src 'none'",
        "form-action 'none'",
        "base-uri 'self'"
    ].join('; '),

    // Production CSP (more restrictive)
    production: [
        "default-src 'self'",
        "script-src 'self'", // No unsafe-inline or unsafe-eval in production
        "style-src 'self' 'unsafe-inline'", // May need unsafe-inline for Tailwind
        "img-src 'self' data:",
        "font-src 'self' data:",
        "connect-src 'self'",
        "media-src 'self'",
        "object-src 'none'",
        "child-src 'none'",
        "worker-src 'none'",
        "frame-src 'none'",
        "form-action 'none'",
        "base-uri 'self'"
    ].join('; ')
};

export const SECURITY_HEADERS = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
};

export const getCSPForEnvironment = (isDevelopment: boolean): string => {
    return isDevelopment ? CSP_POLICY.development : CSP_POLICY.production;
};
