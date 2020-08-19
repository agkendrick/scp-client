import React, { useState, useEffect } from 'react';
import './App.css';
import Search from './Search';
import getCalculations from './calcService';

function App() {

  const [calculations, setCalculations] = useState(null);
  const [lastSearched, setLastSearched] = useState(['', ''])

  useEffect(() => {
    
    (async () => {
      try {
        const { data: { mean, median, mode } } = await getCalculations('coordinates', '30.2240897:-92.01984270000003');
        setCalculations([mean, median, mode]);
        setLastSearched(['coordinates' , ['30.2240897', '-92.01984270000003']]);
      }
      catch(e)
      {
        console.log('Error setting calculations: ' + e.message);
        throw e;
      }
    })();

  }, []);
  
  return (
    <div className="App">
      { calculations && 
        <React.Fragment>
          <div>
            <h1>Showing calculations for </h1>{ formatLastSearched(lastSearched) }
          </div>
          <div>
            <h1>Mean:</h1> { calculations[0] }
          </div>
          <div>
            <h1>Median:</h1> { calculations[1] }
          </div>
          <div>
            <h1>Mode(s):</h1> { calculations[2].join(', ') }
          </div>
        </React.Fragment>
      }
      <Search setLastSearched={ setLastSearched } setCalculations={ setCalculations } />
    </div>
  );
}

const formatLastSearched = ([searchType, searchValue]) => {
  let text = '';
  switch(searchType) {
    case 'city':
      text = `City: ${searchValue}`;
      break;
    case 'zip':
      text = `ZIP Code: ${searchValue}`;
      break;
    case 'coordinates':
      text = `Lat: ${searchValue[0]} Lon: ${searchValue[1]}`;
        break;
    default:
  }

  return `${text}`;
}

export default App;
