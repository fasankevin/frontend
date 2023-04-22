import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Search = () => {

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [searchQuery, setSearchQuery] = useState('');
  const [country, setCountry] = useState();
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    const options = {
      method: 'GET',
      url:'https://backend-hqpu.onrender.com/results',
      params: {search : searchQuery}
    }

    axios.request(options).then((response) => {
      setLoading(false)
      setCountry(response.data[0]);
    })

  };

    return (
        <>
        
        <div className='search-container'>
            <div className='input-button-container'>
                <input type='text' placeholder='Enter Country'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}/>       
                <button onClick={handleSearch}>Search</button>
            </div>
            {country && !loading && (
                          <div className='country-container'>
                          <p>
                              <span>Capital:</span>{country.capital[0]}
                          </p>
                          <p>
                              <span>Population:</span>{numberWithCommas(country.population)}
                          </p>
                          <p>
                              <span>Currency:</span>{Object.keys(country.currencies)}
                          </p>
                          <p>
                              <span>Continent:</span>{country.continents}
                          </p>
                          <div className='flag-container'>
                          <p>
                          </p> <img src={country.flags.png} alt = "Flag of Searched Country"/>
                          </div>
                      </div>
            )}
            {loading && <h2 className='loading'>Loading...</h2>} 
  
            {!country && !loading && (
              <h4>Search for information about any Country in the World!</h4>)}
        </div>
        </>
    )
}

export default Search