/**
 * **************************************************************************
 * **************************************************************************
 * Author: Ajaezo Kingsley ::::: PayForce By FairMoney :::::: © Copyright 2023
 *
 * email: kingsley.ajaezo@fairmoney.io
 *
 * filename: TransactionsTable.tsx
 *
 * @description: This is the component that renders the transactions
 *
 * ***************************************************************************
 * ***************************************************************************
 *
 * @returns
 * @function <TransactionsTable></TransactionsTable>
 * @param ITransactionTableProps
 * ? Local & Shared Imports
 */

import { FormatCurrency, getDateTime } from '@/lib/helpers';
import {
  downlineColorVariants,
  downlineStatus,
} from '@/services/models/Downline';
import {
  PayloadTypes,
  TransactionInfoType,
  TransactionQueryTypes,
  TransactionTableHeadDataProps,
  TransactionsDataTypes,
  colorVariants,
  exportOptions,
  status,
} from '@/services/models/Transactions';
import { CardBox } from '@/shared/components/CardBox';
import SelectDropdown from '@/shared/components/CustomSelect';
import FullTable, { TD, TH } from '@/shared/components/FullTable';
import { RenderTableBody } from '@/shared/components/FullTable';
import StatusBadge from '@/shared/components/StatusBadge';
import { H3, Paragraph } from '@/shared/components/typography';
import { Box, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

interface ITransactionTableProps {
  transactionData: TransactionsDataTypes | any;
  loading: boolean | undefined;
  updateFilters: (payload: PayloadTypes) => void;
  handlePageChange?: (page: number) => void;
  filtersList: TransactionQueryTypes;
}

const TransactionTable: React.FC<ITransactionTableProps> = ({
  transactionData,
  loading,
  updateFilters,
  handlePageChange,
  filtersList,
}) => {
  const pagination = useMemo(
    () => ({
      count: transactionData?.count,
      page_index: transactionData?.page_index,
      page_size: transactionData?.page_size,
    }),
    [transactionData]
  );

  return (
    <CardBox className={['mt-6']}>
      <Box component='section' className='flex items-center justify-between'>
        <Box component='div'>
          <H3 className='text-[1.3rem] font-medium'>Transaction report</H3>
          <Paragraph className='text-base'>Downline transactions</Paragraph>
        </Box>
        <Box>
          <SelectDropdown
            placeholder='Export Transactions'
            variant='primary'
            options={exportOptions}
            value={(filtersList?.exportFormat as any) || ''}
            isSearchable={false}
            onChange={({ value }: { value: string }) => {
              updateFilters({ field: 'exportFormat', value });
              updateFilters({
                field: 'ex_port',
                value: true,
              });
            }}
          />
        </Box>
      </Box>
      <Box className='mt-6' component='div'>
        <FullTable
          elements={transactionData?.data}
          loading={!!loading}
          RenderHeader={RenderHeader}
          RenderBody={RenderBody as any}
          pagination={pagination}
          onChangePage={handlePageChange}
        />
      </Box>
    </CardBox>
  );
};

const RenderHeader = () => (
  <TableRow className='odd:bg-white even:bg-[#F9F9FB]'>
    {TableHeadData.map(({ id, label, mobileHidden }) => {
      return (
        <TH
          key={id}
          sx={{
            color: '#64748B',
            fontSize: '14px',
            borderBottomWidth: '1px',
          }}
          mobileHidden={mobileHidden}
        >
          {label}
        </TH>
      );
    })}
  </TableRow>
);

const RenderBody: React.FC<RenderTableBody<TransactionInfoType>> = <
  T extends TransactionInfoType
>({
  row,
  index,
}: RenderTableBody<T>) => {
  const router = useRouter();
  return (
    <TableRow
      className='odd:bg-white even:bg-[#F9F9FB]'
      sx={{
        cursor: 'pointer',
      }}
      onClick={() => router.push(`/transactions/detail/${row?.transaction_id}`)}
    >
      <TD className='hidden sm:table-cell'>{row?.account || '-'}</TD>
      <TD className='hidden sm:table-cell'>{row?.transaction_type || '-'}</TD>
      <TD className='hidden sm:table-cell'>
        {getDateTime(row?.transaction_date as unknown as Date)}
      </TD>
      <TD>{FormatCurrency({ amount: row?.amount ?? 0, currency: 'NGN' })}</TD>
      <TD className='hidden sm:table-cell'>{row?.customer_id || '-'}</TD>
      <TD className='hidden sm:table-cell'>{row?.reference_number || '-'}</TD>
      <TD>
        <StatusBadge
          fill={colorVariants[row?.transaction_status as unknown as number]}
          label={status[row?.transaction_status as unknown as number]}
        />
      </TD>
    </TableRow>
  );
};

const TableHeadData: TransactionTableHeadDataProps[] = [
  {
    id: 'transaction-0010-account/type',
    label: 'Account',
    mobileHidden: false,
  },
  {
    id: 'transaction-0011-trans/type',
    label: 'Transaction Type',
    mobileHidden: true,
  },
  {
    id: 'transaction-0199182-date/time',
    label: 'Date and time',
    mobileHidden: false,
  },
  {
    id: 'transaction-0199182-amount',
    label: 'Amount',
    mobileHidden: false,
  },
  {
    id: 'transaction-01291-customer/id',
    label: 'Customer Id',
    mobileHidden: true,
  },
  {
    id: 'transaction-0199182-reference',
    label: 'Reference Number',
    mobileHidden: false,
  },
  {
    id: 'transaction-0199182-status',
    label: 'status',
    mobileHidden: false,
  },
];

export default TransactionTable;
