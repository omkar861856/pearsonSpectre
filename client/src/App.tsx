import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Suspense, lazy, useEffect, useState } from "react";

// Import pages directly for more reliable loading
import NotFoundPage from "@/pages/not-found";
import HomePage from "@/pages/home";

// Loading fallback with simplified styling
const LoadingFallback = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-navy-200 border-t-navy-800 rounded-full animate-spin"></div>
      <p className="mt-4 text-navy-800 font-medium">Loading Pearson Specter...</p>
    </div>
  </div>
);

// Error boundary component
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error('React error caught by error boundary:', event.error);
      setHasError(true);
    };
    
    window.addEventListener('error', errorHandler);
    
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);
  
  if (hasError) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="max-w-md p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-red-800 mb-4">Something went wrong</h2>
          <p className="text-gray-800 mb-4">We're sorry, but there was an error loading the page.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="py-2 px-4 bg-navy-800 text-white rounded-md hover:bg-navy-700 transition"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
}

function Router() {
  // Use state for page loading status
  const [pagesLoaded, setPagesLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate a minimal loading delay
    const timer = setTimeout(() => {
      setPagesLoaded(true);
      // Manually handle loader removal
      const loader = document.querySelector('.critical-loader');
      if (loader) {
        (loader as HTMLElement).style.opacity = '0';
        setTimeout(() => loader.remove(), 350);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Wait for minimal pages loaded state
  if (!pagesLoaded) {
    return <LoadingFallback />;
  }
  
  return (
    <ErrorBoundary>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
