import { useState } from "react";
import AddPlantForm from "./AddPlantForm";

function CropCard({ crop }) {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="card">
      <div className="card-image">
      <img src={crop.image} alt={crop.name} />
      <span className="badge badge-overlay">{crop.plantingSeason}</span>
      </div>
      <div className="card-content">
      <h3>{crop.name}</h3>     
      <p><strong>Recommended for:</strong> {crop.location} regions</p>
      <p>{crop.description}</p>
      <p><strong>NOTE</strong> If you are planning to partake in farming {crop.name} it takes about {crop.maturityDays} days to mature </p>
      <div className="card-actions">
      <button onClick={() => setShowForm(true)} >Add Crop</button>
      </div>
      {showForm && (
  <div className="modal-overlay" onClick={() => setShowForm(false)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <AddPlantForm crop={crop} onClose={() => setShowForm(false)} />
    </div>
  </div>
)}

    </div>
    </div>
  );
}

export default CropCard;
