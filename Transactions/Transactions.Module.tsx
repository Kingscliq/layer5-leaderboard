/**
 * **************************************************************************
 * **************************************************************************
 * Author: Isaiah Abiodun ::::: PayForce By FairMoney :::::: © Copyright 2023
 *
 * email: isaiah.abiodun@fairmoney.io
 *
 * Contributor: Ajaezo Kingsley
 *
 * filename: Transactions.tsx
 *
 * @description: This is the container for Transaction Page TSM Dashboard
 *
 * ***************************************************************************
 * ***************************************************************************
 *
 * @returns
 * @function <Transactions></Transactions>
 * @param
 * ? Local & Shared Imports
 */

import { Box } from '@mui/material';
import { TransactionHeader, TransactionTable } from './components';
import TransactionList from './mobile/TransactionList';
import DateFilter from '@/shared/components/DateFilter';
import {
  ITransactionPayload,
  PayloadTypes,
  SearchBy,
} from '@/services/models/Transactions';
import { useCallback, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { getDate } from '@/lib/helpers';
import { useTransactionFilter, useTransactionQueries } from './api';
import CustomModal from '@/shared/components/CustomModal';
import { H1, Paragraph } from '@/shared/components/typography';
import CustomButton from '@/shared/components/CustomButton';

const Transactions = () => {
  const [STATUS, TRANS_TYPE, SEARCH_BY] = useTransactionQueries();
  const [FILTERS, FILTERS_FUNCTION, TRANSACTIONS, EXPORT] =
    useTransactionFilter();
  


  const statusList = useMemo(
    () =>
      Array.isArray(STATUS.statusList)
        ? STATUS.statusList.map((s) => ({
            id: s.id,
            label: s.name,
            value: s.name,
          }))
        : [],
    [STATUS.statusList]
  );

  const transTypeList = useMemo(
    () =>
      Array.isArray(TRANS_TYPE.transTypeList)
        ? TRANS_TYPE.transTypeList.map((t) => ({
            id: t.id,
            label: t.name,
            value: t.name,
          }))
        : [],
    [TRANS_TYPE.transTypeList]
  );

  const searchByList = useMemo(
    () =>
      Array.isArray(SEARCH_BY.searchByList)
        ? SEARCH_BY.searchByList.map((item) => ({
            id: item.id,
            label: SearchBy[item.name],
            value: item.name,
          }))
        : [],
    [SEARCH_BY.searchByList]
  );


  const transactionsData = useMemo(
    () => TRANSACTIONS.data?.paginated_transactions,
    [TRANSACTIONS]
  );

  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleModalUpdate = () => setShowModal((s) => !s);
  const updateFilters = useCallback(
    (payload: PayloadTypes) => {
      if (typeof FILTERS_FUNCTION.setTransFilter === 'function') {
        return FILTERS_FUNCTION.setTransFilter(payload);
      }
    },
    [FILTERS_FUNCTION]
  );

  const filterAction = useCallback(async () => {
    updateFilters({
      field: 'StartDate',
      value: `${getDate(dateRange?.from)}`,
    });

    updateFilters({
      field: 'EndDate',
      value: `${getDate(dateRange?.to)}`,
    });

    handleModalUpdate();
    setDateRange(undefined);
  }, [dateRange, updateFilters]);

  return (
    <Box>
      {showModal ? (
        <DateFilter
          actionButton={filterAction}
          actionText='Apply'
          captionLayout='dropdown-buttons'
          dateRange={dateRange}
          fromYear={2021}
          handleClose={handleModalUpdate}
          mode='range'
          numberOfMonths={2}
          pagedNavigation
          toYear={2024}
          setDateRange={setDateRange}
        />
      ) : null}

      <Box component='div' className='hidden lg:block'>
        <TransactionHeader
          statusList={statusList}
          loadingStatusList={STATUS?.loadingStatusList}
          transTypeList={transTypeList}
          loadingTransTypeList={TRANS_TYPE?.loadingTransTypeList}
          searchByList={searchByList}
          loadingSearchByList={SEARCH_BY.loadingSearchByList}
          updateFilters={FILTERS_FUNCTION.setTransFilter as any}
          clearFilters={FILTERS_FUNCTION.resetTransState as any}
          filtersList={FILTERS}
          transactionData={TRANSACTIONS as any}
          handleModalUpdate={handleModalUpdate}
        />
        <TransactionTable
          transactionData={transactionsData}
          updateFilters={FILTERS_FUNCTION.setTransFilter as any}
          loading={TRANSACTIONS.isFetching}
          handlePageChange={FILTERS_FUNCTION.handlePageChange}
          filtersList={FILTERS as any}
        />
      </Box>
      <Box component='div' className='block lg:hidden'>
        <TransactionList
          updateFilters={FILTERS_FUNCTION.setTransFilter as any}
          clearFilters={FILTERS_FUNCTION.resetTransState as any}
          filtersList={FILTERS}
          transactionData={TRANSACTIONS}
          loadingSearchByList={SEARCH_BY.loadingSearchByList}
          loadingStatusList={STATUS.loadingStatusList}
          loadingTransTypeList={TRANS_TYPE.loadingTransTypeList}
          transTypeList={transTypeList}
          handleModalUpdate={handleModalUpdate}
          loading={TRANSACTIONS?.isFetching}
        />
      </Box>
      {FILTERS.ex_port && (
        <CustomModal
          closeAction={FILTERS_FUNCTION.resetTransState}
          displayClose={true}
        >
          <Box component='div' className='lg:p-8'>
            <Box component='div' className='lg:w-[812px] w-full'>
              <H1 className='font-medium text-xl mb-2'>Export Transaction</H1>
              <Paragraph className='text-sm'>
                Export Transactions to your email
              </Paragraph>
            </Box>
          </Box>
          <Box
            className='flex flex-row items-center justify-end w-full space-x-4 mt-4'
            component='div'
          >
            <Box
              className='bg-white border-2 h-[56px] border-[#D0D5DD] rounded font-medium font-primary text-tiny text-primary-600 px-4 py-2'
              component='button'
              onClick={FILTERS_FUNCTION.resetTransState}
            >
              Cancel
            </Box>
            <CustomButton
              className='bg-fair-money h-[56px] min-w-[200px] border-2 border-fair-money rounded font-medium font-primary text-tiny text-white px-4 py-2'
              onClick={() =>
                typeof FILTERS_FUNCTION.exportToEmail === 'function' &&
                FILTERS_FUNCTION.exportToEmail()
              }
              textLabel={'Export Transaction'}
              variant={'primary'}
              isLoading={EXPORT.isExporting}
            />
          </Box>
        </CustomModal>
      )}
    </Box>
  );
};

export default Transactions;
