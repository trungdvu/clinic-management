import { PlusOutlined } from '@ant-design/icons';
import { Col, Divider, Empty, Row, Spin, Tabs } from 'antd';
import { Heading, PrimaryButton, SkeletonListing, Text } from 'components';
import { PAGE_ROUTES } from 'consts';
import { motion } from 'framer-motion';
import { useTitle } from 'hooks';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';
import { defaultLayoutVariants } from 'utils';
import { CreatePatientModal } from './components/CreatePatientModal';
import { PatientRow } from './components/PatientRow';

interface Props extends PropsFromStore {
  title?: string;
}

function PatientsPageContainer({
  title,
  patients,
  allPatientsPage,
  allPatientsHasMore,
  setHasMore,
  doGetMorePatients,
}: Props) {
  const [isCreatePatientModalVisible, setIsCreatePatientModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const navigate = useNavigate();

  useTitle(title);

  useEffect(() => {
    setIsLoading(true);
    setHasMore({ key: 'allPatientsHasMore', value: true });
    doGetMorePatients({}).then(() => setIsLoading(false));
  }, [doGetMorePatients, setHasMore]);

  const onClickCreatePatient = useCallback(() => {
    setIsCreatePatientModalVisible(true);
  }, []);

  const onCancelCreatePatient = useCallback(() => {
    setIsCreatePatientModalVisible(false);
  }, []);

  const onClickRowPatient = useCallback(
    (id: string) => () => {
      navigate(PAGE_ROUTES.PATIENTS.DETAILS.ID(id));
    },
    [navigate],
  );

  const _doGetMorePatients = useCallback(async () => {
    if (isLoadingMore) {
      return;
    }
    setIsLoadingMore(true);
    await doGetMorePatients({ page: allPatientsPage });
    setIsLoadingMore(false);
  }, [allPatientsPage, doGetMorePatients, isLoadingMore]);

  return (
    <motion.div
      variants={defaultLayoutVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen px-4 py-8 bg-white rounded-md shadow"
    >
      <CreatePatientModal visible={isCreatePatientModalVisible} onCancel={onCancelCreatePatient} />

      <div className="flex justify-between">
        <Heading level={2}>Patients</Heading>
        <div className="flex items-center gap-5">
          <PrimaryButton icon={<PlusOutlined />} onClick={onClickCreatePatient}>
            New Patient
          </PrimaryButton>
        </div>
      </div>

      {isLoading ? (
        <SkeletonListing />
      ) : (
        <Tabs type="card" defaultActiveKey="1" className="pb-10">
          <Tabs.TabPane key={1} tab="All patients">
            <Row gutter={24} className="px-5 py-3 font-medium text-typo-tertiary">
              <Col span={4}>PATIENT NAME</Col>
              <Col span={4}>PHONE NUMBER</Col>
              <Col span={4}>DAY OF BIRTH</Col>
              <Col span={4}>GENDER</Col>
              <Col span={8}>ADDRESS</Col>
            </Row>
            <div className="h-px bg-line-secondary" />
            {_.isEmpty(patients) ? (
              <Empty
                description={
                  <Text className="text-typo-tertiary">
                    Empty. Click <b>+ New Patient</b> to create a new one.
                  </Text>
                }
                className="mt-16"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ) : (
              <InfiniteScroll
                dataLength={patients.length}
                hasMore={allPatientsHasMore}
                scrollThreshold="50px"
                loader={
                  <div className="flex items-center justify-center py-3 mt-3">
                    <Spin size="large" />
                  </div>
                }
                endMessage={
                  <Divider plain className="py-3">
                    <Text type="secondary">No more</Text>
                  </Divider>
                }
                next={_doGetMorePatients}
              >
                {_.map(patients, (patient, index) => (
                  <PatientRow
                    key={index}
                    index={index}
                    patient={patient}
                    onClick={onClickRowPatient(patient.id)}
                  />
                ))}
              </InfiniteScroll>
            )}
          </Tabs.TabPane>
        </Tabs>
      )}
    </motion.div>
  );
}

const mapState = (state: RootState) => ({
  patients: state.patientModel.patients,
  allPatientsHasMore: state.patientModel.allPatientsHasMore,
  allPatientsPage: state.patientModel.allPatientsPage,
  loading: state.loading.effects.patientModel,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  setHasMore: dispatch.patientModel.setHasMore,
  doGetPatients: dispatch.patientModel.doGetPatients,
  doGetMorePatients: dispatch.patientModel.doGetMorePatients,
});

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const PatientsPage = connect(mapState, mapDispatch)(PatientsPageContainer);
