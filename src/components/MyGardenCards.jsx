import { calculateHarvestDate, isReadyToHarvest } from '../utils/harvestUtils';

function MyGardenCards({ crop, onHarvest, onUpdate }) {
  const expectedHarvestDate = calculateHarvestDate(crop.plantingDate, crop.maturityDays);
  const today = new Date().toISOString().split('T')[0];
  const ready = isReadyToHarvest(expectedHarvestDate);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <img src={crop.image} alt={crop.name} className="w-full h-40 object-cover rounded" />
      <h2 className="text-lg font-semibold mt-2">{crop.name}</h2>
      <p>📅 Planted: {crop.plantingDate}</p>
      <p>🌾 Expected Harvest: {expectedHarvestDate}</p>
      {ready && <span className="text-orange-600 font-bold">🌾 Ready to Harvest</span>}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => {
            const newDate = prompt("Enter new planting date (YYYY-MM-DD):", crop.plantingDate);
            if (newDate) onUpdate(crop.id, newDate, crop.maturityDays);
          }}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Update
        </button>
        <button
          onClick={() => onHarvest(crop, expectedHarvestDate, today)}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          Harvest
        </button>
      </div>
    </div>
  );
}

export default MyGardenCards;
