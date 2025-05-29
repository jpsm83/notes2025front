import { useEffect, useState } from "react";

// Debounce hook
export function useDebounce(text: string, delay: number): string | null {
  const [debounce, setDebounce] = useState<string | null>(text);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(text);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return debounce;
}

// Component
export function ExampleInput() {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 800);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value); // Raw input updates immediately
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
      <p>Debounced value: {debouncedValue}</p>
    </div>
  );
}