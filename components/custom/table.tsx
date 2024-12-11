"use client";

import * as React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CompaniesListResponse, CompanyFilters } from "@/types/company";
import { useQuery } from "@tanstack/react-query";
import { publicApi } from "@/lib/api";
import Image from "next/image";
import Pagination from "./pagination";

interface CompaniesTableProps {
  filters: CompanyFilters;
  changeFilter: (filters: CompanyFilters) => void;
}

export function CompaniesTable({ filters, changeFilter }: CompaniesTableProps) {
  const { data, isLoading, error } = useQuery<CompaniesListResponse, Error>({
    queryKey: ["getCompanies", JSON.stringify(filters)],
    queryFn: () => publicApi.companiesList(filters),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  console.log(Math.ceil((data?.data.recordsTotal || 0) / filters.pageSize));
  return (
    <div className="flex flex-col justify-center items-center">
      <Table className="border rounded-md">
        <TableHeader>
          <TableRow /*key={headerGroup.id}*/>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Vat Number</TableHead>
            <TableHead>Active</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.data && data?.data?.data?.length > 0 ? (
            data?.data.data.map((row) => (
              <TableRow key={row.id} className=" text-muted-foreground">
                <TableCell>
                  <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                    {row.logoThumbnailUrl ? (
                      <Image
                        src={row.logoThumbnailUrl}
                        alt={`${row.name} logo`}
                        className="w-8 h-8 object-contain"
                        width={200}
                        height={200}
                      />
                    ) : (
                      <span className="text-muted-foreground text-xs">
                        No logo
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.groupName}</TableCell>
                <TableCell>{row.vatNumber}</TableCell>
                <TableCell>{row.active}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="w-full h-12 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination data={data} filters={filters} changeFilter={changeFilter} />
    </div>
  );
}
