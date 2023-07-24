import { LeaderBoardData } from '@/types/index';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { axios } from 'lib';
import React from 'react';
import { toast } from 'react-toastify';

export const useFetchLeaderBoard = () => {
  const fetchDashboardMetrics = async () => {
    try {
      const response = await axios.get(
        `directory_items.json/?order=likes_received&period=weekly`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const config = {
    headers: {
      // Accept: 'application/json',
      'Api-Key':
        '0deda792d73d76ec3d59b2e7d7adbfeadff0e78d3ba625afb1f828921de51c6e',
      'Api-Username': 'Lee',
    },
  };
  const fetchLeaderBoard = async () => {
    fetch(
      'https://discuss.layer5.io/directory_items.json/?order=likes_received&period=weekly',
      config
    )
      .then((res) => res.json())
      .then((data) => data.data)
      .catch((error) => console.log(error));
  };

  const leadColumns = React.useMemo<ColumnDef<LeaderBoardData>[]>(
    () => [
      {
        header: 'Rank',
        accessorKey: '',
        cell: (info) => {
          const value = info.row.index + 1;
          return <span>{value}</span>;
        },
      },
      {
        header: 'Member',
        accessorKey: '',
        cell: (info) => {
          const { user } = info.row.original;
          return <span>{user?.name}</span>;
        },
      },
      {
        header: 'Likes',
        accessorKey: 'likes_received',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Visits',
        accessorKey: 'days_visited',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Posts',
        accessorKey: 'post_count',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Solutions Accepted',
        accessorKey: 'solutions',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Total Points',
        accessorKey: 'solutions',
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  const { data: leaderBoard, isFetching: loadingLeaderBoard } = useQuery({
    queryKey: ['leader-board'],
    queryFn: fetchLeaderBoard,
    onError: (err) =>
      toast.error(
        typeof err === 'string'
          ? err
          : 'Something went wrong fetching status list'
      ),
  });

  return { leaderBoard, loadingLeaderBoard, leadColumns };
};
