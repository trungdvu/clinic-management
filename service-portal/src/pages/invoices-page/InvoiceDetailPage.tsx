import { LeftOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { Heading, PrimaryButton, Text } from 'components';
import { PAGE_ROUTES } from 'consts';
import { motion } from 'framer-motion';
import { useTitle } from 'hooks';
import { InvoiceDetail } from 'interfaces/invoice-interfaces';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';
import { generateFadeInFadeOut } from 'utils';

interface Props {
  title?: string;
}

export function InvoiceDetailPage({ title }: Props) {
  const loading = useSelector((state: RootState) => state.loading.effects.invoiceModel);
  const dispatch = useDispatch<RootDispatch>();
  const params = useParams();
  const [invoice, setInvoice] = useState<InvoiceDetail>();

  useTitle(title);

  useEffect(() => {
    dispatch.invoiceModel
      .doGetInvoiceDetail(params.id!)
      .then((res) => res !== false && setInvoice(res));
  }, [dispatch.invoiceModel, params.id]);

  const onClickCompleted = useCallback(async () => {
    const result = await dispatch.invoiceModel.doCompletedInvoice(params.id!);
    result && setInvoice({ ...invoice!, status: 'completed' });
  }, [dispatch.invoiceModel, invoice, params.id]);

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
      {loading.doGetInvoiceDetail ? (
        <Spin />
      ) : invoice ? (
        <>
          <Text>invoice id: {params.id}</Text>
          <PrimaryButton
            disabled={invoice?.status === 'completed'}
            className="my-4"
            loading={loading.doCompletedInvoice}
            onClick={onClickCompleted}
          >
            {invoice?.status === 'completed'
              ? 'This Invoice has already completed'
              : 'Completed This Invoice'}
          </PrimaryButton>
        </>
      ) : (
        <Text type="danger" className="text-base">
          Not founded.
        </Text>
      )}

      <Heading className="mt-4 text-sky-700">Coming soon!</Heading>
    </motion.div>
  );
}
