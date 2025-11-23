"use client";

import React, { useState, useEffect } from "react";
import {
  Firestore,
  limit,
  collection,
  onSnapshot,
  query,
  snapshotEqual,
} from "firebase/firestore";

interface LeaderboardProps {
  db: Firestore | null;
  appId: string;
}

interface ScoreEntry {
  id: string;
  score: number;
  playerName?: string;
  userId?: string;
}

export const Leaderboard = ({ db, appId }: LeaderboardProps) => {
  const [highScores, setHighScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!db || !appId) {
      setLoading(true);
      return;
    }

    const path = `artifacts/${appId}/public/data/basketball_scores`;
    const q = query(collection(db, path), limit(10));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const scores = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() } as ScoreEntry))
          .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
          .reverse();

        setHighScores(scores);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching leaderboard data: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [db, appId]);

  return (
    <div className="w-full md:w-1/3 p-4 bg-white/10 rounded-xl shadow-2xl backdrop-blur-sm border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-yellow-300 border-b border-yellow-300/50 pb-2">
        Global Leaderboard
      </h2>
      {loading ? (
        <p className="text-gray-300">Loading high scores...</p>
      ) : (
        <ol className="space-y-3">
          {highScores.map((entry, index) => (
            <li
              key={entry.id}
              className="flex justify-between items-center text-lg text-gray-100 p-2 bg-gray-700/50 rounded-lg transition hover:bg-gray-600/70"
            >
              <span className="font-mono w-8 text-center text-purple-300 font-extrabold">
                #{index + 1}
              </span>
              <span className="truncate flex-1 ml-2 font-semibold">
                {entry.playerName || `Player ${entry.id.substring(0, 5)}`}
              </span>
              <span className="text-yellow-400 font-extrabold text-xl ml-4">
                {entry.score}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};
