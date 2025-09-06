// Utility function to create page URLs for routing
export function createPageUrl(pageName, params = '') {
  const routes = {
    'Dashboard': '/dashboard',
    'JobSearch': '/job-search',
    'Candidates': '/candidates',
    'CandidateResults': '/candidate-results'
  };
  
  const baseUrl = routes[pageName] || '/dashboard';
  return params ? `${baseUrl}${params}` : baseUrl;
}

// Utility function for combining CSS classes (similar to clsx)
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
