import { UnicolFixture } from "../types";
import Venue from "./venue";

export default function FixtureMeta({
  fixture,
  showDate = true,
  showVenue = true,
}: {
  fixture: UnicolFixture;
  showDate?: boolean;
  showVenue?: boolean;
}) {
  return (
    <div className="mt-2 flex flex-row justify-between text-xs sm:text-sm">
      {showVenue && (
        <div className="flex justify-between sm:justify-start">
          <Venue fixture={fixture} />
        </div>
      )}
      {showDate && (
        <div className="mt-2 flex flex-row flex-wrap items-center text-right text-gray-500 sm:mt-0 justify-end gap-x-1">
          <time className="whitespace-nowrap ml-2" dateTime={fixture.Date}>
            {fixture.dateString},
          </time>
          <time className="whitespace-nowrap" dateTime={fixture.Date}>
            {fixture.timeString}
          </time>
        </div>
      )}
    </div>
  );
}
