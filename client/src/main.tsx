import "./index.css";

// Import React dependencies directly for reliability
import { createRoot } from "react-dom/client";
import App from "./App";
import { Inter, Merriweather } from "./lib/fonts";

// Simple performance logging utility
const logPerf = (label: string, startTime?: number) => {
  const t = startTime ? performance.now() - startTime : performance.now();
  console.log(`[Perf] ${label}: ${t.toFixed(1)}ms`);
};

// Direct initialization with minimal overhead
document.addEventListener('DOMContentLoaded', () => {
  const startTime = performance.now();
  
  try {
    // Add basic classes for styling
    document.documentElement.classList.add('js', Inter.variable, Merriweather.variable);
    
    // Mount React immediately
    const rootElement = document.getElementById("root");
    if (rootElement) {
      const renderStartTime = performance.now();
      const root = createRoot(rootElement);
      
      // Simple error handling
      try {
        root.render(<App />);
        logPerf('React rendered', renderStartTime);
      } catch (error) {
        console.error('React render error:', error);
        rootElement.innerHTML = `
          <div style="padding: 20px; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px;">
            <h3>Something went wrong</h3>
            <p>Please try refreshing the page. If the problem persists, contact us at <a href="tel:+18001234567">800-123-4567</a>.</p>
          </div>
        `;
      }
      
      // Mark as mounted
      document.documentElement.classList.add('react-mounted');
    }
    
    logPerf('App bootstrap', startTime);
  } catch (error) {
    console.error('Critical error during app initialization:', error);
  }
  
  // Initialize non-critical features after a small delay
  setTimeout(() => {
    // Basic image optimization
    document.querySelectorAll('img:not([loading="lazy"])').forEach(img => {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    });
    
    // Add animation classes
    document.documentElement.classList.add('js-focus-visible');
    
    logPerf('Features initialized', startTime);
  }, 100);
});
