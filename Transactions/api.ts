/**
 * **************************************************************************
 * **************************************************************************
 * Author: Ajaezo Kingsley ::::: PayForce By FairMoney :::::: © Copyright 2023
 *
 * email: kingsley.ajaezo@fairmoney.io
 *
 * filename: api.ts
 *
 * @description: This is a component that contains all the api needed for the
 * Transactions Page
 *
 * ***************************************************************************
 * ***************************************************************************
 *
 * @returns
 * @function
 *
 * ? Local & Shared Imports
 */

import * as React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import client, { pickErrorMessage, pickResult } from '@/lib/client';
import {
  DropDownTypes,
  PayloadTypes,
  TransactionQueryTypes,
  searchTypes,
} from '@/services/models/Transactions';

import { useToast } from '@/lib/hooks/useToast';

import {
  currentDate,
  emptyString,
  removeEmptyStringValues,
} from '@/lib/helpers';
import { useAppState } from '@/lib/auth.context';

const initialState: TransactionQueryTypes = {
  StartDate: currentDate,
  EndDate: currentDate,
  exportFormat: 2,
  ex_port: false,
  exportEmailAddress: '',
  TransactionType: '',
  TransactionStatus: '',
  SearchString: '',
  SearchBy: '',
  PageNumber: 1,
  PageSize: 10,
};

type Action =
  | {
      type: 'SET_FILTER';
      payload: {
        field: keyof TransactionQueryTypes;
        value: string | number | boolean;
      };
    }
  | { type: 'CHANGE_PAGE'; payload: { page: number } }
  | { type: 'RESET_STATE' }
  | {
      type: 'SEARCH_TRANSACTION';
      payload: { SearchBy: number; SearchString: string };
    }
  | {
      type: 'EXPORT_TRANSACTION';
      payload: {
        ex_port: boolean;
        exportEmailAddress: string;
        exportFormat: number;
      };
    };

function TransactionReducer(
  state: TransactionQueryTypes,
  action: Action
): TransactionQueryTypes {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case 'CHANGE_PAGE':
      return {
        ...state,
        PageNumber: action.payload.page,
      };
    case 'SEARCH_TRANSACTION':
      return {
        ...state,
        SearchString: action.payload.SearchString,
        SearchBy: action.payload.SearchBy,
      };
    case 'EXPORT_TRANSACTION':
      return {
        ...state,
        ex_port: action.payload.ex_port,
        exportEmailAddress: action.payload.exportEmailAddress,
        exportFormat: action.payload.exportFormat,
      };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

export const useTransactionFilter = () => {
  const [
    {
      StartDate,
      EndDate,
      exportEmailAddress,
      exportFormat,
      ex_port,
      TransactionType,
      TransactionStatus,
      SearchString,
      SearchBy,
      PageNumber,
      PageSize,
    },
    dispatch,
  ] = React.useReducer(TransactionReducer, initialState);

  const setTransFilter = React.useCallback(
    (payload: PayloadTypes) => {
      dispatch({ type: 'SET_FILTER', payload });
    },
    [dispatch]
  );

  const resetTransState = React.useCallback(() => {
    dispatch({ type: 'RESET_STATE' });
  }, [dispatch]);

  const handlePageChange = React.useCallback((page: number) => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: {
        page,
      },
    });
  }, []);

  const searchFilter = React.useCallback((search: searchTypes) => {
    dispatch({
      type: 'SEARCH_TRANSACTION',
      payload: search,
    });
  }, []);

  const { setAlert } = useToast();
  const { state } = useAppState();

  const transactionSummary = async (params: TransactionQueryTypes) => {
    const queryParams = {
      StartDate: params.StartDate,
      EndDate: params.EndDate,
      exportFormat: params.exportFormat,
      export: params.ex_port,
      exportEmailAddress: state?.user?.email,
      TransactionType: emptyString(params.TransactionType as string),
      TransactionStatus: emptyString(params.TransactionStatus as string),
      SearchString: params.SearchString,
      SearchBy: emptyString(params.SearchBy as string),
      PageNumber: 1,
      PageSize: 10,
    };
    try {
      const res = await client.get('t/sponsorportal/transaction-summary', {
        params: queryParams,
      });
      return pickResult(res);
    } catch (error) {
      return pickErrorMessage(error as any);
    }
  };

  const query = React.useMemo(() => {
    return {
      StartDate,
      EndDate,
      ex_port,
      exportEmailAddress,
      exportFormat,
      TransactionType,
      TransactionStatus,
      SearchString,
      SearchBy,
      PageNumber,
      PageSize,
    };
  }, [
    StartDate,
    EndDate,
    exportEmailAddress,
    exportFormat,
    ex_port,
    TransactionType,
    TransactionStatus,
    SearchString,
    SearchBy,
    PageNumber,
    PageSize,
  ]);

  const [downloadLink, setDownloadLink] = React.useState<
    { link: string; name: string; show: boolean } | undefined
  >(undefined);

  const [isExporting, setIsExporting] = React.useState<boolean>(false);
  const exportTransactions = React.useCallback(
    async (params: TransactionQueryTypes) => {
      const queryParams = {
        StartDate: params.StartDate,
        EndDate: params.EndDate,
        exportFormat: params.exportFormat,
        export: params.ex_port,
        exportEmailAddress: state.user?.email,
        TransactionType: emptyString(params.TransactionType as string),
        TransactionStatus: emptyString(params.TransactionStatus as string),
        SearchString: params?.SearchString,
        SearchBy: emptyString(params.SearchBy as string),
        PageNumber: 1,
        PageSize: 10,
      };

      setIsExporting(true);

      try {
        const res = await client.get('t/sponsorportal/transaction-summary', {
          params: queryParams,
        });
        if (res) {
          setAlert({
            message: 'Export successful, please check your registered email',
            severity: 'success',
            autoHideDuration: 8000,
          });
          resetTransState();
          setIsExporting(false);
        }
        return pickResult(res);
      } catch (error) {
        setIsExporting(false);
        return pickErrorMessage(error as any);
      }
    },
    [resetTransState, setAlert, state.user?.email]
  );

  const { data, isFetching } = useQuery({
    queryKey: ['all-transactions', query],
    queryFn: () => transactionSummary(query),
    onError(err) {
      setAlert({
        message: typeof err === 'string' ? err : 'Something went wrong!!!',
        severity: 'error',
        autoHideDuration: 5000,
      });
    },
  });

  const exportToEmail = React.useCallback(() => {
    exportTransactions(query);
  }, [exportTransactions, query]);

  return [
    {
      StartDate,
      EndDate,
      ex_port,
      TransactionType,
      TransactionStatus,
      SearchString,
      SearchBy,
      PageNumber,
      PageSize,
    },
    {
      handlePageChange,
      setTransFilter,
      resetTransState,
      searchFilter,
      exportToEmail,
    },
    { data, isFetching },
    { downloadLink, setDownloadLink, isExporting, setIsExporting },
  ];
};

