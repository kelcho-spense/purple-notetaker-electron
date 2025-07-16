import React from 'react';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
    return (
        <div className="error">
            <p>{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    style={{
                        marginTop: '10px',
                        padding: '8px 16px',
                        backgroundColor: '#c53030',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
