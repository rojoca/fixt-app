import { useState } from "react";
import { Switch } from "@headlessui/react";

export default function Toggle({ showId }: { showId: string }) {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`
        ${enabled ? "bg-unicol" : "bg-unicol/25"}
        relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-unicol focus:ring-offset-2
      `}
    >
      <span className="sr-only">Show All</span>
      <span
        aria-hidden="true"
        className={`
          ${enabled ? "translate-x-5" : "translate-x-0"},
          pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
        `}
      />
    </Switch>
  );
}
