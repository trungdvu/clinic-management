import { CheckOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { Text } from 'components';
import { MedicalBillStatus } from 'interfaces';
import { memo } from 'react';

interface Props {
  status: MedicalBillStatus;
  className?: string;
}

export const StatusTimeLine = memo(({ status, className }: Props) => {
  return (
    <div className={classNames('flex items-center w-full text-base justify-between', className)}>
      {/* Pending */}
      <div
        className={classNames('flex items-center transition-all duration-100', {
          'opacity-50': status !== 'pending',
        })}
      >
        <div className="flex items-center justify-center p-1 rounded-full bg-sky-700 border-2 border-sky-700">
          <CheckOutlined className="text-white" />
        </div>
        <Text className="ml-2 font-medium text-sky-700">Waiting</Text>
      </div>

      <div className="h-0.5 bg-brd flex-1 mx-5"></div>
      {/* Active */}
      <div
        className={classNames('flex items-center transition-all duration-100', {
          'opacity-50': status !== 'active',
        })}
      >
        <div
          className={classNames(
            'flex items-center justify-center p-1 border-2 rounded-full transition-all duration-100',
            {
              'bg-transparent border-brd': status === 'pending',
              'bg-sky-700 border-sky-700': status === 'active' || status === 'completed',
            },
          )}
        >
          <CheckOutlined
            className={classNames('text-white transition-all duration-100', {
              'opacity-0': status === 'pending',
            })}
          />
        </div>
        <Text
          className={classNames('ml-2 font-medium transition-all duration-100', {
            'text-sky-700': status !== 'pending',
            'text-gray-400': status === 'pending',
          })}
        >
          In Progress
        </Text>
      </div>

      <div className="h-0.5 bg-brd flex-1 mx-5"></div>
      {/* Completed */}
      <div
        className={classNames('flex items-center transition-all duration-100', {
          'opacity-50': status !== 'completed',
        })}
      >
        <div
          className={classNames(
            'flex items-center justify-center p-1 rounded-full border-2 transition-all duration-100',
            {
              'bg-transparent border-brd': status !== 'completed',
              'bg-sky-700 border border-sky-700': status === 'completed',
            },
          )}
        >
          <CheckOutlined
            className={classNames('text-white transition-all duration-100', {
              'opacity-0': status !== 'completed',
            })}
          />
        </div>

        <Text
          className={classNames('ml-2 font-medium transition-all duration-100', {
            'text-sky-700': status === 'completed',
            'text-gray-400': status !== 'completed',
          })}
        >
          Completed
        </Text>
      </div>
    </div>
  );
});
