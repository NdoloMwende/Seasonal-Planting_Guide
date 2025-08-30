import { useState } from "react";
import AddPlantForm from "../pages/AddPlantForm"

function CropCard({ crop }) {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="crop-card" style={{ border: "1px solid orange", margin: "10px", padding: "15px", borderRadius: "8px" }}>
      <img src={crop.image} alt={crop.name} ></img>
      <h3>{crop.name}</h3>
      <p><strong>Season:</strong> {crop.plantingSeason}</p>
      <p><strong>Recommended for:</strong> {crop.location} regions</p>
      <p>{crop.description}</p>
      <p><strong>NOTE</strong> If you are planning to partake in farming {crop.name} it takes about {crop.maturityDays} days to mature </p>
      <button onClick={() => setShowForm(true)} >Add Crop</button>
      {showForm ? <AddPlantForm crop={crop} onClose={() => setShowForm} /> : null}
    </div>
  );
}

export default CropCard;
