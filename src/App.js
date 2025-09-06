import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import JobSearch from './pages/JobSearch';
import Candidates from './pages/Candidates';
import CandidateResults from './pages/CandidateResults';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={
          <Layout currentPageName="Dashboard">
            <Dashboard />
          </Layout>
        } />
        <Route path="/job-search" element={
          <Layout currentPageName="JobSearch">
            <JobSearch />
          </Layout>
        } />
        <Route path="/candidates" element={
          <Layout currentPageName="Candidates">
            <Candidates />
          </Layout>
        } />
        <Route path="/candidate-results" element={
          <Layout currentPageName="CandidateResults">
            <CandidateResults />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
