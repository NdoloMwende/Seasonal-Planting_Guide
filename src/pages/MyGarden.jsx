import { useEffect, useState } from 'react';
import MyGardenCards from '../components/MyGardenCards';

function MyGarden() {
  const [garden, setGarden] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/garden')
      .then(res => res.json())
      .then(data => setGarden(data));
  }, []);

  const handleHarvest = async (crop, expectedHarvestDate, actualHarvestDate) => {
    const harvestedEarly = new Date(actualHarvestDate) < new Date(expectedHarvestDate);

    const historyEntry = {
      cropName: crop.name,
      plantingDate: crop.plantingDate,
      expectedHarvestDate,
      actualHarvestDate,
      harvestedEarly
    };

    await fetch('http://localhost:3000/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(historyEntry)
    });

    await fetch(`http://localhost:3000/garden/${crop.id}`, {
      method: 'DELETE'
    });

    setGarden(prev => prev.filter(c => c.id !== crop.id));
  };

  return (
    <div>
      <h1>My Garden</h1>
      {garden.map(crop => (
        <MyGardenCards key={crop.id} crop={crop} onHarvest={handleHarvest} />
      ))}
    </div>
  );
}

export default MyGarden;

