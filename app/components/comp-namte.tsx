import { TrophyIcon } from "@heroicons/react/24/outline";
import { Fixture, UnicolFixture } from "../types";
import { COMPETITIONS } from "../utils/constants";
import PlateIcon from "./plate-icon";

export default function CompName({
  fixture,
}: {
  fixture: Fixture | UnicolFixture;
}) {
  const comp = COMPETITIONS.find((c) => c.id === fixture.competitionId);
  if (!comp) return null;

  if (comp.isPlate) {
    return (
      <div className="flex items-center gap-x-2 text-gray-400 text-xs uppercase">
        <PlateIcon className="w-3 h-3" />
        <span className="font-medium">{comp.name}</span>
      </div>
    );
  }

  if (comp.isCup) {
    return (
      <div className="flex items-center gap-x-2 text-yellow-700 text-xs uppercase">
        <TrophyIcon className="w-3 h-3 " />
        <span className="font-medium">{comp.name}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-x-2 text-gray-400 text-xs uppercase">
      <span className="font-medium uppercase">{comp.name}</span>
    </div>
  );
}
