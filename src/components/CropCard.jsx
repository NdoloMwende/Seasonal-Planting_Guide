function CropCard({ crop }) {
  return (
    <div className="crop-card" style={{ border: "1px solid orange", margin: "10px", padding: "15px", borderRadius: "8px" }}>
      <img src={crop.image} alt={crop.name} ></img>
      <h3>{crop.name}</h3>
      <p><strong>Season:</strong> {crop.plantingSeason}</p>
      <p><strong>Recommended for:</strong> {crop.location} regions</p>
      <p>{crop.description}</p>
      <p><strong>NOTE</strong> If you are planning to partake in farming {crop.name} it takes about {crop.maturityDays} days to mature </p>
    </div>
  );
}

export default CropCard;
