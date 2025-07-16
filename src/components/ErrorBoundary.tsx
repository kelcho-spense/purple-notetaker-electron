import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '20px',
                    backgroundColor: '#fed7d7',
                    border: '1px solid #feb2b2',
                    borderRadius: '8px',
                    color: '#c53030',
                    textAlign: 'center'
                }}>
                    <h2>Something went wrong.</h2>
                    <p>The application encountered an unexpected error.</p>
                    <details style={{ marginTop: '10px' }}>
                        <summary>Error Details</summary>
                        <pre style={{
                            marginTop: '10px',
                            padding: '10px',
                            backgroundColor: '#fff5f5',
                            borderRadius: '4px',
                            overflow: 'auto'
                        }}>
                            {this.state.error?.toString()}
                        </pre>
                    </details>
                    <button
                        style={{
                            marginTop: '10px',
                            padding: '8px 16px',
                            backgroundColor: '#c53030',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                        onClick={() => window.location.reload()}
                    >
                        Reload Application
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
