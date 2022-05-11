import { RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { Heading, Text } from 'components/typography';
import { PAGE_ROUTES } from 'consts';
import { motion } from 'framer-motion';
import { useTitle } from 'hooks';
import _ from 'lodash';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';
import { formatVND } from 'utils/common-utils';
import { defaultEase } from 'utils/motion-utils';

interface Props {
  title?: string;
}

export const StatisticsPage = ({ title }: Props) => {
  const currentDay = moment().date();
  const { monthlyRevenues } = useSelector((state: RootState) => state.statisticModel);
  const loading = useSelector((state: RootState) => state.loading.effects.statisticModel);
  const dispatch = useDispatch<RootDispatch>();

  useTitle(title);

  useEffect(() => {
    dispatch.statisticModel.doGetMonthlyRevenues();
    dispatch.statisticModel.doGetDrugUsageReports();
  }, [dispatch.statisticModel]);

  return (
    <div className="mb-10">
      {_.isEmpty(monthlyRevenues) && !loading.doGetMonthlyRevenues ? (
        <Text type="danger" className="text-base">
          Not founded.
        </Text>
      ) : (
        <>
          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.25, ease: defaultEase },
            }}
            className="flex items-center justify-between"
          >
            <Heading level={2}>{moment().format('MMMM YYYY')}</Heading>
            <Link
              to={PAGE_ROUTES.STATISTICS.DRUGS_REPORTS.PATH}
              className="flex items-center gap-2"
            >
              <Text className="text-base select-none">Go to Drugs Report</Text>
              <RightOutlined className="flex items-center text-base" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-3 gap-4">
            {monthlyRevenues.map((monthlyRevenue, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.25, ease: defaultEase, delay: index * 0.05 },
                }}
                className={classNames('flex items-center gap-5 px-4 py-8 rounded-md shadow', {
                  'ring-4 bg-base-secondary text-white': currentDay === monthlyRevenue.day,
                  'bg-white': currentDay !== monthlyRevenue.day,
                })}
              >
                <div className="flex w-1/5 align-top">
                  <Text
                    className={classNames('text-5xl font-thin text-center min-w-[60px]', {
                      'text-white': monthlyRevenue.day === currentDay,
                      'text-typo-tertiary': monthlyRevenue.day !== currentDay,
                    })}
                  >
                    {monthlyRevenue.day}
                  </Text>
                </div>
                <div className="flex flex-col w-2/5">
                  <Text
                    className={classNames('text-base font-extralight', {
                      'text-white': monthlyRevenue.day === currentDay,
                      'text-typo-tertiary': monthlyRevenue.day !== currentDay,
                    })}
                  >
                    Patients
                  </Text>
                  <Text className="mt-4 ml-2 text-lg">
                    {monthlyRevenue.day > currentDay ? '--' : monthlyRevenue.numberOfPatient}
                  </Text>
                </div>
                <div className="flex flex-col w-2/5">
                  <Text
                    className={classNames('text-base font-extralight', {
                      'text-white': monthlyRevenue.day === currentDay,
                      'text-typo-tertiary': monthlyRevenue.day !== currentDay,
                    })}
                  >
                    Revenue
                  </Text>
                  <Text className="mt-4 text-lg">
                    {monthlyRevenue.day > currentDay
                      ? '--'
                      : formatVND(monthlyRevenue.numberOfPatient)}
                  </Text>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
