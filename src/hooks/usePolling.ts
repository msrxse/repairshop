import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function usePolling(ms: number = 60000, searchParam: string | null) {
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Interval running");
      if (!searchParam) {
        console.log("Refreshing data");
        router.refresh();
      }
    }, ms);

    return () => clearInterval(intervalId);

    // router is an object and will make this effect run all the time
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ms, searchParam]);
}
