import React from 'react';

interface LoadingProps {
    message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
    return (
        <div className="loading">
            <div>{message}</div>
        </div>
    );
};

export default Loading;
