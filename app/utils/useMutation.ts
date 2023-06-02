"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function useMutation<T>(asyncMutateFn: () => Promise<T>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const onChange = async () => {
    setIsFetching(true);
    // Mutate external data source
    await asyncMutateFn();
    setIsFetching(false);

    startTransition(() => {
      // Refresh the current route:
      // - Makes a new request to the server for the route
      // - Re-fetches data requests and re-renders Server Components
      // - Sends the updated React Server Component payload to the client
      // - The client merges the payload without losing unaffected
      //   client-side React state or browser state
      router.refresh();

      // Note: If fetch requests are cached, the updated data will
      // produce the same result.
    });
  };

  return {
    isMutating: isFetching || isPending,
    onChange,
  };
}
