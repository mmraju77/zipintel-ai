import React from 'react';

interface SEOProps {
  country: string;
  zip: string;
  bankName: string;
  routingLabel: string;
  routingValue: string;
}

export const SEOAutomation: React.FC<SEOProps> = ({ country, zip, bankName, routingLabel, routingValue }) => {
  // Dynamic Google Financial Schema Generator
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": `${country.toUpperCase()} Postal Node ${zip} Financial Clearing Structure`,
    "description": `Automated operational routing matrix for code ${zip} linked with ${bankName}.`,
    "provider": {
      "@type": "FinancialService",
      "name": "ZipIntel AI Engine",
      "url": "https://www.zipintel-ai.com"
    },
    "category": "Financial Routing Data",
    "identifier": `${country}-${zip}-${routingValue}`
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schemaJson)}
    </script>
  );
};
