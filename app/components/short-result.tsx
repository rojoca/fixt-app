const RESULT_COLOURS = {
  W: "bg-green-100 text-green-700",
  D: "bg-gray-100 text-gray-700",
  L: "bg-red-100 text-red-700",
};

const LONG = {
  W: "WIN",
  L: "LOSS",
  D: "DRAW",
};

export default function ShortResult({
  result,
  isDefault,
  isLong = false,
}: {
  result: "W" | "D" | "L";
  isDefault: boolean;
  isLong?: boolean;
}) {
  return (
    <span
      className={`text-xs font-bold text-center inline-block ${
        !isLong ? "w-4" : ""
      } relative ${RESULT_COLOURS[result]} bg-transparent`}
    >
      {isLong ? LONG[result] : result}
      {isDefault && !isLong && (
        <sup className="text-xs absolute -top-1 -right-0">*</sup>
      )}
      {isDefault && isLong && " BY DEFAULT"}
    </span>
  );
}
