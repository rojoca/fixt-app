import Requirements from "../components/requirements";
import { getDayRequirements } from "../utils/getDayRequirements";

export default async function Page() {
  const dayRequirements = await getDayRequirements();

  return (
    <div className="w-full p-4 rounded-lg bg-white">
      <section className="">
        <h2 className="text-base font-semibold leading-6 text-gray-900 mb-6">
          Upcoming
        </h2>
        <Requirements dayRequirements={dayRequirements} />
      </section>
    </div>
  );
}
