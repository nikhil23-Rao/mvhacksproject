"use client";
import React, { useEffect, useState } from "react";
import { AppSidebar } from "../../components/general/Sidebar";
import { Button, TextField } from "@mui/material";
import "../globals.css";
import { setUser } from "@/utils/getCurrentUser";
import { User } from "@/types/auth/User";
import { getTheme } from "@/utils/getTheme";
import { Splash } from "@/components/general/Splash";
import { getColor } from "@/utils/getColor";

interface Fundraiser {
  id: string;
  name: string;
  organization: string;
  type: string;
  focus: string[];
  location: string;
  frequency: string;
  estimated_cost: string;
  url: string;
}


const dataset = {
  "dataset_name": "ocean_coral_fundraisers_extended",
  "generated_at": "2026-03-28",
  "location_context": "Fruitdale, CA, USA",
  "fundraisers": [
    {
      "id": "local_001",
      "name": "Community Lake & Creek Cleanup Fundraiser",
      "organization": "San Jose Parks & Recreation",
      "type": "cleanup + donation drive",
      "focus": ["ocean pollution", "watershed protection"],
      "location": { "city": "San Jose", "state": "CA", "country": "USA" },
      "frequency": "monthly",
      "estimated_cost": "free (donations encouraged)"
    },
    {
      "id": "local_002",
      "name": "Santa Cruz Beach Cleanup Fundraiser",
      "organization": "Save Our Shores",
      "type": "cleanup fundraiser",
      "focus": ["marine debris", "ocean pollution"],
      "location": { "city": "Santa Cruz", "state": "CA", "country": "USA" },
      "frequency": "monthly",
      "estimated_cost": "free"
    },
    {
      "id": "local_003",
      "name": "Bay Area Microplastic Awareness Fundraiser",
      "organization": "5 Gyres Institute (local partners)",
      "type": "education + fundraiser",
      "focus": ["microplastics", "ocean pollution"],
      "location": { "city": "San Francisco Bay Area", "state": "CA", "country": "USA" },
      "frequency": "seasonal",
      "estimated_cost": "donation-based"
    },
    {
      "id": "local_004",
      "name": "Coastal Cleanup Day Fundraiser",
      "organization": "California Coastal Commission",
      "type": "statewide cleanup event",
      "focus": ["ocean pollution"],
      "location": { "state": "CA", "country": "USA" },
      "frequency": "annual",
      "estimated_cost": "free"
    },
    {
      "id": "local_005",
      "name": "Monterey Bay Dive Cleanup Fundraiser",
      "organization": "Monterey Bay Aquarium partners",
      "type": "diver cleanup fundraiser",
      "focus": ["marine debris", "ocean conservation"],
      "location": { "city": "Monterey", "state": "CA", "country": "USA" },
      "frequency": "annual",
      "estimated_cost": "varies"
    },
    {
      "id": "org_001",
      "name": "Eco-Palooza",
      "organization": "Mother Ocean Fund",
      "type": "festival fundraiser",
      "focus": ["ocean pollution", "coral reefs"],
      "location": { "type": "various USA coastal cities" },
      "frequency": "recurring",
      "estimated_cost": "varies"
    },
    {
      "id": "org_002",
      "name": "Dive Against Debris Fundraisers",
      "organization": "PADI AWARE Foundation",
      "type": "community fundraising",
      "focus": ["marine debris"],
      "location": { "type": "global" },
      "frequency": "ongoing",
      "estimated_cost": "free"
    },
    {
      "id": "org_003",
      "name": "Ocean Fest",
      "organization": "Mote Marine Laboratory",
      "type": "festival fundraiser",
      "focus": ["coral restoration"],
      "location": { "city": "Key West", "state": "FL", "country": "USA" },
      "frequency": "annual",
      "estimated_cost": "ticketed"
    },
    {
      "id": "org_004",
      "name": "Reef-World Fundraising Challenges",
      "organization": "The Reef-World Foundation",
      "type": "DIY fundraiser",
      "focus": ["coral reefs"],
      "location": { "type": "global" },
      "frequency": "ongoing",
      "estimated_cost": "varies"
    },
    {
      "id": "org_005",
      "name": "Coral Reef Alliance Campaigns",
      "organization": "Coral Reef Alliance",
      "type": "donation campaigns",
      "focus": ["coral protection"],
      "location": { "type": "global" },
      "frequency": "ongoing",
      "estimated_cost": "donation-based"
    },
    {
      "id": "org_006",
      "name": "Adopt a Coral Fundraiser",
      "organization": "Coral Restoration Foundation",
      "type": "symbolic adoption fundraiser",
      "focus": ["coral reef restoration"],
      "location": { "type": "Florida Keys, USA" },
      "frequency": "ongoing",
      "estimated_cost": "donation-based"
    },
    {
      "id": "org_007",
      "name": "Ocean Conservancy Trash Free Seas Campaign",
      "organization": "Ocean Conservancy",
      "type": "fundraising campaign",
      "focus": ["ocean pollution"],
      "location": { "type": "global" },
      "frequency": "ongoing",
      "estimated_cost": "donation-based"
    },
    {
      "id": "org_008",
      "name": "Surfrider Foundation Fundraising Events",
      "organization": "Surfrider Foundation",
      "type": "community events",
      "focus": ["plastic pollution", "coastal protection"],
      "location": { "type": "USA chapters" },
      "frequency": "recurring",
      "estimated_cost": "varies"
    },
    {
      "id": "org_009",
      "name": "The Ocean Cleanup Donation Campaign",
      "organization": "The Ocean Cleanup",
      "type": "technology fundraiser",
      "focus": ["plastic removal"],
      "location": { "type": "global" },
      "frequency": "ongoing",
      "estimated_cost": "donation-based"
    },
    {
      "id": "org_010",
      "name": "Sea Turtle & Reef Protection Fundraisers",
      "organization": "SEE Turtles",
      "type": "travel + fundraising",
      "focus": ["coral reefs", "marine life"],
      "location": { "type": "international programs" },
      "frequency": "seasonal",
      "estimated_cost": "varies"
    }
  ]
}

