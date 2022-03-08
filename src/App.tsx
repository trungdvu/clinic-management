import { SearchOutlined } from '@ant-design/icons';
import {
  Heading,
  HyperLinkButton,
  IconButton,
  Paragraph,
  PrimaryButton,
  SecondaryButton,
  Text,
} from 'components';
import './App.css';

export default function App() {
  return (
    <div className="p-10">
      <PrimaryButton type="primary">This is button from antd</PrimaryButton>
      <SecondaryButton loading={true} type="primary">
        This is button from antd
      </SecondaryButton>
      <HyperLinkButton>HyperLinkButton</HyperLinkButton>
      <IconButton icon={<SearchOutlined />}></IconButton>
      <h1 className="text-3xl font-bold text-red-500 underline">Hello world!</h1>
      <Heading className="font-sans">This is heading</Heading>
      <Text>Primary</Text>
      <Paragraph type="secondary">Secondary</Paragraph>
      <Paragraph type="warning">Warning</Paragraph>
      <Paragraph type="success">Success</Paragraph>
      <Paragraph type="danger">Danger</Paragraph>
    </div>
  );
}
