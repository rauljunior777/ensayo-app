import type { ChangeEvent } from "react";

interface SelectProps {
  list: string[];
  onSelect: (value: string) => void;
  classNameSelect?: string;
}

export const Select = ({ classNameSelect, list, onSelect }: SelectProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  }

  return (
    <select className={classNameSelect} onChange={handleChange}>
      <option value="" key="default-select-key" disabled selected>Filter by region</option>
      {list.map((x, index) => (
        <option value={x} key={`${x}-${index}`}>{x}</option>
      ))}
    </select>
  );
}