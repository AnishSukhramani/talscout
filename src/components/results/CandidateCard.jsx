
import React from 'react';
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Star, MapPin, Briefcase, ExternalLink, Mail, Phone, Award } from "lucide-react";

const platformColors = {
  linkedin: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
  naukri: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
  indeed: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
  shine: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" },
  monster: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" }
};

const getMatchScoreColor = (score) => {
  if (score >= 90) return { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" };
  if (score >= 75) return { bg: "yellow-100", text: "text-yellow-800", border: "border-yellow-200" };
  if (score >= 60) return { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" };
  return { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" };
};

export default function CandidateCard({ candidate, rank, showActions = true }) {
  const platformStyle = platformColors[candidate.source_platform] || platformColors.linkedin;
  const matchStyle = getMatchScoreColor(candidate.match_score || 0);

  return (
    <Card className="neu-card border-none overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            {rank && (
              <div className="neu-card w-10 h-10 rounded-full flex items-center justify-center font-bold text-blue-600">
                #{rank}
              </div>
            )}
            <div className="w-16 h-16 neu-card rounded-full flex items-center justify-center">
              <span className="font-bold text-xl text-blue-600">
                {candidate.full_name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-black mb-1">{candidate.full_name}</h3>
              <p className="text-gray-700 font-medium">{candidate.current_title}</p>
              <p className="text-gray-600">{candidate.current_company}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <Badge className={`${matchStyle.bg} ${matchStyle.text} ${matchStyle.border} border`}>
              <Star className="w-3 h-3 mr-1" />
              {candidate.match_score || 0}% Match
            </Badge>
            {candidate.source_platform && (
              <Badge className={`${platformStyle.bg} ${platformStyle.text} ${platformStyle.border} border`}>
                {candidate.source_platform.charAt(0).toUpperCase() + candidate.source_platform.slice(1)}
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Briefcase className="w-4 h-4" />
            <span>{candidate.experience_years || 0} years experience</span>
          </div>
          {candidate.location && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin className="w-4 h-4" />
              <span>{candidate.location}</span>
            </div>
          )}
          {candidate.education && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Award className="w-4 h-4" />
              <span>{candidate.education}</span>
            </div>
          )}
        </div>

        {candidate.skills && candidate.skills.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-black mb-2">Technical Skills</h4>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.slice(0, 8).map((skill) => (
                <Badge key={skill} variant="outline" className="neu-inset text-xs">
                  {skill}
                </Badge>
              ))}
              {candidate.skills.length > 8 && (
                <Badge variant="outline" className="neu-inset text-xs">
                  +{candidate.skills.length - 8} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {showActions && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              {candidate.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>Email available</span>
                </div>
              )}
              {candidate.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>Phone available</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              {candidate.linkedin_url && (
                <a href={candidate.linkedin_url} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="neu-button">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    LinkedIn
                  </Button>
                </a>
              )}
              {candidate.naukri_url && (
                <a href={candidate.naukri_url} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="neu-button">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Naukri
                  </Button>
                </a>
              )}
              {candidate.portfolio_url && (
                <a href={candidate.portfolio_url} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="neu-button">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Portfolio
                  </Button>
                </a>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
