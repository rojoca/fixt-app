import Link from "next/link";
import SimpleHeader from "../components/simple-header";

export default function FacilitiesLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <div className="min-h-full">
      <SimpleHeader title={"Requirements"}>
        <h2 className="text-2xl text-black">
          <Link href={`/vans`}>Requirements</Link>
        </h2>
      </SimpleHeader>
      <main className="-mt-24 pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Page title</h1>
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-5 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-5">
              {children}
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="border-t border-gray-300 dark:border-yellow-200 py-8 text-center text-sm text-gray-300 dark:text-yellow-200 sm:text-left">
            <span className="block sm:inline">
              &copy; 2023 Waikato Unicol AFC.
            </span>{" "}
            <span className="block sm:inline">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
