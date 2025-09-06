// Mock CandidateProfile entity for demo purposes
class CandidateProfile {
  constructor(data = {}) {
    this.id = data.id || Date.now().toString();
    this.full_name = data.full_name || '';
    this.email = data.email || '';
    this.phone = data.phone || '';
    this.current_title = data.current_title || '';
    this.current_company = data.current_company || '';
    this.experience_years = data.experience_years || 0;
    this.location = data.location || '';
    this.education = data.education || '';
    this.skills = data.skills || [];
    this.soft_skills = data.soft_skills || [];
    this.linkedin_url = data.linkedin_url || '';
    this.naukri_url = data.naukri_url || '';
    this.portfolio_url = data.portfolio_url || '';
    this.match_score = data.match_score || 0;
    this.source_platform = data.source_platform || 'linkedin';
    this.job_requirement_id = data.job_requirement_id || '';
    this.created_date = data.created_date || new Date().toISOString();
  }

  static async create(data) {
    const candidate = new CandidateProfile(data);
    
    // Get existing candidates from localStorage
    const existing = JSON.parse(localStorage.getItem('candidates') || '[]');
    existing.push(candidate);
    localStorage.setItem('candidates', JSON.stringify(existing));
    
    return candidate;
  }

  static async list(sortBy = '-created_date', limit = null) {
    const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    
    // Sort candidates
    const sortField = sortBy.startsWith('-') ? sortBy.slice(1) : sortBy;
    const isDescending = sortBy.startsWith('-');
    
    const sorted = candidates.sort((a, b) => {
      let aVal = a[sortField] || 0;
      let bVal = b[sortField] || 0;
      
      if (typeof aVal === 'string') {
        return isDescending ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
      }
      
      return isDescending ? bVal - aVal : aVal - bVal;
    });
    
    return limit ? sorted.slice(0, limit) : sorted;
  }

  static async findById(id) {
    const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    return candidates.find(c => c.id === id) || null;
  }

  static async update(id, data) {
    const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    const index = candidates.findIndex(c => c.id === id);
    
    if (index !== -1) {
      candidates[index] = { ...candidates[index], ...data };
      localStorage.setItem('candidates', JSON.stringify(candidates));
      return candidates[index];
    }
    
    return null;
  }

  static async delete(id) {
    const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    const filtered = candidates.filter(c => c.id !== id);
    localStorage.setItem('candidates', JSON.stringify(filtered));
    return true;
  }
}

export { CandidateProfile };
