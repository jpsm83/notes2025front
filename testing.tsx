import { useCallback, useEffect, useState } from "react"

interface IUseFetch<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
    resetData: () => void;
    refetch: () => Promise<void>;
}

export function useFetch<T>(fn: () => Promise<T>): IUseFetch<T> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getData = useCallback(async() => {
        setIsloading(true);
        setError(null);
        try {
            const newData = await fn();
            setData(newData);
        } catch (error) {
            const message = error instanceof Error ? error.message : error;
            setError(message)
        } finally {
            setIsloading(false);
        }
    }, [fn])

    useEffect(() => {
        getData();
    }, []);

    const resetData = useCallback(() => {
        setData(null);
        setIsloading(false);
        setError(null)
    }, []);

    return { data, isLoading, error, resetData, refetch: getData }
}

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

// multiple sorting
const products = [
  { name: "Banana", price: 2 },
  { name: "Apple", price: 2 },
  { name: "Orange", price: 3 },
  { name: "Avocado", price: 2 },
];

products.sort((a, b) =>
  a.price - b.price ||
  (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
);
