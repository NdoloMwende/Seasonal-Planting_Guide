import { useEffect, useState } from 'react';
import MyGardenCards from '../components/MyGardenCards';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { calculateHarvestDate, isReadyToHarvest } from '../utils/harvestUtils';
import useDeleteWithUndo from '../hooks/useDeleteWithUndo';

function MyGarden() {
  const [garden, setGarden] = useState([]);

  useEffect(() => {
    fetchGarden();
  }, []);

  const fetchGarden = async () => {
    try {
    const res = await fetch('https://seasonal-planting-guide-json-api.onrender.com/myGarden');
     if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();
    setGarden(data);

    
    data.forEach(crop => {
      const expectedHarvestDate = calculateHarvestDate(crop.plantingDate, crop.maturityDays);
      if (isReadyToHarvest(expectedHarvestDate)) {
      toast.info(` ${crop.name} is ready for harvest!`);

      }
    });
  } catch (error) {
    console.error("Error fetching garden data:", error);
    toast.error("Failed to load garden data. Please try again later.");
  }
  };

  const handleHarvest = async (crop, expectedHarvestDate, actualHarvestDate) => {
    const harvestedEarly = new Date(actualHarvestDate) < new Date(expectedHarvestDate);
     
  

    const historyEntry = {
  cropName: crop.name,
  plantingDate: crop.plantingDate,
  expectedHarvestDate,
  actualHarvestDate,
  harvestedEarly,
  image: crop.image,
  description: crop.description,
  location: crop.location,
  plantingSeason: crop.plantingSeason
};

    try {
      const historyRes = await fetch('https://seasonal-planting-guide-json-api.onrender.com/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(historyEntry)
      });
      if (!historyRes.ok) throw new Error(`HTTP error! Status: ${historyRes.status}`);

      const deleteRes = await fetch(`https://seasonal-planting-guide-json-api.onrender.com/myGarden/${crop.id}`, {
        method: 'DELETE'
      });
      if (!deleteRes.ok) throw new Error(`HTTP error! Status: ${deleteRes.status}`);

      toast.success(` ${crop.name} moved to history`);
      fetchGarden();
    } catch (error) {
      console.error(" Harvest action failed:", error);
      toast.error("Failed to move crop to history.");
    }
  };

    const handleDelete = useDeleteWithUndo({
    endpoint: 'https://seasonal-planting-guide-json-api.onrender.com/myGarden',
    onSuccess: (id) => {
      setGarden((prev) => prev.filter((crop) => crop.id !== id));
    }
  });

  const handleUpdate = async (id, newDate, maturityDays) => {
  const newHarvestDate = calculateHarvestDate(newDate, maturityDays);

  try {
    const res = await fetch(`https://seasonal-planting-guide-json-api.onrender.com/myGarden/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plantingDate: newDate,
        harvestDate: newHarvestDate
      })
    });

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    toast.success(`Planting date updated`);
    fetchGarden();
  } catch (error) {
    console.error("Update planting date failed:", error);
    toast.error("Failed to update planting date.");
  }
};
   return (
    <div className="garden-container">
      <ToastContainer />
      <h1 className="page-title">My Garden</h1>
      {garden.length === 0 ? (
        <p className="empty-message">No crops planted yet. Add some from the home page!</p>
      ) : (
        <div className="card-grid">
          {garden.map(crop => (
            <MyGardenCards
              key={crop.id}
              crop={crop}
              onHarvest={handleHarvest}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default MyGarden;
