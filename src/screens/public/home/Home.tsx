import Card from '../../../components/Card/Card';
import { useFetch } from '../../../hooks';
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

export const Home = () => {
  const { data, loading, error } = useFetch<Country[]>(countriesUrl);

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Hay un error: {error.message}</div>
  }

  console.log("Datos", data);

  return (
    <div className='home-container'>
      {data?.map((item, index) => (
        <Card 
          key={`card-key-${index}`} 
          title={item.name.common}
          urlImage={item.flags.png}
          details={getCountryDescription(item)}
          />
      ))}
    </div>
  );
}


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

export default Home;