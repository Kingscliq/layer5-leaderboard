import { LeaderBoardData } from '@/types/index';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { totalPoints } from '@utils/helpers';
import { axios } from 'lib';
import React from 'react';
import { toast } from 'react-toastify';

export const useFetchLeaderBoard = () => {
  const fetchLeaderBoard = async () => {
    try {
      const response = await axios.get(
        `directory_items.json/?order=likes_received&period=weekly`
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  };

  const leadColumns = React.useMemo<ColumnDef<LeaderBoardData>[]>(
    () => [
      {
        header: 'Rank',
        accessorKey: '',
        cell: (info) => {
          const value = info?.row?.index + 1;
          return <span>{value}</span>;
        },
      },
      {
        header: 'Member',
        accessorKey: 'user',
        accessorFn: (row: any) => row?.user?.name,
        cell: (info) => {
          const { user } = info?.row?.original;
          return <span>{user?.name}</span>;
        },
      },
      {
        header: 'Likes',
        accessorKey: 'likes_received',
        cell: (info) => info?.getValue(),
      },
      {
        header: 'Visits',
        accessorKey: 'days_visited',
        cell: (info) => info?.getValue(),
      },
      {
        header: 'Posts',
        accessorKey: 'post_count',
        cell: (info) => info?.getValue(),
      },
      {
        header: 'Solutions Accepted',
        accessorKey: 'solutions',
        cell: (info) => info?.getValue(),
      },
      {
        header: 'Total Points',
        accessorKey: 'solutions',
        cell: (info) => {
          const { likes_received, post_count, solutions } = info?.row?.original;
          return (
            <span>{totalPoints(post_count, likes_received, solutions)}</span>
          );
        },
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
