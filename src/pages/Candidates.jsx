
import React, { useState, useEffect } from "react";
import { CandidateProfile } from "../entities/CandidateProfile";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Search, Users, Star } from "lucide-react";

import CandidateCard from "../components/results/CandidateCard";

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCandidates = async () => {
      setIsLoading(true);
      try {
        const allCandidates = await CandidateProfile.list('-match_score');
        setCandidates(allCandidates);
      } catch (error) {
        console.error('Error loading candidates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCandidates();
  }, []);

  useEffect(() => {
    const filterCandidates = () => {
      if (!searchTerm.trim()) {
        setFilteredCandidates(candidates);
        return;
      }

      const filtered = candidates.filter(candidate =>
        candidate.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.current_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.current_company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      
      setFilteredCandidates(filtered);
    };

    filterCandidates();
  }, [candidates, searchTerm]);

  return (
    <div className="min-h-screen p-6" style={{ background: 'var(--neu-bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">All Candidates</h1>
          <p className="text-gray-700">Browse and manage your candidate database</p>
        </div>

        <Card className="neu-card border-none mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search candidates by name, title, company, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="neu-input pl-10 py-3"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-700" />
              <span className="font-medium text-black">{filteredCandidates.length} candidates</span>
            </div>
            {candidates.length > 0 && (
              <Badge variant="secondary" className="neu-inset">
                <Star className="w-3 h-3 mr-1" />
                Avg Match: {Math.round(candidates.reduce((sum, c) => sum + (c.match_score || 0), 0) / candidates.length)}%
              </Badge>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-700">Loading candidates...</p>
          </div>
        ) : filteredCandidates.length > 0 ? (
          <div className="space-y-6">
            {filteredCandidates.map((candidate, index) => (
              <CandidateCard 
                key={candidate.id}
                candidate={candidate}
                showActions={true}
              />
            ))}
          </div>
        ) : (
          <Card className="neu-card border-none text-center py-12">
            <CardContent>
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">
                {searchTerm ? 'No matching candidates' : 'No candidates found'}
              </h3>
              <p className="text-gray-700">
                {searchTerm 
                  ? 'Try adjusting your search terms'
                  : 'Start a new search to discover candidates'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
