import { CaretDownOutlined, LeftOutlined } from '@ant-design/icons';
import { Heading, Text } from 'components/typography';
import { MAP_MONTH } from 'consts/moment-consts';
import { PAGE_ROUTES } from 'consts/page-consts';
import { motion } from 'framer-motion';
import { useTitle } from 'hooks';
import _ from 'lodash';
import moment from 'moment';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';
import { defaultEase } from 'utils/motion-utils';
import { SelectMonthPopover } from './components/SelectMonthPopover';

interface Props {
  title?: string;
}

export const DrugsReportPage = ({ title }: Props) => {
  const now = useRef(moment().utc()).current;
  const [selectMonthPopoverVisible, setSelectMonthPopoverVisible] = useState(false);
  const [selectYearPopoverVisible, setSelectYearPopoverVisible] = useState(false);

  const { drugUsageReport, selectedMonth } = useSelector(
    (state: RootState) => state.statisticModel,
  );
  const loading = useSelector((state: RootState) => state.loading.effects.statisticModel);
  const dispatch = useDispatch<RootDispatch>();

  useTitle(title);

  useEffect(() => {
    dispatch.statisticModel.doGetDrugUsageReports({
      month: selectedMonth[0],
      year: selectedMonth[1],
    });
  }, [dispatch.statisticModel, now, selectedMonth]);

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
        className="mb-4"
      >
        <Link to={PAGE_ROUTES.STATISTICS.PATH} className="flex items-center gap-2">
          <LeftOutlined className="flex items-center text-base" />
          <Text className="text-base select-none">Back to Monthly Reports</Text>
        </Link>

        <div className="flex items-center mt-4">
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
      </motion.div>
      {_.isEmpty(drugUsageReport) && !loading.doGetDrugUsageReports ? (
        <motion.div
          initial={{
            opacity: 0,
            x: 60,
          }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.25, ease: defaultEase, delay: 0.05 },
          }}
          className="text-base"
        >
          There's no drug usages report!
        </motion.div>
      ) : (
        <div className="flex flex-col gap-4">
          {drugUsageReport.map((drugReport, index) => (
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
              className="flex items-center gap-5 px-4 py-5 bg-white rounded-md shadow"
            >
              <div className="flex flex-col w-1/6 gap-2">
                <Text className="text-base font-extralight text-typo-tertiary">No.</Text>
                <Text className="text-lg text-typo-tertiary">{index + 1}</Text>
              </div>
              <div className="flex flex-col w-2/6 gap-2">
                <Text className="text-base font-extralight text-typo-tertiary">Drug</Text>
                <Text className="text-lg">{drugReport.drug.description}</Text>
              </div>
              <div className="flex flex-col w-1/6 gap-2">
                <Text className="text-base font-extralight text-typo-tertiary">Unit</Text>
                <Text className="text-lg">{drugReport.unit.description}</Text>
              </div>
              <div className="flex flex-col w-1/6 gap-2">
                <Text className="text-base font-extralight text-typo-tertiary">Sold Quantity</Text>
                <Text className="text-lg">{drugReport.quantity}</Text>
              </div>
              <div className="flex flex-col w-1/4 gap-2">
                <Text className="text-base font-extralight text-typo-tertiary">Usage Number</Text>
                <Text className="text-lg">{drugReport.numberOfUse}</Text>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
