import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Star, MapPin, Briefcase, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const platformColors = {
  linkedin: "bg-blue-100 text-blue-800",
  naukri: "bg-purple-100 text-purple-800", 
  indeed: "bg-green-100 text-green-800",
  shine: "bg-orange-100 text-orange-800",
  monster: "bg-red-100 text-red-800"
};

export default function TopCandidates({ candidates, isLoading }) {
  if (isLoading) {
    return (
      <Card className="neu-card border-none">
        <CardHeader>
          <CardTitle className="text-black">Top Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="neu-inset p-4 rounded-xl animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const topCandidates = candidates
    .filter(c => c.match_score && c.match_score > 80)
    .sort((a, b) => (b.match_score || 0) - (a.match_score || 0))
    .slice(0, 5);

  return (
    <Card className="neu-card border-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black">
          <Star className="w-5 h-5" />
          Top Candidates (80%+ Match)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {topCandidates.length > 0 ? (
          <div className="space-y-4">
            {topCandidates.map((candidate) => (
              <div key={candidate.id} className="neu-inset p-4 rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 neu-card rounded-full flex items-center justify-center">
                      <span className="font-bold text-blue-600">
                        {candidate.full_name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">{candidate.full_name}</h3>
                      <p className="text-sm text-gray-700">{candidate.current_title}</p>
                      <p className="text-sm text-gray-600">{candidate.current_company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800 mb-2">
                      <Star className="w-3 h-3 mr-1" />
                      {candidate.match_score}% Match
                    </Badge>
                    {candidate.source_platform && (
                      <Badge className={platformColors[candidate.source_platform] || "bg-gray-100 text-gray-800"}>
                        {candidate.source_platform}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {candidate.experience_years} years exp
                  </div>
                  {candidate.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {candidate.location}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills?.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {candidate.skills?.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{candidate.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {candidate.linkedin_url && (
                      <a href={candidate.linkedin_url} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="ghost" className="neu-button">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-700">No high-match candidates yet</p>
            <p className="text-sm text-gray-600">Start searching to find top talent</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}