"use client";

import { Suspense, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompanyFilters, GetFilterResponse } from "@/types/company";
import { CompaniesFilters } from "@/components/custom/filter";
import { CompaniesTable } from "@/components/custom/table";
import { publicApi } from "@/lib/api";

const initialFilters: CompanyFilters = {
  searchGroupId: 0,
  searchCompanyName: null,
  searchVatNumber: null,
  searchActiveId: 0,
  page: 1,
  pageSize: 15,
  availablePageSizes: ["15", "25", "50", "100"],
  draw: null,
  start: 0,
  length: 15,
};

export default function CompaniesPage() {
  const [filters, setFilters] = useState<CompanyFilters>(initialFilters);
  const { data, isLoading, error } = useQuery<GetFilterResponse, Error>({
    queryKey: ["defaultFilters"],
    queryFn: () => publicApi.defaultFilters(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">List of companies</h1>
        <Button className="bg-blue-500">
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <CompaniesFilters
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(initialFilters)}
          availableActiveOptions={data?.data.availableActiveOptions}
          availableGroups={data?.data.availableGroups}
          // key={}
        />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        {data && <CompaniesTable filters={filters} changeFilter={setFilters} />}
      </Suspense>
    </div>
  );
}
