import { DownOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { DatePicker, Input, Select, Tabs, Tooltip } from 'antd';
import { Heading, IconButton, PrimaryButton, SkeletonListing } from 'components';
import { MEDICAL_BILLS_STATUSES } from 'consts';
import { motion } from 'framer-motion';
import { useTitle } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootDispatch, RootState, select } from 'store';
import { defaultLayoutVariants } from 'utils';
import { MedicalBillSummaries } from './components/MedicalBillSummaries';
import { NewMedicalBillModal } from './components/NewMedicalBillModal';

const { Search } = Input;
const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

const FILTER_OPTIONS = {
  noFilter: 'No Filter',
  ...MEDICAL_BILLS_STATUSES,
};

type Filter = keyof typeof FILTER_OPTIONS;

interface Props extends PropsFromStore {
  title?: string;
}

const MedicalBillPageContainer = ({
  title,
  allMedicalBillSummaries,
  pendingMedicalBillSummaries,
  activeMedicalBillSummaries,
  completedMedicalBillSummaries,
  setHasMore,
  doGetMoreMedicalBillSummaries,
}: Props) => {
  const [isCreateMedicalBillVisible, setIsCreateMedicalBillVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [medicalBillSummaries, setMedicalBillSummaries] = useState(allMedicalBillSummaries);
  const [filter, setFilter] = useState<Filter>();

  useEffect(() => {
    setIsLoading(true);
    setHasMore({ key: 'allMedicalBillSummariesHasMore', value: true });
    doGetMoreMedicalBillSummaries({}).then(() => setIsLoading(false));
  }, [doGetMoreMedicalBillSummaries, setHasMore]);

  useEffect(() => {
    filter === 'active'
      ? setMedicalBillSummaries(activeMedicalBillSummaries)
      : filter === 'pending'
      ? setMedicalBillSummaries(pendingMedicalBillSummaries)
      : filter === 'completed'
      ? setMedicalBillSummaries(completedMedicalBillSummaries)
      : setMedicalBillSummaries(allMedicalBillSummaries);
  }, [
    filter,
    activeMedicalBillSummaries,
    allMedicalBillSummaries,
    completedMedicalBillSummaries,
    pendingMedicalBillSummaries,
  ]);

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

  const onChangeFilter = useCallback((value: Filter) => {
    setFilter(value);
  }, []);

  return (
    <motion.div
      variants={defaultLayoutVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen px-4 py-8 bg-white rounded-md shadow"
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
              <Select
                value={filter}
                onChange={onChangeFilter}
                placeholder="Filter"
                className="w-32"
              >
                {Object.keys(FILTER_OPTIONS).map((key) => (
                  <Option key={key} value={key}>
                    {FILTER_OPTIONS[key as Filter]}
                  </Option>
                ))}
              </Select>
              <Tooltip title="Coming soon" placement="bottom" className="text-xs">
                <RangePicker
                  allowClear={false}
                  format={'d MMMM'}
                  suffixIcon={<DownOutlined className="text-typo-tertiary" />}
                />
              </Tooltip>
              <Tooltip title="Coming soon" placement="bottom" className="text-xs">
                <Search placeholder="Patient name" className="w-80" />
              </Tooltip>
            </div>

            <div className="h-px bg-line-secondary" />

            <MedicalBillSummaries medicalBillSummaries={medicalBillSummaries} />
          </TabPane>
        </Tabs>
      )}
    </motion.div>
  );
};

const mapState = (state: RootState) => ({
  allMedicalBillSummaries: state.medicalBillModel.medicalBillSummaries,
  pendingMedicalBillSummaries: select.medicalBillModel.pendingMedicalBillSummaries(state),
  activeMedicalBillSummaries: select.medicalBillModel.activeMedicalBillSummaries(state),
  completedMedicalBillSummaries: select.medicalBillModel.completedMedicalBillSummaries(state),
});

const mapDispatch = (dispatch: RootDispatch) => ({
  setHasMore: dispatch.medicalBillModel.setHasMore,
  doGetMoreMedicalBillSummaries: dispatch.medicalBillModel.doGetMoreMedicalBillSummaries,
});

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const MedicalBillPage = connect(mapState, mapDispatch)(MedicalBillPageContainer);
