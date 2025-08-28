import { useState } from "react";

function AddPlantForm({ onAddPlant }) {
  const [name, setName] = useState("");
  const [plantingDate, setPlantingDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !plantingDate) return;
    
    const newPlant = {
      id: Date.now(),
      name,
      plantingDate,
      status: "Growing"
    };

    onAddPlant(newPlant);

    // reset form
    setName("");
    setPlantingDate("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px", padding: "15px", border: "1px solid #aaa", borderRadius: "8px" }}>
      <h3>Add a New Plant</h3>
      <div>
        <input 
          type="text" 
          placeholder="Plant name" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
        />
      </div>
      <div>
        <input 
          type="date" 
          value={plantingDate}
          onChange={(e) => setPlantingDate(e.target.value)} 
        />
      </div>
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default AddPlantForm;
