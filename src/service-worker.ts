/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

import { Workbox } from 'workbox-window';

declare global {
  interface Window {
    deferredPrompt: Event | null;
  }
}

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');
  
  // Register the service worker
  wb.register()
    .then((registration) => {
      console.log('Service Worker registered:', registration);
      
      // Listen for the 'waiting' event which is fired when a new service worker is waiting
      wb.addEventListener('waiting', (event) => {
        if (confirm('A new version is available! Would you like to update?')) {
          wb.messageSkipWaiting();
        }
      });
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
  
  // Listen for the 'beforeinstallprompt' event
  window.deferredPrompt = null;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    window.deferredPrompt = e;
    
    // Show the install button or custom UI
    showInstallPromotion();
  });
  
  // Show the install promotion
  function showInstallPromotion() {
    // You can customize this to show a custom install button or UI
    // For example, you could show a button that calls promptInstall() when clicked
    console.log('PWA installation available');
  }
}

// Function to trigger the installation prompt
export function promptInstall() {
  if (typeof window !== 'undefined' && window.deferredPrompt) {
    // Show the install prompt
    (window.deferredPrompt as any).prompt();
    
    // Wait for the user to respond to the prompt
    (window.deferredPrompt as any).userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Clear the deferredPrompt variable
      window.deferredPrompt = null;
    });
  }
}
