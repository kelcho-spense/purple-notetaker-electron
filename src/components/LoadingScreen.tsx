import React from 'react';

interface LoadingScreenProps {
    message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
    message = 'Loading Purple Notes...'
}) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <div className="text-center">
                {/* Animated Purple Icon */}
                <div className="mb-8">
                    <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                    </div>
                </div>

                {/* Loading Message */}
                <h1 className="text-2xl font-bold text-white mb-4">
                    {message}
                </h1>

                {/* Loading Spinner */}
                <div className="flex items-center justify-center space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>

                {/* Progress Bar */}
                <div className="mt-8 w-64 mx-auto">
                    <div className="h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
