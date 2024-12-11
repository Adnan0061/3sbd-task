"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CompanyFilters, SelectOption } from "@/types/company";
import { Search, X } from "lucide-react";
import { Label } from "../ui/label";

interface CompaniesFiltersProps {
  filters: CompanyFilters;
  onChange: (filters: CompanyFilters) => void;
  onReset: () => void;
  availableGroups?: SelectOption[];
  availableActiveOptions?: SelectOption[];
}

export function CompaniesFilters({
  filters,
  onChange,
  onReset,
  availableGroups,
  availableActiveOptions,
}: CompaniesFiltersProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div>
        <Label htmlFor="name" className="text-muted-foreground">
          Company name
        </Label>
        <Input
          id="name"
          placeholder="Company name"
          value={filters.searchCompanyName || ""}
          onChange={(e) =>
            onChange({ ...filters, searchCompanyName: e.target.value })
          }
        />
      </div>
      <div>
        <Label className="text-muted-foreground" htmlFor="group">
          Group
        </Label>
        <Select
          value={filters.searchGroupId.toString()}
          onValueChange={(value) =>
            onChange({ ...filters, searchGroupId: parseInt(value) })
          }
        >
          <SelectTrigger id="group">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            {availableGroups?.map((group) => (
              <SelectItem key={group.value} value={group.value}>
                {group.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="vatNumber" className="text-muted-foreground">
          Vat number
        </Label>
        <Input
          id="vatNumber"
          placeholder="VAT number"
          value={filters.searchVatNumber || ""}
          onChange={(e) =>
            onChange({ ...filters, searchVatNumber: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="active" className="text-muted-foreground">
          Active
        </Label>
        <Select
          value={filters.searchActiveId.toString()}
          onValueChange={(value) =>
            onChange({ ...filters, searchActiveId: parseInt(value) })
          }
        >
          <SelectTrigger id="active">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            {availableActiveOptions?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-center items-center gap-2 md:col-span-4">
        <Button onClick={() => onChange(filters)} className="bg-blue-500">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
        <Button variant="outline" onClick={onReset}>
          <X className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>
    </div>
  );
}
