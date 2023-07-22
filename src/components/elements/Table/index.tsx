import React, { useState } from 'react';

import {
  Column,
  Table as ReactTable,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  OnChangeFn,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { Person, makeData } from '@utils/makeData';

function TableComponent() {
  const rerender = React.useReducer(() => ({}), {})[1];
  const defaultData: Person[] = [
    {
      firstName: 'tanner',
      lastName: 'linsley',
      age: 24,
      visits: 100,
      status: 'In Relationship',
      progress: 50,
    },
    {
      firstName: 'tandy',
      lastName: 'miller',
      age: 40,
      visits: 40,
      status: 'Single',
      progress: 80,
    },
    {
      firstName: 'joe',
      lastName: 'dirte',
      age: 45,
      visits: 20,
      status: 'Complicated',
      progress: 10,
    },
  ];
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: 'FirstName',
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
      },
      {
        header: 'LastName',
        accessorKey: 'lastName',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Age',
        accessorKey: 'age',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Visits',
        accessorKey: 'visits',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Progress',
        accessorKey: 'progress',
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  // const [data, setData] = React.useState(() => makeData(100000));
  // const refreshData = () => setData(() => makeData(100000));

  return (
    <>
      <Table {...{ data: defaultData, columns }} />
      <hr />
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
    </>
  );
}

function Table({
  data,
  columns,
}: {
  data: Person[];
  columns: ColumnDef<Person>[];
}) {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    debugTable: true,
  });

  return (
    <section>
      <input
        value={globalFilter ?? ''}
        onChange={(event) => setGlobalFilter(event.target.value)}
        className="p-2 font-lg shadow border border-block"
        placeholder="Search..."
      />
      <article className="flex flex-col border border-[#E6E6E6] rounded-xl">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <table className="min-w-full bg-white sm:px-6 lg:px-8 h-auto overflow-y-scroll relative">
              <thead className="bg-[#F3F4F6]">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="w-full border-y border-light text-white bg-primary"
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          className="text-left text-xs text-white font-semibold uppercase whitespace-nowrap py-5 px-5"
                        >
                          {header.isPlaceholder ? null : (
                            <div>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {/* {header.column.getCanFilter() ? (
                                <div>
                                  <Filter
                                    column={header.column}
                                    table={table}
                                  />
                                </div>
                              ) : null} */}
                            </div>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white">
                {table.getRowModel().rows.map((row) => {
                  return (
                    <tr
                      key={row.id}
                      className={`relative border-y border-light text-dark ${
                        Number(row?.id) % 2 ? 'bg-neutral-accorion' : ''
                      }`}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className="text-sm font-normal capitalize whitespace-nowrap py-[14px] px-5"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </article>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
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
      <div>{table.getRowModel().rows.length} Rows</div>
      {/* <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
    </section>
  );
}
function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: ReactTable<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return (
    <input
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  );
  // return typeof firstValue === 'number' ? (
  //   <div className="flex space-x-2">
  //     <input
  //       type="number"
  //       value={(columnFilterValue as [number, number])?.[0] ?? ''}
  //       onChange={(e) =>
  //         column.setFilterValue((old: [number, number]) => [
  //           e.target.value,
  //           old?.[1],
  //         ])
  //       }
  //       placeholder={`Min`}
  //       className="w-24 border shadow rounded"
  //     />
  //     <input
  //       type="number"
  //       value={(columnFilterValue as [number, number])?.[1] ?? ''}
  //       onChange={(e) =>
  //         column.setFilterValue((old: [number, number]) => [
  //           old?.[0],
  //           e.target.value,
  //         ])
  //       }
  //       placeholder={`Max`}
  //       className="w-24 border shadow rounded"
  //     />
  //   </div>
  // ) : (
  //   <input
  //     type="text"
  //     value={(columnFilterValue ?? '') as string}
  //     onChange={(e) => column.setFilterValue(e.target.value)}
  //     placeholder={`Search...`}
  //     className="w-36 border shadow rounded"
  //   />
  // );
}

export default TableComponent;
