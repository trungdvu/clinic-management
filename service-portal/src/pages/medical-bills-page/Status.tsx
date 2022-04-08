import classNames from 'classnames';
import { Text } from 'components';
import { MEDICAL_BILLS_STATUSES } from 'consts/medical-bills-consts';

interface Props {
  status: keyof typeof MEDICAL_BILLS_STATUSES;
  className?: string;
}

export const Status = ({ status, className }: Props) => {
  return (
    <Text
      type="success"
      className={classNames(
        'px-2.5 py-0.5 rounded-sm',
        {
          'text-orange-400 border border-orange-200 bg-orange-50': status === 'PENDING',
          'text-green-400 border border-green-200 bg-green-50': status === 'ACTIVE',
          'text-indigo-400 border border-indigo-200 bg-indigo-50': status === 'COMPETED',
        },
        className,
      )}
    >
      {MEDICAL_BILLS_STATUSES[status]}
    </Text>
  );
};
