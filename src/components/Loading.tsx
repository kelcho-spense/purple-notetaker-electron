import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
    message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-primary">
            <Loader2 className="h-12 w-12 animate-spin mb-4" />
            <div className="text-lg font-medium text-foreground">{message}</div>
        </div>
    );
};

export default Loading;
