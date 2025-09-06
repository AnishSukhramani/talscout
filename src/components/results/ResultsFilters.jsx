import React from 'react';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { X, Plus } from "lucide-react";

export default function ResultsFilters({ 
  filters, 
  onFiltersChange, 
  sortBy, 
  onSortChange 
}) {
  const [skillInput, setSkillInput] = React.useState('');

  const handleFilterChange = (field, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkillFilter = () => {
    if (skillInput && !filters.skills.includes(skillInput)) {
      handleFilterChange('skills', [...filters.skills, skillInput]);
      setSkillInput('');
    }
  };

  const removeSkillFilter = (skillToRemove) => {
    handleFilterChange('skills', filters.skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-semibold">Sort By</Label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="neu-input mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="match_score">Match Score (High to Low)</SelectItem>
            <SelectItem value="experience">Experience (High to Low)</SelectItem>
            <SelectItem value="name">Name (A to Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-semibold">Minimum Match Score</Label>
        <div className="mt-2 px-2">
          <Slider
            value={[filters.minScore]}
            onValueChange={(value) => handleFilterChange('minScore', value[0])}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span className="font-medium">{filters.minScore}%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold">Experience Range</Label>
        <Select value={filters.experience} onValueChange={(value) => handleFilterChange('experience', value)}>
          <SelectTrigger className="neu-input mt-2">
            <SelectValue placeholder="Any experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>Any experience</SelectItem>
            <SelectItem value="0-2">0-2 years</SelectItem>
            <SelectItem value="3-5">3-5 years</SelectItem>
            <SelectItem value="6-10">6-10 years</SelectItem>
            <SelectItem value="10">10+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-semibold">Location</Label>
        <Input
          className="neu-input mt-2"
          placeholder="Filter by location..."
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        />
      </div>

      <div>
        <Label className="text-sm font-semibold">Skills</Label>
        <div className="flex gap-2 mt-2">
          <Input
            className="neu-input flex-1"
            placeholder="Add skill filter..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSkillFilter();
              }
            }}
          />
          <Button
            type="button"
            onClick={addSkillFilter}
            className="neu-button"
            disabled={!skillInput.trim()}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        {filters.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {filters.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="neu-inset">
                {skill}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkillFilter(skill)}
                  className="ml-1 h-auto p-0 hover:bg-transparent"
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Button
        onClick={() => onFiltersChange({
          minScore: 0,
          experience: '',
          location: '',
          skills: []
        })}
        variant="outline"
        className="w-full neu-button"
      >
        Clear All Filters
      </Button>
    </div>
  );
}