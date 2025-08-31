// src/components/FilterBar.jsx
import React from "react";
import { FaFilter, FaSearch } from "react-icons/fa";


export default function FilterBar({
  searchTerm, setSearchTerm,
  filterLocation, setFilterLocation,
  filterSeason, setFilterSeason,
  filterEarly, setFilterEarly,
  showSearch = true,
  showLocation = true,
  showSeason = true,
  showEarlyFilter = false,
  locations = [],
  seasons = []
}) {
  return (
    <div className="filter-bar" role="region" aria-label="Filters">
      {showSearch && (
        <div className="filter-input-wrap" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FaSearch className="filter-icon" />
          <input
            type="text"
            placeholder="Search crop name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="filter-input"
          />
        </div>
      )}

      {showLocation && (
        <select
          value={filterLocation}
          onChange={e => setFilterLocation(e.target.value)}
          className="filter-select"
          aria-label="Filter by location"
        >
          <option value="">All Locations</option>
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      )}

      {showSeason && (
        <select
          value={filterSeason}
          onChange={e => setFilterSeason(e.target.value)}
          className="filter-select"
          aria-label="Filter by planting season"
        >
          <option value="">All Seasons</option>
          {seasons.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      )}

      {showEarlyFilter && (
        <label className="filter-early" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={filterEarly}
            onChange={() => setFilterEarly(prev => !prev)}
          />
          <span>Show only harvested early</span>
        </label>
      )}
    </div>
  );
}
