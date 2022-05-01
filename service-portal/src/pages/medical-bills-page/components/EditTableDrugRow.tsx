import { Col, InputNumber, notification, Row, Select } from 'antd';
import classNames from 'classnames';
import { EditableSelect, Text } from 'components';
import { MedicalBillDrug, UpdateMedicalBillDetailPayload, Usage } from 'interfaces';
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';
import { formatVND } from 'utils/common-utils';

const { Option } = Select;

interface Props extends PropsFromStore {
  currentIndex: number;
  readOnly?: boolean;
  availableUsages: Usage[];
  medicalBillDrug: MedicalBillDrug;
  onPreRemove?: (index: number) => void;
}

const EditTableDrugRowContainer = ({
  currentIndex,
  readOnly,
  availableUsages,
  medicalBillDrug,
  selectedMedicalBillDetail,
  setSelectedMedicalBillDetail,
  doUpdateMedicalBillDetail,
  doRemoveMedicalBillDetail,
  onPreRemove,
}: Props) => {
  const [rowData, setRowData] = useState(medicalBillDrug);
  const debounceTimeout = useRef<any>(null);

  useEffect(() => {
    setRowData(medicalBillDrug);
  }, [medicalBillDrug]);

  const availableUsagesObj = useMemo(() => _.keyBy(availableUsages, 'id'), [availableUsages]);
  const availableUnisObj = useMemo(
    () => _.keyBy(medicalBillDrug.availableUnits, 'id'),
    [medicalBillDrug.availableUnits],
  );

  const save = useCallback(
    async (data: MedicalBillDrug) => {
      const payload: UpdateMedicalBillDetailPayload = {
        id: medicalBillDrug.id,
        body: {
          drugId: data.drug.id,
          unitId: data.unit.id,
          usageId: data.usage.id,
          quantity: data.quantity,
        },
      };

      const result = await doUpdateMedicalBillDetail(payload);
      !result && setRowData(medicalBillDrug);
    },
    [doUpdateMedicalBillDetail, medicalBillDrug],
  );

  const onSaveUsage = useCallback(
    async (value: string) => {
      const updatedRowData = {
        ...rowData,
        usage: availableUsagesObj[value],
      };
      setRowData(updatedRowData);
      await save(updatedRowData);
    },
    [availableUsagesObj, rowData, save],
  );

  const onSaveUnit = useCallback(
    async (value: string) => {
      const updatedRowData = {
        ...rowData,
        usage: availableUnisObj[value],
      };
      setRowData(updatedRowData);
      await save(updatedRowData);
    },
    [availableUnisObj, rowData, save],
  );

  const onSaveQuantity = useCallback(
    (value: number) => {
      if (value < 1) return;

      const pricePerUnit = parseInt(`${rowData.price / rowData.quantity}`);
      const updatedRowData = {
        ...rowData,
        quantity: value,
        price: pricePerUnit * value,
      };
      if (debounceTimeout?.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        save(updatedRowData).then(() => {
          const drugDetails = _.map(selectedMedicalBillDetail!.drugDetails, (d) =>
            d.id === updatedRowData.id ? updatedRowData : d,
          );
          setRowData(updatedRowData);
          setSelectedMedicalBillDetail({ ...selectedMedicalBillDetail!, drugDetails });
        });
      }, 300);
    },
    [rowData, save, selectedMedicalBillDetail, setSelectedMedicalBillDetail],
  );

  const onRemove = useCallback(async () => {
    onPreRemove?.(currentIndex);
    const result = await doRemoveMedicalBillDetail(medicalBillDrug.id);
    !result &&
      notification.error({
        message: 'Failed to remove',
        description: 'Please reload the page',
      });
  }, [currentIndex, doRemoveMedicalBillDetail, medicalBillDrug.id, onPreRemove]);

  return (
    <Row
      gutter={24}
      className={classNames('relative py-3 text-typo-primary flex items-center', {
        'border-t border-line-secondary': currentIndex !== 0,
      })}
    >
      <Col span={1}>
        <Text className="whitespace-nowrap">{currentIndex + 1}</Text>
      </Col>

      <Col span={5} className="pl-6">
        <Link to={'#to_drug_detail'}>{medicalBillDrug.drug.description}</Link>
      </Col>

      <Col span={7} className="pl-6">
        <EditableSelect
          readOnly={readOnly}
          value={medicalBillDrug.usage.id}
          showArrow={false}
          className="w-full"
          onSave={onSaveUsage}
        >
          {_.map(availableUsages, (usage) => (
            <Option key={usage.id}>
              <Text className="font-sm">{usage.description}</Text>
            </Option>
          ))}
        </EditableSelect>
      </Col>

      <Col span={3} className="pl-6">
        <EditableSelect
          readOnly={readOnly}
          value={medicalBillDrug.unit.id}
          showArrow={false}
          className="w-full"
          onSave={onSaveUnit}
        >
          {_.map(rowData.availableUnits, (unit) => (
            <Option key={unit.id}>
              <Text className="font-sm">{unit.description}</Text>
            </Option>
          ))}
        </EditableSelect>
      </Col>

      <Col span={3} className="pl-6">
        <InputNumber
          min={1}
          disabled={readOnly}
          value={rowData.quantity}
          autoComplete="off"
          onChange={onSaveQuantity}
          className="border-line-secondary"
        />
      </Col>

      <Col span={3} className="pl-6 text-right">
        {formatVND(rowData.price)}
      </Col>

      <Col span={2} className="flex justify-end">
        <button
          disabled={readOnly}
          className="px-3 text-center transition-all duration-100 text-button-primary hover:bg-black hover:bg-opacity-5 disabled:opacity-50"
          onClick={onRemove}
        >
          Remove
        </button>
      </Col>
    </Row>
  );
};

const mapState = (state: RootState) => ({
  selectedMedicalBillDetail: state.medicalBillModel.selectedMedicalBillDetail,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  setSelectedMedicalBillDetail: dispatch.medicalBillModel.setSelectedMedicalBillDetail,
  doUpdateMedicalBillDetail: dispatch.medicalBillModel.doUpdateMedicalBillDetail,
  doRemoveMedicalBillDetail: dispatch.medicalBillModel.doRemoveMedicalBillDetail,
});

type PropsFromStore = ReturnType<typeof mapDispatch> & ReturnType<typeof mapState>;

export const EditableDrugRow = connect(mapState, mapDispatch)(EditTableDrugRowContainer);
