import Section from '@components/elements/Section';
import { useFetchLeaderBoard } from './api';
import TableComponent from '@components/elements/Table';
import Header from './components/Header';

const HomeModule = () => {
  const { leaderBoard, leadColumns, loadingLeaderBoard } =
    useFetchLeaderBoard();
  return (
    <Section>
      <Header />
      {leaderBoard?.directory_items.length > 0 && (
        <TableComponent
          data={leaderBoard?.directory_items}
          columns={leadColumns}
          loading={loadingLeaderBoard}
        />
      )}
    </Section>
  );
};

export default HomeModule;
