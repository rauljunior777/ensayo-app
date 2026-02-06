import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks';
import ItemDetail from "../../../components/ItemDetail/ItemDetail";
import type { DetailItem } from '../../../interfaces/detail';
import './Detail.css';

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
  if (!data.borders) return [];
  const borders: any[] = Object.values(data.borders);
  
  const length: number = borders.length;
  if (length > 0) return borders;
  else return [];
}

const getColumnLeftDescription = (country: any): DetailItem[] => {
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
  ];
}

const getColumnRightDescription = (country: any): DetailItem[] => {
  return [
    {
      label: "Top Level Domain",
      description: country.tld[0]
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
  const navigate = useNavigate();
  const { name } = useParams<{ name: string }>();
  const { data, loading, error } = useFetch<any>(`${detailUrl}${name}`);

  if (loading) {
    return <div>Cargando...</div>
  }
  
  if (error) {
    return <div>Hay un error: {error.message}</div>
  }

  const handleBack = (): void => {
    navigate(`/`);
  }

  const detailData: any = data[0] as any;

  const renderBorders = () => {
    if (("borders" in detailData)) 
      return getBorders(detailData).map((item) => (
        <div className="default-button default-label btn-back bg-white dark:bg-dark-blue dark:text-white" key={`${name}-borders-${item}`}>{item}</div>
      ));
    return <p className='inline-block'>None</p>;
  };

  return (
    <div>
      <div className='header-container'>
        <button className='default-button btn-back bg-white dark:bg-dark-blue dark:text-white' onClick={handleBack}>
          &#8592; Back
        </button>
      </div>
      <div className="detail-card-container bg-white dark:bg-very-dark-blue dark:text-white">
        <div className="detail-image-container">
          <img src={detailData.flags.svg}/>
        </div>
        <div className="detail-container">
          <h1 className="font-bold text-lgp">{name}</h1>
          <div className="detail-column">
            {getColumnLeftDescription(detailData).map((item, index) => (
              <ItemDetail key={`item-detail-${name}-${index}`} label={item.label} description={item.description}/>
            ))}
          </div>
          <div className="detail-column">
            {getColumnRightDescription(detailData).map((item, index) => (
              <ItemDetail key={`item-detail-${name}-${index}`} label={item.label} description={item.description}/>
            ))}
          </div>
          <p className="font-normal inline-block mr-2">Border Countries: </p>
          {renderBorders()}
        </div>
      </div>
    </div>
  );
}

export default Detail;