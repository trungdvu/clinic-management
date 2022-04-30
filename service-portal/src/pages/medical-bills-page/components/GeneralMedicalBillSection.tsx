import { Col, Image, notification, Row, Select } from 'antd';
import { EditableParagrahp, EditableSelect, Text } from 'components';
import { PAGE_ROUTES } from 'consts';
import { DiseaseType, UpdateMedicalBillPayload } from 'interfaces';
import _ from 'lodash';
import moment from 'moment';
import { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';

const { Option } = Select;

interface Props extends PropsFromStore {
  diseaseTypes: DiseaseType[];
}

const GeneralMedicalBillSectionContainer = ({
  diseaseTypes,
  selectedMedicalBillDetail,
  setSelectedMedicalBillDetail,
  doUpdateMedicalBill,
}: Props) => {
  const params = useParams();

  const drugsObj = useMemo(() => _.keyBy(diseaseTypes, 'id'), [diseaseTypes]);

  const onSavePrediction = useCallback(
    async (text: string) => {
      const oldPrediction = selectedMedicalBillDetail!.prediction;
      const updatedBillDetail = { ...selectedMedicalBillDetail!, prediction: text };

      setSelectedMedicalBillDetail(updatedBillDetail);

      const payload: UpdateMedicalBillPayload = {
        id: params.id!,
        body: { prediction: text },
      };
      const result = await doUpdateMedicalBill(payload);
      if (!result) {
        notification.error({
          message: 'Failed',
          description: 'Ops! Updated the preidction failed',
        });
        // rollback old prediction
        setSelectedMedicalBillDetail({ ...selectedMedicalBillDetail!, prediction: oldPrediction });
      }
    },
    [doUpdateMedicalBill, params.id, selectedMedicalBillDetail, setSelectedMedicalBillDetail],
  );

  const onSaveSymtoms = useCallback(
    async (text: string) => {
      const oldSymptomDescription = selectedMedicalBillDetail!.symptomDescription;
      const updatedBillDetail = { ...selectedMedicalBillDetail!, symptomDescription: text };

      setSelectedMedicalBillDetail(updatedBillDetail);

      const payload: UpdateMedicalBillPayload = {
        id: params.id!,
        body: { symptomDescription: text },
      };
      const result = await doUpdateMedicalBill(payload);
      if (!result) {
        notification.error({
          message: 'Failed',
          description: 'Ops! Something went wrong',
        });
        setSelectedMedicalBillDetail({
          ...selectedMedicalBillDetail!,
          symptomDescription: oldSymptomDescription,
        });
      }
    },
    [doUpdateMedicalBill, params.id, selectedMedicalBillDetail, setSelectedMedicalBillDetail],
  );

  const onSaveActualResults = useCallback(
    async (values: string[]) => {
      const oldDiseaseTypeIds = selectedMedicalBillDetail!.diseaseTypes;
      const updatedBillDetail = {
        ...selectedMedicalBillDetail!,
        diseaseTypes: _.map(values, (value) => ({
          id: value,
          description: drugsObj[value].description,
        })),
      };

      setSelectedMedicalBillDetail(updatedBillDetail);

      const payload: UpdateMedicalBillPayload = {
        id: params.id!,
        body: { diseaseTypeIds: values },
      };

      const result = await doUpdateMedicalBill(payload);
      if (!result) {
        notification.error({
          message: 'Failed',
          description: 'Ops! Something went wrong',
        });
        setSelectedMedicalBillDetail({
          ...selectedMedicalBillDetail!,
          diseaseTypes: oldDiseaseTypeIds,
        });
      }
    },
    [
      doUpdateMedicalBill,
      drugsObj,
      params.id,
      selectedMedicalBillDetail,
      setSelectedMedicalBillDetail,
    ],
  );

  return (
    <Row gutter={24} align="top" className="mt-8">
      <Col span={4}>
        <Image
          src={require('assets/images/default_profile_2.png')}
          className="max-w-[128px] rounded-md"
          alt="Patient Avatar"
        />
      </Col>
      <Col span={20}>
        <Row gutter={24} align="middle">
          <Col span={6}>
            <Text type="secondary" className="font-medium">
              PATIENT
            </Text>
          </Col>
          <Col span={12}>
            <Link
              to={PAGE_ROUTES.PATIENTS.DETAILS.ID(selectedMedicalBillDetail.patient.id)}
              className="px-3"
            >
              {selectedMedicalBillDetail.patient.fullName}
            </Link>
          </Col>
        </Row>
        <Row gutter={24} align="top" className="mt-4">
          <Col span={6}>
            <Text type="secondary" className="font-medium">
              WHEN
            </Text>
          </Col>
          <Col span={12} className="flex flex-col">
            <Text className="font-medium px-3">
              {moment(selectedMedicalBillDetail.createdAt).format('dddd, D MMM YYYY')}
            </Text>
            <Text type="secondary" className="px-3">
              {moment(selectedMedicalBillDetail.createdAt).format('hh:mm A')}
            </Text>
          </Col>
        </Row>
        <Row gutter={24} align="top" className="mt-4">
          <Col span={6} className="mt-1">
            <Text type="secondary" className="font-medium">
              SYSTOMS
            </Text>
          </Col>
          <Col span={16}>
            <EditableParagrahp
              text={selectedMedicalBillDetail.symptomDescription}
              onSave={onSaveSymtoms}
            />
          </Col>
        </Row>
        <Row gutter={24} align="top" className="mt-4">
          <Col span={6} className="mt-1">
            <Text type="secondary" className="font-medium">
              PREDICTION
            </Text>
          </Col>
          <Col span={16}>
            <EditableParagrahp
              text={selectedMedicalBillDetail.prediction}
              placeholder="Not set"
              onSave={onSavePrediction}
            />
          </Col>
        </Row>
        <Row gutter={24} align="top" className="mt-4">
          <Col span={6} className="mt-1">
            <Text type="secondary" className="font-medium">
              ACTUAL RESULTS
            </Text>
          </Col>
          <Col span={16}>
            <EditableSelect
              value={_.map(selectedMedicalBillDetail.diseaseTypes, (d) => d.id)}
              showSearch={false}
              mode="multiple"
              size="large"
              placeholder="Select diseases"
              className="w-full select-disease"
              onSave={onSaveActualResults}
            >
              {_.map(diseaseTypes, (d) => (
                <Option key={d.id}>
                  <Text className="text-sm">{d.description}</Text>
                </Option>
              ))}
            </EditableSelect>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const mapState = (state: RootState) => ({
  selectedMedicalBillDetail: state.medicalBillModel.selectedMedicalBillDetail!,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  setSelectedMedicalBillDetail: dispatch.medicalBillModel.setSelectedMedicalBillDetail,
  doUpdateMedicalBill: dispatch.medicalBillModel.doUpdateMedicalBill,
});

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const GeneralMedicalBillSection = connect(
  mapState,
  mapDispatch,
)(GeneralMedicalBillSectionContainer);
