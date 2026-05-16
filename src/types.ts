export interface Region {
  id: string;
  name: string;
  subRegions?: Region[];
  type: string;
  postalCode?: string;
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
];
