import { calculateDaysDifference } from '../utils/harvestUtils';

function HistoryCards({ crop }) {
  const {
    name,
    plantingDate,
    expectedHarvestDate,
    actualHarvestDate,
    location,
    season,
    image
  } = crop;

  // Calculate if harvested early and by how many days
  const daysDifference = calculateDaysDifference(expectedHarvestDate, actualHarvestDate);
  const wasHarvestedEarly = daysDifference > 0;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="history-card">
      <div className="card-header">
        <h3>{image} {name}</h3>
        {wasHarvestedEarly && (
          <span className="badge early-harvest">
            <i className="bi bi-award"></i> Early Harvest (+{daysDifference} days)
          </span>
        )}
      </div>
      
      <div className="card-body">
        <div className="date-info">
          <div className="date-item">
            <span className="label">Planted:</span>
            <span className="value">{formatDate(plantingDate)}</span>
          </div>
          <div className="date-item">
            <span className="label">Expected Harvest:</span>
            <span className="value">{formatDate(expectedHarvestDate)}</span>
          </div>
          <div className="date-item">
            <span className="label">Actual Harvest:</span>
            <span className="value">{formatDate(actualHarvestDate)}</span>
          </div>
        </div>
        
        <div className="meta-info">
          <span className="location-tag">{location}</span>
          <span className="season-tag">{season}</span>
        </div>
      </div>
    </div>
  );
}

export default HistoryCards;