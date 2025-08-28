function CropCard({ crop }) {
  return (
    <div className="crop-card" style={{ border: "1px solid orange", margin: "10px", padding: "15px", borderRadius: "8px" }}>
      <h3>{crop.name}</h3>
      <p><strong>Season:</strong> {crop.season}</p>
      <p><strong>Best Planting Time:</strong> {crop.bestPlantingTime}</p>
    </div>
  );
}

export default CropCard;
