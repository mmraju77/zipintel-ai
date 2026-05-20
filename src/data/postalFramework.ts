
export interface Mandal {
  id: string;
  en: string;
  te: string;
  pin: string;
}

export interface DistrictData {
  id: string;
  nameEn: string;
  nameTe: string;
  hqEn: string;
  hqTe: string;
  mandals: Mandal[];
  coords: { lat: number; lng: number };
}

export interface StateData {
  id: string;
  nameEn: string;
  nameTe: string;
  districts: Record<string, DistrictData>;
}

export const POSTAL_FRAMEWORK: Record<string, StateData> = {
  "andhra-pradesh": {
    id: "andhra-pradesh",
    nameEn: "Andhra Pradesh",
    nameTe: "ఆంధ్రప్రదేశ్",
    districts: {
      "alluri-sitharama-raju": {
        id: "alluri-sitharama-raju",
        nameEn: "Alluri Sitharama Raju",
        nameTe: "అల్లూరి సీతారామ రాజు",
        hqEn: "Paderu",
        hqTe: "పాడేరు",
        coords: { lat: 18.08, lng: 82.66 },
        mandals: [
          { id: 'paderu', en: 'Paderu (HQ)', te: 'పాడేరు (ప్రధాన కేంద్రం)', pin: '531024' },
          { id: 'araku', en: 'Araku Valley', te: 'అరకు లోయ', pin: '531151' },
          { id: 'hukumpeta', en: 'Hukumpeta', te: 'హుకుంపేట', pin: '531077' },
          { id: 'ananthagiri', en: 'Ananthagiri', te: 'అనంతగిరి', pin: '531145' },
          { id: 'chintapalli', en: 'Chintapalli', te: 'చింతపల్లి', pin: '531111' },
        ]
      },
      "visakhapatnam": {
        id: "visakhapatnam",
        nameEn: "Visakhapatnam",
        nameTe: "విశాఖపట్నం",
        hqEn: "Visakhapatnam",
        hqTe: "విశాఖపట్నం",
        coords: { lat: 17.68, lng: 83.21 },
        mandals: [
          { id: 'vizag-urban', en: 'Visakhapatnam Urban', te: 'విశాఖపట్నం అర్బన్', pin: '530001' },
          { id: 'gajuwaka', en: 'Gajuwaka', te: 'గాజువాక', pin: '530026' },
          { id: 'pedagantyada', en: 'Pedagantyada', te: 'పెదగంట్యాడ', pin: '530044' },
          { id: 'bheemunipatnam', en: 'Bheemunipatnam', te: 'భీమునిపట్నం', pin: '531163' },
        ]
      },
      "anakapalli": {
        id: "anakapalli",
        nameEn: "Anakapalli",
        nameTe: "అనకాపల్లి",
        hqEn: "Anakapalli",
        hqTe: "అనకాపల్లి",
        coords: { lat: 17.68, lng: 83.00 },
        mandals: [
          { id: 'anakapalli', en: 'Anakapalli', te: 'అనకాపల్లి', pin: '531001' },
          { id: 'chinnayapalem', en: 'Chinnayapalem', te: 'చిన్నయ్యపాలెం', pin: '531002' },
          { id: 'kasimkota', en: 'Kasimkota', te: 'కాసింకోట', pin: '531031' },
        ]
      }
    }
  },
  "telangana": {
    id: "telangana",
    nameEn: "Telangana",
    nameTe: "తెలంగాణ",
    districts: {
      "hyderabad": {
        id: "hyderabad",
        nameEn: "Hyderabad",
        nameTe: "హైదరాబాద్",
        hqEn: "Hyderabad",
        hqTe: "హైదరాబాద్",
        coords: { lat: 17.38, lng: 78.48 },
        mandals: [
          { id: 'amberpet', en: 'Amberpet', te: 'అంబర్‌పేట', pin: '500013' },
          { id: 'asifnagar', en: 'Asifnagar', te: 'ఆసిఫ్‌నగర్', pin: '500028' },
          { id: 'charminar', en: 'Charminar', te: 'చార్మినార్', pin: '500002' },
        ]
      }
    }
  },
  "california": {
    id: "california",
    nameEn: "California",
    nameTe: "కాలిఫోర్నియా",
    districts: {
      "los-angeles": {
        id: "los-angeles",
        nameEn: "Los Angeles",
        nameTe: "లాస్ ఏంజిల్స్",
        hqEn: "Downtown LA",
        hqTe: "డౌన్ టౌన్ LA",
        coords: { lat: 34.05, lng: -118.24 },
        mandals: [
          { id: '90001', en: 'South LA (90001)', te: 'సౌత్ LA (90001)', pin: '90001' },
          { id: '90012', en: 'Civic Center (90012)', te: 'సివిక్ సెంటర్ (90012)', pin: '90012' },
        ]
      }
    }
  },
  "england": {
    id: "england",
    nameEn: "England",
    nameTe: "ఇంగ్లాండ్",
    districts: {
      "greater-london": {
        id: "greater-london",
        nameEn: "Greater London",
        nameTe: "గ్రేటర్ లండన్",
        hqEn: "London",
        hqTe: "లండన్",
        coords: { lat: 51.50, lng: -0.12 },
        mandals: [
          { id: 'sw1a', en: 'Westminster (SW1A)', te: 'వెస్ట్ మినిస్టర్ (SW1A)', pin: 'SW1A 1AA' },
          { id: 'ec1a', en: 'City of London (EC1A)', te: 'సిటీ ఆఫ్ లండన్ (EC1A)', pin: 'EC1A 1BB' },
        ]
      }
    }
  },
  "bayern": {
    id: "bayern",
    nameEn: "Bayern",
    nameTe: "బవేరియా",
    districts: {
      "oberbayern": {
        id: "oberbayern",
        nameEn: "Oberbayern",
        nameTe: "ఓబెర్బేయర్న్",
        hqEn: "Munich",
        hqTe: "మ్యూనిచ్",
        coords: { lat: 48.13, lng: 11.58 },
        mandals: [
          { id: '80331', en: 'Altstadt (80331)', te: 'అల్ట్‌స్టాడ్ట్ (80331)', pin: '80331' },
          { id: '80333', en: 'Maxvorstadt (80333)', te: 'మాక్స్‌వోర్‌స్టాడ్ట్ (80333)', pin: '80333' },
        ]
      }
    }
  },
  "dubai": {
    id: "dubai",
    nameEn: "Dubai",
    nameTe: "దుబాయ్",
    districts: {
      "sector-3": {
        id: "sector-3",
        nameEn: "Sector 3",
        nameTe: "సెక్షన్ 3",
        hqEn: "Al Barsha",
        hqTe: "అల్ బర్షా",
        coords: { lat: 25.10, lng: 55.19 },
        mandals: [
          { id: 'dxb-001', en: 'Al Barsha 1', te: 'అల్ బర్షా 1', pin: 'DXB-001' },
          { id: 'dxb-002', en: 'Jumeirah', te: 'జుమేరా', pin: 'DXB-002' },
        ]
      }
    }
  },
  "switzerland": {
    id: "switzerland",
    nameEn: "Switzerland",
    nameTe: "స్విట్జర్లాండ్",
    districts: {
      "zurich": {
        id: "zurich",
        nameEn: "Zurich",
        nameTe: "జూరిచ్",
        hqEn: "Zurich City",
        hqTe: "జూరిచ్ నగరం",
        coords: { lat: 47.37, lng: 8.54 },
        mandals: [
          { id: '8001', en: 'Altstadt (8001)', te: 'అల్ట్‌స్టాడ్ట్ (8001)', pin: '8001' },
          { id: '8005', en: 'Industriequartier (8005)', te: 'ఇండస్ట్రియల్ క్వార్టర్ (8005)', pin: '8005' },
        ]
      }
    }
  },
  "norway": {
    id: "norway",
    nameEn: "Norway",
    nameTe: "నార్వే",
    districts: {
      "oslo": {
        id: "oslo",
        nameEn: "Oslo",
        nameTe: "ఓస్లో",
        hqEn: "Sentrum",
        hqTe: "సెంట్రమ్",
        coords: { lat: 59.91, lng: 10.75 },
        mandals: [
          { id: '0150', en: 'Sentrum (0150)', te: 'సెంట్రమ్ (0150)', pin: '0150' },
          { id: '0550', en: 'Grünerløkka (0550)', te: 'గ్రూనర్ లోక్కా (0550)', pin: '0550' },
        ]
      }
    }
  },
  "sweden": {
    id: "sweden",
    nameEn: "Sweden",
    nameTe: "స్వీడన్",
    districts: {
      "stockholm": {
        id: "stockholm",
        nameEn: "Stockholm",
        nameTe: "స్టాక్‌హోమ్",
        hqEn: "Norrmalm",
        hqTe: "నార్మల్మ్",
        coords: { lat: 59.33, lng: 18.06 },
        mandals: [
          { id: '11120', en: 'City (11120)', te: 'సిటీ (11120)', pin: '11120' },
          { id: '11521', en: 'Östermalm (11521)', te: 'ఓస్టెర్మాల్మ్ (11521)', pin: '11521' },
        ]
      }
    }
  },
  "denmark": {
    id: "denmark",
    nameEn: "Denmark",
    nameTe: "డెన్మార్క్",
    districts: {
      "copenhagen": {
        id: "copenhagen",
        nameEn: "Copenhagen",
        nameTe: "కోపెన్ హాగన్",
        hqEn: "Indre By",
        hqTe: "ఇంద్రే బై",
        coords: { lat: 55.67, lng: 12.56 },
        mandals: [
          { id: '1000', en: 'Center (1000)', te: 'సెంటర్ (1000)', pin: '1000' },
          { id: '2100', en: 'Østerbro (2100)', te: 'ఓస్టర్‌బ్రో (2100)', pin: '2100' },
        ]
      }
    }
  },
  "netherlands": {
    id: "netherlands",
    nameEn: "Netherlands",
    nameTe: "నెదర్లాండ్స్",
    districts: {
      "amsterdam": {
        id: "amsterdam",
        nameEn: "Amsterdam",
        nameTe: "ఆమ్స్టర్డామ్",
        hqEn: "Centrum",
        hqTe: "సెంట్రమ్",
        coords: { lat: 52.36, lng: 4.89 },
        mandals: [
          { id: '1011', en: 'Centrum (1011)', te: 'సెంట్రమ్ (1011)', pin: '1011' },
          { id: '1017', en: 'Grachtengordel (1017)', te: 'గ్రాచెన్‌గోర్డెల్ (1017)', pin: '1017' },
        ]
      }
    }
  },
  "singapore": {
    id: "singapore",
    nameEn: "Singapore",
    nameTe: "సింగపూర్",
    districts: {
      "singapore": {
        id: "singapore",
        nameEn: "Singapore",
        nameTe: "సింగపూర్",
        hqEn: "Marina Bay",
        hqTe: "మరీనా బే",
        coords: { lat: 1.28, lng: 103.85 },
        mandals: [
          { id: '018935', en: 'Raffles Place', te: 'రాఫెల్స్ ప్లేస్', pin: '018935' },
          { id: '048589', en: 'Downtown Core', te: 'డౌన్ టౌన్ కోర్', pin: '048589' },
        ]
      }
    }
  },
  "new-zealand": {
    id: "new-zealand",
    nameEn: "New Zealand",
    nameTe: "న్యూజిలాండ్",
    districts: {
      "auckland": {
        id: "auckland",
        nameEn: "Auckland",
        nameTe: "ఆక్లాండ్",
        hqEn: "Auckland CBD",
        hqTe: "ఆక్లాండ్ CBD",
        coords: { lat: -36.84, lng: 174.76 },
        mandals: [
          { id: '1010', en: 'CBD (1010)', te: 'CBD (1010)', pin: '1010' },
          { id: '1023', en: 'Epsom (1023)', te: 'ఎప్సమ్ (1023)', pin: '1023' },
        ]
      }
    }
  },
  "ireland": {
    id: "ireland",
    nameEn: "Ireland",
    nameTe: "ఐర్లాండ్",
    districts: {
      "dublin": {
        id: "dublin",
        nameEn: "Dublin",
        nameTe: "డబ్లిన్",
        hqEn: "Dublin 2",
        hqTe: "డబ్లిన్ 2",
        coords: { lat: 53.34, lng: -6.26 },
        mandals: [
          { id: 'd02', en: 'Grand Canal (D02)', te: 'గ్రాండ్ కెనాల్ (D02)', pin: 'D02' },
          { id: 'd04', en: 'Ballsbridge (D04)', te: 'బాల్స్‌బ్రిడ్జ్ (D04)', pin: 'D04' },
        ]
      }
    }
  },
  "austria": {
    id: "austria",
    nameEn: "Austria",
    nameTe: "ఆస్ట్రియా",
    districts: {
      "vienna": {
        id: "vienna",
        nameEn: "Vienna",
        nameTe: "వియన్నా",
        hqEn: "Innere Stadt",
        hqTe: "ఇన్నేర్ స్టాడ్ట్",
        coords: { lat: 48.20, lng: 16.37 },
        mandals: [
          { id: '1010', en: 'District 1 (1010)', te: 'డిస్ట్రిక్ట్ 1 (1010)', pin: '1010' },
          { id: '1020', en: 'Leopoldstadt (1020)', te: 'లియోపోల్డ్ స్టాడ్ట్ (1020)', pin: '1020' },
        ]
      }
    }
  },
  "luxembourg": {
    id: "luxembourg",
    nameEn: "Luxembourg",
    nameTe: "లక్సెంబర్గ్",
    districts: {
      "luxembourg-city": {
        id: "luxembourg-city",
        nameEn: "Luxembourg City",
        nameTe: "లక్సెంబర్గ్ నగరం",
        hqEn: "Ville Haute",
        hqTe: "విల్లే హాట్",
        coords: { lat: 49.61, lng: 6.13 },
        mandals: [
          { id: '1111', en: 'City Center (1111)', te: 'సిటీ సెంటర్ (1111)', pin: '1111' },
          { id: '2222', en: 'Kirchberg (2222)', te: 'కిర్చ్ బర్గ్ (2222)', pin: '2222' },
        ]
      }
    }
  }
};
