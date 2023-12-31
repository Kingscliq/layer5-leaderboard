import Section from '@components/elements/Section';
import { useFetchLeaderBoard } from './api';
import TableComponent from '@components/elements/Table';
import Header from './components/Header';
import React from 'react';

const HomeModule = () => {
  const { leaderBoard, leadColumns, loadingLeaderBoard } =
    useFetchLeaderBoard();

  const _leaderboard = React.useMemo(
    () =>
      Array.isArray(leaderBoard?.directory_items)
        ? leaderBoard?.directory_items
        : [],
    [leaderBoard]
  );
  return (
    <Section>
      <Header />
      <TableComponent
        data={_leaderboard}
        columns={leadColumns}
        loading={loadingLeaderBoard}
      />
    </Section>
  );
};

export default HomeModule;
