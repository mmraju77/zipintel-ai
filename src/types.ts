export interface Region {
  id: string;
  name: string;
  subRegions?: Region[];
  type: string;
  postalCode?: string;
}

export interface SearchResult {
  id: string;
  name: string;
  type: string;
  path: string;
  countryName?: string;
  postalCode?: string;
  isLive?: boolean;
}

export interface Country {
  id: string;
  name: string;
  path: string;
  hierarchy: string[]; // e.g. ['State', 'District', 'Mandal', 'Village']
  description: string;
}

export const COUNTRIES: Country[] = [
  { 
    id: 'india', 
    name: 'India', 
    path: '/india', 
    hierarchy: ['State', 'District', 'Mandal', 'Village/Area'],
    description: 'Explore States, Districts, and Mandals'
  },
  { 
    id: 'usa', 
    name: 'USA', 
    path: '/usa', 
    hierarchy: ['State', 'County', 'City/Town', 'ZIP Code'],
    description: 'Browse ZIP Codes and Counties'
  },
  { 
    id: 'uk', 
    name: 'UK', 
    path: '/uk', 
    hierarchy: ['Country', 'Postal Area', 'District', 'Postcode Sector'],
    description: 'Discover Postcode Sectors'
  },
  { 
    id: 'canada', 
    name: 'Canada', 
    path: '/canada', 
    hierarchy: ['Province', 'Census Division', 'City', 'Postal Code'],
    description: 'Lookup Provinces and Postal Codes'
  },
  { 
    id: 'australia', 
    name: 'Australia', 
    path: '/australia', 
    hierarchy: ['State/Territory', 'Region', 'Suburb', 'Postcode'],
    description: 'Search Suburbs and Postcodes'
  },
  { 
    id: 'germany', 
    name: 'Germany', 
    path: '/germany', 
    hierarchy: ['Bundesland', 'Landkreis', 'Stadt', 'PLZ'],
    description: 'Find Bundesländer and PLZ'
  },
  { 
    id: 'uae', 
    name: 'UAE', 
    path: '/uae', 
    hierarchy: ['Emirate', 'Sector', 'Community', 'Postal Code'],
    description: 'Explore Emirates and sectors'
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    path: '/switzerland',
    hierarchy: ['Canton', 'District', 'Municipality', 'Postal Code'],
    description: 'DISCOVER CANTONS AND CLEARING CODES'
  },
  {
    id: 'norway',
    name: 'Norway',
    path: '/norway',
    hierarchy: ['County', 'Municipality', 'District', 'Postal Code'],
    description: 'EXPLORE POSTEN NORGE ZIP CODES'
  },
  {
    id: 'sweden',
    name: 'Sweden',
    path: '/sweden',
    hierarchy: ['County', 'Municipality', 'Area', 'Postal Code'],
    description: 'LOOKUP POSTNORD DISTRIBUTION NODES'
  },
  {
    id: 'denmark',
    name: 'Denmark',
    path: '/denmark',
    hierarchy: ['Region', 'Municipality', 'District', 'Postal Code'],
    description: 'SEARCH REGIONAL POSTAL SECTORS'
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    path: '/netherlands',
    hierarchy: ['Province', 'Municipality', 'City', 'Postal Code'],
    description: 'MAPPING KPN & POSTNL INFRASTRUCTURE'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    path: '/singapore',
    hierarchy: ['Region', 'District', 'Sector', 'Postal Code'],
    description: 'PREMIUM ASIA-PACIFIC FINTECH HUB'
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    path: '/new-zealand',
    hierarchy: ['Region', 'District', 'Suburb', 'Postcode'],
    description: 'TIER-1 EAST-OCEANIA POSTAL NODES'
  },
  {
    id: 'ireland',
    name: 'Ireland',
    path: '/ireland',
    hierarchy: ['County', 'City/Town', 'District', 'Eircode'],
    description: 'EXPLORE TECH HUB EIRCODE METRICS'
  },
  {
    id: 'austria',
    name: 'Austria',
    path: '/austria',
    hierarchy: ['State', 'District', 'Municipality', 'PLZ'],
    description: 'WEST-EUROPEAN HIGH-SPEED LOGISTICS'
  },
  {
    id: 'luxembourg',
    name: 'Luxembourg',
    path: '/luxembourg',
    hierarchy: ['Canton', 'Commune', 'Locality', 'Code Postal'],
    description: 'MAXIMUM CPC FINANCIAL INFRASTRUCTURE'
  },
];
