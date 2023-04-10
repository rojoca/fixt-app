"use client";

import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Team } from "../types";
import Link from "next/link";

export default function Header({
  teams,
  title,
  children,
}: { teams: Team[]; title: string } & React.PropsWithChildren) {
  return (
    <Popover as="header" className="bg-unicol pb-24">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative flex items-center justify-center py-5 lg:justify-between">
              {/* Logo */}
              <div className="absolute left-0 flex-shrink-0 lg:static">
                <Link href="/">
                  <span className="sr-only">Your Company</span>
                  <Image
                    width={12}
                    height={12}
                    className="h-6 w-auto"
                    src="/logo.png"
                    alt="Your Company"
                  />
                </Link>
              </div>

              {/* Right section on desktop */}
              <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                <nav className="flex space-x-4">
                  <a
                    href={`/`}
                    className={
                      "rounded-md bg-white text-black dark:text-black bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10"
                    }
                  >
                    This Week
                  </a>
                  {teams.map((team) => (
                    <a
                      key={team.slug}
                      href={`/div/${team.slug}`}
                      className={
                        "rounded-md bg-white text-black bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10"
                      }
                    >
                      {team.abbr}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Search */}
              <div className="min-w-0 flex-1 px-12 lg:hidden">
                <div className="mx-auto w-full max-w-xs">
                  <h1 className="text-xl font-semibold text-center">{title}</h1>
                </div>
              </div>

              {/* Menu button */}
              <div className="absolute right-0 flex-shrink-0 lg:hidden">
                {/* Mobile menu button */}
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-black hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
            </div>
            <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
              <div className="grid grid-cols-3 items-center gap-8">
                <div className="col-span-2">
                  <nav className="flex space-x-4">{children}</nav>
                </div>
                <div>
                  <div className="mx-auto w-full max-w-md"></div>
                </div>
              </div>
            </div>
          </div>

          <Transition.Root as={Fragment}>
            <div className="lg:hidden">
              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
                >
                  <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="pt-3 pb-2">
                      <div className="flex items-center justify-between px-4">
                        <div>
                          <Image
                            width={24}
                            height={24}
                            className="h-8 w-auto"
                            src="/logo.png"
                            alt="Your Company"
                          />
                        </div>
                        <div className="-mr-2">
                          <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        <a
                          href="/"
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                        >
                          This Week
                        </a>
                        {teams.map((team) => (
                          <a
                            key={team.slug}
                            href={`/div/${team.slug}`}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                          >
                            {team.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition.Child>
            </div>
          </Transition.Root>
        </>
      )}
    </Popover>
  );
}
