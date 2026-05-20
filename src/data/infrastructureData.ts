export interface PostalInfrastructure {
  regionKey: string;
  countryCode: string;
  internetStatus: { provider: string; avgSpeed: string; type: string };
  logisticsHubs: { mainPartner: string; nearestHub: string; coverage: string };
  deliveryCheck: { status: 'Instant' | 'Available' | 'Limited'; eta: string; platforms: string };
  financeIdentifiers: { label: string; code: string };
  rentalEstimate?: string;
}

export const GLOBAL_POSTAL_MAP: Record<string, PostalInfrastructure> = {
  "visakhapatnam": {
    regionKey: "visakhapatnam",
    countryCode: "IN",
    internetStatus: { provider: "Jio Fiber & Airtel 5G", avgSpeed: "1 Gbps", type: "Fiber & high-throughput 5G" },
    logisticsHubs: { mainPartner: "BlueDart & Delhivery", nearestHub: "Gajuwaka Warehouse Centroid", coverage: "High Speed Regional" },
    deliveryCheck: { status: "Instant", eta: "Under 2 Hours", platforms: "Zomato, Swiggy, Blinkit, BigBasket" },
    financeIdentifiers: { label: "IFSC Code", code: "SBIN0000952" },
    rentalEstimate: "₹10,000 - ₹35,000 / month"
  },
  "hyderabad": {
    regionKey: "hyderabad",
    countryCode: "IN",
    internetStatus: { provider: "Airtel Xstream & Beam", avgSpeed: "500 Mbps", type: "Gigabit GPON" },
    logisticsHubs: { mainPartner: "Delhivery & FedEx", nearestHub: "Shamshabad Cargo Airport Node", coverage: "Metropolitan Priority" },
    deliveryCheck: { status: "Instant", eta: "15 Mins", platforms: "Zepto, Instamart, Swiggy Genie" },
    financeIdentifiers: { label: "IFSC Code", code: "SBIN0002345" }
  },
  "delhi": {
    regionKey: "delhi",
    countryCode: "IN",
    internetStatus: { provider: "Jio Fiber & Tata Play", avgSpeed: "1 Gbps", type: "FTTH" },
    logisticsHubs: { mainPartner: "BlueDart & Delhivery", nearestHub: "IGIA Cargo Terminal", coverage: "National Capital Hub" },
    deliveryCheck: { status: "Instant", eta: "10-20 Mins", platforms: "Blinkit, Zepto, Zomato" },
    financeIdentifiers: { label: "IFSC Code", code: "SBIN0000691" }
  },
  "alluri-sitharama-raju": {
    regionKey: "alluri-sitharama-raju",
    countryCode: "IN",
    internetStatus: { provider: "BSNL & Jio Bharat", avgSpeed: "150 Mbps", type: "FTTH Cable" },
    logisticsHubs: { mainPartner: "BlueDart & India Post", nearestHub: "Paderu Central Collectorate", coverage: "Tribal Priority Routing" },
    deliveryCheck: { status: "Available", eta: "3-5 Days", platforms: "Amazon, Flipkart Express, Myntra" },
    financeIdentifiers: { label: "IFSC Code", code: "SBIN0000892" }
  },
  "los-angeles": {
    regionKey: "los-angeles",
    countryCode: "US",
    internetStatus: { provider: "AT&T Fiber & Xfinity", avgSpeed: "1.2 Gbps", type: "Coaxial & Pure Glass Fiber" },
    logisticsHubs: { mainPartner: "FedEx & UPS Hubs", nearestHub: "LAX Air Cargo Gateway", coverage: "US National Express" },
    deliveryCheck: { status: "Instant", eta: "Under 1 Hour", platforms: "Amazon Prime Now, DoorDash, Instacart" },
    financeIdentifiers: { label: "Routing transit number (RTN)", code: "021000021" }
  },
  "greater-london": {
    regionKey: "greater-london",
    countryCode: "GB",
    internetStatus: { provider: "BT Broadband & Virgin Media", avgSpeed: "900 Mbps", type: "FTTP Layer 3" },
    logisticsHubs: { mainPartner: "Royal Mail & DPD", nearestHub: "Heathrow Distribution Depot", coverage: "UK National First Class" },
    deliveryCheck: { status: "Instant", eta: "35 Mins", platforms: "Deliveroo, UberEats, Ocado Zoom" },
    financeIdentifiers: { label: "Sort Code", code: "20-00-00" }
  },
  "london": {
    regionKey: "london",
    countryCode: "GB",
    internetStatus: { provider: "BT Broadband & Virgin Media", avgSpeed: "900 Mbps", type: "FTTP Layer 3" },
    logisticsHubs: { mainPartner: "Royal Mail & DPD", nearestHub: "Heathrow Distribution Depot", coverage: "UK National First Class" },
    deliveryCheck: { status: "Instant", eta: "45 Mins", platforms: "Deliveroo, UberEats, Ocado" },
    financeIdentifiers: { label: "Sort Code", code: "10-20-30" }
  },
  "toronto": {
    regionKey: "toronto",
    countryCode: "CA",
    internetStatus: { provider: "Rogers & Bell Canada", avgSpeed: "1.5 Gbps", type: "FTTH Cable" },
    logisticsHubs: { mainPartner: "Canada Post & Purolator", nearestHub: "Pearson Cargo Terminal", coverage: "Provincial Express Network" },
    deliveryCheck: { status: "Instant", eta: "45 Mins", platforms: "UberEats, DoorDash, SkipTheDishes" },
    financeIdentifiers: { label: "Routing Transit Number", code: "000412345" }
  },
  "sydney": {
    regionKey: "sydney",
    countryCode: "AU",
    internetStatus: { provider: "NBN Co & Telstra", avgSpeed: "250 Mbps", type: "HFC Cable Broadband" },
    logisticsHubs: { mainPartner: "Australia Post & StarTrack", nearestHub: "Chullora Logistics Area", coverage: "Aus National Star" },
    deliveryCheck: { status: "Available", eta: "1-2 Hours", platforms: "Menulog, DoorDash, Milkrun" },
    financeIdentifiers: { label: "BSB Number", code: "062-000" }
  },
  "oberbayern": {
    regionKey: "oberbayern",
    countryCode: "DE",
    internetStatus: { provider: "Deutsche Telekom & O2", avgSpeed: "500 Mbps", type: "VDSL Vectoring" },
    logisticsHubs: { mainPartner: "DHL Hubs & Hermes", nearestHub: "Aschheim Paketzentrum", coverage: "DE National Priority" },
    deliveryCheck: { status: "Instant", eta: "45 Mins", platforms: "Lieferando, Gorillas, Flink" },
    financeIdentifiers: { label: "Bankleitzahl (BLZ)", code: "70020270" }
  },
  "munich": {
    regionKey: "munich",
    countryCode: "DE",
    internetStatus: { provider: "Deutsche Telekom & O2", avgSpeed: "500 Mbps", type: "VDSL Vectoring" },
    logisticsHubs: { mainPartner: "DHL Hubs & Hermes", nearestHub: "Aschheim Paketzentrum", coverage: "DE National Priority" },
    deliveryCheck: { status: "Instant", eta: "45 Mins", platforms: "Lieferando, Flink, Gorillas" },
    financeIdentifiers: { label: "BIC/IBAN", code: "DE897002027000" }
  },
  "zurich": {
    regionKey: "zurich",
    countryCode: "CH",
    internetStatus: { provider: "Swisscom & Sunrise", avgSpeed: "10 Gbps", type: "XGS-PON Fiber" },
    logisticsHubs: { mainPartner: "PostCH & DPD CH", nearestHub: "Zürich Cargo Transit Depot", coverage: "Swiss Express Line" },
    deliveryCheck: { status: "Available", eta: "1 Hour", platforms: "JustEat.ch, UberEats, Smood" },
    financeIdentifiers: { label: "Clearing Number (BC)", code: "230" }
  },
  "oslo": {
    regionKey: "oslo",
    countryCode: "NO",
    internetStatus: { provider: "Telenor & Viken Fiber", avgSpeed: "1 Gbps", type: "Pure FTTH" },
    logisticsHubs: { mainPartner: "Posten Norge & PostNord", nearestHub: "Oslo Logistikksenter", coverage: "Nordic Regional VIP" },
    deliveryCheck: { status: "Available", eta: "40 Mins", platforms: "Foodora, Wolt" },
    financeIdentifiers: { label: "Bankgirotegn (Bankgiro)", code: "7058.05" }
  },
  "stockholm": {
    regionKey: "stockholm",
    countryCode: "SE",
    internetStatus: { provider: "Telia & Bahnhof", avgSpeed: "1 Gbps", type: "Stockholms Stadsnät Fiber" },
    logisticsHubs: { mainPartner: "PostNord & DHL Sweden", nearestHub: "Arlanda Cargo Terminal", coverage: "Scandinavian Hub Network" },
    deliveryCheck: { status: "Instant", eta: "30 Mins", platforms: "Bolt Food, Wolt, Foodora" },
    financeIdentifiers: { label: "Clearingnummer", code: "8105-9" }
  },
  "copenhagen": {
    regionKey: "copenhagen",
    countryCode: "DK",
    internetStatus: { provider: "TDC Net & YouSee", avgSpeed: "1 Gbps", type: "COAX/FTTH Mix" },
    logisticsHubs: { mainPartner: "PostNord & GLS Denmark", nearestHub: "Taastrup Pakkecenter", coverage: "Danish Inter-island Express" },
    deliveryCheck: { status: "Instant", eta: "30 Mins", platforms: "Wolt, Just Eat DK" },
    financeIdentifiers: { label: "Registreringsnummer (Reg. nr.)", code: "9103" }
  },
  "amsterdam": {
    regionKey: "amsterdam",
    countryCode: "NL",
    internetStatus: { provider: "KPN & Ziggo Fiber", avgSpeed: "1 Gbps", type: "FTTF SuperBroadband" },
    logisticsHubs: { mainPartner: "PostNL & DHL NL", nearestHub: "Schiphol Logistics Centroid", coverage: "Benelux Overnight Premium" },
    deliveryCheck: { status: "Instant", eta: "25 Mins", platforms: "Thuisbezorgd.nl, UberEats, Flink" },
    financeIdentifiers: { label: "BIC/IBAN", code: "RABONL2U" }
  },
  "rotterdam": {
    regionKey: "rotterdam",
    countryCode: "NL",
    internetStatus: { provider: "Ziggo & T-Mobile", avgSpeed: "1 Gbps", type: "Fiber-to-the-Home" },
    logisticsHubs: { mainPartner: "PostNL", nearestHub: "Maasvlakte Port Hub", coverage: "Global Maritime Logistics" },
    deliveryCheck: { status: "Instant", eta: "30 Mins", platforms: "UberEats, Thuisbezorgd" },
    financeIdentifiers: { label: "BIC/IBAN", code: "INGBNL2A" }
  },
  "new-york": {
    regionKey: "new-york",
    countryCode: "US",
    internetStatus: { provider: "Verizon Fios & Spectrum", avgSpeed: "1 Gbps", type: "Fiber-Optic" },
    logisticsHubs: { mainPartner: "UPS & USPS", nearestHub: "JFK Cargo Terminal", coverage: "US East Coast Hub" },
    deliveryCheck: { status: "Instant", eta: "15-30 Mins", platforms: "Amazon Fresh, DoorDash, UberEats" },
    financeIdentifiers: { label: "Routing Number", code: "021000021" }
  },
  "texas": {
    regionKey: "texas",
    countryCode: "US",
    internetStatus: { provider: "AT&T & Google Fiber", avgSpeed: "1 Gbps", type: "Fiber Infrastructure" },
    logisticsHubs: { mainPartner: "FedEx", nearestHub: "Fort Worth Alliance Hub", coverage: "Central US Logistics" },
    deliveryCheck: { status: "Available", eta: "1-2 Hours", platforms: "Favor, DoorDash, Amazon" },
    financeIdentifiers: { label: "Routing Number", code: "111000025" }
  },
  "manchester": {
    regionKey: "manchester",
    countryCode: "GB",
    internetStatus: { provider: "Virgin Media & Sky", avgSpeed: "500 Mbps", type: "Hybrid Fiber Coaxial" },
    logisticsHubs: { mainPartner: "Hermes & Royal Mail", nearestHub: "Trafford Park Distribution", coverage: "UK North Priority" },
    deliveryCheck: { status: "Instant", eta: "30 Mins", platforms: "Deliveroo, Just Eat" },
    financeIdentifiers: { label: "Sort Code", code: "01-02-03" }
  },
  "vancouver": {
    regionKey: "vancouver",
    countryCode: "CA",
    internetStatus: { provider: "Telus & Shaw", avgSpeed: "1 Gbps", type: "PureFiber" },
    logisticsHubs: { mainPartner: "Canada Post", nearestHub: "Richmond Sorting Facility", coverage: "Pacific Gateway" },
    deliveryCheck: { status: "Instant", eta: "40 Mins", platforms: "UberEats, SkipTheDishes" },
    financeIdentifiers: { label: "Transit Number", code: "00010-001" }
  },
  "melbourne": {
    regionKey: "melbourne",
    countryCode: "AU",
    internetStatus: { provider: "Telstra & Optus", avgSpeed: "100 Mbps", type: "NBN HFC" },
    logisticsHubs: { mainPartner: "Australia Post", nearestHub: "Tullamarine Logistics Park", coverage: "SE Australia Hub" },
    deliveryCheck: { status: "Instant", eta: "45 Mins", platforms: "DoorDash, Menulog" },
    financeIdentifiers: { label: "BSB Number", code: "082-001" }
  },
  "berlin": {
    regionKey: "berlin",
    countryCode: "DE",
    internetStatus: { provider: "Deutsche Telekom & Vodafone", avgSpeed: "1 Gbps", type: "DOCSIS 3.1" },
    logisticsHubs: { mainPartner: "DHL & UPS", nearestHub: "Ludwigsfelde Parcel Center", coverage: "Central EU Hub" },
    deliveryCheck: { status: "Instant", eta: "30 Mins", platforms: "Wolt, Lieferando" },
    financeIdentifiers: { label: "BIC/IBAN", code: "DEBADEBBXXX" }
  },
  "geneva": {
    regionKey: "geneva",
    countryCode: "CH",
    internetStatus: { provider: "Swisscom & Salt", avgSpeed: "10 Gbps", type: "Fiber" },
    logisticsHubs: { mainPartner: "Swiss Post", nearestHub: "Plan-les-Ouates Center", coverage: "Alpine Logistics" },
    deliveryCheck: { status: "Available", eta: "1 Hour", platforms: "UberEats, Smood" },
    financeIdentifiers: { label: "Clearing Number", code: "024" }
  },
  "bergen": {
    regionKey: "bergen",
    countryCode: "NO",
    internetStatus: { provider: "Telenor & Lyse", avgSpeed: "500 Mbps", type: "Fiber" },
    logisticsHubs: { mainPartner: "Posten", nearestHub: "Nygårdstangen Terminal", coverage: "Fjord Logistics" },
    deliveryCheck: { status: "Available", eta: "45 Mins", platforms: "Foodora" },
    financeIdentifiers: { label: "Bankgiro", code: "8001.01" }
  },
  "gothenburg": {
    regionKey: "gothenburg",
    countryCode: "SE",
    internetStatus: { provider: "Tele2 & Telenor", avgSpeed: "1 Gbps", type: "Fiber" },
    logisticsHubs: { mainPartner: "PostNord", nearestHub: "Landvetter Logistics", coverage: "West Sweden Hub" },
    deliveryCheck: { status: "Instant", eta: "30 Mins", platforms: "Foodora, Wolt" },
    financeIdentifiers: { label: "Clearingnummer", code: "6123-4" }
  },
  "aarhus": {
    regionKey: "aarhus",
    countryCode: "DK",
    internetStatus: { provider: "Stofa & Nuuday", avgSpeed: "1 Gbps", type: "Fiber/Coax" },
    logisticsHubs: { mainPartner: "PostNord & Bring", nearestHub: "Logistikparken Aarhus", coverage: "Jutland Hub" },
    deliveryCheck: { status: "Instant", eta: "35 Mins", platforms: "Wolt" },
    financeIdentifiers: { label: "Reg. nr.", code: "4001" }
  },
  "sector-3": {
    regionKey: "sector-3",
    countryCode: "AE",
    internetStatus: { provider: "Etisalat & Du", avgSpeed: "800 Mbps", type: "GPON Fiber Architecture" },
    logisticsHubs: { mainPartner: "Aramex & DHL UAE", nearestHub: "Jebel Ali Port hub", coverage: "GCC Cross-Border Fast" },
    deliveryCheck: { status: "Instant", eta: "25 Mins", platforms: "Noon Instant, Amazon.ae, Careem Quik" },
    financeIdentifiers: { label: "EIBAN Active Code", code: "AE120030" }
  },
  "anakapalli": {
    regionKey: "anakapalli",
    countryCode: "IN",
    internetStatus: { provider: "Jio Fiber & Airtel 5G", avgSpeed: "300 Mbps", type: "GPON Fiber" },
    logisticsHubs: { mainPartner: "BlueDart & India Post", nearestHub: "Anakapalli Central Postal Depot", coverage: "District Priority Routing" },
    deliveryCheck: { status: "Available", eta: "2-3 Days", platforms: "Amazon, Flipkart, Swiggy Instamart" },
    financeIdentifiers: { label: "IFSC Code", code: "SBIN0000753" }
  },
  "singapore": {
    regionKey: "singapore",
    countryCode: "SG",
    internetStatus: { provider: "Singtel Fiber & StarHub", avgSpeed: "2 Gbps", type: "Ultra-High Speed Fiber (FTTH)" },
    logisticsHubs: { mainPartner: "SingPost & NinjaVan", nearestHub: "Changi Airfreight Centre", coverage: "Pano-Island Premium" },
    deliveryCheck: { status: "Instant", eta: "15 Mins", platforms: "Grab, Foodpanda, Deliveroo, Shopee" },
    financeIdentifiers: { label: "Postal Routing", code: "SG-048589" }
  },
  "auckland": {
    regionKey: "auckland",
    countryCode: "NZ",
    internetStatus: { provider: "Spark NZ & Vodafone", avgSpeed: "500 Mbps", type: "Chorus Ultra-Fast Broadband" },
    logisticsHubs: { mainPartner: "NZ Post & CourierPost", nearestHub: "Highbrook Distribution Hub", coverage: "NZ North Island Hub" },
    deliveryCheck: { status: "Available", eta: "45 Mins", platforms: "UberEats, Menulog" },
    financeIdentifiers: { label: "BSB / Routing", code: "01-02-03" }
  },
  "dublin": {
    regionKey: "dublin",
    countryCode: "IE",
    internetStatus: { provider: "Eir Broadband & Virgin Media", avgSpeed: "1 Gbps", type: "Pure Fiber Optic" },
    logisticsHubs: { mainPartner: "An Post & Nightline", nearestHub: "Dublin Parcel Hub", coverage: "EU West Corridor" },
    deliveryCheck: { status: "Instant", eta: "30 Mins", platforms: "Deliveroo, Just Eat, UberEats" },
    financeIdentifiers: { label: "Sort Code / Eircode Index", code: "D02 X285" }
  },
  "vienna": {
    regionKey: "vienna",
    countryCode: "AT",
    internetStatus: { provider: "A1 Telekom & Magenta", avgSpeed: "500 Mbps", type: "Giga-HFC" },
    logisticsHubs: { mainPartner: "Österreichische Post", nearestHub: "Inzersdorf Parcel Center", coverage: "Alpine Logistics Hub" },
    deliveryCheck: { status: "Instant", eta: "35 Mins", platforms: "Lieferando, Mjam" },
    financeIdentifiers: { label: "BIC/IBAN", code: "AT89 1200" }
  },
  "luxembourg-city": {
    regionKey: "luxembourg-city",
    countryCode: "LU",
    internetStatus: { provider: "Post Luxembourg & Tango", avgSpeed: "1 Gbps", type: "FTTH" },
    logisticsHubs: { mainPartner: "POST Logistics & CFL", nearestHub: "Bettembourg Logistics Park", coverage: "EU Central Logistics" },
    deliveryCheck: { status: "Available", eta: "40 Mins", platforms: "Wolt, Wedely" },
    financeIdentifiers: { label: "BIC/IBAN", code: "LU67 0001" }
  }
};

export const getInfrastructureData = (district: string, country?: string): PostalInfrastructure => {
  const key = district.toLowerCase();
  
  if (GLOBAL_POSTAL_MAP[key]) {
    return GLOBAL_POSTAL_MAP[key];
  }
  
  const resolvedCountryCode = country ? country.toUpperCase().substring(0, 2) : "INTL";
  
  return {
    regionKey: key,
    countryCode: resolvedCountryCode,
    internetStatus: { 
      provider: "Standard Regional Telecom & Fiber Carriers", 
      avgSpeed: "100 Mbps", 
      type: "High-Speed Local Broadband Connectivity" 
    },
    logisticsHubs: { 
      mainPartner: "National Postal Service & Express Logistics", 
      nearestHub: "Central District General Distribution Depot", 
      coverage: "Regional Distribution Priority" 
    },
    deliveryCheck: { 
      status: "Available", 
      eta: "1-3 Days", 
      platforms: "Standard Regional E-Commerce Core" 
    },
    financeIdentifiers: { 
      label: "Postal Branch ID Code", 
      code: "ACTIVE-001" 
    }
  };
};
