import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyGarden() {
  const [garden, setGarden] = useState([]);

  useEffect(() => {
    fetchGarden();
  }, []);

  async function fetchGarden() {
    const res = await fetch("http://localhost:5001/garden");
    const data = await res.json();
    setGarden(data);

    // check harvest readiness
    const today = new Date().toISOString().split("T")[0];
    data.forEach((plant) => {
      if (plant.harvestDate === today) {
        toast.info(`🌾 ${plant.cropName} is ready for harvest today!`);
      }
    });
  }

  async function updatePlantDate(id, newDate, maturityDays) {
    const newHarvestDate = new Date(newDate);
    newHarvestDate.setDate(newHarvestDate.getDate() + maturityDays);

    await fetch(`http://localhost:5001/garden/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plantingDate: newDate,
        harvestDate: newHarvestDate.toISOString().split("T")[0],
      }),
    });

    fetchGarden();
  }

  async function harvestCrop(id, plant) {
    // move crop to history
    await fetch("http://localhost:5001/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plant),
    });

    // remove from garden
    await fetch(`http://localhost:5001/garden/${id}`, { method: "DELETE" });

    fetchGarden();
    toast.success(`✅ ${plant.cropName} moved to history`);
  }

  return (
    <div className="p-6">
      <ToastContainer />

      <h1 className="text-2xl font-bold mb-4">🌱 My Garden</h1>

      {garden.length === 0 ? (
        <p>No crops planted yet. Add some from the home page!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {garden.map((plant) => (
            <div key={plant.id} className="bg-white rounded-lg shadow p-4">
              <img src={plant.image} alt={plant.cropName} className="w-full h-40 object-cover rounded" />
              <h2 className="text-lg font-semibold mt-2">{plant.cropName}</h2>
              <p>📅 Planted: {plant.plantingDate}</p>
              <p>🌾 Harvest: {plant.harvestDate}</p>
              <p className="text-gray-700 mt-2">{plant.description}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    const newDate = prompt("Enter new planting date (YYYY-MM-DD):", plant.plantingDate);
                    if (newDate) updatePlantDate(plant.id, newDate, plant.maturityDays);
                  }}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => harvestCrop(plant.id, plant)}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Harvest
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyGarden;