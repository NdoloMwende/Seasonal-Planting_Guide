function HistoryCards({ crop }) {
  return (
    <div className="history-card" style={{ border: "1px solid #ccc", margin: "10px", padding: "15px", borderRadius: "8px" }}>
      <h3>{crop.name}</h3>
      <p><strong>Planted:</strong> {crop.plantingDate}</p>
      <p><strong>Harvested:</strong> {crop.harvestDate}</p>
    </div>
  );
}

export default HistoryCards;
