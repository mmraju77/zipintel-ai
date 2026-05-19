
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
  "california": {
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
  "london": {
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
