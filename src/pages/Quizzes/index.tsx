import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Button, Card, CardBody, CardFooter, CardHeader, Spinner, Typography } from "@material-tailwind/react";
import { flexRender, getCoreRowModel, SortDirection, useReactTable } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import { GET_QUIZZES } from "@utils/queries/Quizzes.ts";
import { mapQuizList } from "./mapTableData.ts";
import { tableColumns } from "./tableColumns.tsx";

export function Component() {
  const { data, loading, error } = useQuery(GET_QUIZZES, { variables: {} });

  const quizzes = useMemo(() => mapQuizList(data?.quizList || []), [data?.quizList]);
  // const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data: quizzes,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading || error)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="h-16 w-16" />
      </div>
    );

  return (
    <div className="flex h-full w-full flex-col items-center px-4 pb-4 pt-16 md:px-12 md:pt-24">
      <Card className="mt-4 w-full overflow-auto border border-gray-200">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col items-center">
            <Typography variant="h5" color="blue-gray" className="mb-1">
              Quiz list
            </Typography>
            <Typography color="gray">Manage all the quizzes available in the platform</Typography>
          </div>
        </CardHeader>

        <CardBody className="overflow-auto px-0 py-2">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      className={`w-[${header.getSize()}px] border-b border-blue-gray-100 bg-blue-gray-50 p-4`}
                      key={header.id}
                    >
                      <div className="flex items-center justify-between">
                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                          {header.column.columnDef.header?.toString()}
                        </Typography>
                        {header.column.getCanSort() && (
                          <ChevronsUpDown className="ml-3 size-5" onClick={header.column.getToggleSortingHandler()} />
                        )}
                        {
                          {
                            asc: "🔼",
                            desc: "🔽",
                          }[header.column.getIsSorted() as SortDirection]
                        }
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row, index) => {
                const isLast = index === table.getRowModel().rows.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr className="tr" key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td className={`w-[${cell.column.getSize()}px] ${classes}`} key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>

        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button
            variant="outlined"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div className="flex items-center">
            <Typography>
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </Typography>
          </div>
          <Button variant="outlined" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
