import { Heading, Paragraph, PrimaryButton, Text } from 'components';
import './App.css';

export default function App() {
  return (
    <div>
      <PrimaryButton type="primary">This is button from antd</PrimaryButton>
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
