/**
 * **************************************************************************
 * **************************************************************************
 * Author: Boluwatife Olure ::::: PayForce By FairMoney :::::: © Copyright 2023
 *
 * email: boluwatife.olure@fairmoney.io
 *
 * filename: TransactionItem.tsx
 *
 * @description: This is the component that renders the transaction items for Transaction list(mobile view)
 *
 * ***************************************************************************
 * ***************************************************************************
 *
 * @returns
 * @function <TransactionItem></TransactionItem>
 * @param ITransactionItemProps
 * ? Local & Shared Imports
 */

import { Paragraph } from '@/shared/components/typography';
import { Box } from '@mui/material';
import React from 'react';
import { FormatCurrency } from '@/lib/helpers';

interface ITransactionItemProps {
  title: string;
  description: string;
  amount: number;
  onClick: () => void;
}

const TransactionItem = ({
  title,
  description,
  amount,
  onClick,
}: ITransactionItemProps) => {
  return (
    <Box
      component='div'
      className='border-b border-b-[#DBDAE4] mt-5 py-6 cursor-pointer'
      onClick={onClick}
    >
      <Box component='div' className='flex justify-between text-[14px] '>
        <Box component='div'>
          <Paragraph className='font-semibold capitalize'>{title}</Paragraph>
          <Paragraph className=''>{description}</Paragraph>
        </Box>
        <Box component='div'>
          <Paragraph
            className={[
              amount > 0
                ? 'text-fair-money'
                : amount < 0
                ? 'text-[#F03E62]'
                : '',
            ]}
          >
            {FormatCurrency({ amount: amount, currency: 'NGN' })}
          </Paragraph>
        </Box>
      </Box>
    </Box>
  );
};

export default TransactionItem;
