/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components';
import './index.css';

// Get the root element
const container = document.getElementById('root');
if (!container) {
    throw new Error('Root element not found. Make sure index.html contains a div with id="root"');
}

// Create root and render the app with error boundary
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </React.StrictMode>
);

console.log('🎨 Purple Notes React app loaded successfully!');
