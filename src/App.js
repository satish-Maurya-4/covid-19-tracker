import React, { useState, useEffect } from 'react'
import AppStats from './AppStats';
import Map from './Map'
import Table from './Table'
import { sortData } from './util';
import LineGraph from './LineGraph';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from '@material-ui/core'
function App() {
  const [countries, setCountries] = useState( [] );
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState( [] );

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) =>{
      setCountryInfo(data);
    })
  }, []);

  useEffect(()=>{
    const getCountriesData = async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data)=>{
        const newCountriesData = data.map((country) =>{
          return(
            {
              name: country.country,  
              value: country.countryInfo.iso2
            }
          )
        })

        const sortedData = sortData(data);
         setCountries(newCountriesData);
         setTableData(sortedData);
         console.log('country data >>>>>>>>', data);
      })
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event)=>{
    const countryCode = event.target.value;
    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all"
                                            : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then((response)=> response.json())
    .then((data)=>{
      setCountry(countryCode);
      setCountryInfo(data);
    })
  };
  console.log('country>>>>>>>', country);
  console.log('country info >>>>>>', countryInfo);
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl>
          <Select variant="outlined" value= { country }
          onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map((country)=>(
                <MenuItem value={ country.value }>{ country.name }</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        </div>
        <div className="app__stats">
        <AppStats title="Coronavius Cases" cases = {countryInfo.todayCases} totalCases={countryInfo.cases}/>
        <AppStats title="Recovered" cases = {countryInfo.todayRecovered} totalCases={countryInfo.recovered} />
        <AppStats title="Deaths" cases={countryInfo.todayDeaths} totalCases={countryInfo.deaths} />
        </div>

        <Map />
        </div>

        <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countriesTableData = { tableData } />
            <h3>Worldwide new cases</h3>
            <LineGraph />
          </CardContent>
        </Card>
    </div>
  );
}

export default App;
