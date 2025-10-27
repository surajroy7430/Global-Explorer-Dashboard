import { useState, useEffect } from "react";

const FAVORITES_KEY = "global-explorer-favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (countryCode) => {
    setFavorites((prev) =>
      prev.includes(countryCode)
        ? prev.filter((code) => code !== countryCode)
        : [...prev, countryCode]
    );
  };

  const isFavorite = (countryCode) => favorites.includes(countryCode);

  return { favorites, toggleFavorite, isFavorite };
};
