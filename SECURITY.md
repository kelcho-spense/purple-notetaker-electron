# Security Guide for Purple Notes Electron App

## Overview
This document outlines the security measures implemented in the Purple Notes Electron application to protect users from common security vulnerabilities.

## Security Measures Implemented

### 1. Content Security Policy (CSP)
- **Development CSP**: Allows necessary unsafe operations for development (webpack, hot reloading)
- **Production CSP**: Strict policy that prevents XSS attacks
- **Headers**: Set via both HTML meta tags and programmatically in main process

### 2. Context Isolation
- **Enabled**: `contextIsolation: true` in webPreferences
- **Benefit**: Prevents renderer process from accessing Node.js APIs directly
- **Implementation**: Uses `contextBridge` to expose safe APIs

### 3. Node Integration
- **Disabled**: `nodeIntegration: false` in webPreferences
- **Benefit**: Prevents renderer from accessing Node.js directly
- **Safe Alternative**: Uses preload scripts with contextBridge

### 4. Preload Script Security
- **Input Validation**: All inputs are validated and sanitized
- **Context Validation**: Ensures running in isolated context
- **Error Handling**: Proper error boundaries and logging

### 5. Window Security
- **Navigation Control**: Prevents navigation to external URLs
- **Window Creation**: Blocks creation of new windows
- **Web Security**: Enabled to prevent mixed content

### 6. Additional Security Headers
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(), microphone=(), camera=()`

## File System Security

### Data Storage
- **Location**: User's home directory (`~/purple-notetaker-data/`)
- **Permissions**: Standard user permissions
- **Validation**: All data is validated before read/write operations

### Input Sanitization
- **String Validation**: Maximum length limits
- **Type Checking**: Strict type validation
- **Error Handling**: Graceful error handling for invalid data

## Best Practices Followed

### Electron Security Checklist
- ✅ Use `contextIsolation: true`
- ✅ Use `nodeIntegration: false`
- ✅ Use `sandbox: false` (required for file system access)
- ✅ Use `webSecurity: true`
- ✅ Don't use `allowRunningInsecureContent: true`
- ✅ Don't use `experimentalFeatures: true`
- ✅ Use Content Security Policy
- ✅ Handle all user inputs
- ✅ Use `setWindowOpenHandler` instead of deprecated `new-window`
- ✅ Validate all IPC messages
- ✅ Use secure defaults

### Code Security
- ✅ Input validation on all user inputs
- ✅ Proper error handling
- ✅ No eval() or similar dangerous functions
- ✅ Secure file operations
- ✅ No remote code execution

## Security Warnings Resolution

### Original Warning
```
Electron Security Warning (Insecure Content-Security-Policy)
This renderer process has either no Content Security Policy set or a policy with "unsafe-eval" enabled.
```

### Resolution
1. **Added CSP meta tag** in HTML
2. **Programmatic CSP headers** in main process
3. **Environment-specific policies** (dev vs production)
4. **Comprehensive security headers**

## Monitoring and Maintenance

### Regular Security Checks
- Update Electron to latest stable version
- Review and update CSP policies
- Monitor for new security vulnerabilities
- Regular security audits

### Development Guidelines
- Always validate inputs in preload scripts
- Use TypeScript for type safety
- Follow principle of least privilege
- Regular dependency updates

## Production Considerations

### Before Deployment
- Review CSP policies for production
- Remove development-specific security exceptions
- Test with production CSP settings
- Code signing for distributables

### Distribution Security
- Use code signing certificates
- Distribute through trusted channels
- Implement auto-updates securely
- Monitor for security issues post-deployment

## Resources
- [Electron Security Documentation](https://www.electronjs.org/docs/tutorial/security)
- [Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [OWASP Electron Security](https://owasp.org/www-project-electron-security/)
