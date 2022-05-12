import { Popover } from 'antd';
import classNames from 'classnames';
import { Text } from 'components';
import { MapMonth, MAP_MONTH } from 'consts/moment-consts';
import _ from 'lodash';
import moment from 'moment';
import { memo, ReactNode, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from 'store';

interface Props {
  visible?: boolean;
  variant: 'month' | 'year';
  onVisibleChange?: (visible: boolean) => void | Promise<void> | undefined;
  children?: JSX.Element | ReactNode;
}

export const SelectMonthPopover = memo(({ visible, variant, children, onVisibleChange }: Props) => {
  const now = useRef(moment()).current;
  const { selectedMonth } = useSelector((stage: RootState) => stage.statisticModel);
  const dispatch = useDispatch<RootDispatch>();

  const currentMonth = now.month() + 1;
  const currentYear = now.year();

  const onSelectValue = useCallback(
    (value: any) => () => {
      dispatch.statisticModel.setSelectedMonth(
        variant === 'month' ? [value, selectedMonth[1]] : [selectedMonth[0], value],
      );
      onVisibleChange?.(false);
    },
    [dispatch.statisticModel, onVisibleChange, selectedMonth, variant],
  );

  const renderContent = useCallback(() => {
    const months = new Array(12).fill(0);
    const years = new Array(120).fill(0);

    let values =
      variant === 'year'
        ? years
        : currentYear === selectedMonth[1]
        ? months.filter((v, i) => i <= currentMonth - 1)
        : months;

    return (
      <div className="overflow-scroll max-h-96">
        {_.map(values, (__, index) => {
          const value = variant === 'month' ? index + 1 : currentYear - index;
          return (
            <button
              className={classNames(
                'flex items-center justify-between min-w-[160px] py-2 ',
                'hover:bg-black hover:bg-opacity-5 transition-all duration-150',
              )}
              onClick={onSelectValue(value)}
            >
              <Text>{variant === 'month' ? MAP_MONTH[value as MapMonth] : value}</Text>
            </button>
          );
        })}
      </div>
    );
  }, [currentMonth, currentYear, onSelectValue, selectedMonth, variant]);

  return (
    <Popover
      arrowContent={null}
      content={renderContent()}
      onVisibleChange={onVisibleChange}
      placement="bottomLeft"
      trigger="click"
      visible={visible}
    >
      {children}
    </Popover>
  );
});
