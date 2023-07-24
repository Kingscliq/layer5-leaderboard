import React, { useState } from 'react';

import {
  Column,
  Table as ReactTable,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

import { LeaderBoardData } from '@/types/index';
import Section from '../Section';
import BtnLoader from '../Button/loader';
import Paragraph from '../Text/Paragraph';

interface TableProps {
  data: any;
  columns: any;
  loading: boolean;
  noData?: string;
}
const TableComponent: React.FC<TableProps> = ({
  data,
  columns,
  loading,
  noData,
}) => {
  return <Table {...{ data, columns }} loading={loading} noData={noData} />;
};

function Table({
  data,
  columns,
  loading,
  noData,
}: {
  data: LeaderBoardData[];
  columns: ColumnDef<LeaderBoardData>[];
  loading: boolean;
  noData?: string;
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
                {table?.getHeaderGroups().map((headerGroup) => (
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
                            </div>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white">
                {!loading &&
                  table?.getRowModel()?.rows.map((row) => {
                    return (
                      <tr
                        key={row.id}
                        className={`relative border-y border-light text-dark ${
                          Number(row?.id) % 2 ? 'bg-neutral-accorion' : ''
                        }`}
                      >
                        {row?.getVisibleCells().map((cell) => {
                          return (
                            <td
                              key={cell.id}
                              className="text-sm font-normal capitalize whitespace-nowrap py-[14px] px-5"
                            >
                              {flexRender(
                                cell?.column.columnDef.cell,
                                cell?.getContext()
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {loading && (
              <Section className="h-64 w-full flex items-center justify-center">
                <Section>
                  <BtnLoader />
                </Section>
              </Section>
            )}
            {!loading && data?.length === 0 && (
              <Section className="h-64 w-full flex items-center justify-center">
                <Paragraph className="text-gray-400">
                  {noData || 'Oops! No Data to Display'}
                </Paragraph>
              </Section>
            )}
          </div>
        </div>
      </article>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table?.setPageIndex(0)}
          disabled={!table?.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table?.previousPage()}
          disabled={!table?.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table?.nextPage()}
          disabled={!table?.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table?.setPageIndex(table?.getPageCount() - 1)}
          disabled={!table?.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table?.getState().pagination.pageIndex + 1} of{' '}
            {table?.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table?.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table?.getState().pagination.pageSize}
          onChange={(e) => {
            table?.setPageSize(Number(e.target.value));
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
// function Filter({
//   column,
//   table,
// }: {
//   column: Column<any, any>;
//   table: ReactTable<any>;
// }) {
//   const firstValue = table
//     .getPreFilteredRowModel()
//     .flatRows[0]?.getValue(column.id);

//   const columnFilterValue = column.getFilterValue();

//   return (
//     <input
//       type="text"
//       value={(columnFilterValue ?? '') as string}
//       onChange={(e) => column.setFilterValue(e.target.value)}
//       placeholder={`Search...`}
//       className="w-36 border shadow rounded"
//     />
//   );
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
// }

export default TableComponent;
