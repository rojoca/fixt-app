const RESULT_COLOURS = {
  W: "bg-green-100 text-green-700",
  D: "bg-gray-100 text-gray-700",
  L: "bg-red-100 text-red-700",
  B: "bg-gray-100 text-gray-400",
};

const LONG = {
  W: "WIN",
  L: "LOSS",
  D: "DRAW",
  B: "BYE",
};

export default function ShortResult({
  result,
  isDefault,
  isLong = false,
  block = false,
}: {
  result: "W" | "D" | "L" | "B";
  isDefault: boolean;
  isLong?: boolean;
  block?: boolean;
}) {
  return (
    <span
      className={`text-xs font-bold text-center ${!isLong ? "w-4" : ""} ${
        block ? "block" : "inline-block"
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
