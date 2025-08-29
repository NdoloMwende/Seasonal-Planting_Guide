import { calculateHarvestDate } from '../utils/harvestUtils';

const MyGardenCards = ({ crop, onHarvest }) => {
  const expectedHarvestDate = calculateHarvestDate(crop.plantingDate, crop.maturityDays);
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="garden-card">
      <h3>{crop.name}</h3>
      <p>Planted: {crop.plantingDate}</p>
      <p>Expected Harvest: {expectedHarvestDate}</p>
      <button onClick={() => onHarvest(crop, expectedHarvestDate, today)}>
        Harvest
      </button>
    </div>
  );
};

export default MyGardenCards;


