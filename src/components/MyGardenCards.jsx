import { calculateHarvestDate } from '../utils/harvestUtils';

function MyGardenCards({ plant, onHarvest }) {

  const expectedHarvestDate = calculateHarvestDate(plant.plantingDate, plant.maturityDays);
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="garden-card" style={{ border: "1px solid green", margin: "10px", padding: "15px", borderRadius: "8px" }}>
      <h3>{plant.name}</h3>
      <p><strong>Planted On:</strong> {plant.plantingDate}</p>
      <p><strong>Status:</strong> {plant.status}</p>
      <button onClick={() => onHarvest(plant, expectedHarvestDate, today)}>
        Harvest
      </button>
    </div>
  );
}

export default MyGardenCards;
