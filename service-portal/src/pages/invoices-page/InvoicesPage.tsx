import { Col, Empty, Row, Tabs } from 'antd';
import classNames from 'classnames';
import { Heading, SkeletonListing, Text } from 'components';
import { PAGE_ROUTES } from 'consts/page-consts';
import { motion } from 'framer-motion';
import { useTitle } from 'hooks';
import _ from 'lodash';
import moment from 'moment';
import { Status } from 'pages/medical-bills-page/components/Status';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';
import { defaultLayoutVariants, formatVND } from 'utils';

interface Props {
  title?: string;
}

export function InvoicesPage({ title }: Props) {
  const navigate = useNavigate();

  const dispatch = useDispatch<RootDispatch>();
  const loading = useSelector((state: RootState) => state.loading.effects.invoiceModel);
  const { invoices } = useSelector((state: RootState) => state.invoiceModel);

  useEffect(() => {
    dispatch.invoiceModel.setInvoices([]);
    dispatch.invoiceModel.doGetInvoices();
  }, [dispatch.invoiceModel]);

  useTitle(title);

  const onClickRow = useCallback(
    (id: string) => (e: any) => {
      e.target.localName !== 'a' && navigate(PAGE_ROUTES.INVOICES.DETAILS.ID(id));
    },
    [navigate],
  );

  return (
    <motion.div
      variants={defaultLayoutVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen px-4 py-8 bg-white rounded-md shadow"
    >
      <div className="flex justify-between">
        <Heading level={2}>Invoices</Heading>
      </div>

      {loading.doGetInvoices ? (
        <SkeletonListing />
      ) : (
        <Tabs type="card" defaultActiveKey="1" className="pb-10">
          <Tabs.TabPane key={1} tab="All invoices">
            <Row gutter={24} className="px-5 py-3 font-medium text-typo-tertiary">
              <Col span={5}>PATIENT</Col>
              <Col span={5}>CREATED AT</Col>
              <Col span={6}>CREATED BY</Col>
              <Col span={5}>STATUS</Col>
              <Col span={3} className="text-right">
                TOTAL
              </Col>
            </Row>
            <div className="h-px bg-line-secondary" />
            {_.isEmpty(invoices) ? (
              <Empty
                description={<Text className="text-typo-tertiary">No invoices.</Text>}
                className="mt-16"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ) : (
              <>
                {invoices.map((invoice, index) => (
                  <Row
                    key={invoice.id}
                    gutter={24}
                    className={classNames(
                      'flex items-center px-5 py-3 transition-all duration-150 select-none cursor-pointer',
                      'hover:bg-black hover:bg-opacity-[2.5%]',
                      {
                        'border-t border-line-secondary': index !== 0,
                      },
                    )}
                    onClick={onClickRow(invoice.id)}
                  >
                    <Col span={5}>
                      <Link to={PAGE_ROUTES.PATIENTS.DETAILS.ID(invoice.patient.id)}>
                        {invoice.patient.fullName}
                      </Link>
                    </Col>
                    <Col span={5} className="flex flex-col">
                      <Text className="font-semibold">
                        {moment(invoice.createdAt).format('ddd D MMM YY')}
                      </Text>
                      <Text>{moment(invoice.createdAt).format('H:mm A')}</Text>
                    </Col>
                    <Col span={6} className="py-3">
                      <Link to={`#profile/${invoice.createdBy}`}>
                        {_.truncate(invoice.createdBy)}
                      </Link>
                    </Col>
                    <Col span={5}>
                      <Status status={invoice.status as any} />
                    </Col>
                    <Col span={3} className="text-right">
                      <Text>
                        {formatVND(invoice.medicalExamCost + invoice.totalDrugCost, 'currency')}
                      </Text>
                    </Col>
                  </Row>
                ))}
              </>
            )}
          </Tabs.TabPane>
        </Tabs>
      )}
    </motion.div>
  );
}
