/**
 * **************************************************************************
 * **************************************************************************
 * Author: Boluwatife Olure ::::: PayForce By FairMoney :::::: © Copyright 2023
 *
 * email: boluwatife.olure@fairmoney.io
 *
 * filename: TransactionsDetails.tsx
 *
 * @description: This is the component that renders the transactions details
 *
 * ***************************************************************************
 * ***************************************************************************
 *
 * @returns
 * @function <TransactionsDetails></TransactionsDetails>
 * @param ITransactionsDetailsProps
 * ? Local & Shared Imports
 */

import { BankIcon } from '@/assets/svg-icons/Bank';
import {
  ITransactionDetailTypes,
  colorVariants,
  status,
} from '@/services/models/Transactions';
import { Box, Divider } from '@mui/material';
import { Paragraph } from '@/shared/components/typography';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useTransactionDetail } from '../api';
import StatusBadge from '@/shared/components/StatusBadge';
import { CircleShimmer } from '@/assets/svg-icons/CircleShimmer';
import { getDateTime } from '@/lib/helpers';

const TransactionsDetails: React.FC<{}> = () => {
  const router = useRouter();
  const { id } = router?.query;
  const { transactionDetail, loadingTransactionDetail } = useTransactionDetail(
    id as any
  );

  const _detail = useMemo(
    () => transactionDetail as unknown as ITransactionDetailTypes,
    [transactionDetail]
  );

  return (
    <Box component='section' className='sm:ml-3 text-[#434F75] text-[14px]'>
      <Box
        component='button'
        className='cursor-pointer mb-16'
        onClick={() => router.back()}
      >
        &larr; Back
      </Box>
      {loadingTransactionDetail && (
        <Box component='div' className='flex items-center justify-center p-32'>
          <CircleShimmer className='h-[30px] w-[30px] text-fair-money' />
        </Box>
      )}
      {!loadingTransactionDetail && (
        <>
          <Box
            component='div'
            className='bg-white rounded-[8px] px-6 pt-5 pb-8 sm:pb-14 w-full lg:w-2/3'
          >
            <Box
              component='div'
              className='flex items-center justify-between mb-6'
            >
              <Box component='div' className='flex items-center'>
                <BankIcon
                  strokeColor='#37A477'
                  className='w-10 h-10 p-2.5 bg-[#F3F3F6] mr-6'
                />
                <Paragraph className=''>{_detail?.transaction_type}</Paragraph>
              </Box>
              <Box
                component='div'
                className='text-[#061624] lg:text-[20px] text-sm font-semibold'
              >
                +NGN {_detail?.amount}.00
              </Box>
            </Box>
            <Box component='div' className='flex justify-between mb-6'>
              <Box component='div'>
                <Paragraph className=''>Transaction status</Paragraph>
              </Box>
              <Box component='div'>
                <StatusBadge
                  fill={
                    colorVariants[
                      _detail?.transaction_status as unknown as number
                    ]
                  }
                  label={
                    status[_detail?.transaction_status as unknown as number]
                  }
                />
              </Box>
            </Box>
            <Box component='div' className='flex justify-between mb-11 lg:mb-6'>
              <Box component='div'>
                <Paragraph className=''>Customer name</Paragraph>
              </Box>
              <Box component='div'>{_detail?.customer_name || '-'}</Box>
            </Box>
            <Divider>
              <Box
                component='div'
                className='border-[#C3C2D1] flex items-center border-[1px] rounded-full px-4 pb-1 pt-0.5 ml-[-9px] mr-[-9px] sm:px-24 sm:py-1.5 sm:ml-[-10px] sm:mr-[-10px]'
              >
                <Box component='span' className='font-medium'>
                  {' '}
                  Date
                </Box>
                &nbsp; | &nbsp;
                <Paragraph className='text-xs lg:text-base'>
                  {getDateTime(_detail?.transaction_date as any)}
                </Paragraph>
              </Box>
            </Divider>
            <Box
              component='div'
              className='flex justify-between mb-6 mt-10 lg:mt-4'
            >
              <Box component='div'>
                <Paragraph className=''>Customer ID</Paragraph>
              </Box>
              <Box component='div'>{_detail?.customer_id || '-'}</Box>
            </Box>
            <Box component='div' className='flex justify-between mb-6'>
              <Box component='div'>
                <Paragraph className=''>Bank</Paragraph>
              </Box>
              <Box component='div'>{_detail?.bank_name || '-'}</Box>
            </Box>

            <Box component='div' className='flex justify-between mb-9 sm:mb-6'>
              <Box component='div'>
                <Paragraph className=''>Session ID</Paragraph>
              </Box>
              <Box component='div'>{_detail?.session_id || '-'}</Box>
            </Box>
            <Divider></Divider>
            <Box
              component='div'
              className='flex justify-between mb-6 mt-9 sm:mt-7'
            >
              <Box component='div'>
                <Paragraph className=''>Service charge</Paragraph>
              </Box>
              <Box component='div'>NGN {_detail?.service_charge || '0'}</Box>
            </Box>
            <Box component='div' className='flex justify-between mb-6'>
              <Box component='div'>
                <Paragraph className=''>Transaction Type</Paragraph>
              </Box>
              <Box component='div'>{_detail?.transaction_type}</Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default TransactionsDetails;
