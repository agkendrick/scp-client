import React, { useState } from 'react';
import getCalculations from './calcService';
import SearchSelector from './SeachSelector';

const Search = ({ setLastSearched, setCalculations, setLoading }) => {

    const [input, setInput] = useState({'zip': '', 'city': '', 'coordinates': ['', '']});
    const [searchBy, setSearchBy] = useState('city');

    const setSearchField = (inputType, txt) => {
        
        const newState = {...input};

        switch(inputType) {
            case 'city':
                newState[inputType] = txt;
                setInput(newState);
                break;
            case 'zip':
                newState[inputType] = txt;
                setInput(newState);
                break;
            case 'lat':
                newState['coordinates'][0] = txt;
                setInput(newState);
                break;
            case 'lon':
                newState['coordinates'][1] = txt;
                setInput(newState);
                break;
            default:
        }
    }

    const submit = async () => {
        try {
            let searchString = input[searchBy];

            if(!searchString)
                return alert('Missing input!');

            if(searchBy === 'coordinates') {
                const [lat, lon] = input[searchBy];

                if(!lat || !lon)
                    return alert('Missing input!');

                searchString = `${input[searchBy][0]}:${input[searchBy][1]}`;
            }

            setLoading(true);
            const { data: { mean, median, mode } } = await getCalculations(searchBy, searchString);
            setLoading(false);
            setCalculations([mean, median, mode]);
            setLastSearched([searchBy , input[searchBy]]);
          }
          catch(e)
          {
            alert('Error setting calculations: ' + e.message);
          }
    }

    const changeSearchType = ({ target: { value } }) => setSearchBy(value);

    const { zip, city, coordinates } = input;

    return (
        <React.Fragment>
            <h3>Search By</h3>
            <SearchSelector searchBy={ searchBy } changeSearchType={ changeSearchType } />
            <div>
                { searchBy === 'city' && 
                    <div>
                        <input type="text" value={ city } onChange={ ({target: { value }}) => setSearchField( 'city', value) } />
                    </div> 
                }
                { searchBy === 'zip' && 
                    <div>
                        <input type="text" value={ zip } onChange={ ({target: { value }}) => setSearchField( 'zip', value) } />
                    </div> 
                }
                { searchBy === 'coordinates' && 
                    <div>
                        <label>Latitude: </label>
                        <input type="text" value={ coordinates[0] } onChange={ ({target: { value }}) => setSearchField( 'lat', value) } />
                        <label>Longitude: </label>
                        <input type="text" value={ coordinates[1] } onChange={ ({target: { value }}) => setSearchField( 'lon', value) } />
                    </div>
                }
                <button onClick={ submit }>Search!</button>
            </div>
        </React.Fragment>
    )  
}

export default Search;