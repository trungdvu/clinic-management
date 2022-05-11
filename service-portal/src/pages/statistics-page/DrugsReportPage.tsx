import { ArrowRightOutlined, LeftOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { HyperLinkButton } from 'components/buttons';
import { Heading, Text } from 'components/typography';
import { PAGE_ROUTES } from 'consts/page-consts';
import { motion } from 'framer-motion';
import { useTitle } from 'hooks';
import _ from 'lodash';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';
import { defaultEase } from 'utils/motion-utils';

interface Props {
  title?: string;
}

export const DrugsReportPage = ({ title }: Props) => {
  const currentDay = moment().date();
  const { drugUsageReport } = useSelector((state: RootState) => state.statisticModel);
  const loading = useSelector((state: RootState) => state.loading.effects.statisticModel);
  const dispatch = useDispatch<RootDispatch>();

  useTitle(title);

  useEffect(() => {
    dispatch.statisticModel.doGetDrugUsageReports();
  }, [dispatch.statisticModel]);

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
        <Link to={PAGE_ROUTES.STATISTICS.PATH} className="flex items-center gap-2">
          <LeftOutlined className="flex items-center text-base" />
          <Text className="text-base select-none">Back to Monthly Reports</Text>
        </Link>
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
              initial={{
                opacity: 0,
                y: 60,
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.25, ease: defaultEase, delay: index * 0.05 },
              }}
              className="flex items-center gap-5 px-4 py-8 bg-white rounded-md shadow"
            >
              <div className="w-1/4">
                <Text>{drugReport.drug.description}</Text>
              </div>
              <div className="flex flex-col w-1/4">
                <Text>Unit</Text>
                <Text>{drugReport.unit.description}</Text>
              </div>
              <div className="flex flex-col w-1/4">
                <Text>Quantity</Text>
                <Text>{drugReport.quantity}</Text>
              </div>
              <div className="flex flex-col w-1/4">
                <Text>Usage number</Text>
                <Text>{drugReport.numberOfUse}</Text>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
