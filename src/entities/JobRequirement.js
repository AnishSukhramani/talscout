// Mock JobRequirement entity for demo purposes
class JobRequirement {
  constructor(data = {}) {
    this.id = data.id || Date.now().toString();
    this.job_title = data.job_title || '';
    this.company_name = data.company_name || '';
    this.min_experience = data.min_experience || 0;
    this.max_experience = data.max_experience || 0;
    this.education_level = data.education_level || 'bachelors';
    this.skills = data.skills || [];
    this.soft_skills = data.soft_skills || [];
    this.location = data.location || '';
    this.remote_work = data.remote_work || false;
    this.salary_min = data.salary_min || 0;
    this.salary_max = data.salary_max || 0;
    this.priority = data.priority || 'normal';
    this.status = data.status || 'active';
    this.created_date = data.created_date || new Date().toISOString();
  }

  static async create(data) {
    const job = new JobRequirement(data);
    
    // Get existing jobs from localStorage
    const existing = JSON.parse(localStorage.getItem('jobRequirements') || '[]');
    existing.push(job);
    localStorage.setItem('jobRequirements', JSON.stringify(existing));
    
    return job;
  }

  static async list(sortBy = '-created_date', limit = null) {
    const jobs = JSON.parse(localStorage.getItem('jobRequirements') || '[]');
    
    // Sort jobs
    const sortField = sortBy.startsWith('-') ? sortBy.slice(1) : sortBy;
    const isDescending = sortBy.startsWith('-');
    
    const sorted = jobs.sort((a, b) => {
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
    const jobs = JSON.parse(localStorage.getItem('jobRequirements') || '[]');
    return jobs.find(j => j.id === id) || null;
  }

  static async update(id, data) {
    const jobs = JSON.parse(localStorage.getItem('jobRequirements') || '[]');
    const index = jobs.findIndex(j => j.id === id);
    
    if (index !== -1) {
      jobs[index] = { ...jobs[index], ...data };
      localStorage.setItem('jobRequirements', JSON.stringify(jobs));
      return jobs[index];
    }
    
    return null;
  }

  static async delete(id) {
    const jobs = JSON.parse(localStorage.getItem('jobRequirements') || '[]');
    const filtered = jobs.filter(j => j.id !== id);
    localStorage.setItem('jobRequirements', JSON.stringify(filtered));
    return true;
  }
}

export { JobRequirement };
