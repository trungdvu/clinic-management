import { LeftOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { Heading, SkeletonMedicalBillDetails, Text } from 'components';
import { PAGE_ROUTES } from 'consts';
import { motion } from 'framer-motion';
import { useTitle } from 'hooks';
import { DiseaseType, Drug, Usage } from 'interfaces';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';
import { generateFadeInFadeOut } from 'utils';
import { ActionsPaymentsMedicalBillSection } from './components/ActionsPaymentsMedicalBillSection';
import { GeneralMedicalBillSection } from './components/GeneralMedicalBillSection';
import { MedicationsMedicalBillSection } from './components/MedicationsMedicalBillSection';
import { StatusTimeLine } from './components/StatusTimeLine';
import './styles/MedicalBillDetailPage.css';

interface Props extends PropsFromStore {
  title?: string;
}

function MedicalBillDetailPageContainer({
  title,
  selectedMedicalBillDetail,
  setSelectedMedicalBillDetail,
  doGetMedicalBillDetail,
  doGetDrugs,
  doGetDrugUsages,
  doGetDiseaseTypes,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [diseaseTypes, setDiseaseTypes] = useState<DiseaseType[]>([]);
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [drugUsages, setDrugUsages] = useState<Usage[]>([]);

  const params = useParams();

  useTitle(title);

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setSelectedMedicalBillDetail(undefined);

    const result = await doGetMedicalBillDetail(params.id || '');

    if (result === false) {
      notification.error({
        message: 'Failed',
        description: 'Not founded the medical bill details.',
        placement: 'bottomLeft',
      });
    } else {
      const diseaseTypes = await doGetDiseaseTypes();
      diseaseTypes === false
        ? notification.error({
            message: 'Failed',
            description: 'Not founded disease type',
            placement: 'bottomLeft',
          })
        : setDiseaseTypes(diseaseTypes);

      const drugs = await doGetDrugs();
      drugs === false
        ? notification.error({
            message: 'Failed',
            description: 'Not founded drugs',
            placement: 'bottomLeft',
          })
        : setDrugs(drugs);

      const usages = await doGetDrugUsages();
      usages === false
        ? notification.error({
            message: 'Failed',
            description: 'Not founded drug usages',
            placement: 'bottomLeft',
          })
        : setDrugUsages(usages);
    }

    setIsLoading(false);
  }, [
    doGetDiseaseTypes,
    doGetDrugUsages,
    doGetDrugs,
    doGetMedicalBillDetail,
    params.id,
    setSelectedMedicalBillDetail,
  ]);

  return (
    <motion.div
      variants={generateFadeInFadeOut()}
      initial="initial"
      animate="animate"
      className="mx-[5%] px-4 pt-8 pb-20 bg-white shadow rounded-md min-h-screen"
    >
      <Link to={PAGE_ROUTES.MEDICAL_BILLS.PATH} className="flex items-center gap-2">
        <LeftOutlined className="flex items-center text-base" />
        <Text className="text-base select-none">Back to Listing</Text>
      </Link>
      <Heading level={2} className="mt-4">
        Medical Bill Details
      </Heading>

      {isLoading ? (
        <SkeletonMedicalBillDetails />
      ) : (
        <>
          {selectedMedicalBillDetail ? (
            <>
              <StatusTimeLine status={selectedMedicalBillDetail.status} />
              <GeneralMedicalBillSection diseaseTypes={diseaseTypes} />
              <MedicationsMedicalBillSection drugUsages={drugUsages} drugs={drugs} />
              <ActionsPaymentsMedicalBillSection />
            </>
          ) : (
            <Text type="danger" className="text-base">
              Not founded.
            </Text>
          )}
        </>
      )}
    </motion.div>
  );
}

const mapState = (state: RootState) => ({
  selectedMedicalBillDetail: state.medicalBillModel.selectedMedicalBillDetail,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  setSelectedMedicalBillDetail: dispatch.medicalBillModel.setSelectedMedicalBillDetail,
  doGetMedicalBillDetail: dispatch.medicalBillModel.doGetMedicalBillDetail,
  doGetDrugs: dispatch.drugModel.doGetDrugs,
  doGetDrugUsages: dispatch.drugModel.doGetDrugUsages,
  doGetDiseaseTypes: dispatch.diseaseTypeModel.doGetDiseaseTypes,
});

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const MedicalBillDetailPage = connect(mapState, mapDispatch)(MedicalBillDetailPageContainer);
