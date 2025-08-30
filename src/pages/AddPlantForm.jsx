import React, { useState, useEffect } from "react";
import axios from "axios";
import { calculateHarvestDate } from "../utils/harvestUtils";

const AddPlantForm = ({ onClose }) => {
  const [crops, setCrops] = useState([]);
  const [selectedCropId, setSelectedCropId] = useState("");
  const [plantingDate, setPlantingDate] = useState("");

  // Fetch available crops from backend
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await axios.get("http://localhost:3000/crops");
        setCrops(res.data);
      } catch (err) {
        console.error("Error fetching crops:", err);
      }
    };
    fetchCrops();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCrop = crops.find(
      (c) => String(c.id) === String(selectedCropId) // ✅ safer match
    );

    if (!selectedCrop) {
      alert("Please select a crop.");
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
      name: selectedCrop.name,
      plantingDate: formattedPlantingDate,
      harvestDate: calculateHarvestDate(
        formattedPlantingDate,
        selectedCrop.maturityDays
      ),
      maturityDays: selectedCrop.maturityDays,
      image: selectedCrop.image,
      description: selectedCrop.description,
    };

    try {
      await axios.post("http://localhost:3000/myGarden", newCrop);
      alert(`${newCrop.name} added to your garden!`);
      onClose?.(); // ✅ only call if exists
    } catch (err) {
      console.error("Error adding crop:", err.response?.data || err.message);
      alert("Failed to add crop.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
      <h2 className="text-lg font-bold mb-2">Add Crop to Garden</h2>

      {/* Crop selection dropdown */}
      <label className="block mb-2">
        Select Crop:
        <select
          value={selectedCropId}
          onChange={(e) => setSelectedCropId(e.target.value)}
          required
          className="border p-2 w-full"
        >
          <option value="">-- Choose a crop --</option>
          {crops.map((crop) => (
            <option key={crop.id} value={crop.id}>
              {crop.name}
            </option>
          ))}
        </select>
      </label>

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
