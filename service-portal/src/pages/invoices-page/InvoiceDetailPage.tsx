import { LeftOutlined } from '@ant-design/icons';
import { Heading, Text } from 'components';
import { PAGE_ROUTES } from 'consts';
import { motion } from 'framer-motion';
import { useTitle } from 'hooks';
import { Link, useParams } from 'react-router-dom';
import { generateFadeInFadeOut } from 'utils';

interface Props {
  title?: string;
}

export function InvoiceDetailPage({ title }: Props) {
  const params = useParams();

  useTitle(title);

  return (
    <motion.div
      variants={generateFadeInFadeOut()}
      initial="initial"
      animate="animate"
      className="mx-[5%] bg-white px-4 pt-8 pb-20 rounded-md shadow min-h-screen"
    >
      <Link to={PAGE_ROUTES.INVOICES.PATH} className="flex items-center gap-2">
        <LeftOutlined className="flex items-center text-base" />
        <Text className="text-base select-none">Back to Listing</Text>
      </Link>
      <Heading level={2} className="mt-4">
        Invoice Details
      </Heading>
      <Text>invoice id: {params.id}</Text>
      <Heading className="text-sky-700">Coming soon!</Heading>
    </motion.div>
  );
}
