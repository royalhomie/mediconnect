import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register service worker
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  import('./registerSW');
}

// Create root and render app
createRoot(document.getElementById("root")!).render(<App />);
