import React, { lazy, Suspense, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";

// Lazy-loaded component for additional resources
const AdditionalResources = lazy(() => import('../components/not-found/additional-resources'));

// Performance optimized 404 page that loads quickly
export default function NotFound() {
  // Report 404 errors to analytics (if implemented)
  const reportNotFoundPage = () => {
    // Capture the URL that wasn't found
    const missingUrl = window.location.pathname;
    
    // Log to console in development
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[404] Page not found: ${missingUrl}`);
    }
    
    // Could send to analytics in production
    // analyticsService.trackEvent('404_error', { url: missingUrl });
  };
  
  // Call this function once when component mounts
  useEffect(() => {
    reportNotFoundPage();
    
    // Update document title directly for faster perceived performance
    document.title = "Page Not Found | Pearson Specter Law Firm";
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Page Not Found | Pearson Specter Law Firm</title>
        <meta name="description" content="The page you are looking for could not be found. Return to the Pearson Specter Law Firm homepage." />
        <meta name="robots" content="noindex, follow" />
        
        {/* Additional SEO metadata */}
        <link rel="canonical" href="https://pearsonspecter.law/404" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Page Not Found | Pearson Specter Law Firm" />
        <meta property="og:description" content="The page you are looking for could not be found. Return to our homepage." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pearsonspecter.law/404" />
        
        {/* Structured data to help search engines understand the page */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Page Not Found",
            "description": "The page you are looking for could not be found.",
            "publisher": {
              "@type": "Organization",
              "name": "Pearson Specter Law Firm",
              "logo": {
                "@type": "ImageObject",
                "url": "https://pearsonspecter.law/logo.svg"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://pearsonspecter.law/404"
            },
            "isPartOf": {
              "@type": "WebSite",
              "url": "https://pearsonspecter.law/",
              "name": "Pearson Specter Law Firm"
            }
          }
        `}</script>
      </Helmet>
      
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
        {/* Main 404 card - optimized for fast initial load */}
        <Card className="w-full max-w-md border-t-4 border-navy-800 transform-gpu">
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <AlertCircle className="h-8 w-8 text-red-500" aria-hidden="true" />
              </div>
              <h1 className="text-4xl font-bold text-navy-900" aria-label="Error code 404">404</h1>
              <div className="suits-divider mx-auto" role="presentation"></div>
              <h2 className="mt-4 text-xl font-semibold text-navy-800">Page Not Found</h2>
            </div>

            <p className="mt-4 text-gray-600 text-center">
              We're sorry, the page you are looking for could not be found. 
              Please check the URL or return to our homepage.
            </p>
            
            <div className="mt-6 flex justify-center">
              <Link href="/">
                <a className="suits-button inline-block" aria-label="Return to home page">
                  Return to Home
                </a>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Helpful links section - wrapped in Suspense for progressive loading */}
        <Suspense fallback={<div className="h-24 mt-8" />}>
          <div className="mt-8 text-center content-block">
            <h3 className="text-lg font-medium text-navy-800 mb-4">You might be looking for:</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/#practice-areas">
                <a className="text-navy-700 hover:text-navy-500 underline transform-gpu transition-colors" aria-label="View our practice areas">
                  Practice Areas
                </a>
              </Link>
              <Link href="/#attorneys">
                <a className="text-navy-700 hover:text-navy-500 underline transform-gpu transition-colors" aria-label="Meet our attorneys">
                  Our Attorneys
                </a>
              </Link>
              <Link href="/#contact">
                <a className="text-navy-700 hover:text-navy-500 underline transform-gpu transition-colors" aria-label="Contact our law firm">
                  Contact Us
                </a>
              </Link>
              <Link href="/#testimonials">
                <a className="text-navy-700 hover:text-navy-500 underline transform-gpu transition-colors" aria-label="Read testimonials">
                  Client Success Stories
                </a>
              </Link>
            </div>
          </div>
        </Suspense>

        {/* Search box for finding content - lazy loaded for better performance */}
        <Suspense fallback={<div className="h-16 mt-8" />}>
          <AdditionalResources />
        </Suspense>
      </div>
    </>
  );
}
