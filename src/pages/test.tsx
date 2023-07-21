import { createColumnHelper } from '@tanstack/react-table';
import Table from '@components/elements/Table';
import Dropdown from '@components/elements/Dropdown';
const Test = () => {
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
    columnHelper.accessor((row: any) => 'firstname', {
      id: 'firstname',
      cell: (info: any) => {
        const { firstname } = info.row.original;
        return <span>{firstname || '-'}</span>;
      },
    }),
    columnHelper.accessor(() => 'lastname', {
      id: 'lastname',
      cell: (info: any) => {
        const { lastname } = info.row.original;
        return (
          <span className="text-dark-1 font-semibold">{lastname || '-'}</span>
        );
      },
    }),
    columnHelper.accessor((row: any) => 'Student No', {
      id: 'Student No',
      cell: (info: any) => {
        const { studentNo } = info.row.original;
        return <span>{studentNo || '-'}</span>;
      },
    }),
    columnHelper.accessor((row: any) => 'School Town', {
      id: 'School Town',
      cell: (info: any) => {
        const { schooltown } = info.row.original;
        return <span>{schooltown}</span>;
      },
    }),
    columnHelper.accessor(() => 'University', {
      id: 'University',
      cell: (info: any) => {
        const { university } = info.row.original;
        return <span>{university}</span>;
      },
    }),
    columnHelper.accessor(() => 'Course', {
      id: 'Course',
      cell: (info: any) => {
        const { course } = info.row.original;
        return <span>{course}</span>;
      },
    }),
    columnHelper.accessor(() => 'Course Start Date', {
      id: 'Course Start Date',
      cell: (info: any) => {
        const { courseStartDate } = info.row.original;
        return <span>{courseStartDate}</span>;
      },
    }),
    columnHelper.accessor(() => 'Graduation Date', {
      id: 'Graduation Date',
      cell: (info: any) => {
        const { courseEndDate } = info.row.original;
        return <span>{courseEndDate}</span>;
      },
    }),

    columnHelper.accessor(() => 'more', {
      id: 'more',
      header: () => '',
      cell: (info: any) => {
        const { user_id } = info.row.original;
        return (
          <p>Hello</p>
          // <Dropdown label={<img src={ellipsis} alt="ellipsis" />}>
          //   <Section className="py-4 w-36">
          //     <Section className="px-4 py-2 text-gray-400 hover:bg-gray-100 cursor-pointer hover:text-black">
          //       <Link to={`/students?userId=${user_id}`}>View</Link>
          //     </Section>
          //     <Section className="px-4 py-2 text-gray-400 hover:bg-gray-100 cursor-pointer hover:text-black">
          //       <Link to={`/students?userId=${user_id}`}>Update</Link>
          //     </Section>
          //     <Section className="px-4 py-2 text-gray-400 hover:bg-gray-100 cursor-pointer hover:text-black">
          //       <button className="text-red-300">Delete</button>
          //     </Section>
          //   </Section>
          // </Dropdown>
        );
      },
    }),
  ];

  return (
    <div className="bg-white p-8">
      <div className="my-40">
        {/* <Table
          columns={columns}
          data={STUDENTS.studentsList}
          currentPage={1}
          total={1}
          limit={tableData?.length}
          setCurrentPage={function (value: SetStateAction<number>): void {
            throw new Error('Function not implemented.');
          }}
          loading={STUDENTS.loadingStudentsList}
        /> */}
      </div>
    </div>
  );
};

export default Test;
