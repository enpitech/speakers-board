"use client";

import { useState, useEffect } from "react";
import { SpeakersTableView } from "./SpeakersTableView";
import type { Speaker } from "./SpeakersRow";

// This would typically come from an API
const mockSpeakers: Speaker[] = [
  {
    id: "1",
    name: "Dana Harari",
    avatar: "/placeholder.svg?height=100&width=100",
    topics: ["React", "TypeScript", "Tailwind"],
    languages: ["English", "Hebrew", "German"],
    socialLinks: [
      { platform: "linkedin", url: "#" },
      { platform: "spotify", url: "#" },
      { platform: "instagram", url: "#" },
    ],
    rating: 5,
    sessionsUrl: "#",
  },
  {
    id: "2",
    name: "Shalev Amari",
    avatar: "/placeholder.svg?height=100&width=100",
    topics: ["React"],
    languages: ["English", "Hebrew"],
    socialLinks: [
      { platform: "twitter", url: "#" },
      { platform: "tiktok", url: "#" },
      { platform: "facebook", url: "#" },
      { platform: "linkedin", url: "#" },
      { platform: "instagram", url: "#" },
    ],
    rating: 4,
    sessionsUrl: "#",
  },
  {
    id: "3",
    name: "Lana Kochovski",
    avatar: "/placeholder.svg?height=100&width=100",
    topics: ["TypeScript", "Tailwind"],
    languages: ["Hebrew", "Russian"],
    socialLinks: [
      { platform: "facebook", url: "#" },
      { platform: "linkedin", url: "#" },
      { platform: "instagram", url: "#" },
      { platform: "discord", url: "#" },
      { platform: "github", url: "#" },
    ],
    rating: 3,
    sessionsUrl: "#",
  },
  {
    id: "4",
    name: "Mor Desa",
    avatar: "/placeholder.svg?height=100&width=100",
    topics: ["React", "Tailwind"],
    languages: ["English", "Hebrew", "Amharic"],
    socialLinks: [
      { platform: "tiktok", url: "#" },
      { platform: "facebook", url: "#" },
      { platform: "linkedin", url: "#" },
      { platform: "instagram", url: "#" },
    ],
    rating: 5,
    sessionsUrl: "#",
  },
  {
    id: "5",
    name: "Sharon Amsalem",
    avatar: "/placeholder.svg?height=100&width=100",
    topics: ["React", "TypeScript"],
    languages: ["English", "Hebrew", "Spanish"],
    socialLinks: [
      { platform: "twitter", url: "#" },
      { platform: "tiktok", url: "#" },
      { platform: "facebook", url: "#" },
      { platform: "linkedin", url: "#" },
      { platform: "spotify", url: "#" },
      { platform: "instagram", url: "#" },
      { platform: "discord", url: "#" },
      { platform: "github", url: "#" },
    ],
    rating: 4,
    sessionsUrl: "#",
  },
  {
    id: "6",
    name: "Yogel Nahalal",
    avatar: "/placeholder.svg?height=100&width=100",
    topics: ["React", "TypeScript", "Tailwind"],
    languages: ["English", "Hebrew", "Czech"],
    socialLinks: [
      { platform: "tiktok", url: "#" },
      { platform: "facebook", url: "#" },
      { platform: "linkedin", url: "#" },
      { platform: "instagram", url: "#" },
    ],
    rating: 5,
    sessionsUrl: "#",
  },
];

type SpeakersTableProps = {};

export function SpeakersTable({}: SpeakersTableProps) {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchSpeakers = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/speakers')
        // const data = await response.json()

        // Using mock data for now
        setTimeout(() => {
          setSpeakers(mockSpeakers);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching speakers:", error);
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading speakers...</div>;
  }

  return <SpeakersTableView speakers={speakers} />;
}
