import React, { useState, useEffect } from "react";
import { JobRequirement, CandidateProfile } from "../entities/all";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Search, Users, Target, TrendingUp, Briefcase, Clock, CheckCircle, AlertCircle } from "lucide-react";

import StatsOverview from "../components/dashboard/StatsOverview";
import RecentSearches from "../components/dashboard/RecentSearches";
import TopCandidates from "../components/dashboard/TopCandidates";
import ActivityFeed from "../components/dashboard/ActivityFeed";

export default function Dashboard() {
  const [jobRequirements, setJobRequirements] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [jobReqs, candidateProfiles] = await Promise.all([
        JobRequirement.list('-created_date', 10),
        CandidateProfile.list('-match_score', 10)
      ]);
      setJobRequirements(jobReqs);
      setCandidates(candidateProfiles);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = {
    totalJobs: jobRequirements.length,
    totalCandidates: candidates.length,
    avgMatchScore: candidates.length > 0 
      ? Math.round(candidates.reduce((sum, c) => sum + (c.match_score || 0), 0) / candidates.length)
      : 0,
    activeSearches: jobRequirements.filter(j => j.status === 'active').length
  };

  return (
    <div className="p-6 space-y-8" style={{ background: 'var(--neu-bg)', minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Talent Dashboard</h1>
            <p className="text-gray-600">AI-powered candidate discovery and recruitment analytics</p>
          </div>
          <Link to={createPageUrl("JobSearch")}>
            <Button className="neu-button bg-blue-600 text-white hover:bg-blue-700 px-6 py-3">
              <Search className="w-5 h-5 mr-2" />
              New Candidate Search
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsOverview
            title="Total Job Postings"
            value={stats.totalJobs}
            icon={Briefcase}
            change="+12%"
            color="blue"
          />
          <StatsOverview
            title="Candidates Found"
            value={stats.totalCandidates}
            icon={Users}
            change="+8%"
            color="green"
          />
          <StatsOverview
            title="Avg Match Score"
            value={`${stats.avgMatchScore}%`}
            icon={Target}
            change="+5%"
            color="purple"
          />
          <StatsOverview
            title="Active Searches"
            value={stats.activeSearches}
            icon={TrendingUp}
            change="+3%"
            color="orange"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <RecentSearches 
              jobRequirements={jobRequirements}
              isLoading={isLoading}
            />
            <TopCandidates 
              candidates={candidates}
              isLoading={isLoading}
            />
          </div>
          
          <div className="space-y-6">
            <ActivityFeed 
              jobRequirements={jobRequirements}
              candidates={candidates}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}