import { Empty } from 'antd';
import { Text } from 'components';

export function EmptyDrugs() {
  return (
    <Empty
      description={
        <Text className="text-typo-tertiary">
          No medications. Click <b>Add</b> to attach a medication.
        </Text>
      }
      className="mt-16"
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );
}
