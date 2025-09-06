
import React, { useState } from "react";
import { JobRequirement } from "../entities/JobRequirement";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { AlertCircle, Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";

import JobRequirementsForm from "../components/search/JobRequirementsForm";
import SearchProgress from "../components/search/SearchProgress";

export default function JobSearch() {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [searchStage, setSearchStage] = useState('');

  const handleSearch = async (formData) => {
    setIsSearching(true);
    setSearchProgress(0);
    
    try {
      // Save job requirement
      setSearchStage('Saving job requirements...');
      setSearchProgress(20);
      
      const savedJob = await JobRequirement.create(formData);
      
      // Simulate candidate search process
      setSearchStage('Searching LinkedIn profiles...');
      setSearchProgress(40);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSearchStage('Scanning Naukri.com database...');
      setSearchProgress(60);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSearchStage('Analyzing candidate matches...');
      setSearchProgress(80);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSearchStage('Ranking candidates by relevance...');
      setSearchProgress(95);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSearchProgress(100);
      setSearchStage('Search completed!');
      
      // Navigate to results
      setTimeout(() => {
        navigate(createPageUrl(`CandidateResults?jobId=${savedJob.id}`));
      }, 1000);
      
    } catch (error) {
      console.error('Search error:', error);
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ background: 'var(--neu-bg)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Find Your Ideal Candidates</h1>
          <p className="text-gray-700">Define your requirements and let AI discover the perfect matches</p>
        </div>

        <Alert className="neu-inset mb-6 border-none">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-gray-800">
            <strong>Platform Integration Notice:</strong> This demo simulates candidate sourcing from LinkedIn, Naukri.com, and other job portals. 
            In production, this would require API integrations or compliant data acquisition methods.
          </AlertDescription>
        </Alert>

        {!isSearching ? (
          <Card className="neu-card border-none">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 neu-card rounded-full mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-black">AI-Powered Candidate Search</CardTitle>
              <p className="text-gray-700 mt-2">Enter your job requirements to discover top talent</p>
            </CardHeader>
            <CardContent>
              <JobRequirementsForm onSubmit={handleSearch} />
            </CardContent>
          </Card>
        ) : (
          <Card className="neu-card border-none">
            <CardContent className="pt-8">
              <SearchProgress 
                progress={searchProgress}
                stage={searchStage}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
