"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/[lang]/components/ui/table"

const essentialCookies: Cookie[] = [
  {
    name: "__Host-next-auth.csrf-token",
    purpose: "Admin login functionality",
    domain: "http://www.erpmasterclasses.com/",
    expiration: "Session only",
    provider: "ERP Masterclasses",
    type: "Cookie",
  },
  {
    name: "__Secure-next-auth.callback-url",
    purpose: "Admin login functionality",
    domain: "http://www.erpmasterclasses.com/",
    expiration: "Session only",
    provider: "ERP Masterclasses",
    type: "Cookie",
  },
  {
    name: "__Secure-next-auth.session-token",
    purpose: "Admin login functionality",
    domain: "http://www.erpmasterclasses.com/",
    expiration: "1 day",
    provider: "ERP Masterclasses",
    type: "Cookie",
  },
  {
    name: "__vercel_toolbar",
    purpose: "Website development tools",
    domain: "http://www.erpmasterclasses.com/",
    expiration: "1 day",
    provider: "ERP Masterclasses",
    type: "Cookie",
  },
  {
    name: "nextauth.message",
    purpose: "Admin login functionality",
    domain: "http://www.erpmasterclasses.com/",
    expiration: "Persistent",
    provider: "ERP Masterclasses",
    type: "Local Storage",
  },
  {
    name: "__stripe_mid",
    purpose: "Stripe Payment, used for making payments and fraud prevention.",
    domain: ".www.erpmasterclasses.com",
    expiration: "1 year",
    provider: "https://stripe.com/nl/cookie-settings",
    type: "Cookie",
  },
  {
    name: "__stripe_sid",
    purpose: "Stripe Payment, used for making payments and fraud prevention.",
    domain: ".www.erpmasterclasses.com",
    expiration: "30 minutes",
    provider: "https://stripe.com/nl/cookie-settings",
    type: "Cookie",
  },
  {
    name: "m",
    purpose: "Fraud prevention purposes. Not used for advertising purposes or sold to third parties.",
    domain: "http://m.stripe.com/",
    expiration: "120 years",
    provider: "https://stripe.com/nl/cookie-settings",
    type: "Cookie",
  },
  {
    name: "ga_consent",
    purpose: "This cookie saves your cookie preferences for this website.",
    domain: "http://www.erpmasterclasses.com/",
    expiration: "Persistant",
    provider: "ERP Masterclasses",
    type: "Local Storage",
  },
]

const performanceCookies: Cookie[] = [
  
  {
    name: "_ga",
    purpose: "Registers a unique ID for a website visitor to track how the visitor uses the website. The data is used for statistics. Data transfer to third countries: USA. Google LLC. is certified under the Data Privacy Framework, indicating that your rights as a data subject can be guaranteed.",
    domain: ".erpmasterclasses.com",
    expiration: "2 years",
    provider: "https://policies.google.com/privacy?hl=en-US",
    type: "Cookie",
  },
  {
    name: "_ga_********",
    purpose: "This cookie stores a unique ID for a website visitor and tracks how the visitor uses the website. The data is used for statistics. Data transfer to third countries: USA. Google LLC. is certified under the Data Privacy Framework, indicating that your rights as a data subject can be guaranteed.",
    domain: ".erpmasterclasses.com",
    expiration: "2 years",
    provider: "https://policies.google.com/privacy?hl=en-US",
    type: "Cookie",
  },
]

export type Cookie = {
  name: string
  purpose: string
  domain: string
  expiration: string
  provider: string
  type: string
}

export const columns: ColumnDef<Cookie>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "purpose",
    header: "Purpose",
  },
  {
    accessorKey: "domain",
    header: "Domain name",
  },
  {
    accessorKey: "expiration",
    header: "Expiration time",
  },
  {
    accessorKey: "provider",
    header: "Provider",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
]

export default function CookieOverview() {
  const essentialTable = useReactTable({
    data: essentialCookies,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const performanceTable = useReactTable({
    data: performanceCookies,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold pb-4">Essential Cookies</h1>
      <div className="rounded-md border mb-8">
        <Table className="bg-white">
          <TableHeader>
            {essentialTable.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {essentialTable.getRowModel().rows.length ? (
              essentialTable.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
      </div>

      <h1 className="text-2xl font-bold pb-4">Performance Cookies</h1>
      <div className="rounded-md border">
        <Table className="bg-white">
          <TableHeader>
            {performanceTable.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {performanceTable.getRowModel().rows.length ? (
              performanceTable.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
      </div>
    </div>
  )
}
