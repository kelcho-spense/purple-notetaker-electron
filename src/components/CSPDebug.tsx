import React, { useEffect, useState } from 'react';

interface CSPDebugProps {
    isDevelopment?: boolean;
}

export const CSPDebug: React.FC<CSPDebugProps> = ({ isDevelopment = true }) => {
    const [cspStatus, setCspStatus] = useState<{
        hasCSP: boolean;
        policy: string;
        violations: string[];
        electronAPI: boolean;
        contextIsolated: boolean;
    }>({
        hasCSP: false,
        policy: '',
        violations: [],
        electronAPI: false,
        contextIsolated: false
    });

    useEffect(() => {
        // Check CSP meta tag
        const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
        const hasCSP = !!cspMeta;
        const policy = cspMeta?.getAttribute('content') || '';

        // Check if ElectronAPI is available
        const electronAPI = typeof window !== 'undefined' && !!window.electronAPI;

        // Check context isolation by trying to access window.require
        // In a context-isolated environment, window.require should be undefined
        const contextIsolated = typeof (window as Window & { require?: unknown }).require === 'undefined';

        setCspStatus({
            hasCSP,
            policy,
            violations: [],
            electronAPI,
            contextIsolated
        });

        // Listen for CSP violations
        const handleViolation = (event: SecurityPolicyViolationEvent) => {
            setCspStatus(prev => ({
                ...prev,
                violations: [...prev.violations, `${event.violatedDirective}: ${event.blockedURI}`]
            }));
        };

        document.addEventListener('securitypolicyviolation', handleViolation);

        return () => {
            document.removeEventListener('securitypolicyviolation', handleViolation);
        };
    }, []);

    if (!isDevelopment) {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
            <div className="mb-2">
                <strong>🔒 Security Status</strong>
            </div>

            <div className="space-y-1">
                <div className={`flex items-center gap-2 ${cspStatus.hasCSP ? 'text-green-400' : 'text-red-400'}`}>
                    {cspStatus.hasCSP ? '✅' : '❌'} CSP Active
                </div>                <div className={`flex items-center gap-2 ${cspStatus.electronAPI ? 'text-green-400' : 'text-red-400'}`}>
                    {cspStatus.electronAPI ? '✅' : '❌'} Electron API
                </div>

                <div className={`flex items-center gap-2 ${cspStatus.contextIsolated ? 'text-green-400' : 'text-red-400'}`}>
                    {cspStatus.contextIsolated ? '✅' : '❌'} Context Isolated
                </div>
            </div>

            {cspStatus.violations.length > 0 && (
                <div className="mt-2">
                    <strong className="text-red-400">⚠️ CSP Violations:</strong>
                    <ul className="text-red-300 text-xs mt-1">
                        {cspStatus.violations.slice(-3).map((violation, index) => (
                            <li key={index}>• {violation}</li>
                        ))}
                    </ul>
                </div>
            )}

            {cspStatus.policy && (
                <details className="mt-2">
                    <summary className="cursor-pointer text-blue-400">CSP Policy</summary>
                    <pre className="text-xs mt-1 overflow-auto max-h-20 bg-gray-800 p-1 rounded">
                        {cspStatus.policy}
                    </pre>
                </details>
            )}
        </div>
    );
};
