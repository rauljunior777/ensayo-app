import { useState } from 'react';
import { useFetch } from '../../../hooks';
import Card from '../../../components/Card/Card';
import InputText from '../../../components/Input/InputText/InputText';
import { Select } from '../../../components/Select/Select';
import type { Country } from '../../../interfaces/country';
import type { DetailItem } from '../../../interfaces/detail';
import './Home.css';

const COUNTRY_FIELDS: string[] = [
  "capital",
  "flags", 
  "name",
  "population",
  "region"
];

const countriesUrl = `https://restcountries.com/v3.1/all?fields=${COUNTRY_FIELDS.join(",")}`; 

const getCountryDescription = (country: Country): DetailItem[] => {
  return [
    {
      label: "Population",
      description: `${country.population}`
    },
    {
      label: "Region",
      description: country.region
    },
    {
      label: "Capital",
      description: country.capital[0]
    }
  ];
}

export const Home = () => {
  const { data, loading, error } = useFetch<Country[]>(countriesUrl);

  const [text, setText] = useState("");
  const [regionSelected, setRegionSelected] = useState("");

  if (loading) {
    return <div>Cargando...</div>
  }
  
  if (error) {
    return <div>Hay un error: {error.message}</div>
  }

  const regions: string[] = [...new Set(data?.map((x) => x.region))];
  const filteredItems: Country[] | undefined = data?.filter(x => x.name.common.toLowerCase().includes(text.toLowerCase()) && (!regionSelected || x.region === regionSelected));

  return (
    <>
      <div className='home-row-filter bg-white dark:bg-very-dark-blue dark:text-white'>
        <div className='filter-row'>
          <div className='filter-item'>
            <InputText onValueChange={setText}/>
          </div>
          <div className='filter-item'>
            <Select classNameSelect='select-default' list={regions} onSelect={setRegionSelected}/>
          </div>
        </div>
      </div>

      <div className='home-container bg-white dark:bg-very-dark-blue dark:text-white'>
        {filteredItems?.map((item, index) => (
          <Card 
            key={`card-key-${index}`} 
            title={item.name.common}
            urlImage={item.flags.png}
            details={getCountryDescription(item)}
            />
        ))}
      </div>
    </>
  );
}

export default Home;