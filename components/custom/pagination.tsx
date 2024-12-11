import { CompaniesListResponse, CompanyFilters } from "@/types/company";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

interface CompaniesTableProps {
  data?: CompaniesListResponse;
  filters: CompanyFilters;
  changeFilter: (filters: CompanyFilters) => void;
}
export default function Pagination({
  data,
  filters,
  changeFilter,
}: CompaniesTableProps) {
  return (
    <div className="w-full pt-6 px-4 flex items-center justify-between gap-2">
      <div className="w-fit flex justify-center items-center gap-2">
        <p className="text-muted-foreground text-xs whitespace-nowrap">
          Row per page
        </p>
        <Select
          value={filters.pageSize.toString()}
          onValueChange={(value) =>
            changeFilter({
              ...filters,
              pageSize: parseInt(value),
              length: parseInt(value),
            })
          }
        >
          <SelectTrigger id="page-size" className="bg-muted h-8 w-11 px-1.5">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            {filters?.availablePageSizes.map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">
          {(filters.page - 1) * filters.length + 1} -{" "}
          {(data?.data.recordsTotal || 0) < filters.page * filters.length
            ? data?.data.recordsTotal
            : filters.page * filters.length}{" "}
          of {data?.data.recordsTotal} items
        </p>
      </div>
      <div className="flex items-center justify-between gap-2">
        <Button
          variant={"ghost"}
          className="text-muted-foreground rounded p-1"
          onClick={() =>
            changeFilter({
              ...filters,
              page: filters.page - 1,
              start: filters.start - filters.length,
            })
          }
          disabled={filters.page == 1}
        >
          {"<"}
        </Button>
        <div className="flex items-center gap-1">
          {[
            ...Array(
              Math.ceil((data?.data.recordsTotal || 0) / filters.pageSize)
            ).keys(),
          ].map((i) => (
            <Button
              variant={"ghost"}
              className={`px-2 h-6 text-xs ${
                filters.page == i + 1
                  ? "bg-blue-500 text-white"
                  : "text-muted-foreground"
              }`}
              key={i}
              onClick={() =>
                changeFilter({
                  ...filters,
                  page: i + 1,
                  start: filters.pageSize * i,
                })
              }
            >
              {i + 1}
            </Button>
          ))}
        </div>
        <Button
          variant={"ghost"}
          className="text-muted-foreground rounded p-1"
          onClick={() =>
            changeFilter({
              ...filters,
              page: filters.page + 1,
              start: filters.start + filters.length,
            })
          }
          disabled={
            filters.page ==
            Math.ceil((data?.data.recordsTotal || 0) / filters.pageSize)
          }
        >
          {">"}
        </Button>
        {/* <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button> */}
      </div>
    </div>
  );
}
