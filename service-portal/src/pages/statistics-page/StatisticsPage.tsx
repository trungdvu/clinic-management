import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CaretDownOutlined,
  MenuOutlined,
  RightOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import { Heading, Text } from 'components/typography';
import { MAP_MONTH, PAGE_ROUTES } from 'consts';
import { motion } from 'framer-motion';
import { useTitle } from 'hooks';
import _ from 'lodash';
import moment from 'moment';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';
import { formatVND } from 'utils/common-utils';
import { defaultEase } from 'utils/motion-utils';
import { SelectMonthPopover } from './components/SelectMonthPopover';

interface Props {
  title?: string;
}

export const StatisticsPage = ({ title }: Props) => {
  const now = useRef(moment().utc()).current;
  const [selectMonthPopoverVisible, setSelectMonthPopoverVisible] = useState(false);
  const [selectYearPopoverVisible, setSelectYearPopoverVisible] = useState(false);

  const { monthlyRevenues, selectedMonth } = useSelector(
    (state: RootState) => state.statisticModel,
  );
  const loading = useSelector((state: RootState) => state.loading.effects.statisticModel);
  const dispatch = useDispatch<RootDispatch>();

  const currentDay = now.date();
  const currentYear = now.year();
  const currentMonth = now.month() + 1;

  useTitle(title);

  useEffect(() => {
    dispatch.statisticModel.doGetMonthlyRevenues({
      month: selectedMonth[0],
      year: selectedMonth[1],
    });
  }, [dispatch.statisticModel, now, selectedMonth]);

  const isToday = (day: number) =>
    currentDay === day && currentYear === selectedMonth[1] && currentMonth === selectedMonth[0];

  const isFuture = (day: number) =>
    selectedMonth[1] > currentYear ||
    (selectedMonth[1] === currentYear && selectedMonth[0] > currentMonth) ||
    (selectedMonth[0] === currentMonth && selectedMonth[0] === currentMonth && day > currentDay);

  const onSelectMonthVisibleChange = useCallback((visible: boolean) => {
    setSelectMonthPopoverVisible(visible);
  }, []);

  const onSelectYearVisibleChange = useCallback((visible: boolean) => {
    setSelectYearPopoverVisible(visible);
  }, []);

  return (
    <div className="mb-10">
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
        className="flex items-center justify-between mb-4"
      >
        <div className="flex items-center">
          <SelectMonthPopover
            variant="month"
            visible={selectMonthPopoverVisible}
            onVisibleChange={onSelectMonthVisibleChange}
          >
            <div className="flex items-center transition-all duration-150 cursor-pointer select-none active:bg-opacity-10 hover:bg-black hover:bg-opacity-5">
              <Heading level={2} className="mb-0 mr-1">
                {`${MAP_MONTH[selectedMonth[0]]}`}
              </Heading>
              <CaretDownOutlined />
            </div>
          </SelectMonthPopover>

          <SelectMonthPopover
            variant="year"
            visible={selectYearPopoverVisible}
            onVisibleChange={onSelectYearVisibleChange}
          >
            <div className="flex items-center ml-4 transition-all duration-150 cursor-pointer select-none active:bg-opacity-10 hover:bg-black hover:bg-opacity-5">
              <Heading level={2} className="mb-0 mr-1">
                {` ${selectedMonth[1]}`}
              </Heading>
              <CaretDownOutlined />
            </div>
          </SelectMonthPopover>
        </div>

        <Link to={PAGE_ROUTES.STATISTICS.DRUGS_REPORTS.PATH} className="flex items-center gap-2">
          <Text className="text-base select-none">Go to Drugs Report</Text>
          <RightOutlined className="flex items-center text-base" />
        </Link>
      </motion.div>
      {_.isEmpty(monthlyRevenues) && !loading.doGetMonthlyRevenues ? (
        <Text type="danger" className="text-base">
          Not founded.
        </Text>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {monthlyRevenues.map((monthlyRevenue, index) => (
            <motion.div
              key={index}
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
                'ring-4 bg-base-secondary text-white': isToday(monthlyRevenue.day),
                'bg-white': !isToday(monthlyRevenue.day),
              })}
            >
              <div className="flex w-1/5 align-top">
                <Text
                  className={classNames('text-5xl font-thin text-center min-w-[60px]', {
                    'text-white': isToday(monthlyRevenue.day),
                    'text-typo-tertiary': !isToday(monthlyRevenue.day),
                  })}
                >
                  {monthlyRevenue.day}
                </Text>
              </div>
              <div className="flex flex-col items-end w-1/5">
                <Text
                  className={classNames('text-base font-extralight', {
                    'text-white': isToday(monthlyRevenue.day),
                    'text-typo-tertiary': !isToday(monthlyRevenue.day),
                  })}
                >
                  Patients
                </Text>
                <Text className="mt-4 ml-2 text-lg">
                  {isFuture(monthlyRevenue.day) ? '--' : monthlyRevenue.numberOfPatient}
                </Text>
              </div>

              <div className="flex flex-col items-end w-3/5 mr-2">
                <Text
                  className={classNames('text-base font-extralight', {
                    'text-white':
                      currentDay === monthlyRevenue.day &&
                      currentYear === selectedMonth[1] &&
                      currentMonth === selectedMonth[0],
                    'text-typo-tertiary': monthlyRevenue.day !== currentDay,
                  })}
                >
                  Revenue (vnđ)
                </Text>
                <div className="flex items-center justify-end w-full mt-4">
                  {isFuture(monthlyRevenue.day) ? (
                    <Text className="ml-1 text-lg">--</Text>
                  ) : monthlyRevenue.revenue < monthlyRevenues[index - 1]?.revenue ? (
                    <>
                      <ArrowDownOutlined className="text-typo-error" />
                      <Text className="ml-1 text-lg text-typo-error">
                        {formatVND(monthlyRevenue.revenue)}
                      </Text>
                    </>
                  ) : monthlyRevenue.revenue === monthlyRevenues[index - 1]?.revenue ? (
                    <>
                      <MenuOutlined className="text-yellow-500" />
                      <Text className="ml-1 text-lg text-yellow-500">
                        {formatVND(monthlyRevenue.revenue)}
                      </Text>
                    </>
                  ) : (
                    <>
                      <ArrowUpOutlined className="text-typo-success" />
                      <Text className="ml-1 text-lg text-typo-success">
                        {formatVND(monthlyRevenue.revenue)}
                      </Text>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
