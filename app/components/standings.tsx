import { Standings, Team } from "../types";
import Image from "next/image";

const goalDiffFormat = Intl.NumberFormat("en-NZ", {
  signDisplay: "exceptZero",
});

export default function StandingsTable({
  team,
  standings,
  teams,
}: {
  team: Team;
  standings: Standings[];
  teams: Team[];
}) {
  return (
    <table className="table divide-y divide-gray-300 w-full">
      <thead>
        <tr className="">
          <th
            scope="col"
            className="py-3.5 pl-2 pr-0 text-left text-sm font-semibold text-gray-900 w-auto"
          >
            Team
          </th>
          <th
            scope="col"
            className="px-2 py-3.5 text-center text-sm font-semibold text-gray-900"
          >
            <abbr title="Matches">M</abbr>
          </th>
          <th
            scope="col"
            className="px-2 py-3.5 text-center text-sm font-semibold text-gray-900"
          >
            <abbr title="Wins">W</abbr>
          </th>
          <th
            scope="col"
            className="px-2 py-3.5 text-center text-sm font-semibold text-gray-900"
          >
            <abbr title="Draws">D</abbr>
          </th>
          <th
            scope="col"
            className="px-2 py-3.5 text-center text-sm font-semibold text-gray-900"
          >
            <abbr title="Losses">L</abbr>
          </th>
          <th
            scope="col"
            className="px-2 py-3.5 text-center text-sm font-semibold text-gray-900"
          >
            <abbr title="Goal Difference">G</abbr>
          </th>
          <th
            scope="col"
            className="py-3.5 pl-2 pr-2 text-center text-sm font-semibold text-gray-900"
          >
            <abbr title="Points">P</abbr>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {standings.map((row: Standings) => {
          const unicolTeam = teams.find((t) => t.key === row.TeamName);
          const isTeam = row.TeamName === team.key;

          return (
            <tr
              key={row.TeamId}
              className={`divide-gray-200 text-gray-900 ${
                isTeam
                  ? "bg-unicol font-semibold"
                  : unicolTeam
                  ? "bg-unicol/10"
                  : "text-gray-900"
              }`}
            >
              <td className="text-ellipsis py-4 pl-2 pr-0 text-xs w-auto leading-6">
                {unicolTeam && (
                  <span className="inline-block mr-2 -mb-1">
                    <Image
                      width={12}
                      height={12}
                      className="h-4 w-auto"
                      src="/logo.png"
                      alt="Your Company"
                    />
                  </span>
                )}
                {(isTeam
                  ? team.name
                  : unicolTeam
                  ? unicolTeam.name
                  : row.TeamName
                ).replace(" Southern Conference", "")}
              </td>
              <td className="whitespace-nowrap p-2 text-xs text-gray-500 text-center">
                {row.Played}
              </td>
              <td className="whitespace-nowrap p-2 text-xs text-gray-500 text-center">
                {row.Wins}
              </td>
              <td className="whitespace-nowrap p-2 text-xs text-gray-500 text-center">
                {row.Draws}
              </td>
              <td className="whitespace-nowrap p-2 text-xs text-gray-500 text-center">
                {row.Losses}
              </td>
              <td className="whitespace-nowrap p-2 text-xs text-gray-500 text-center">
                {goalDiffFormat.format(
                  Number(row.ForPoints) - Number(row.AgainstPoints)
                )}
              </td>
              <td className="whitespace-nowrap p-2 text-xs text-gray-500 text-center">
                {row.StandingPoints}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
