
import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { X, Plus, Sparkles } from "lucide-react";

const skillSuggestions = [
  "JavaScript", "Python", "Java", "React", "Node.js", "Angular", "PHP", "C++", "SQL", "MongoDB",
  "AWS", "Docker", "Kubernetes", "Git", "Agile", "Scrum", "Machine Learning", "Data Science",
  "DevOps", "Cloud Computing", "UI/UX Design", "Product Management"
];

const softSkillSuggestions = [
  "Leadership", "Communication", "Team Management", "Problem Solving", "Critical Thinking",
  "Adaptability", "Time Management", "Collaboration", "Creativity", "Negotiation"
];

const indianCities = [
  "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai", "Kolkata", "Gurgaon",
  "Noida", "Ahmedabad", "Kochi", "Indore", "Jaipur", "Chandigarh", "Coimbatore"
];

export default function JobRequirementsForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    job_title: '',
    company_name: '',
    min_experience: 0,
    max_experience: 10,
    education_level: 'bachelors',
    skills: [],
    soft_skills: [],
    location: '',
    remote_work: false,
    salary_min: 0,
    salary_max: 0,
    priority: 'normal'
  });

  const [skillInput, setSkillInput] = useState('');
  const [softSkillInput, setSoftSkillInput] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = (skill, type = 'skills') => {
    if (skill && !formData[type].includes(skill)) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], skill]
      }));
      if (type === 'skills') setSkillInput('');
      else setSoftSkillInput('');
    }
  };

  const removeSkill = (skillToRemove, type = 'skills') => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card className="neu-inset border-none">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-black">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Job Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="job_title" className="text-black">Job Title *</Label>
              <Input
                id="job_title"
                className="neu-input"
                value={formData.job_title}
                onChange={(e) => handleInputChange('job_title', e.target.value)}
                placeholder="e.g., Senior Software Engineer"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company_name" className="text-black">Company Name</Label>
              <Input
                id="company_name"
                className="neu-input"
                value={formData.company_name}
                onChange={(e) => handleInputChange('company_name', e.target.value)}
                placeholder="e.g., Tech Solutions Pvt Ltd"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="min_experience" className="text-black">Min Experience (years) *</Label>
              <Input
                id="min_experience"
                type="number"
                min="0"
                className="neu-input"
                value={formData.min_experience}
                onChange={(e) => handleInputChange('min_experience', parseInt(e.target.value) || 0)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="max_experience" className="text-black">Max Experience (years)</Label>
              <Input
                id="max_experience"
                type="number"
                min="0"
                className="neu-input"
                value={formData.max_experience}
                onChange={(e) => handleInputChange('max_experience', parseInt(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="education_level" className="text-black">Education Level</Label>
              <Select value={formData.education_level} onValueChange={(value) => handleInputChange('education_level', value)}>
                <SelectTrigger className="neu-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                  <SelectItem value="masters">Master's Degree</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                  <SelectItem value="certification">Certification</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card className="neu-inset border-none">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4 text-black">Required Skills</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="skills" className="text-black">Technical Skills *</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  className="neu-input"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add a skill..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(skillInput);
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => addSkill(skillInput)}
                  className="neu-button"
                  disabled={!skillInput.trim()}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="neu-inset">
                    {skill}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 h-auto p-0 hover:bg-transparent"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              
              <div className="mt-3">
                <p className="text-sm text-black mb-2">Suggested skills:</p>
                <div className="flex flex-wrap gap-2">
                  {skillSuggestions.slice(0, 8).map((skill) => (
                    <Button
                      key={skill}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addSkill(skill)}
                      className="neu-button text-xs"
                      disabled={formData.skills.includes(skill)}
                    >
                      {skill}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="soft_skills" className="text-black">Soft Skills</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  className="neu-input"
                  value={softSkillInput}
                  onChange={(e) => setSoftSkillInput(e.target.value)}
                  placeholder="Add a soft skill..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(softSkillInput, 'soft_skills');
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => addSkill(softSkillInput, 'soft_skills')}
                  className="neu-button"
                  disabled={!softSkillInput.trim()}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.soft_skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="neu-inset">
                    {skill}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(skill, 'soft_skills')}
                      className="ml-1 h-auto p-0 hover:bg-transparent"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              
              <div className="mt-3">
                <div className="flex flex-wrap gap-2">
                  {softSkillSuggestions.slice(0, 6).map((skill) => (
                    <Button
                      key={skill}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addSkill(skill, 'soft_skills')}
                      className="neu-button text-xs"
                      disabled={formData.soft_skills.includes(skill)}
                    >
                      {skill}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location & Preferences */}
      <Card className="neu-inset border-none">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4 text-black">Location & Preferences</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-black">Preferred Location</Label>
              <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                <SelectTrigger className="neu-input">
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  {indianCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-black">Search Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger className="neu-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        className="w-full neu-button bg-blue-600 text-white hover:bg-blue-700 py-3 text-lg"
        disabled={!formData.job_title || formData.skills.length === 0}
      >
        <Sparkles className="w-5 h-5 mr-2" />
        Start AI-Powered Candidate Search
      </Button>
    </form>
  );
}
