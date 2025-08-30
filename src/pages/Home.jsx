import { useState, useEffect } from 'react';
import { SyncLoader } from 'react-spinners';
import CropCard from '../components/CropCard';
import Filter from '../components/Filter'

function Home() {
  // State for setting loading screen
  const [loading, setLoading] = useState (true);
  // State for saving fetched Data
  const[ cropData, setCropData ] = useState([])
  // Fetching Data through useEffect
  useEffect(() => {
    fetch('http://localhost:5000/crops')
      .then(response => response.json())
      .then(data => {
        setCropData(data)
        setTimeout(() => {
          setLoading(false)
        }, 10000)
      })
      .catch(error => console.error(error))
  }, [])
  // State for filter option
  const [option, setOption] = useState("")
  // Filtering Data based on option selected
    const filteredData = option ? cropData.filter(crop => crop.location === option) : cropData;
  
  return (
    <div>
      <h1>Home Page</h1>
      <Filter setOption={setOption} option={option}/>
      { loading ?
       <SyncLoader
        color={"#36D7B7"}
        loading={loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
        style={{ display: "flex", content: "center", justifyContent: "center", marginTop: "20px" }}
      />
      :
      <div>
        {filteredData.map(crop => (
          <CropCard key={crop.id} crop={crop} />
        ))}
      </div>
      }
    </div>
  );
}

export default Home;
