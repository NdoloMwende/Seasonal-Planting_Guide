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
      await axios.post("http://localhost:3000/myGarden", newCrop);
      alert(`${crop.name} added to your garden!`);
      onClose?.();
    } catch (err) {
      console.error("Error adding crop:", err.response?.data || err.message);
      alert("Failed to add crop.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
      <h2 className="text-lg font-bold mb-2">Add Crop to Garden</h2>

      {/* Show crop name (read-only) */}
      <div className="mb-2">
        <label className="block font-semibold">Crop Name:</label>
        <input
          type="text"
          value={crop?.name || ""}
          readOnly
          className="border p-2 w-full bg-gray-200"
        />
      </div>

      {/* Planting date input */}
      <label className="block mb-2">
        Planting Date:
        <input
          type="date"
          value={plantingDate}
          onChange={(e) => setPlantingDate(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </label>

      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddPlantForm;
