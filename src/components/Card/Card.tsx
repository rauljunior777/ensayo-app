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
    <div className="card-container">
      <div className="image-container">
        <img src={props.urlImage} height="300"/>
      </div>
      <div className="detail-container">
        <h2>{props.title}</h2>
        {props.details.map((item, index) => (
          <ItemDetail key={`item-detail-${index}`} label={item.label} description={item.description}/>
        ))}
      </div>
    </div>
  );
}

export default Card;