/// <reference types="vite-plugin-pwa/client" />

export {}; // Make this a module

declare global {
  interface Window {
    workbox: any;
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('ServiceWorker registration successful with scope:', registration.scope);

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New content is available; please refresh.');
                if (confirm('A new version is available! Would you like to update?')) {
                  window.location.reload();
                }
              }
            });
          }
        });
      },
      (err) => {
        console.log('ServiceWorker registration failed:', err);
      }
    );
  });
}
