import { Region } from '../types';

export const POSTAL_DATA: Record<string, Region[]> = {
  india: [
    {
      id: 'andhra-pradesh',
      name: 'Andhra Pradesh',
      type: 'State',
      subRegions: [
        {
          id: 'alluri-sitharama-raju',
          name: 'Alluri Sitharama Raju',
          type: 'District',
          subRegions: [
            {
              id: 'hukupeta',
              name: 'Hukupeta',
              type: 'Mandal',
              subRegions: [
                { id: 'hukupeta-village', name: 'Hukupeta Village', type: 'Village/Area', postalCode: '531077' },
                { id: 'paderu-road', name: 'Paderu Road', type: 'Village/Area', postalCode: '531024' },
                { id: 'matsyagundam', name: 'Matsyagundam', type: 'Village/Area', postalCode: '531151' },
              ]
            },
            {
              id: 'paderu',
              name: 'Paderu',
              type: 'Mandal',
              subRegions: [
                { id: 'paderu-town', name: 'Paderu Town', type: 'Village/Area', postalCode: '531024' },
                { id: 'modapalle', name: 'Modapalle', type: 'Village/Area', postalCode: '531025' },
              ]
            }
          ]
        },
        {
          id: 'visakhapatnam',
          name: 'Visakhapatnam',
          type: 'District',
          subRegions: [
            {
              id: 'anandapuram',
              name: 'Anandapuram',
              type: 'Mandal',
              subRegions: [
                { id: 'anandapuram-junction', name: 'Anandapuram Junction', type: 'Village/Area', postalCode: '530052' },
                { id: 'gambheeram', name: 'Gambheeram', type: 'Village/Area', postalCode: '530052' },
              ]
            },
            {
              id: 'gajuwaka',
              name: 'Gajuwaka',
              type: 'Mandal',
              subRegions: [
                { id: 'gajuwaka-main', name: 'Gajuwaka', type: 'Village/Area', postalCode: '530026' },
                { id: 'srinivasa-nagar', name: 'Srinivasa Nagar', type: 'Village/Area', postalCode: '530026' },
              ]
            },
            {
              id: 'ukkunagram',
              name: 'Ukkunagram / Vizag Steelplant',
              type: 'Mandal',
              subRegions: [
                { id: 'steel-plant-sector', name: 'Steelplant Sector 1', type: 'Village/Area', postalCode: '530032' },
                { id: 'ukkunagram-town', name: 'Ukkunagram', type: 'Village/Area', postalCode: '530032' },
              ]
            },
            {
              id: 'madhurawada',
              name: 'Madhurawada',
              type: 'Mandal',
              subRegions: [
                { id: 'car-shed', name: 'Car Shed Junction', type: 'Village/Area', postalCode: '530041' },
                { id: 'pm-palem', name: 'Pothinamallayya Palem', type: 'Village/Area', postalCode: '530041' },
                { id: 'madhurawada-it', name: 'IT SEZ Madhurawada', type: 'Village/Area', postalCode: '530048' },
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'telangana',
      name: 'Telangana',
      type: 'State',
      subRegions: [
        {
          id: 'hyderabad',
          name: 'Hyderabad',
          type: 'District',
          subRegions: [
            {
              id: 'charminar',
              name: 'Charminar',
              type: 'Mandal',
              subRegions: [
                { id: 'charminar-area', name: 'Charminar Area', type: 'Village/Area', postalCode: '500002' },
              ]
            }
          ]
        }
      ]
    }
  ],
  usa: [
    {
      id: 'california',
      name: 'California',
      type: 'State',
      subRegions: [
        {
          id: 'los-angeles',
          name: 'Los Angeles',
          type: 'County',
          subRegions: [
            {
              id: 'beverly-hills',
              name: 'Beverly Hills',
              type: 'City/Town',
              subRegions: [
                { id: 'bh-90210', name: '90210', type: 'ZIP Code', postalCode: '90210' },
                { id: 'bh-90211', name: '90211', type: 'ZIP Code', postalCode: '90211' },
              ]
            }
          ]
        }
      ]
    }
  ],
  uk: [
    {
      id: 'england',
      name: 'England',
      type: 'Country',
      subRegions: [
        {
          id: 'greater-london',
          name: 'Greater London',
          type: 'Region',
          subRegions: [
            {
              id: 'city-of-london',
              name: 'City of London',
              type: 'Borough',
              subRegions: [
                { id: 'ec1a-1aa', name: 'EC1A 1AA', type: 'Postcode', postalCode: 'EC1A 1AA' },
                { id: 'ec1a-1ab', name: 'EC1A 1AB', type: 'Postcode', postalCode: 'EC1A 1AB' },
              ]
            }
          ]
        }
      ]
    }
  ],
  canada: [
    {
      id: 'ontario',
      name: 'Ontario',
      type: 'Province',
      subRegions: [
        {
          id: 'toronto-division',
          name: 'Toronto',
          type: 'County/Division',
          subRegions: [
            {
              id: 'downtown-toronto',
              name: 'Downtown Toronto',
              type: 'City/Municipality',
              subRegions: [
                { id: 'm5v-2l7', name: 'M5V 2L7', type: 'Postal Code', postalCode: 'M5V 2L7' },
                { id: 'm5v-2l8', name: 'M5V 2L8', type: 'Postal Code', postalCode: 'M5V 2L8' },
              ]
            }
          ]
        }
      ]
    }
  ],
  australia: [
    {
      id: 'new-south-wales',
      name: 'New South Wales',
      type: 'State',
      subRegions: [
        {
          id: 'greater-sydney',
          name: 'Greater Sydney',
          type: 'Region/LGA',
          subRegions: [
            {
              id: 'sydney-cbd',
              name: 'Sydney CBD',
              type: 'Suburb/Town',
              subRegions: [
                { id: 'postcode-2000', name: '2000', type: 'Postcode', postalCode: '2000' },
                { id: 'postcode-2001', name: '2001', type: 'Postcode', postalCode: '2001' },
              ]
            }
          ]
        }
      ]
    }
  ],
  germany: [
    {
      id: 'bayern',
      name: 'Bayern',
      type: 'Bundesland',
      subRegions: [
        {
          id: 'oberbayern',
          name: 'Oberbayern',
          type: 'Landkreis',
          subRegions: [
            {
              id: 'muenchen',
              name: 'München',
              type: 'Stadt/Gemeinde',
              subRegions: [
                { id: 'plz-80331', name: '80331', type: 'PLZ', postalCode: '80331' },
                { id: 'plz-80333', name: '80333', type: 'PLZ', postalCode: '80333' },
              ]
            }
          ]
        }
      ]
    }
  ],
  uae: [
    {
      id: 'dubai',
      name: 'Dubai',
      type: 'Emirate',
      subRegions: [
        {
          id: 'sector-3',
          name: 'Sector 3',
          type: 'Sector/Zone',
          subRegions: [
            {
              id: 'al-barsha-1',
              name: 'Al Barsha 1',
              type: 'Community/District',
              subRegions: [
                { id: 'dubai-local-zone', name: 'Al Barsha Area', type: 'Postal Code/Area', postalCode: 'DXB-001' },
                { id: 'jumeirah-code', name: 'Jumeirah Area', type: 'Postal Code/Area', postalCode: 'DXB-002' },
              ]
            }
          ]
        }
      ]
    }
  ]
};
