interface ItemDetailProps {
  label: string;
  description: string;
}

export const ItemDetail = (props: ItemDetailProps) => {
  return (
    <p>{props.label}: <span>{props.description}</span></p>
  );
}

export default ItemDetail;