export default function Fundraisers() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Fundraiser[]>([]);
  const [search, setSearch] = useState<string>("");
  const [theme, setTheme] = useState<any>();
  const [color, setColor] = useState<string>();

  // Map dataset to Fundraiser interface
  const allFundraisers: Fundraiser[] = dataset.fundraisers.map((f: any) => ({
    id: f.id,
    name: f.name,
    organization: f.organization,
    type: f.type,
    focus: f.focus,
    location: f.location.city 
      ? `${f.location.city}, ${f.location.state}, ${f.location.country}` 
      : f.location.type || 'Various Locations',
    frequency: f.frequency,
    estimated_cost: f.estimated_cost,
    url: '#' // Placeholder URL
  }));

  useEffect(() => {
    getTheme(setTheme, setColor);
  }, [typeof localStorage]);

  useEffect(() => {
    setUser(setCurrentUser);
  }, []);

  useEffect(() => {
    // Initialize with all fundraisers
    setSearchResults(allFundraisers);
  }, []);

  const handleSearch = () => {
    if (!search.trim()) {
      setSearchResults(allFundraisers);
      return;
    }

    setLoading(true);
    // Simulate loading for better UX
    setTimeout(() => {
      const filtered = allFundraisers.filter(fundraiser =>
        fundraiser.name.toLowerCase().includes(search.toLowerCase()) ||
        fundraiser.organization.toLowerCase().includes(search.toLowerCase()) ||
        fundraiser.type.toLowerCase().includes(search.toLowerCase()) ||
        fundraiser.focus.some(f => f.toLowerCase().includes(search.toLowerCase())) ||
        fundraiser.location.toLowerCase().includes(search.toLowerCase()) ||
        fundraiser.frequency.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(filtered);
      setLoading(false);
    }, 300);
  };

  if (!currentUser) {
    return <Splash />;
  }

  if (!theme) return <Splash />;

  return (
    <>
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: theme.backgroundColor,
        }}
        className={theme.className}
      >
        <AppSidebar
          modals={false}
          bg={theme.backgroundColor}
          color={theme.textColor}
        />
        <div
          style={{
            marginLeft: "15%",
            padding: "2rem",
            minHeight: "100vh",
          }}
        >
          <div className="max-w-6xl mx-auto">
            <h1
              className={getColor(color!)}
              style={{
                fontSize: "4vw",
                marginTop: 50,
                marginBottom: 10,
                textAlign: "center"
              }}
            >
              Ocean & Coral Fundraisers
            </h1>
          
            <p
              style={{
                marginBottom: 40,
                maxWidth: "70%",
                textAlign: "center",
                color: "gray",
                fontSize: 14,
                margin: "0 auto 40px auto"
              }}
            >
              Discover local and global fundraisers dedicated to combating ocean pollution and protecting coral reefs. 
              Search by location, organization, or cause to find opportunities to make a difference.
            </p>

            <div className="mb-6 flex gap-4 justify-center">
              <TextField
                style={{ width: "60%" }}
                label="Search fundraisers"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search by name, organization, location, or focus (e.g., San Jose, coral reefs, cleanup)"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff',
                    '& fieldset': {
                      borderColor: '#e5e7eb',
                    },
                    '&:hover fieldset': {
                      borderColor: '#d1d5db',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: color,
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#6b7280',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: color,
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                disabled={loading}
                sx={{
                  backgroundColor: color,
                  '&:hover': { backgroundColor: color }
                }}
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>

            {loading && (
              <div className="flex justify-center items-center py-12">
                <p>loading</p>
                {/* <Lottie animationData={loader} loop={true} className="w-32 h-32" /> */}
              </div>
            )}

            {!loading && searchResults.length > 0 && (
              <div className="space-y-4">
                {searchResults.map((fundraiser) => (
                  <div
                    key={fundraiser.id}
                    className="bg-white/10 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all cursor-pointer hover:border-blue-300 dark:hover:border-blue-600"
                    onClick={() => window.open(fundraiser.url, '_blank')}
                  >
                    <div className="flex flex-col space-y-3">
                      <a
                        href={fundraiser.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white-800 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100 text-xl font-semibold hover:underline"
                        onClick={(e) => e.stopPropagation()}
                        style={{color:"#fff"}}
                      >
                        {fundraiser.name}
                      </a>
                      <div className="text-green-800 dark:text-green-300 text-sm font-medium"
                        style={{color:"lightgreen"}}
                      >
                        {fundraiser.organization} 
                        
                        › {fundraiser.type}
                      </div>
                      <p className="text-gray-900 dark:text-gray-100 text-sm leading-relaxed font-medium"
                      
                        style={{color:"lightgray"}}
                      >
                        {fundraiser.focus.join(', ')} • {fundraiser.location} • {fundraiser.frequency} • {fundraiser.estimated_cost}
                      </p>
                     
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && searchResults.length === 0 && search && (
              <div className="text-center py-12 bg-white/10 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
                <h6 className="text-gray-900 dark:text-gray-100 text-xl font-semibold mb-3">
                  No fundraisers found for "{search}"
                </h6>
                <p className="text-gray-800 dark:text-gray-200 text-base">
                  Try searching with different keywords like organization names, locations, or focus areas (e.g., "cleanup", "coral reefs", "San Jose").
                </p>
              </div>
            )}

            {!search && !loading && searchResults.length > 0 && (
              <div className="text-center py-8 bg-white/10 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h6 className="text-gray-900 dark:text-gray-100 text-lg font-semibold mb-2">
                  Browse All Fundraisers
                </h6>
                <p className="text-gray-800 dark:text-gray-200 text-sm">
                  Use the search bar above to filter fundraisers by location, organization, or cause.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