export const useTransactionQueries = () => {
  const fetchStatusList = () =>
    client.get('t/portal/GetStatusList').then(pickResult, pickErrorMessage);
  const fetchTransTypeList = () =>
    client.get('t/portal/GetTransTypeList').then(pickResult, pickErrorMessage);
  const fetchSearchList = () =>
    client.get('t/portal/GetSearchbyList').then(pickResult, pickErrorMessage);

  const { data: statusList, isFetching: loadingStatusList } = useQuery({
    queryKey: ['statusList'],
    queryFn: fetchStatusList,
    onError: (err) =>
      toast.error(
        typeof err === 'string'
          ? err
          : 'Something went wrong fetching status list'
      ),
  });

  const { data: transTypeList, isFetching: loadingTransTypeList } = useQuery({
    queryKey: ['transTypeList'],
    queryFn: fetchTransTypeList,
    onError: (err) =>
      toast.error(
        typeof err === 'string'
          ? err
          : 'Something went wrong fetching status list'
      ),
  });

  const { data: searchByList, isFetching: loadingSearchByList } = useQuery({
    queryKey: ['searchList'],
    queryFn: fetchSearchList,
    onError: (err) =>
      toast.error(
        typeof err === 'string'
          ? err
          : 'Something went wrong fetching status List'
      ),
  });
  return [
    { statusList, loadingStatusList },
    { transTypeList, loadingTransTypeList },
    { searchByList, loadingSearchByList },
  ];
};

export const useTransactionDetail = (id: string | undefined) => {
  const { setAlert } = useToast();
  const fetchTransactionDetail = (id: string | undefined) =>
    client
      .get(`t/sponsorportal/transaction-details/${id}`)
      .then(pickResult, pickErrorMessage);

  const { data: transactionDetail, isFetching: loadingTransactionDetail } =
    useQuery({
      queryKey: ['donwline-detail', id],
      queryFn: () => fetchTransactionDetail(id),
      enabled: !!id,
      onError: (err) =>
        setAlert({
          message: typeof err === 'string' ? err : 'Something went wrong!!!',
          severity: 'error',
          autoHideDuration: 5000,
        }),
    });

  return {
    transactionDetail,
    loadingTransactionDetail,
  };
};
