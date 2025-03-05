// data/toolsData.ts
// This file holds the list of cybersecurity tools shown on the hero section.
// To add a new tool, just add a new object here with a name, icon, and link—no need to change the Hero component!

export interface Tool {
    name: string; // Name of the tool (e.g., "IP Lookup")
    icon: string; // Path to the tool's icon image (e.g., "/icons/ip-lookup.png")
    link: string; // URL to the tool’s page or external resource
  }
  
  export const tools: Tool[] = [
    { name: "IP Lookup", icon: "/icons/ip-lookup.png", link: "/tools/ip-lookup" },
    { name: "DNS Check", icon: "/icons/dns-check.png", link: "/tools/dns-check" },
    { name: "WhatIsMyIP", icon: "/icons/whatismyip.png", link: "/tools/whatismyip" },
    // Add more tools here as needed, e.g.:
    // { name: "Port Scanner", icon: "/icons/port-scanner.png", link: "/tools/port-scanner" },
  ];