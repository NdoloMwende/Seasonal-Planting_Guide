// src/hooks/useFilters.js
import { useMemo, useState } from "react";

function splitSeasons(seasonStr) {
  if (!seasonStr) return [];
  // split on commas, then trim (handles "March - June, September - November")
  return seasonStr
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
}

/**
 * items: array to be filtered (crops or enriched history)
 * optionsSource: array to derive unique locations/seasons from (defaults to items)
 * enableEarlyFilter: whether the hook should support "harvested early" logic
 */
export default function useFilters(items = [], { optionsSource = items, enableEarlyFilter = false } = {}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterSeason, setFilterSeason] = useState("");
  const [filterEarly, setFilterEarly] = useState(false);

  const locations = useMemo(() => {
    const set = new Set();
    (optionsSource || []).forEach(it => {
      if (it.location) set.add(it.location);
    });
    return Array.from(set).sort();
  }, [optionsSource]);

  const seasons = useMemo(() => {
    const set = new Set();
    (optionsSource || []).forEach(it => {
      const list = splitSeasons(it.plantingSeason || "");
      list.forEach(s => set.add(s));
    });
    return Array.from(set).sort();
  }, [optionsSource]);

  const filteredItems = useMemo(() => {
    if (!items) return [];
    return items.filter(item => {
      const name = (item.cropName || item.name || "").toLowerCase();
      if (!name.includes(searchTerm.toLowerCase())) return false;

      const isEarly =
        item.actualHarvestDate && item.expectedHarvestDate
          ? new Date(item.actualHarvestDate) < new Date(item.expectedHarvestDate)
          : false;

      if (enableEarlyFilter && filterEarly && !isEarly) return false;
      if (filterLocation && item.location !== filterLocation) return false;

      if (filterSeason) {
        const seasonsList = splitSeasons(item.plantingSeason || "");
        if (!seasonsList.includes(filterSeason)) return false;
      }

      return true;
    });
  }, [items, searchTerm, filterLocation, filterSeason, filterEarly, enableEarlyFilter]);

  return {
    // state + setters
    searchTerm, setSearchTerm,
    filterLocation, setFilterLocation,
    filterSeason, setFilterSeason,
    filterEarly, setFilterEarly,
    // options + result
    locations, seasons,
    filteredItems
  };
}
