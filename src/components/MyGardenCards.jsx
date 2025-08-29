import { calculateHarvestDate,isReadyToHarvest} from '../utils/harvestUtils';

function MyGardenCards({ crop, onHarvest }) {

  const expectedHarvestDate = calculateHarvestDate(crop.plantingDate, crop.maturityDays);
  const today = new Date().toISOString().split('T')[0];
   const ready = isReadyToHarvest(expectedHarvestDate);

  return (
    <div className="garden-card" style={{ border: "1px solid green", margin: "10px", padding: "15px", borderRadius: "8px" }}>
      <h3>{crop.name}</h3>
      <p><strong>Planted On:</strong> {crop.plantingDate}</p>
      <p><strong>Status:</strong> {crop.status}</p>
      <p><strong>Expected Harvest:</strong> {expectedHarvestDate}</p>
      {ready && <span style={{ color: "orange", fontWeight: "bold" }}>🌾 Ready to Harvest</span>}
      <button onClick={() => onHarvest(crop, expectedHarvestDate, today)}>
        Harvest
      </button>
    </div>
  );
}

export default MyGardenCards;