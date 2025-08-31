import { useState, useEffect } from 'react';
import { SyncLoader } from 'react-spinners';
import CropCard from '../components/CropCard';
import Filter from '../components/Filter'

function Home() {
  // State for setting loading screen
  const [loading, setLoading] = useState (true);
  // State for setting error
  const [error, setError] = useState(null);
  // State for saving fetched Data
  const[ cropData, setCropData ] = useState([])
  // Fetching Data through useEffect with error handling
  useEffect(() => {
    const fetchData = async () => {
      try {
      const res =await fetch('https://seasonal-planting-guide-json-api.onrender.com/crops')
      if (!res.ok) throw new Error ('HTTP error! Status: ${res.status}');
      const data = await res.json();
      setCropData(data)
      }
      catch (error) {
        setError(error.message);
      }
      finally {
        setLoading(false);
      }
      
    }
    fetchData();
  }, [])
  // State for filter option
  const [option, setOption] = useState("")
  // Filtering Data based on option selected
    const filteredData = option ? cropData.filter(crop => crop.location === option) : cropData;
  
    if (loading) {
        return (
          <SyncLoader
            color={"#36D7B7"}
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
        data-testid="loader"
        style={{ display: "flex", content: "center", justifyContent: "center", marginTop: "20px" }}
      />
      )}
      if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>Error: {error}</div>
  return (
    <div>
      <h1>Home Page</h1>
      <Filter setOption={setOption} option={option}/>
      
      <div>
        {filteredData.map(crop => (
          <CropCard key={crop.id} crop={crop} />
        ))}
      </div>
      
    </div>
  );
}

export default Home;
