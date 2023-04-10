import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";
import { Result } from "../types";
import ShortResult from "./short-result";

export default function Trend({
  opponent,
  results,
}: {
  opponent: string;
  results: Result[];
}) {
  if (!results || results.length === 0) return null;
  return (
    <div className="text-xs text-gray-400 flex flex-row-reverse items-center gap-x-0.5">
      {results[0]?.result === "L" ||
      (results[1]?.result === "W" && results[0]?.result === "D") ? (
        <ArrowTrendingDownIcon className="w-4 h-4 text-gray-400" />
      ) : (
        <ArrowTrendingUpIcon className="w-4 h-4 text-gray-400" />
      )}
      {results
        ?.slice(0, 5) // only want last 5 results
        ?.map((result, idx) => (
          <span
            className={`${idx < 3 ? "block" : "hidden sm:block"}`}
            key={`${opponent}-result-${idx}`}
          >
            <ShortResult result={result.result} isDefault={result.isDefault} />
          </span>
        ))}
    </div>
  );
}
