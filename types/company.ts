export interface Company {
  groupId: number;
  groupName: string;
  name: string;
  address: string;
  factoryAddress: string;
  remarks: string;
  contactNo: string;
  email: string;
  logoId: null | number;
  webURL: string;
  prefix: string;
  vatNumber: string;
  active: boolean;
  numberOfBrands: number;
  logoThumbnailUrl: string;
  locales: any[];
  availableGroups: any[];
  id: number;
}

export interface CompanyFilters {
  searchGroupId: number;
  searchCompanyName: string | null;
  searchVatNumber: string | null;
  searchActiveId: number;
  page: number;
  pageSize: number;
  availablePageSizes: string[]; // Array of strings representing page size options
  draw: number | null;
  start: number;
  length: number;
}

export interface SelectOption {
  disabled: boolean;
  group: string | null;
  selected: boolean;
  text: string;
  value: string;
}

export interface ApiResponse {
  message: string | null;
  errors: string[];
  validationErrors: Record<string, string>;
}

export interface GetFilterResponse extends ApiResponse {
  data: {
    searchGroupId: number;
    searchCompanyName: string | null;
    searchVatNumber: string | null;
    searchActiveId: number;
    availableGroups: SelectOption[];
    availableActiveOptions: SelectOption[];
    page: number;
    pageSize: number;
    availablePageSizes: string[];
    draw: string | null;
    start: number;
    length: number;
  };
}

export interface CompaniesListResponse extends ApiResponse {
  data: {
    data: Company[];
    draw: unknown;
    recordsFiltered: number;
    recordsTotal: number;
  };
}
