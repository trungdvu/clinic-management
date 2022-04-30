import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Col, Form, InputNumber, notification, Row, Select } from 'antd';
import classNames from 'classnames';
import { DetailSection, IconButton, PrimaryButton, Text } from 'components';
import { AddMedicationPayload, Drug, DrugUnit, Usage } from 'interfaces';
import _ from 'lodash';
import { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { RootDispatch, RootState } from 'store';
import { v4 as uuidv4 } from 'uuid';
import { EditableDrugRow } from './EditTableDrugRow';
import { EmptyDrugs } from './EmptyDrug';

const { Option } = Select;
const { useForm, Item } = Form;

interface Props extends PropsFromStore {
  drugs: Drug[];
  drugUsages: Usage[];
}

const MedicationsMedicalBillSectionContainer = ({
  drugs,
  drugUsages,
  selectedMedicalBillDetail,
  setSelectedMedicalBillDetail,
  doAddMedication,
  doGetDrugUnits,
}: Props) => {
  const [isAddingMedication, setIsAddingMedication] = useState(false);
  const [isMedicationsExpanded, setIsMedicationsExpanded] = useState(false);
  const [selectedDrugUnits, setSelectedDrugUnits] = useState<DrugUnit[]>([]);

  const [form] = useForm();

  const toggleExpandedMedications = useCallback(() => {
    if (selectedMedicalBillDetail!.drugDetails?.length >= 4) {
      setIsMedicationsExpanded((pre) => !pre);
    }
  }, [selectedMedicalBillDetail]);

  const onClickAddMedication = useCallback(
    async (values: any) => {
      setIsAddingMedication(true);

      const payload: AddMedicationPayload = {
        medicalBillId: selectedMedicalBillDetail!.id,
        drugInformation: {
          id: uuidv4(),
          drugId: values.drugId,
          unitId: values.unitId,
          usageId: values.usageId,
          quantity: values.quantity,
        },
      };
      const result = await doAddMedication(payload);
      result
        ? notification.success({ message: 'Added', description: 'A medication has been added' })
        : notification.error({ message: 'Failed', description: 'Ops! Something went wrong' });

      form.resetFields();
      setIsAddingMedication(false);
    },
    [form, doAddMedication, selectedMedicalBillDetail],
  );

  const onChangeSelectMedicationName = useCallback(
    async (value: string) => {
      const result = await doGetDrugUnits(value);
      if (typeof result !== 'boolean') {
        setSelectedDrugUnits(result);
        result?.[0].unit
          ? form.setFieldsValue({
              unitId: result?.[0].unit.id,
            })
          : form.resetFields(['unitId']);
      } else {
        form.resetFields(['unitId']);
      }
    },
    [form, doGetDrugUnits],
  );

  const onRemoveMedication = (index: number) => {
    const drugDetails = selectedMedicalBillDetail!.drugDetails.filter((d, i) => i !== index);
    setSelectedMedicalBillDetail({ ...selectedMedicalBillDetail!, drugDetails });
  };

  return (
    <DetailSection title="Medications" subTitle="Medicines, durgs that for this medical bill.l">
      <Form
        form={form}
        onFinish={onClickAddMedication}
        className="bg-black bg-opacity-5 pr-7 py-2 mt-4"
      >
        <Row gutter={24} className="px-5 py-3">
          <Col span={1}></Col>
          <Col span={5}>
            <Item rules={[{ required: true }]} name="drugId">
              <Select
                filterOption
                size="large"
                placeholder="Medication name"
                className="text-sm h-10"
                onChange={onChangeSelectMedicationName}
              >
                {_.map(drugs, (d) => (
                  <Option key={d.id}>{d.description}</Option>
                ))}
              </Select>
            </Item>
          </Col>
          <Col span={7}>
            <Item rules={[{ required: true }]} name="usageId">
              <Select size="large" placeholder="Description, usage" className="text-sm h-10">
                {_.map(drugUsages, (usage) => (
                  <Option key={usage.id}>{usage.description}</Option>
                ))}
              </Select>
            </Item>
          </Col>
          <Col span={3}>
            <Item rules={[{ required: true }]} name="unitId">
              <Select
                size="large"
                placeholder="Pill, pack"
                className="text-sm h-10"
                onChange={(value) => {
                  console.log(value);
                }}
              >
                {_.map(selectedDrugUnits, ({ unit }) => (
                  <Option key={unit.id}>{unit.description}</Option>
                ))}
              </Select>
            </Item>
          </Col>
          <Col span={3}>
            <Item rules={[{ required: true }]} name="quantity">
              <InputNumber size="large" placeholder="1, 2, 3" className="text-sm w-full h-10" />
            </Item>
          </Col>
          <Col span={3}>
            <Item>
              <PrimaryButton htmlType="submit" loading={isAddingMedication} className="px-10">
                Add
              </PrimaryButton>
            </Item>
          </Col>
        </Row>
      </Form>

      <div className="relative mb-10">
        <Row gutter={24} className="px-5 py-3 text-tertiary font-medium">
          <Col span={1}>
            <Text className="whitespace-nowrap">NO</Text>
          </Col>
          <Col span={5} className="pl-6">
            NAME
          </Col>
          <Col span={7} className="pl-9">
            USAGE
          </Col>
          <Col span={3} className="pl-8">
            UNIT
          </Col>
          <Col span={3} className="pl-8">
            QUANTITY
          </Col>
          <Col span={3} className="pl-6 text-right">
            AMOUNT
          </Col>
        </Row>
        <div className="h-px bg-brd" />

        <div
          className={classNames('overflow-hidden min-h-[230px] py-6 px-5', {
            'h-auto pb-8': isMedicationsExpanded,
            'h-[230px]': !isMedicationsExpanded,
          })}
        >
          {_.isEmpty(selectedMedicalBillDetail.drugDetails) ? (
            <EmptyDrugs />
          ) : (
            <>
              {_.map(selectedMedicalBillDetail.drugDetails, (drug, index) => (
                <EditableDrugRow
                  key={index}
                  currentIndex={index}
                  availableUsages={drugUsages}
                  medicalBillDrug={drug}
                  onPreRemove={onRemoveMedication}
                />
              ))}
            </>
          )}
        </div>

        <div
          className={classNames(
            'h-16 w-full absolute bottom-0 bg-gradient-to-t from-stone-300 to-transparent',
            {
              hidden: isMedicationsExpanded || selectedMedicalBillDetail.drugDetails.length < 4,
            },
          )}
        />
        <div className="flex items-center w-full absolute bottom-0 transform translate-y-4 z-50">
          <div className="h-px bg-brd flex-1" />
          <IconButton
            disabled={selectedMedicalBillDetail.drugDetails.length < 4}
            icon={
              isMedicationsExpanded ? (
                <UpOutlined className="text-sm" />
              ) : (
                <DownOutlined className="text-sm " />
              )
            }
            onClick={toggleExpandedMedications}
          />
          <div className="h-px bg-brd flex-1" />
        </div>
      </div>
    </DetailSection>
  );
};

const mapState = (state: RootState) => ({
  selectedMedicalBillDetail: state.medicalBillModel.selectedMedicalBillDetail!,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  setSelectedMedicalBillDetail: dispatch.medicalBillModel.setSelectedMedicalBillDetail,
  doAddMedication: dispatch.medicalBillModel.doAddMedication,
  doGetDrugUnits: dispatch.drugModel.doGetDrugUnits,
});

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const MedicationsMedicalBillSection = connect(
  mapState,
  mapDispatch,
)(MedicationsMedicalBillSectionContainer);
