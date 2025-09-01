import { calculateHarvestDate, isReadyToHarvest } from '../utils/harvestUtils';

function MyGardenCards({ crop, onHarvest, onUpdate,onDelete }) {
  const expectedHarvestDate = calculateHarvestDate(crop.plantingDate, crop.maturityDays);
  const today = new Date().toISOString().split('T')[0];
  const ready = isReadyToHarvest(expectedHarvestDate);

  return (
    <div className="card">
     
     <div className="card-image">
  <img src={crop.image} alt={crop.name} />
</div>
      <div className="card-content">
      <h2>{crop.name}</h2>
      <p>📅 Planted: {crop.plantingDate}</p>
      <p>🌾 Expected Harvest: {expectedHarvestDate}</p>
      {ready && <span className="badge">🌾 Ready to Harvest</span>}
      <div className="card-actions">
        <button
          onClick={() => {
            const newDate = prompt("Enter new planting date (YYYY-MM-DD):", crop.plantingDate);
            if (newDate) onUpdate(crop.id, newDate, crop.maturityDays);
          }}
          className="px-3 py-3 bg-primary text-bg rounded-lg border border-primary hover:border-primary scale-up"
        >
          Update
        </button>
        <button
          onClick={() => onHarvest(crop, expectedHarvestDate, today)}
          className="px-3 py-3 bg-accent text-bg rounded-lg border border-primary hover:border-primary scale-up"
        >
          Harvest
        </button>
         <button
          onClick={() => onDelete(crop)}
          className="delete-btn"
        >
          Remove
        </button>
        </div>
      </div>
    </div>
  );
}

export default MyGardenCards;
