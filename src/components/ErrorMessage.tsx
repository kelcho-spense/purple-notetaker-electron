import React from 'react';
import { Button } from './ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
    return (
        <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                <p className="text-destructive font-medium">{message}</p>
            </div>
            {onRetry && (
                <Button
                    onClick={onRetry}
                    variant="destructive"
                    size="sm"
                    className="mt-2"
                >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                </Button>
            )}
        </div>
    );
};

export default ErrorMessage;
