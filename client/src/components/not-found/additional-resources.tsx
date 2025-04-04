import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "wouter";

// Practice areas for search suggestions
const PRACTICE_AREAS = [
  "Corporate Law",
  "Mergers & Acquisitions",
  "Personal Injury",
  "Family Law",
  "Estate Planning",
  "Elder Law",
  "Business Litigation",
  "Contract Disputes"
];

// Popular searches for the firm
const POPULAR_SEARCHES = [
  "personal injury settlement",
  "divorce filing",
  "corporate merger",
  "will and testament",
  "power of attorney"
];

export default function AdditionalResources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // Handle input change and provide suggestions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 2) {
      // Filter practice areas that match search term
      const matchedSuggestions = PRACTICE_AREAS.filter(area => 
        area.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 3); // Limit to 3 suggestions for better UX
      
      setSuggestions(matchedSuggestions);
    } else {
      setSuggestions([]);
    }
  };
  
  // Submit the search - in a real app, would redirect to search results
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If no search term, don't do anything
    if (!searchTerm.trim()) return;
    
    // In a real implementation, this would navigate to search results
    // Instead, we'll just direct them to the home page
    window.location.href = "/#search=" + encodeURIComponent(searchTerm);
  };
  
  return (
    <Card className="mt-8 w-full max-w-md transform-gpu">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium text-navy-800 mb-4">Search our site</h3>
        
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Try 'personal injury' or 'estate planning'"
              value={searchTerm}
              onChange={handleInputChange}
              className="pr-10"
              aria-label="Search for legal services or information"
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute right-0 top-0 h-full"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Show search suggestions */}
          {suggestions.length > 0 && (
            <div className="bg-white border rounded-md shadow-sm p-2">
              <ul className="space-y-1">
                {suggestions.map((suggestion, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm(suggestion);
                        setSuggestions([]);
                      }}
                      className="w-full text-left px-2 py-1 text-sm text-navy-700 hover:bg-gray-100 rounded"
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
        
        {/* Popular searches */}
        <div className="mt-4">
          <p className="text-sm text-gray-600">Popular searches:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {POPULAR_SEARCHES.map((term, i) => (
              <Link key={i} href={`/#search=${encodeURIComponent(term)}`}>
                <a className="inline-block text-xs bg-gray-100 text-navy-600 px-2 py-1 rounded-full hover:bg-navy-100 transition-colors transform-gpu">
                  {term}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}