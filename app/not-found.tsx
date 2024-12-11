import Link from "next/link";
import React from "react";

export default function notFound() {
  return (
    <div className="h-full w-full p-6 space-y-6 flex flex-col justify-center items-center">
      <h3>Page not found. go to companies list page</h3>
      <Link
        href={"/business/companies"}
        className="px-6 py-2 rounded-md bg-blue-500 text-white"
      >
        Go To Companies List page
      </Link>
    </div>
  );
}
