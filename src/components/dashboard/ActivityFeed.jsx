import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Activity, Search, UserPlus, Target, Clock } from "lucide-react";
import { format, differenceInHours, differenceInDays } from "date-fns";

export default function ActivityFeed({ jobRequirements, candidates, isLoading }) {
  if (isLoading) {
    return (
      <Card className="neu-card border-none">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-300 rounded mb-1"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getTimeAgo = (date) => {
    const now = new Date();
    const targetDate = new Date(date);
    const hoursAgo = differenceInHours(now, targetDate);
    const daysAgo = differenceInDays(now, targetDate);
    
    if (hoursAgo < 1) return 'Just now';
    if (hoursAgo < 24) return `${hoursAgo}h ago`;
    return `${daysAgo}d ago`;
  };

  // Create activity items
  const activities = [
    ...jobRequirements.slice(0, 3).map(job => ({
      id: `job-${job.id}`,
      type: 'search',
      icon: Search,
      title: 'New job search created',
      description: `Looking for ${job.job_title} candidates`,
      time: job.created_date,
      badge: job.priority
    })),
    ...candidates.slice(0, 4).map(candidate => ({
      id: `candidate-${candidate.id}`,
      type: 'candidate',
      icon: UserPlus,
      title: 'New candidate found',
      description: `${candidate.full_name} - ${candidate.match_score}% match`,
      time: candidate.created_date,
      badge: candidate.match_score >= 90 ? 'high' : candidate.match_score >= 70 ? 'medium' : 'low'
    }))
  ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 8);

  const getBadgeColor = (type, value) => {
    if (type === 'search') {
      switch (value) {
        case 'urgent': return 'bg-red-100 text-red-800';
        case 'normal': return 'bg-blue-100 text-blue-800';
        case 'low': return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    } else {
      switch (value) {
        case 'high': return 'bg-green-100 text-green-800';
        case 'medium': return 'bg-yellow-100 text-yellow-800';
        case 'low': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
  };

  return (
    <Card className="neu-card border-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="neu-card p-2 rounded-full">
                    <IconComponent className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-800">
                        {activity.title}
                      </p>
                      <Badge className={getBadgeColor(activity.type, activity.badge)}>
                        {activity.type === 'search' ? activity.badge : `${activity.badge} match`}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {getTimeAgo(activity.time)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No recent activity</p>
            <p className="text-sm text-gray-500">Your searches and findings will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}