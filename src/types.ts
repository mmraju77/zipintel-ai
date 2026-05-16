export interface Region {
  id: string;
  name: string;
  subRegions?: Region[];
  type: string;
}

export interface Country {
  id: string;
  name: string;
  path: string;
  hierarchy: string[]; // e.g. ['State', 'District', 'Mandal', 'Village']
}

export const COUNTRIES: Country[] = [
  { 
    id: 'india', 
    name: 'India', 
    path: '/india', 
    hierarchy: ['State', 'District', 'Mandal', 'Village/Area'] 
  },
  { 
    id: 'usa', 
    name: 'USA', 
    path: '/usa', 
    hierarchy: ['State', 'County', 'City/Town', 'ZIP Code'] 
  },
  { 
    id: 'uk', 
    name: 'UK', 
    path: '/uk', 
    hierarchy: ['Country', 'Postal Area', 'District', 'Postcode Sector'] 
  },
  { 
    id: 'canada', 
    name: 'Canada', 
    path: '/canada', 
    hierarchy: ['Province', 'Census Division', 'City', 'Postal Code'] 
  },
  { 
    id: 'australia', 
    name: 'Australia', 
    path: '/australia', 
    hierarchy: ['State/Territory', 'Region', 'Suburb', 'Postcode'] 
  },
  { 
    id: 'germany', 
    name: 'Germany', 
    path: '/germany', 
    hierarchy: ['Bundesland', 'Landkreis', 'Stadt', 'PLZ'] 
  },
  { 
    id: 'uae', 
    name: 'UAE', 
    path: '/uae', 
    hierarchy: ['Emirate', 'Sector', 'Community', 'Postal Code'] 
  },
];
