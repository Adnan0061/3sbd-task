"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingCart,
  Building2,
  Users,
  Settings,
  Boxes,
  ChevronDown,
  Search,
  BellRing,
  Mails,
} from "lucide-react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useRouter,
  usePathname,
  useParams,
  useSearchParams,
} from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const [expandedSections, setExpandedSections] = useState({
    business: true,
    purchase: false,
    catalog: false,
    user: false,
    configurations: false,
    system: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section as keyof typeof prev]: !prev[section as keyof typeof prev],
    }));
  };

  const handleTextColor = (path: string) => {
    return pathname.includes(path)
      ? "text-blue-600"
      : "text-gray-500 hover:bg-gray-100";
  };
  const handleDotColor = (path: string) => {
    return pathname.includes(path) ? "bg-blue-600" : "bg-gray-500";
  };
  console.log(router, pathname, params, searchParams);
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen")}>
        <QueryClientProvider client={queryClient}>
          <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-background">
              <div className="p-6">
                <h1 className="text-xl font-bold">GENPOS</h1>
              </div>
              <nav className="space-y-1 px-2">
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 ${handleTextColor(
                    "/dashboard"
                  )}`}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
                <button
                  onClick={() => toggleSection("purchase")}
                  className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Purchase
                  <ChevronDown
                    className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                      expandedSections.purchase ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                <div>
                  <button
                    onClick={() => toggleSection("business")}
                    className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-blue-600 hover:bg-gray-100"
                  >
                    <Building2 className="h-5 w-5" />
                    Business unit
                    <ChevronDown
                      className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                        expandedSections.business ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedSections.business && (
                    <div className="ml-6 space-y-1">
                      <Link
                        href="/business/groups"
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 ${handleTextColor(
                          "/business/groups"
                        )}  hover:bg-gray-100`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${handleDotColor(
                            "/business/groups"
                          )} mr-2`}
                        ></span>
                        Groups
                      </Link>
                      <Link
                        href="/business/companies"
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 ${handleTextColor(
                          "/business/companies"
                        )}  hover:bg-gray-100`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${handleDotColor(
                            "/business/companies"
                          )} mr-2`}
                        ></span>
                        Companies
                      </Link>
                      <Link
                        href="/business/brands"
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 ${handleTextColor(
                          "/business/brands"
                        )}  hover:bg-gray-100`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${handleDotColor(
                            "/business/brands"
                          )} mr-2`}
                        ></span>
                        Brands
                      </Link>
                      <Link
                        href="/business/outlets"
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 ${handleTextColor(
                          "/business/outlets"
                        )}  hover:bg-gray-100`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${handleDotColor(
                            "/business/outlets"
                          )} mr-2`}
                        ></span>
                        Outlets
                      </Link>
                      <Link
                        href="/business/warehouses"
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 ${handleTextColor(
                          "/business/warehouses"
                        )}  hover:bg-gray-100`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${handleDotColor(
                            "/business/warehouses"
                          )} mr-2`}
                        ></span>
                        Warehouses
                      </Link>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => toggleSection("catalog")}
                  className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"
                >
                  <Boxes className="h-5 w-5" />
                  Catalog
                  <ChevronDown
                    className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                      expandedSections.catalog ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                <button
                  onClick={() => toggleSection("user")}
                  className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"
                >
                  <Users className="h-5 w-5" />
                  User
                  <ChevronDown
                    className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                      expandedSections.user ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                <button
                  onClick={() => toggleSection("configurations")}
                  className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"
                >
                  <Settings className="h-5 w-5" />
                  Configurations
                  <ChevronDown
                    className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                      expandedSections.configurations
                        ? "transform rotate-180"
                        : ""
                    }`}
                  />
                </button>
                <button
                  onClick={() => toggleSection("system")}
                  className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"
                >
                  <Settings className="h-5 w-5" />
                  System
                  <ChevronDown
                    className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                      expandedSections.system ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <header className="h-16 border-b bg-background flex items-center justify-between px-6">
                <div className="flex items-center flex-1 gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <input
                      type="search"
                      placeholder="Search your page..."
                      className="w-full pl-9 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button className="absolute right-2.5 top-1.5 h-6 px-1.5 py-0.5 text-xs  bg-blue-500 border rounded">
                      ⌘K
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button className="shadow-md" variant="secondary" size="icon">
                    <Mails className="h-7 w-7" />
                  </Button>
                  <Button className="shadow-md" variant="secondary" size="icon">
                    <BellRing className="h-7 w-7" />
                  </Button>
                  <Button className="shadow-md" variant="secondary" size="icon">
                    <Settings className="h-7 w-7" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <span className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
                      A
                    </span>
                  </Button>
                </div>
              </header>

              {/* Page Content */}
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
