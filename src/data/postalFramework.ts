
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
  }
};
