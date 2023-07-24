import Section from '@components/elements/Section';
import Paragraph from '@components/elements/Text/Paragraph';

const Header = () => {
  return (
    <Section className="bg-primary h-[400px] flex items-center justify-center text-white flex-col">
      <Paragraph className="text-4xl font-bold">Hello 👋</Paragraph>
      <Paragraph className="my-4">
        {'Welcome to the service mesh community’s discussion forum.'}
      </Paragraph>
    </Section>
  );
};

export default Header;
