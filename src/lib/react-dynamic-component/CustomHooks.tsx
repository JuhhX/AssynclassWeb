import {useState} from "react";

export default function usePress() : [value: string, setValue: Function] {
  const [currentValue, setCurrentValue] = useState<string>("");

  function setValue(newValue : string){
    setCurrentValue(newValue + Math.random());
  }

  return [currentValue, setValue];
}