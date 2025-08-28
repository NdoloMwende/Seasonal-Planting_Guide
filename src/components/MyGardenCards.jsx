function MyGardenCards({ plant }) {
  return (
    <div className="garden-card" style={{ border: "1px solid green", margin: "10px", padding: "15px", borderRadius: "8px" }}>
      <h3>{plant.name}</h3>
      <p><strong>Planted On:</strong> {plant.plantingDate}</p>
      <p><strong>Status:</strong> {plant.status}</p>
    </div>
  );
}

export default MyGardenCards;
