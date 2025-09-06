
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Briefcase, MapPin, Clock, Users, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";

const statusColors = {
  active: "bg-green-100 text-green-800",
  paused: "bg-yellow-100 text-yellow-800", 
  completed: "bg-blue-100 text-blue-800"
};

const priorityColors = {
  urgent: "bg-red-100 text-red-800",
  normal: "bg-gray-100 text-gray-800",
  low: "bg-blue-100 text-blue-800"
};

export default function RecentSearches({ jobRequirements, isLoading }) {
  if (isLoading) {
    return (
      <Card className="neu-card border-none">
        <CardHeader>
          <CardTitle className="text-black">Recent Job Searches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="neu-inset p-4 rounded-xl animate-pulse">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="neu-card border-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black">
          <Briefcase className="w-5 h-5" />
          Recent Job Searches
        </CardTitle>
      </CardHeader>
      <CardContent>
        {jobRequirements.length > 0 ? (
          <div className="space-y-4">
            {jobRequirements.slice(0, 5).map((job) => (
              <div key={job.id} className="neu-inset p-4 rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-black">{job.job_title}</h3>
                    <p className="text-sm text-gray-700">{job.company_name}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={statusColors[job.status] || statusColors.normal}>
                      {job.status}
                    </Badge>
                    <Badge className={priorityColors[job.priority] || priorityColors.normal}>
                      {job.priority}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {job.min_experience}-{job.max_experience || '+'} years
                  </div>
                  {job.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {format(new Date(job.created_date), 'MMM d')}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {job.skills?.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills?.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <Link to={createPageUrl(`CandidateResults?jobId=${job.id}`)}>
                    <Button size="sm" variant="ghost" className="neu-button">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-700">No job searches yet</p>
            <Link to={createPageUrl("JobSearch")}>
              <Button className="mt-3 neu-button">Create Your First Search</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
