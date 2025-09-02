function HistoryCard({ crop, onDelete }) {
  const harvestedEarly = new Date(crop.actualHarvestDate) < new Date(crop.expectedHarvestDate);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="history-card">
      <div className="history-card-image">
        <img src={crop.image} alt={crop.cropName} />
      </div>

      <div className="history-card-content">
        <h2>{crop.cropName}</h2>
        <p><strong>Planted:</strong> {formatDate(crop.plantingDate)}</p>
        <p><strong>Expected Harvest:</strong> {formatDate(crop.expectedHarvestDate)}</p>
        <p><strong>Actual Harvest:</strong> {formatDate(crop.actualHarvestDate)}</p>

        {harvestedEarly && (
          <span className="harvest-badge">Harvested Early</span>
        )}
        <div className="card-actions">
          <button
            onClick={() => onDelete(crop)}
            className="delete-btn"
          >
            Remove {crop.cropName}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HistoryCard;

