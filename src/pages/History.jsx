import { useEffect, useState } from 'react';
import HistoryCard from '../components/HistoryCards';
import FilterBar from '../components/FilterBar';
import useFilters from '../hooks/useFilter';
import useDeleteWithUndo from '../hooks/useDeleteWithUndo';
import { toast, ToastContainer } from 'react-toastify';

function History() {
 const [rawHistory, setRawHistory] = useState([]);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
    let mounted = true;
    const fetchAll = async () => {
      try {
        const [hRes, cRes] = await Promise.all([
          fetch(`https://seasonal-planting-guide-json-api.onrender.com/history/`),
          fetch(`https://seasonal-planting-guide-json-api.onrender.com/crops/`)
        ]);
        if (!hRes.ok || !cRes.ok) throw new Error("Failed to fetch data");
        const [historyJson, cropsJson] = await Promise.all([hRes.json(), cRes.json()]);

        if (!mounted) return;

        setRawHistory(historyJson);
        setCrops(cropsJson);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch data");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchAll();
    return () => { mounted = false; };
  }, []);

  // build lookup from crops
  const cropLookup = {};
  crops.forEach(c => {
    cropLookup[c.name] = {
      location: c.location || "",
      plantingSeason: c.plantingSeason || ""
    };
  });

  // enrich history items with location + plantingSeason (if available)
  const enrichedHistory = rawHistory.map(h => ({
    ...h,
    location: cropLookup[h.cropName]?.location || "",
    plantingSeason: cropLookup[h.cropName]?.plantingSeason || ""
  }));
  //handle deletion of items from history page
  const handleDelete = useDeleteWithUndo({
  endpoint: 'https://seasonal-planting-guide-json-api.onrender.com/history',
  onSuccess: (id) => setRawHistory(prev => prev.filter(item => item.id !== id))
});


  // use the hook. Use crops as optionsSource so dropdowns reflect all crops
  const {
    searchTerm, setSearchTerm,
    filterLocation, setFilterLocation,
    filterSeason, setFilterSeason,
    filterEarly, setFilterEarly,
    locations, seasons,
    filteredItems
  } = useFilters(enrichedHistory, { optionsSource: crops, enableEarlyFilter: true });

  if (loading) return <p>Loading history...</p>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="history-page">
      <ToastContainer />
      <h1 className="page-title">Harvest History</h1>
      <p className="page-subtitle">A log of all your successfully harvested crops.</p>

      <FilterBar
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        filterLocation={filterLocation} setFilterLocation={setFilterLocation}
        filterSeason={filterSeason} setFilterSeason={setFilterSeason}
        filterEarly={filterEarly} setFilterEarly={setFilterEarly}
        showEarlyFilter={true}
        // show all controls on history page
        showSearch={true} showLocation={true} showSeason={true}
        locations={locations} seasons={seasons}
      />

      {filteredItems.length === 0 ? (
        <p>No matching crops found.</p>
      ) : (
        filteredItems.map(crop => (
          <HistoryCard key={crop.id} crop={crop} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}

export default History;