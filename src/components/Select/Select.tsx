import type { ChangeEvent } from "react";
import { useState } from "react";

interface SelectProps {
  list: string[];
  onSelect: (value: string) => void;
  classNameSelect?: string;
}

export const Select = ({ classNameSelect, list, onSelect }: SelectProps) => {
  const [value, setValue] = useState<string>("none");
  
  const selectClass = `${classNameSelect ? classNameSelect + ' ' : ''}pr-8`;
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const v = event.target.value;
    setValue(v);
    onSelect(v);
  }

  const handleClear = () => {
    setValue("none");
    onSelect("none");
  }

  return (
    <div className="relative inline-block">
      <select
        className={selectClass}
        onChange={handleChange}
        value={value}
        aria-label="Filter by region"
      >
        <option value="none" key="default-select-key" className="bg-white dark:bg-dark-blue dark:text-black">Filter by region</option>
        {list.map((x, index) => (
          <option value={x} key={`${x}-${index}`} className="bg-white dark:bg-dark-blue dark:text-white">{x}</option>
        ))}
      </select>

      {value !== "none" && (
        <button
          type="button"
          title="Reset"
          aria-label="Reset select"
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
}