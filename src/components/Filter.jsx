import { useState } from "react"
import { FaFilter } from "react-icons/fa"

function Filter ({setOption , option}) {
    return (
        <div className="filter-bar"> 
          <label htmlFor="season-filter" className="filter-label">
        <FaFilter className="filter-icon" />
        <span>Filter:</span>
      </label>          
                <select id="season-filter" className="filter-select" value={option} onChange={(e) => setOption(e.target.value)}>
                    <option value="">All</option>
                    <option value="Temperate">Temperate</option>
                    <option value="Tropical">Tropical</option>
                    <option value="Dry">Dry</option>
                </select>            
        </div>
    )
}

export default Filter;