interface ItemDetailProps {
  label: string;
  description: string;
}

export const ItemDetail = (props: ItemDetailProps) => {
  return (
    <p className="font-normal">{props.label}: <span className="font-light">{props.description}</span></p>
  );
}

export default ItemDetail;