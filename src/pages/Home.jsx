import { useState, useEffect } from 'react'

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

  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the landing page.</p>
    </div>
  );
}

export default Home;
