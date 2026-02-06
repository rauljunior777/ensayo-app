import type { DetailItem } from "../../interfaces/detail";
import ItemDetail from "../ItemDetail/ItemDetail";
import './Card.css';

interface CardProps {
  urlImage: string;
  title: string;
  details: DetailItem[];
  onClic: (name: string) => void;
}

export const Card = (props: CardProps) => {
  const handleClic = (): void => {
    props.onClic(props.title);
  }
  
  return (
    <div className="card-container bg-white dark:bg-dark-blue dark:text-white" onClick={handleClic}>
      <div className="card-image-container">
        <img src={props.urlImage}/>
      </div>
      <div className="card-detail-container">
        <h1 className="font-bold text-lgp">{props.title}</h1>
        {props.details.map((item, index) => (
          <ItemDetail key={`item-detail-${props.title}-${index}`} label={item.label} description={item.description}/>
        ))}
      </div>
    </div>
  );
}

export default Card;