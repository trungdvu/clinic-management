import { Empty, Row, Skeleton } from 'antd';
import classNames from 'classnames';
import { BackToTop, Text } from 'components';
import { PAGE_ROUTES } from 'consts';
import { motion } from 'framer-motion';
import { useTitle } from 'hooks';
import { DashboardSummaryTodayResponse } from 'interfaces/dashboard-interfaces';
import _ from 'lodash';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootDispatch } from 'store';
import { defaultLayoutVariants } from 'utils';

interface Props {
  title?: string;
}

export const DashboardPage = ({ title }: Props): JSX.Element => {
  const [summary, setSummary] = useState<DashboardSummaryTodayResponse>();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<RootDispatch>();

  useTitle(title);

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line

  const fetchData = useCallback(async () => {
    setLoading(true);
    const result = await dispatch.dashboardModel.doGetDashboardSummary();
    typeof result !== 'boolean' && setSummary(result);
    setLoading(false);
  }, [dispatch.dashboardModel]);

  return (
    <motion.div
      variants={defaultLayoutVariants}
      initial="initial"
      animate="animate"
      className="mb-10"
    >
      {loading ? (
        <div className="flex flex-col w-full">
          <Skeleton.Button active={true} className="h-6 w-72" />
          <Skeleton.Button active={true} block={true} className="h-32 mt-1" />
        </div>
      ) : (
        <>
          {summary ? (
            <div className="flex flex-row gap-5">
              <div className="flex flex-col w-2/3">
                <div className="flex flex-col justify-center w-full gap-1">
                  <Text className="text-sm font-medium text-typo-tertiary mt-0.5">
                    SUMMARY FOR TODAY
                  </Text>
                  <div className="flex items-center justify-around gap-20 px-10 py-5 bg-white rounded-md shadow">
                    <div className="flex flex-col items-center w-1/3">
                      <Text className="text-center text-typo-tertiary whitespace-nowrap">
                        PENDING BILLS
                      </Text>
                      <CountUp start={0} end={100} delay={0} duration={0.25}>
                        {({ countUpRef }) => (
                          <span ref={countUpRef} className="py-2 mt-2 text-4xl font-bold" />
                        )}
                      </CountUp>
                    </div>
                    <div className="flex flex-col items-center w-1/3">
                      <Text className="text-center whitespace-nowrap text-typo-tertiary">
                        ACTIVE BILLS
                      </Text>
                      <CountUp start={0} end={100} delay={0} duration={0.25}>
                        {({ countUpRef }) => (
                          <span ref={countUpRef} className="py-2 mt-2 text-4xl font-bold" />
                        )}
                      </CountUp>
                    </div>
                    <div className="flex flex-col items-center 1/3">
                      <Text className="text-center whitespace-nowrap text-typo-tertiary">
                        COMPLETED BILLS
                      </Text>
                      <CountUp start={0} end={100} delay={0} duration={0.25}>
                        {({ countUpRef }) => (
                          <span ref={countUpRef} className="py-2 mt-2 text-4xl font-bold" />
                        )}
                      </CountUp>
                    </div>
                  </div>
                </div>

                <div className="w-full mt-10">
                  <Text className="text-sm font-medium text-typo-tertiary">
                    SUMMARY MY PATIENTS
                  </Text>
                  <div className="px-4 py-1 mt-2 bg-white rounded-md shadow">
                    <Text className="text-typo-tertiary">All my patients today.</Text>
                    <div className="w-full h-px mt-4 bg-line-secondary" />
                    <div className="flex flex-col gap-2 mt-2">
                      {/* Content goes here */}
                      {_.isEmpty(summary.myMedicalBills) && (
                        <Empty
                          description="No notifications"
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                      )}
                      {_.map(summary.myMedicalBills, (bill, index) => (
                        <Row
                          key={bill.id}
                          className={classNames('flex items-center justify-between px-3 py-3', {
                            ' border-t border-line-secondary': index !== 0,
                          })}
                        >
                          <Link
                            to={PAGE_ROUTES.PATIENTS.DETAILS.ID(bill.patientId)}
                            className="w-1/3 font-medium"
                          >
                            {bill.patientFullName}
                          </Link>
                          <Text className="w-1/3 pl-8">
                            <Text className="text-typo-tertiary">at</Text>{' '}
                            <Text>{moment(bill.createdAt).format('h:mm A')}</Text>
                          </Text>
                          <Link
                            to={PAGE_ROUTES.MEDICAL_BILLS.DETAILS.ID(bill.id)}
                            className="w-1/3 text-right"
                          >
                            Go to medical bill
                          </Link>
                        </Row>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-1/2">
                <Text className="w-full text-sm font-medium text-typo-tertiary">NOTIFICATIONS</Text>
                <div className="w-full px-4 py-5 mt-1 bg-white rounded-md shadow">
                  <Text className="text-typo-tertiary">
                    You could dismiss notification to remove from this view.
                  </Text>
                  <div className="w-full h-px mt-4 bg-line-secondary" />
                  <div className="flex flex-col mt-2 overflow-auto">
                    <Empty description="No notifications" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    {/* Content goes here */}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Text type="danger" className="text-base">
              Not founded.
            </Text>
          )}
        </>
      )}

      <BackToTop />
    </motion.div>
  );
};
