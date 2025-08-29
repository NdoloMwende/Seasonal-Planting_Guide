import { useState, useEffect } from 'react';
import CropCard from '../components/CropCard';
import Filter from '../components/Filter'

function Home() {
  // State for saving fetched Data
  const[ cropData, setCropData ] = useState([])
  // Fetching Data through useEffect
  useEffect(() => {
    fetch('http://localhost:3000/crops')
      .then(response => response.json())
      .then(data => setCropData(data))
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
      <div>
        {filteredData.map(crop => (
          <CropCard key={crop.id} crop={crop} />
        ))}
      </div>
    </div>
  );
}

export default Home;
