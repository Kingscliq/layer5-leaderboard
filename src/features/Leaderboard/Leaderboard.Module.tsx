import Section from '@components/elements/Section';
import { useFetchLeaderBoard } from './api';
import TableComponent from '@components/elements/Table';

const HomeModule = () => {
  const { leaderBoard, leadColumns, loadingLeaderBoard } =
    useFetchLeaderBoard();

  console.log(leaderBoard);
  return (
    <Section>
      hello
      {/* <TableComponent
        data={leaderBoard}
        columns={leadColumns}
        loading={loadingLeaderBoard}
      /> */}
    </Section>
  );
};

export default HomeModule;
