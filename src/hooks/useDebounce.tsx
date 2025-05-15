import { useEffect, useState } from "react";

const useDebounce = (text: string, delay: number) => {
  const [debounce, setDebounce] = useState<string | null>(text);

  useEffect(() => {
    const timer = setTimeout(() => {
        setDebounce(text)
    }, delay)

    return () => clearTimeout(timer);
  }, [text, delay]);

  return debounce;
};

export default useDebounce;