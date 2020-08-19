import axios from 'axios';

const getCalculations = (searchType, searchInput) => {
    return axios.get(`https://pacific-bayou-21723.herokuapp.com/search/${searchType}/${searchInput}`);
}

export default getCalculations;