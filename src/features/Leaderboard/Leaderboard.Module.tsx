import Section from '@components/elements/Section';
import { useFetchLeaderBoard } from './api';
import TableComponent from '@components/elements/Table';
import Header from './components/Header';
import BtnLoader from '@components/elements/Button/loader';

const HomeModule = () => {
  const { leaderBoard, leadColumns, loadingLeaderBoard } =
    useFetchLeaderBoard();

  return (
    <Section>
      <Header />
      {loadingLeaderBoard && (
        <Section className="h-64 w-full flex items-center justify-center">
          <Section>
            <BtnLoader />
          </Section>
        </Section>
      )}
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
