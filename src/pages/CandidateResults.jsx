
import React, { useState, useEffect } from "react";
import { CandidateProfile, JobRequirement } from "../entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Download, Filter, SortDesc, Users, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";

import CandidateCard from "../components/results/CandidateCard";
import ResultsFilters from "../components/results/ResultsFilters";
import ExportModal from "../components/results/ExportModal";

export default function CandidateResults() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [jobRequirement, setJobRequirement] = useState(null);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    minScore: 0,
    experience: '',
    location: '',
    skills: []
  });
  const [showExportModal, setShowExportModal] = useState(false);
  const [sortBy, setSortBy] = useState('match_score');

  useEffect(() => {
    const loadCandidates = async () => {
      setIsLoading(true);
      try {
        // In a real app, we'd get jobId from URL params
        // For demo, we'll generate mock candidates
        await generateMockCandidates();
      } catch (error) {
        console.error('Error loading candidates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const generateMockCandidates = async () => {
      const mockCandidates = [
        {
          full_name: "Priya Sharma",
          current_title: "Senior Software Engineer",
          current_company: "Tech Mahindra",
          experience_years: 6,
          location: "Bangalore, India",
          skills: ["React", "Node.js", "Python", "AWS", "MongoDB"],
          match_score: 92,
          source_platform: "linkedin",
          linkedin_url: "https://linkedin.com/in/priya-sharma",
          education: "B.Tech Computer Science"
        },
        {
          full_name: "Rohit Patel",
          current_title: "Full Stack Developer",
          current_company: "Infosys",
          experience_years: 4,
          location: "Pune, India",
          skills: ["JavaScript", "React", "Express", "PostgreSQL", "Docker"],
          match_score: 87,
          source_platform: "naukri",
          naukri_url: "https://naukri.com/profile/rohit-patel",
          education: "MCA"
        },
        {
          full_name: "Anita Reddy",
          current_title: "DevOps Engineer",
          current_company: "Wipro",
          experience_years: 5,
          location: "Hyderabad, India",
          skills: ["Kubernetes", "Jenkins", "AWS", "Terraform", "Python"],
          match_score: 84,
          source_platform: "linkedin",
          linkedin_url: "https://linkedin.com/in/anita-reddy",
          education: "B.E. Information Technology"
        },
        {
          full_name: "Vikash Kumar",
          current_title: "Backend Developer",
          current_company: "TCS",
          experience_years: 3,
          location: "Chennai, India",
          skills: ["Java", "Spring Boot", "MySQL", "Redis", "Microservices"],
          match_score: 79,
          source_platform: "indeed",
          linkedin_url: "https://linkedin.com/in/vikash-kumar",
          education: "B.Tech Software Engineering"
        }
      ];

      // Create candidate profiles in database
      for (const candidate of mockCandidates) {
        await CandidateProfile.create(candidate);
      }
      
      const savedCandidates = await CandidateProfile.list('-match_score');
      setCandidates(savedCandidates);
    };

    loadCandidates();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...candidates];

      if (filters.minScore > 0) {
        filtered = filtered.filter(c => (c.match_score || 0) >= filters.minScore);
      }

      if (filters.experience) {
        const [min, max] = filters.experience.split('-').map(Number);
        filtered = filtered.filter(c => {
          const exp = c.experience_years || 0;
          return max ? (exp >= min && exp <= max) : exp >= min;
        });
      }

      if (filters.location) {
        filtered = filtered.filter(c => 
          c.location?.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.skills.length > 0) {
        filtered = filtered.filter(c => 
          filters.skills.some(skill => 
            c.skills?.some(candidateSkill => 
              candidateSkill.toLowerCase().includes(skill.toLowerCase())
            )
          )
        );
      }

      // Sort
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'match_score':
            return (b.match_score || 0) - (a.match_score || 0);
          case 'experience':
            return (b.experience_years || 0) - (a.experience_years || 0);
          case 'name':
            return a.full_name.localeCompare(b.full_name);
          default:
            return 0;
        }
      });

      setFilteredCandidates(filtered);
    };

    applyFilters();
  }, [candidates, filters, sortBy]);

  return (
    <div className="min-h-screen p-6" style={{ background: 'var(--neu-bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(createPageUrl("Dashboard"))}
            className="neu-button mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">Candidate Results</h1>
              <div className="flex items-center gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{filteredCandidates.length} candidates found</span>
                </div>
                <Badge variant="secondary" className="neu-inset">
                  AI Matched & Ranked
                </Badge>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowExportModal(true)}
                className="neu-button"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Results
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="neu-card border-none sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Filter className="w-5 h-5" />
                  Filters & Sorting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResultsFilters 
                  filters={filters}
                  onFiltersChange={setFilters}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-700">Loading candidates...</p>
                </div>
              ) : filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate, index) => (
                  <CandidateCard 
                    key={candidate.id || index}
                    candidate={candidate}
                    rank={index + 1}
                  />
                ))
              ) : (
                <Card className="neu-card border-none text-center py-12">
                  <CardContent>
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-black mb-2">No candidates found</h3>
                    <p className="text-gray-700">Try adjusting your filters or search criteria</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        candidates={filteredCandidates}
      />
    </div>
  );
}
