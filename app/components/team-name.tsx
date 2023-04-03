import Image from "next/image";
import { TEAM_MAP } from "../utils/constants";

export default function TeamName({ name }: { name: string }) {
  const unicolName = TEAM_MAP.find((t) => t.key === name)?.name;
  if (unicolName) {
    return (
      <span className="font-semibold inline-flex items-center">
        <span className="inline-block mr-2">
          <Image
            width={12}
            height={12}
            className="h-4 w-auto"
            src="/logo.png"
            alt="Waikato Unicol AFC"
          />
        </span>
        {unicolName}
      </span>
    );
  }

  return <>{name}</>;
}
