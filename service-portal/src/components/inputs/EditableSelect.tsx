import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { SelectProps } from 'antd/es/select';
import classNames from 'classnames';
import { useClickOutside } from 'hooks';
import _ from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IconButton } from '../buttons';
import './EditableSelect.css';

interface Props<ValueType = any> extends SelectProps<ValueType> {
  onSave?: (value: any) => void | Promise<void>;
}

export function EditableSelect<
  ValueType extends { key?: string; label: string | JSX.Element; value: string | number } = any,
>({ value: defaultValue, className, children, onSave, ...props }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const selectRef = useRef<any>(null);
  const containerRef = useRef<any>(null);

  useEffect(() => {
    if (editing) {
      selectRef.current?.focus?.();
      containerRef.current?.focus?.();
    }
  }, [editing]);

  useClickOutside(containerRef, () => onCancel());

  const onClick = useCallback(() => {
    setEditing(true);
  }, []);

  const onChange = useCallback((value) => {
    setValue(value);
  }, []);

  const _onSave = useCallback(() => {
    setEditing(false);
    onSave?.(value);
  }, [onSave, value]);

  const onCancel = useCallback(() => {
    setValue(defaultValue);
    setEditing(false);
  }, [defaultValue]);

  const onFilterOption = useCallback(
    (input: string, option: any) =>
      option.children.toLowerCase().indexOf(input.trim().toLowerCase()) >= 0,
    [],
  );

  const onDeselect = useCallback(
    (preDeletedValue: any) => {
      !editing && onSave?.(_.filter(value, (v) => v !== preDeletedValue));
    },
    [editing, onSave, value],
  );

  return (
    <div
      className={classNames('relative w-full rounded-sm', {
        'bg-black bg-opacity-5': editing,
      })}
    >
      <Select<ValueType>
        ref={selectRef}
        showArrow
        showSearch
        value={value}
        filterOption={onFilterOption}
        onChange={onChange}
        onClick={onClick}
        onBlur={_onSave}
        onDeselect={onDeselect}
        className={classNames(
          'editable-select transition-all duration-150',
          {
            'shadow-none hover:bg-black hover:bg-opacity-5': !editing,
            'bg-white bg-opacity-100 shadow-current': editing,
          },
          className,
        )}
        {...props}
      >
        {children}
      </Select>
      <div
        className={classNames(
          'absolute transition-opacity duration-150 flex items-center gap-1 -mt-2 top-0 right-0 transform -translate-y-full',
          {
            '-z-50 opacity-0': !editing,
            'z-50 opacity-100': editing,
          },
        )}
      >
        <IconButton
          shape="default"
          icon={<CheckOutlined />}
          className="rounded shadow"
          onClick={_onSave}
        />
        <IconButton
          shape="default"
          icon={<CloseOutlined />}
          className="rounded shadow"
          onClick={onCancel}
        />
      </div>
    </div>
  );
}
