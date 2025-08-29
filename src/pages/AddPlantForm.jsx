import { useState } from "react";

function AddPlantForm({ crop, onClose }) {
  const [plantingDate, setPlantingDate] = useState("");
  const [error, setError] = useState("");

  function calculateHarvestDate(date) {
    const d = new Date(date);
    d.setDate(d.getDate() + crop.maturityDays);
    return d.toISOString().split("T")[0]; // YYYY-MM-DD
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!plantingDate) {
      setError("Please select a planting date");
      return;
    }

    const harvestDate = calculateHarvestDate(plantingDate);

    const newPlant = {
      cropName: crop.name,
      description: crop.description,
      image: crop.image,
      maturityDays: crop.maturityDays,
      plantingDate,
      harvestDate,
    };

    try {
      await fetch("http://localhost:5001/garden", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlant),
      });
      onClose();
    } catch (err) {
      console.error("Error saving crop:", err);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-96 shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Add {crop.name}</h2>

        {error && <p className="text-red-500">{error}</p>}

        <label className="block mb-2">
          Planting Date:
          <input
            type="date"
            value={plantingDate}
            onChange={(e) => setPlantingDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </label>

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
            Add Crop
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPlantForm;