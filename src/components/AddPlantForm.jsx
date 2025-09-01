import React, { useState } from "react";
import axios from "axios";
import { calculateHarvestDate } from "../utils/harvestUtils";

const AddPlantForm = ({ crop, onClose }) => {
  const [plantingDate, setPlantingDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!crop) {
      alert("No crop selected.");
      return;
    }

    if (!plantingDate) {
      alert("Please choose a planting date.");
      return;
    }

    const parsedDate = new Date(plantingDate);
    if (isNaN(parsedDate)) {
      alert("Invalid planting date.");
      return;
    }

    const formattedPlantingDate = parsedDate.toISOString().split("T")[0];

    const newCrop = {
      name: crop.name,
      plantingDate: formattedPlantingDate,
      harvestDate: calculateHarvestDate(
        formattedPlantingDate,
        crop.maturityDays
      ),
      maturityDays: crop.maturityDays,
      image: crop.image,
      description: crop.description,
    };

    try {
      await axios.post("https://seasonal-planting-guide-json-api.onrender.com/myGarden", newCrop);
      alert(`${crop.name} added to your garden!`);
      onClose?.();
    } catch (err) {
      console.error("Error adding crop:", err.response?.data || err.message);
      alert("Failed to add crop.");
    }   
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2 className="form-title">Add Crop to Garden</h2>

      {/* Show crop name (read-only) */}
      <div className="form-group">
        <label className="form-label">Crop Name:</label>
        <input
          type="text"
          value={crop?.name || ""}
          readOnly
          className="form-input read-only"
        />
      </div>

      {/* Planting date input */}
      <div className="form-group">
        <label className="form-label">
          Planting Date:
        </label>
        <input
          type="date"
          value={plantingDate}
          onChange={(e) => setPlantingDate(e.target.value)}
          required
          className="form-input"
        />      
      </div>

      <div className="card-actions">
        <button
          type="submit"         
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onClose}          
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddPlantForm;
