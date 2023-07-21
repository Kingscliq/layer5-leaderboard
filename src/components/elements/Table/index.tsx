import React, { SetStateAction, useMemo } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Pagination from '../Pagination';
import Section from '../Section';
import BtnLoader from '../Button/loader';
import Paragraph from '../Text/Paragraph';

interface TableProps {
  columns: any;
  data: any;
  currentPage?: number;
  setCurrentPage?: React.Dispatch<SetStateAction<number>>;
  total?: number;
  loading?: boolean;
  noData?: string;
  limit?: number;
}

const Table = ({
  columns,
  data,
  currentPage,
  setCurrentPage,
  total,
  loading,
  noData,
  limit,
}: TableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const _totalPage = useMemo(
    () => total && Math.ceil(total / limit!),
    [limit, total]
  );

  return (
    <section>
      <article className="flex flex-col border border-[#E6E6E6] rounded-xl">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <table className="min-w-full bg-white sm:px-6 lg:px-8 h-auto overflow-y-scroll relative">
              <thead className="bg-[#F3F4F6]">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="w-full border-y border-light"
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="text-left text-xs text-dark font-semibold uppercase whitespace-nowrap py-5 px-5"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white">
                {!loading &&
                  table?.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className={`relative border-y border-light text-dark ${
                        Number(row?.id) % 2 ? 'bg-neutral-accorion' : ''
                      }`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="text-sm font-normal capitalize whitespace-nowrap py-[14px] px-5"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
            {loading && (
              <Section className="h-64 w-full flex items-center justify-center">
                <Section>
                  <BtnLoader />
                </Section>
              </Section>
            )}
            {!loading && data.length === 0 && (
              <Section className="h-64 w-full flex items-center justify-center">
                <Paragraph className="text-gray-400">
                  {noData || 'Oops! No Data to Display'}
                </Paragraph>
              </Section>
            )}
          </div>
        </div>
      </article>

      {/* pagination */}
      <article className="w-full pt-8 pb-6 px-6 flex items-center justify-between">
        {total && (
          <div className="text-sm text-muted">
            {/* Total of {total} records */}
            Showing {data?.length} out of {total} records
          </div>
        )}

        {total && (
          <Pagination
            total={_totalPage!}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </article>
    </section>
  );
};

export default Table;
