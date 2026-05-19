
export interface InfrastructureStats {
  internet: {
    providers: string[];
    avgSpeed: string;
    coverage: 'High' | 'Medium' | 'Low';
  };
  logistics: {
    hubs: string[];
    primaryPartner: string;
    warehouses: number;
  };
  ecommerce: {
    status: 'Instant' | 'Available' | 'Limited';
    providers: string[];
    avgDeliveryTime: string;
  };
  financial: {
    bankBranches: number;
    primaryIFSC?: string;
    routingPrefix?: string;
    atms: number;
  };
}

export const INFRASTRUCTURE_METADATA: Record<string, InfrastructureStats> = {
  "alluri-sitharama-raju": {
    internet: {
      providers: ["Jio Fiber", "Airtel Xstream", "BSNL Fiber"],
      avgSpeed: "150 Mbps",
      coverage: "Medium"
    },
    logistics: {
      hubs: ["Paderu Central", "Araku Logistics Hub"],
      primaryPartner: "BlueDart",
      warehouses: 12
    },
    ecommerce: {
      status: "Available",
      providers: ["Amazon", "Flipkart", "Myntra"],
      avgDeliveryTime: "3-5 Days"
    },
    financial: {
      bankBranches: 45,
      primaryIFSC: "SBIN0000892",
      atms: 82
    }
  },
  "visakhapatnam": {
    internet: {
      providers: ["Jio Fiber", "Airtel Xstream", "ACT Fibernet", "Xfinity"],
      avgSpeed: "1 Gbps",
      coverage: "High"
    },
    logistics: {
      hubs: ["Vizag Seaport Dist", "Gajuwaka Warehouse Zone"],
      primaryPartner: "DHL",
      warehouses: 145
    },
    ecommerce: {
      status: "Instant",
      providers: ["Swiggy", "Zomato", "Blinkit", "Amazon Fresh"],
      avgDeliveryTime: "Under 2 Hours"
    },
    financial: {
      bankBranches: 450,
      primaryIFSC: "SBIN0000952",
      atms: 1200
    }
  },
  "hyderabad": {
    internet: {
      providers: ["Google Fiber", "Jio", "Airtel", "Beam"],
      avgSpeed: "500 Mbps",
      coverage: "High"
    },
    logistics: {
      hubs: ["Shamshabad Cargo Hub", "Medchal Logistics Park"],
      primaryPartner: "FedEx",
      warehouses: 340
    },
    ecommerce: {
      status: "Instant",
      providers: ["Zepto", "Swiggy Genie", "Amazon Prime"],
      avgDeliveryTime: "15 Mins"
    },
    financial: {
      bankBranches: 890,
      primaryIFSC: "SBIN0002345",
      atms: 4500
    }
  },
  "los-angeles": {
    internet: {
      providers: ["AT&T Fiber", "Xfinity", "Starlink", "Google Fiber"],
      avgSpeed: "1.2 Gbps",
      coverage: "High"
    },
    logistics: {
      hubs: ["LAX Logistics Central", "Oakland Port Hub"],
      primaryPartner: "FedEx",
      warehouses: 890
    },
    ecommerce: {
      status: "Instant",
      providers: ["Amazon Prime", "DoorDash", "Instacart"],
      avgDeliveryTime: "Under 1 Hour"
    },
    financial: {
      bankBranches: 1200,
      routingPrefix: "121000",
      atms: 15400
    }
  },
  "greater-london": {
    internet: {
      providers: ["BT Full Fibre", "Virgin Media", "Sky Broadband"],
      avgSpeed: "900 Mbps",
      coverage: "High"
    },
    logistics: {
      hubs: ["Heathrow Distribution", "London Gateway"],
      primaryPartner: "Royal Mail",
      warehouses: 450
    },
    ecommerce: {
      status: "Instant",
      providers: ["Deliveroo", "Ocado", "Amazon UK"],
      avgDeliveryTime: "35 Mins"
    },
    financial: {
      bankBranches: 620,
      routingPrefix: "20-00-00 (Sort)",
      atms: 8200
    }
  },
  "oberbayern": {
    internet: {
      providers: ["Deutsche Telekom", "Vodafone", "O2", "1&1"],
      avgSpeed: "500 Mbps",
      coverage: "High"
    },
    logistics: {
      hubs: ["Berlin Brandenburg Airport Area", "Pankow Logistics Park"],
      primaryPartner: "DHL Express",
      warehouses: 210
    },
    ecommerce: {
      status: "Instant",
      providers: ["Gorillas", "Flink", "Amazon.de"],
      avgDeliveryTime: "45 Mins"
    },
    financial: {
      bankBranches: 380,
      routingPrefix: "BLZ: 100 000 00",
      atms: 3200
    }
  },
  "sector-3": {
    internet: {
      providers: ["Etisalat", "Du", "Starlink"],
      avgSpeed: "800 Mbps",
      coverage: "High"
    },
    logistics: {
      hubs: ["Jebel Ali Free Zone", "Dubai South (DWC)"],
      primaryPartner: "Aramex",
      warehouses: 560
    },
    ecommerce: {
      status: "Instant",
      providers: ["Noon", "Amazon.ae", "Careem Quik"],
      avgDeliveryTime: "Under 30 Mins"
    },
    financial: {
      bankBranches: 290,
      routingPrefix: "EIBAN Active",
      atms: 1800
    }
  },
  "sydney": {
    internet: {
      providers: ["NBN Co", "Telstra", "Optus", "TPG"],
      avgSpeed: "100 Mbps",
      coverage: "Medium"
    },
    logistics: {
      hubs: ["Western Sydney Aerotropolis", "Botany Bay Port"],
      primaryPartner: "Australia Post",
      warehouses: 180
    },
    ecommerce: {
      status: "Available",
      providers: ["Milkrun", "DoorDash", "Amazon AU"],
      avgDeliveryTime: "1-2 Hours"
    },
    financial: {
      bankBranches: 340,
      routingPrefix: "BSB: 062-000",
      atms: 2400
    }
  }
};

export const getInfrastructureData = (districtId: string): InfrastructureStats => {
  const key = districtId.toLowerCase();
  return INFRASTRUCTURE_METADATA[key] || {
    internet: { providers: ["Local ISP"], avgSpeed: "50 Mbps", coverage: "Low" },
    logistics: { hubs: ["Primary Post Office"], primaryPartner: "Postal Service", warehouses: 1 },
    ecommerce: { status: "Available", providers: ["Local Express"], avgDeliveryTime: "7+ Days" },
    financial: { bankBranches: 1, primaryIFSC: "N/A", atms: 1 }
  };
};
