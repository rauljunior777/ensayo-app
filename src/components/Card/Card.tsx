import type { DetailItem } from "../../interfaces/detail";
import ItemDetail from "../ItemDetail/ItemDetail";
import './Card.css';

interface CardProps {
  urlImage: string;
  title: string;
  details: DetailItem[];
}

export const Card = (props: CardProps) => {
  
  return (
    <div className="card-container bg-white dark:bg-dark-blue dark:text-white">
      <div className="image-container">
        <img src={props.urlImage}/>
      </div>
      <div className="detail-container">
        <h1 className="font-bold text-lgp">{props.title}</h1>
        {props.details.map((item, index) => (
          <ItemDetail key={`item-detail-${props.title}-${index}`} label={item.label} description={item.description}/>
        ))}
      </div>
    </div>
  );
}

export default Card;