import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Providers from './providers/index.js';

const rootElement = document.getElementById('root');
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<Providers>
				<App />
			</Providers>
		</StrictMode>,
	);
} else {
	console.error('Root element not found');
}
