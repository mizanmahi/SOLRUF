import { useState, useEffect, useMemo } from "react";

export default function useIsInViewport(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting)
      ),
    []
  );

  useEffect(() => {
    observer.observe(ref.current);
    console.log(isIntersecting);
    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}
