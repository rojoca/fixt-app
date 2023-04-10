import { MapPinIcon, TruckIcon } from "@heroicons/react/24/outline";
import { UnicolFixture } from "../types";

export default function Venue({ fixture }: { fixture: UnicolFixture }) {
  return (
    <div className="mt-2 flex items-start sm:items-center text-gray-500">
      <div>
        {fixture.isUnicol && fixture.isFar ? (
          <TruckIcon
            className="mr-1.5 h-4 w-4 flex-shrink-0 text-red-700"
            aria-hidden="true"
          />
        ) : (
          <MapPinIcon
            className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-300"
            aria-hidden="true"
          />
        )}
      </div>
      <div>{fixture.VenueName}</div>
    </div>
  );
}
