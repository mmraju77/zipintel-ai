import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { I18nProvider } from './lib/i18n';
import Layout from './components/Layout';
import Home from './pages/Home';
import CountryPage from './pages/CountryPage';
import AITools from './pages/AIToolsPage';

export default function App() {
  return (
    <HelmetProvider>
      <I18nProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/:countryId" element={<CountryPage />} />
              <Route path="/:countryId/:l1" element={<CountryPage />} />
              <Route path="/:countryId/:l1/:l2" element={<CountryPage />} />
              <Route path="/:countryId/:l1/:l2/:l3" element={<CountryPage />} />
              <Route path="/ai-tools" element={<AITools />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </I18nProvider>
    </HelmetProvider>
  );
}
