/**
 * **************************************************************************
 * **************************************************************************
 * Author: Isaiah Abiodun ::::: PayForce By FairMoney :::::: © Copyright 2023
 *
 * email: isaiah.abiodun@fairmoney.io
 *
 * Contributor: Ajaezo Kingsley
 *
 * filename: TansactionHeader.tsx
 *
 * @description: This is the Transaction Header Components that holds the info of the heading section of TSM Transactions Page
 *
 * ***************************************************************************
 * ***************************************************************************
 *
 * @returns
 * @function <TransactionHeader></TransactionHeader>
 * @param
 * ? Local & Shared Imports
 */

import { Box, TextField } from '@mui/material';
import { CardBox } from '../../../shared/components/CardBox';

import CustomButton from '@/shared/components/CustomButton';
import { H2, H4, Paragraph } from '@/shared/components/typography';
import { FormatCurrency } from '@/lib/helpers';

import {
  DropDownTypes,
  ITransactionPayload,
  PayloadTypes,
  TransactionQueryTypes,
  searchByList,
  statusList,
  transTypeList,
} from '@/services/models/Transactions';
import SelectDropdown from '@/shared/components/CustomSelect';

interface ITransactionHeaderProps {
  statusList?: DropDownTypes[];
  loadingStatusList?: boolean;
  transTypeList?: DropDownTypes[];
  loadingTransTypeList?: boolean;
  searchByList?: DropDownTypes[];
  loadingSearchByList?: boolean;
  updateFilters: (payload: PayloadTypes) => void;
  clearFilters: () => void | undefined;
  filtersList: TransactionQueryTypes | any;
  transactionData: { data: ITransactionPayload; isFetching: boolean };
  handleModalUpdate: () => void;
}

const TransactionHeader: React.FC<ITransactionHeaderProps> = ({
  loadingStatusList,
  loadingSearchByList,
  loadingTransTypeList,
  updateFilters,
  clearFilters,
  filtersList,
  transactionData,
  handleModalUpdate,
}) => {
  return (
    <>
      <Box
        component='div'
        className='mt-10 grid grid-cols-12 gap-3 items-center bg-white py-6 px-4'
      >
        <div className='col-span-2'>
          <TextField
            placeholder='17/7/2023'
            className='w-full'
            disabled
            value={`${filtersList.StartDate} - ${filtersList.EndDate}`}
          />
        </div>
        <div className='col-span-1'>
          <CustomButton
            variant='primary'
            textLabel='Date'
            className='w-full h-14'
            onClick={() => handleModalUpdate()}
          />
        </div>
        <div className='col-span-1'>
          <SelectDropdown
            options={statusList}
            variant={'secondary'}
            placeholder={'Status'}
            className='h-14'
            id='TransactionStatus'
            loading={loadingStatusList}
            value={filtersList?.TransactionStatus}
            isSearchable={false}
            onChange={({ value }: { value: string }) => {
              updateFilters({ field: 'TransactionStatus', value });
            }}
          />
        </div>
        <div className='col-span-2'>
          <SelectDropdown
            options={transTypeList}
            variant={'secondary'}
            className='h-14'
            loading={loadingTransTypeList}
            placeholder={'Transaction Type'}
            value={filtersList?.TransactionType}
            isSearchable={false}
            id='TransactionType'
            onChange={({ value }: { value: string }) => {
              updateFilters({ field: 'TransactionType', value });
            }}
          />
        </div>
        <div className='col-span-5'>
          <div className='grid grid-cols-5 gap-2 items-center mr-4'>
            <div className='col-span-3'>
              <TextField
                placeholder='Search Username/transaction ID/Customer ID'
                className='w-full'
                value={filtersList.SearchString}
                onChange={(e) => {
                  updateFilters({
                    field: 'SearchString',
                    value: e.target.value,
                  });
                }}
              />
            </div>
            <div className='col-span-2'>
              <SelectDropdown
                options={searchByList}
                variant={'secondary'}
                placeholder={'Search By'}
                loading={loadingSearchByList}
                className='h-14'
                value={filtersList?.SearchBy}
                isSearchable={false}
                id='SearchBy'
                onChange={({ value }: { value: string }) => {
                  updateFilters({ field: 'SearchBy', value });
                }}
              />
            </div>
          </div>
        </div>
        <div className='col-span-1'>
          <CustomButton
            variant='primary'
            textLabel='Reset'
            className='w-full h-14'
            onClick={() => clearFilters()}
          />
        </div>
      </Box>
      <Box
        component='div'
        className='grid lg:grid-cols-2 gap-4 grid-cols-1 my-4'
      >
        <Box component='div'>
          <TransactionDisplay
            headerTitle='Transaction amount'
            options='amount'
            subtitle='Total transaction amount'
            amount={transactionData?.data?.transaction_total_amount}
            loading={transactionData?.isFetching}
          />
        </Box>
        <Box component='div'>
          <TransactionDisplay
            headerTitle='Transaction count'
            options='count'
            subtitle='Total number of transactions '
            count={transactionData?.data?.transaction_count}
            loading={transactionData?.isFetching}
          />
        </Box>
      </Box>
    </>
  );
};

type ITransactionDisplay = {
  amount?: number | string | undefined;
  count?: number | string | undefined;
  headerTitle: string;
  options: 'amount' | 'count';
  subtitle: string;
  loading: boolean;
};

const TransactionDisplay = ({
  amount,
  count,
  headerTitle,
  options,
  subtitle,
  loading,
}: ITransactionDisplay) => {
  return (
    <CardBox>
      <Box>
        <H4 className='text-primary-600 text-[1.3rem] font-medium leading-9'>
          {headerTitle}
        </H4>
        <Paragraph className='text-tiny'>{subtitle}</Paragraph>
      </Box>

      {loading ? (
        <Box
          component='div'
          className='animate-pulse bg-slate-100 h-8 w-64 mt-4'
        />
      ) : (
        <>
          <H2 className='sm:text-[45px] xs:text-[30px] font-medium leading-10 mt-7'>
            {options === 'amount'
              ? FormatCurrency({ amount, currency: 'NGN' })
              : count}
          </H2>
        </>
      )}
    </CardBox>
  );
};

export default TransactionHeader;
