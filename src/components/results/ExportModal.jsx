import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Download, FileText, Table, Users } from "lucide-react";
import { format } from "date-fns";

const exportFields = [
  { id: 'full_name', label: 'Full Name', default: true },
  { id: 'current_title', label: 'Current Title', default: true },
  { id: 'current_company', label: 'Current Company', default: true },
  { id: 'experience_years', label: 'Experience', default: true },
  { id: 'match_score', label: 'Match Score', default: true },
  { id: 'location', label: 'Location', default: true },
  { id: 'education', label: 'Education', default: false },
  { id: 'skills', label: 'Skills', default: false },
  { id: 'soft_skills', label: 'Soft Skills', default: false },
  { id: 'source_platform', label: 'Source Platform', default: false },
  { id: 'linkedin_url', label: 'LinkedIn URL', default: false },
  { id: 'naukri_url', label: 'Naukri URL', default: false },
  { id: 'email', label: 'Email', default: false },
  { id: 'phone', label: 'Phone', default: false }
];

export default function ExportModal({ isOpen, onClose, candidates }) {
  const [selectedFields, setSelectedFields] = useState(
    exportFields.filter(field => field.default).map(field => field.id)
  );
  const [exportFormat, setExportFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);

  const handleFieldToggle = (fieldId) => {
    setSelectedFields(prev =>
      prev.includes(fieldId)
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const exportToCsv = (data, fields) => {
    const headers = fields.map(fieldId => {
      const field = exportFields.find(f => f.id === fieldId);
      return field ? field.label : fieldId;
    });

    const rows = data.map(candidate => {
      return fields.map(fieldId => {
        let value = candidate[fieldId];
        if (Array.isArray(value)) {
          value = value.join(', ');
        }
        return JSON.stringify(value || '');
      });
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    return csvContent;
  };

  const handleExport = async () => {
    if (selectedFields.length === 0) return;
    
    setIsExporting(true);
    
    try {
      const csvContent = exportToCsv(candidates, selectedFields);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `candidates_export_${format(new Date(), 'yyyy-MM-dd')}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      onClose();
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="neu-card border-none max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Candidates
          </DialogTitle>
          <DialogDescription>
            Export {candidates.length} candidates to CSV format
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <Label className="text-sm font-semibold mb-3 block">Select Fields to Export</Label>
            <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
              {exportFields.map((field) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={field.id}
                    checked={selectedFields.includes(field.id)}
                    onCheckedChange={() => handleFieldToggle(field.id)}
                  />
                  <Label htmlFor={field.id} className="text-sm cursor-pointer">
                    {field.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>{candidates.length} candidates</span>
              <span>•</span>
              <span>{selectedFields.length} fields selected</span>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="neu-button">
                Cancel
              </Button>
              <Button
                onClick={handleExport}
                disabled={selectedFields.length === 0 || isExporting}
                className="neu-button bg-blue-600 text-white hover:bg-blue-700"
              >
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Export CSV
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}