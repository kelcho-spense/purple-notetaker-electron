import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center mb-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                📝 Purple Notes
            </h1>
            <p className="text-lg md:text-xl opacity-90 text-white/90">
                Your personal note-taking companion
            </p>
        </header>
    );
};

export default Header;
