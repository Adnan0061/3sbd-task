"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Check, Pencil, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CompaniesListResponse,
  Company,
  CompanyFilters,
  GetFilterResponse,
} from "@/types/company";
import { useQuery } from "@tanstack/react-query";
import { publicApi } from "@/lib/api";

const columns: ColumnDef<Company>[] = [
  {
    id: "logo",
    header: "LOGO",
    cell: ({ row }) => (
      <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
        {row.original.logoThumbnailUrl ? (
          <img
            src={row.original.logoThumbnailUrl}
            alt={`${row.original.name} logo`}
            className="w-8 h-8 object-contain"
          />
        ) : (
          <span className="text-muted-foreground text-xs">No logo</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          NAME
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "groupName",
    header: "GROUP",
  },
  {
    accessorKey: "vatNumber",
    header: "VAT NUMBER",
  },
  {
    accessorKey: "active",
    header: "ACTIVE",
    cell: ({ row }) =>
      row.original.active ? (
        <Check className="ml-4 text-green-500" />
      ) : (
        <X className="ml-4 text-red-500" />
      ),
  },
  {
    id: "actions",
    cell: () => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

interface CompaniesTableProps {
  filters: CompanyFilters;
  changeFilter: (filters: CompanyFilters) => void;
}

export function CompaniesTable({ filters, changeFilter }: CompaniesTableProps) {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: filters.page - 1,
    pageSize: filters.length,
  });
  const { data, isLoading, error } = useQuery<CompaniesListResponse, Error>({
    queryKey: ["getCompanies2", filters],
    queryFn: () => publicApi.companiesList(filters),
  });

  const table = useReactTable({
    data: data?.data.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // onPaginationChange: setPagination,
    // state: {
    //   pagination,
    // },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  console.log(table.getPageCount());
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                  // <TableHead>Logo</TableHead>
                  // <TableHead>Name</TableHead>
                  // <TableHead>Group</TableHead>
                  // <TableHead>Vat Number</TableHead>
                  // <TableHead>Active</TableHead>
                  // <TableHead></TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center gap-2">
        {/* <button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button> */}
        <button
          className="border rounded p-1"
          onClick={() => changeFilter(filters.page - 1)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <div className="flex items-center gap-1">
          {/* <div>Page</div> */}
          {/* <strong> */}
          {/* {table.getState().pagination.pageIndex + 1} of{" "} */}
          {[...Array(table.getPageCount()).keys()].map((i) => (
            <Button key={i}>{i + 1}</Button>
          ))}
          {/* </strong> */}
        </div>
        <button
          className="border rounded p-1"
          onClick={() => changeFilter({ ...filters, page: filters.page + 1 })}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        {/* <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button> */}
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
