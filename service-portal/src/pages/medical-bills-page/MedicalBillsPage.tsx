import { DownOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { DatePicker, Input, Tabs, Tooltip } from 'antd';
import { Heading, IconButton, PrimaryButton, SkeletonListing } from 'components';
import { motion } from 'framer-motion';
import { useTitle } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootDispatch, RootState } from 'store';
import { defaultLayoutVariants } from 'utils';
import { MedicalBillSummaries } from './components/MedicalBillSummaries';
import { NewMedicalBillModal } from './components/NewMedicalBillModal';

const { Search } = Input;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

interface Props extends PropsFromStore {
  title?: string;
}

const MedicalBillPageContainer = ({ title, setHasMore, doGetMoreMedicalBillSummaries }: Props) => {
  const [isCreateMedicalBillVisible, setIsCreateMedicalBillVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasMore({ key: 'allMedicalBillSummariesHasMore', value: true });
    doGetMoreMedicalBillSummaries({}).then(() => setIsLoading(false));
  }, [doGetMoreMedicalBillSummaries, setHasMore]);

  useTitle(title);

  const onClickNewMedicalBill = useCallback(() => {
    setIsCreateMedicalBillVisible(true);
  }, []);

  const onCancelNewMedicalBill = useCallback(() => {
    setIsCreateMedicalBillVisible(false);
  }, []);

  const onClickReload = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <motion.div
      variants={defaultLayoutVariants}
      initial="initial"
      animate="animate"
      className="px-4 py-8 bg-white rounded-md shadow"
    >
      <NewMedicalBillModal visible={isCreateMedicalBillVisible} onCancel={onCancelNewMedicalBill} />

      <div className="flex justify-between">
        <Heading level={2}>Medical bills</Heading>
        <div className="flex items-center gap-5">
          <Tooltip title="Refresh this page" placement="bottom" className="text-xs">
            <IconButton size="large" icon={<ReloadOutlined />} onClick={onClickReload} />
          </Tooltip>
          <PrimaryButton icon={<PlusOutlined />} onClick={onClickNewMedicalBill}>
            New Medical Bill
          </PrimaryButton>
        </div>
      </div>
      {isLoading ? (
        <SkeletonListing />
      ) : (
        <Tabs
          type="card"
          defaultActiveKey="1"
          tabPosition="top"
          animated={{ inkBar: true, tabPane: true }}
          className="pb-10"
        >
          <TabPane key={1} tab="All medical bills">
            <div className="flex items-center gap-4 mb-5 ml-3">
              <RangePicker
                allowClear={false}
                format={'d MMMM'}
                suffixIcon={<DownOutlined className="text-typo-tertiary" />}
              />
              <Search placeholder="Patient name" className="w-80" />
            </div>

            <div className="h-px bg-line-secondary" />

            <MedicalBillSummaries />
          </TabPane>
        </Tabs>
      )}
    </motion.div>
  );
};

const mapState = (state: RootState) => ({});

const mapDispatch = (dispatch: RootDispatch) => ({
  setHasMore: dispatch.medicalBillModel.setHasMore,
  doGetMoreMedicalBillSummaries: dispatch.medicalBillModel.doGetMoreMedicalBillSummaries,
});

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const MedicalBillPage = connect(mapState, mapDispatch)(MedicalBillPageContainer);
