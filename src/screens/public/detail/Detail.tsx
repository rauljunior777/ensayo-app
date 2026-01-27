import { useParams } from 'react-router-dom';
import ItemDetail from "../../../components/ItemDetail/ItemDetail";
import { useFetch } from '../../../hooks';
import type { DetailItem } from '../../../interfaces/detail';

const getNativeName = (data: any): string => {
  const natives: any = Object.values(data.name.nativeName);

  // Accedemos al primer idioma disponible (sea spa, eng, etc.)
  if (natives.length > 0) {
    const commonName = natives[0].common;
    return commonName;
  } else return "";
}

const getLanguages = (data: any): string => {
  const translations: any = Object.values(data.languages);
  if (translations.length > 0) {
    return translations.join(", ");
  } else return "";
}

const getCurrencies = (data: any): string => {
  const currencies: any[] = Object.values(data.currencies);
  
  const length: number = currencies.length;
  if (length > 0) {
    const currenciesName: string[] = currencies.map((x) => x.name);
    return currenciesName.join(", ");
  } else return "";
}

const getBorders = (data: any): string[] => {
  const borders: any[] = Object.values(data.borders);
  
  const length: number = borders.length;
  if (length > 0) return borders;
  else return [];
}

const getCountryDescription = (country: any): DetailItem[] => {
  return [
    {
      label: "Native Name",
      description: getNativeName(country)
    },
    {
      label: "Population",
      description: `${country.population}`
    },
    {
      label: "Region",
      description: country.region
    },
    {
      label: "Sub region",
      description: `${country.subregion}`
    },
    {
      label: "Capital",
      description: country.capital[0]
    },
    ////////////////////// SEGUNDA COLUMNA
    {
      label: "Top Level Domain",
      description: ".be"
    },
    {
      label: "Currencies",
      description: getCurrencies(country)
    },
    {
      label: "Languages",
      description: getLanguages(country)
    },
  ];
}


const detailUrl: string = 'https://restcountries.com/v3.1/name/';

export const Detail = () => {
  const { name } = useParams<{ name: string }>();
  const { data, loading, error } = useFetch<any>(`${detailUrl}${name}`);

  if (loading) {
    return <div>Cargando...</div>
  }
  
  if (error) {
    return <div>Hay un error: {error.message}</div>
  }

  console.log("datos detalles", data);
  return (
    <>
      <div className="card-container bg-white dark:bg-dark-blue dark:text-white">
        <div className="image-container">
          <img src={data[0].flags.svg}/>
        </div>
        <div className="detail-container">
          <h1 className="font-bold text-lgp">{name}</h1>
          {getCountryDescription(data[0]).map((item, index) => (
            <ItemDetail key={`item-detail-${name}-${index}`} label={item.label} description={item.description}/>
          ))}
          <p className="font-normal">Border Countries: </p>
            {getBorders(data[0]).map((item) => (
              <div className="border font-light" key={`${name}-borders-${item}`}>{item}</div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Detail;