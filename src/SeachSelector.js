import React from 'react';

const SearchSelector = ({ searchBy, changeSearchType }) => {
    return (
        <div>
            <label>City</label>
            <input type="radio" name="searchType" value="city" checked={ searchBy === 'city'} onChange={changeSearchType} />
            <label>ZIP Code</label>
            <input type="radio" name="searchType" value="zip" checked={ searchBy === 'zip'} onChange={changeSearchType} />
            <label>Coordinates</label>
            <input type="radio" name="searchType" value="coordinates" checked={ searchBy === 'coordinates'} onChange={changeSearchType} />
        </div>
    );
};

export default SearchSelector;