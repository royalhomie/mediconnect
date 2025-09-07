import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         (window.navigator as any).standalone === true;
      setIsInstalled(isStandalone);
      return isStandalone;
    };

    // Check on initial load
    if (checkInstalled()) return;

    // Check on page show (for mobile browsers)
    const handlePageShow = () => checkInstalled();
    window.addEventListener('pageshow', handlePageShow);

    // Handle beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default browser install prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Only show our custom prompt if the app isn't already installed
      if (!checkInstalled()) {
        setIsVisible(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check for app installed event
    const handleAppInstalled = () => {
      console.log('App was installed');
      setIsInstalled(true);
      setIsVisible(false);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      console.log('No install prompt available');
      return;
    }
    
    try {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log(`User response to the install prompt: ${outcome}`);
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    } catch (error) {
      console.error('Error showing install prompt:', error);
    } finally {
      // Reset the deferred prompt variable
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  // Don't show if already installed or if we're not ready yet
  if (isInstalled || !isVisible) return null;

  // Check if we're on a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Don't show on desktop browsers that don't support installation
  if (!isMobile && !(window as any).beforeinstallprompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-md rounded-lg bg-white p-4 shadow-xl dark:bg-gray-800 sm:right-4 sm:bottom-4 sm:w-auto">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Install MediConnect</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Get the best experience by installing our app on your home screen.
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Tap the share icon and select &quot;Add to Home Screen&quot; to install.
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="text-sm"
        >
          Not Now
        </Button>
        <Button
          onClick={handleInstall}
          size="sm"
          className="bg-primary text-sm text-white hover:bg-primary/90"
        >
          Install App
        </Button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
