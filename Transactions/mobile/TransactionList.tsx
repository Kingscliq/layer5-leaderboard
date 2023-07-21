/**
 * **************************************************************************
 * **************************************************************************
 * Author: Boluwatife Olure ::::: PayForce By FairMoney :::::: © Copyright 2023
 *
 * email: boluwatife.olure@fairmoney.io
 *
 * filename: TransactionList.tsx
 *
 * @description: This is the component that renders the transaction list for mobile view
 *
 * ***************************************************************************
 * ***************************************************************************
 *
 * @returns
 * @function <TransactionList></TransactionList>
 * @param ITransactionListProps
 * ? Local & Shared Imports
 */

import TransactionItem from './TransactionItem';
import { useMemo, useState } from 'react';
import Button from '@/shared/components/Button';
import { Paragraph } from '@/shared/components/typography';
import { Box, TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { FormatCurrency } from '@/lib/helpers';
import {
  DropDownTypes,
  PayloadTypes,
  TransactionQueryTypes,
  searchByList,
  statusList,
  transTypeList,
} from '@/services/models/Transactions';
import SelectDropdown from '@/shared/components/CustomSelect';
import { CircleShimmer } from '@/assets/svg-icons/CircleShimmer';
import NoData from '@/features/Downline/components/NoData';
import { useRouter } from 'next/router';
import CustomFilters from '@/shared/components/CustomFilters';

interface ITransactionListProps {
  statusList?: DropDownTypes[];
  loadingStatusList?: boolean;
  transTypeList?: DropDownTypes[];
  loadingTransTypeList?: boolean;
  searchByList?: DropDownTypes[];
  loadingSearchByList?: boolean;
  updateFilters: (payload: PayloadTypes) => void;
  clearFilters: () => void | undefined;
  filtersList: TransactionQueryTypes | any;
  transactionData: any;
  handleModalUpdate: () => void;
  loading: boolean | undefined;
}

const TransactionList: React.FC<ITransactionListProps> = ({
  loadingStatusList,
  loadingSearchByList,
  loadingTransTypeList,
  updateFilters,
  filtersList,
  transactionData,
  handleModalUpdate,
  loading,
}) => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  const router = useRouter();

  const _transactionData = useMemo(
    () => transactionData.data?.paginated_transactions,
    [transactionData]
  );

  return (
    <Box component='section'>
      <Box component='div' className='bg-white pt-6 px-4 pb-5'>
        <Box component='div' className='flex justify-center mb-4'>
          <TextField
            placeholder='Search Username/transaction ID/Customer ID'
            className=' w-full '
            value={filtersList.SearchString}
            onChange={(e) => {
              updateFilters({
                field: 'SearchString',
                value: e.target.value,
              });
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <CustomFilters
            sx={{
              height: '55px',
              marginLeft: '3px',
            }}
          >
            <Box component='div' className='my-6 gap-4'>
              <Box component='div'>
                <SelectDropdown
                  options={statusList}
                  variant={'outline'}
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
              </Box>
              <Box component='div'>
                <SelectDropdown
                  options={transTypeList}
                  variant={'outline'}
                  className='h-14'
                  loading={loadingTransTypeList}
                  placeholder={'Transaction Type'}
                  value={filtersList?.TransactionType}
                  id='TransactionType'
                  onChange={({ value }: { value: string }) => {
                    updateFilters({ field: 'TransactionType', value });
                  }}
                />
              </Box>
            </Box>
          </CustomFilters>
        </Box>

        <Box component='div' className='grid grid-cols-2 gap-2'>
          <Button
            type='button'
            label='Date Filter'
            onClick={() => handleModalUpdate()}
            className='text-center border-[1px]'
          ></Button>
          <SelectDropdown
            placeholder='Search By'
            variant='outline'
            options={searchByList}
            value={filtersList?.SearchBy}
            loading={loadingSearchByList}
            onChange={({ value }: { value: string }) => {
              updateFilters({ field: 'SearchBy', value });
            }}
          />
        </Box>

        <Box component='div'>
          <Paragraph className='mt-8 font-semibold'>Transaction</Paragraph>
        </Box>

        <Box component='div' className='flex justify-center mt-4'>
          <Box
            component='div'
            className={
              toggleState === 1
                ? 'bg-fair-money w-full text-center rounded-l-[4px] p-2 text-white'
                : 'bg-[#F3F3F6] w-full text-center rounded-l-[4px] p-2'
            }
          >
            <Button
              type='button'
              label='Amount'
              className=''
              onClick={() => toggleTab(1)}
            ></Button>
          </Box>
          <Box
            component='div'
            className={
              toggleState === 2
                ? 'bg-fair-money w-full text-center rounded-r-[4px] p-2 text-white'
                : 'bg-[#F3F3F6] w-full text-center rounded-r-[4px] p-2'
            }
          >
            <Button
              type='button'
              label='Count'
              className=''
              onClick={() => toggleTab(2)}
            ></Button>
          </Box>
        </Box>
        <Box component='div' className='bg-[#F3F3F6] mt-9 rounded-[4px] p-5'>
          <Box component='div' className={toggleState === 1 ? '' : 'hidden'}>
            <Box component='div' className='mb-3'>
              <Paragraph className=''>Transaction amount</Paragraph>
            </Box>
            {transactionData?.isFetching ? (
              <Box
                component='div'
                className='animate-pulse bg-slate-200 h-8 w-84 mt-6'
              ></Box>
            ) : (
              <Box component='div'>
                <Paragraph className='text-[34px] font-semibold'>
                  {FormatCurrency({
                    amount: transactionData?.data?.transaction_total_amount,
                    currency: `NGN`,
                  })}
                </Paragraph>
              </Box>
            )}
          </Box>
          <Box component='div' className={toggleState === 2 ? '' : 'hidden'}>
            <Box component='div' className=''>
              <Paragraph className='mb-3'> Transaction count </Paragraph>
            </Box>
            {transactionData?.isFetching ? (
              <Box
                component='div'
                className='animate-pulse bg-slate-200 h-8 w-84 mt-6'
              ></Box>
            ) : (
              <Box component='div'>
                <Paragraph className='text-[34px] font-semibold'>
                  {transactionData?.data?.transaction_count}
                </Paragraph>
              </Box>
            )}
          </Box>
        </Box>
        <Box component='div' className='mt-14'>
          <Paragraph className='mb-2 font-semibold text-lg'>
            Transaction report
          </Paragraph>
          <Paragraph className='text-[14px]'> Downline transactions</Paragraph>
        </Box>
        {loading && (
          <Box component='div' className='flex items-center justify-center'>
            <CircleShimmer className='h-[30px] w-[30px] text-fair-money my-20' />
          </Box>
        )}

        {_transactionData?.data.length > 0 && !loading && (
          <>
            {_transactionData?.data.map(
              ({ transaction_id, transaction_type, amount, account }: any) => {
                return (
                  <TransactionItem
                    key={transaction_id}
                    description={transaction_type}
                    amount={amount}
                    title={account}
                    onClick={() =>
                      router.push(`/transactions/detail/${transaction_id}`)
                    }
                  />
                );
              }
            )}
            <Button
              type='button'
              label='View more'
              className='text-fair-money mt-4'
              onClick={() => {
                updateFilters({
                  field: 'PageSize',
                  value: filtersList?.PageSize + 5,
                });
              }}
            ></Button>
          </>
        )}
        {_transactionData && _transactionData?.data?.length === 0 && (
          <NoData text='No Transactions Found...' />
        )}
      </Box>
    </Box>
  );
};

export default TransactionList;
