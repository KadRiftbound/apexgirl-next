"use client";

/**
 * Module-level singleton cache for /api/vote data.
 * Both NavVoteWidget and MobileNav share this cache,
 * so only ONE network request is made per page session.
 */

type VoteData = {
  artist_name: string;
  votes: number;
};

type RankingsData = {
  this_week: VoteData[];
};

type VoteApiResponse = {
  rankings?: RankingsData;
};

let cache: VoteApiResponse | null = null;
let inFlight: Promise<VoteApiResponse> | null = null;

export async function fetchVoteData(): Promise<VoteApiResponse> {
  if (cache) return cache;
  if (inFlight) return inFlight;

  inFlight = fetch("/api/vote")
    .then((r) => r.json())
    .then((data: VoteApiResponse) => {
      cache = data;
      inFlight = null;
      return data;
    })
    .catch(() => {
      inFlight = null;
      return {};
    });

  return inFlight;
}
