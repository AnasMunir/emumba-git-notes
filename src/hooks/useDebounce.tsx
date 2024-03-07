import { useEffect, useState } from "react";

function useDebounce(value: string, delay = 800) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(id);
    };
  }, [delay, value]);

  return debouncedValue;
}

export default useDebounce;
