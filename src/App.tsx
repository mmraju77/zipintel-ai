import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import CountryPage from './pages/CountryPage';

// Placeholder for AI Tools
const AITools = () => (
  <div className="py-12 text-center space-y-4">
    <h1 className="text-4xl font-bold gold-gradient-text italic">AI-Driven Intelligence Tools</h1>
    <p className="text-slate-400">Coming soon: Address Normalization, Utility Predictions, and Geo-Enrichment API.</p>
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:countryId" element={<CountryPage />} />
            <Route path="/ai-tools" element={<AITools />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}
