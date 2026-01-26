import type { ChangeEvent } from "react";
import './InputText.css';

interface InputTextProps {
  onValueChange: (value: string) => void;
}

const InputText = ({ onValueChange }: InputTextProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
  }

  return (
    <input 
      className="input-default"
      type="search"
      placeholder="Search for a country"
      onChange={handleChange}
      />
  );
}

export default InputText;