
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
  }
};
