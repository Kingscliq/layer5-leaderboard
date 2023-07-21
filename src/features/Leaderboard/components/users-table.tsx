import Section from '@components/elements/Section';
import Table from '@components/elements/Table';
import Paragraph from '@components/elements/Text/Paragraph';
import { createColumnHelper } from '@tanstack/react-table';

const UsersTable = ({ users, loading }: any) => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor(() => 'num', {
      id: 'num',
      header: () => <span>S/N</span>,
      cell: (info) => {
        const value = info.row.index + 1;
        return <span>{value}</span>;
      },
    }),

    columnHelper.accessor((row: any) => 'fullname', {
      id: 'fullname',
      cell: (info: any) => {
        const { title, surname, fullname } = info.row.original;
        return <span>{`${title} ${surname} ${fullname}`}</span>;
      },
    }),

    columnHelper.accessor((row: any) => 'Next of Kin email', {
      id: 'email',
      cell: (info: any) => {
        const { kinEmail } = info.row.original;
        return <span>{kinEmail || '-'}</span>;
      },
    }),

    columnHelper.accessor((row: any) => 'gender', {
      id: 'gender',
      cell: (info: any) => {
        const { gender } = info.row.original;
        return <span>{gender || '-'}</span>;
      },
    }),

    columnHelper.accessor((row: any) => 'phone number', {
      id: 'phone number',
      cell: (info: any) => {
        const { phone } = info.row.original;
        return <span>{phone}</span>;
      },
    }),

    columnHelper.accessor(() => 'passport no', {
      id: 'passport no',
      cell: (info: any) => {
        const { passportNo } = info.row.original;
        return <span>{passportNo}</span>;
      },
    }),
    columnHelper.accessor(() => 'type', {
      id: 'type',
      cell: (info: any) => {
        const { type } = info.row.original;
        return <span>{type}</span>;
      },
    }),

    columnHelper.accessor(() => 'date-of-Issue', {
      id: 'date of issue',
      cell: (info: any) => {
        const { dateOfIssue } = info.row.original;
        return <span>{dateOfIssue}</span>;
      },
    }),
  ];

  return (
    <Section>
      <Section className="px-2 mb-2 flex items-center justify-between">
        <Paragraph className="text-lg text-dark font-medium">
          Emergency Travel Table
        </Paragraph>

        {/* <Link className="text-success text-sm font-medium" to={appRoutes.ETC}>
          View All
        </Link> */}
      </Section>
      <Section>
        <Table columns={columns} data={users} loading={loading} />
      </Section>
    </Section>
  );
};

export default UsersTable;
