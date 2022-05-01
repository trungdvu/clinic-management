import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { SelectProps } from 'antd/es/select';
import classNames from 'classnames';
import _ from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IconButton } from '../buttons';
import './EditableSelect.css';

interface Props<ValueType = any> extends SelectProps<ValueType> {
  readOnly?: boolean;
  onSave?: (value: any) => void | Promise<void>;
}

export function EditableSelect<
  ValueType extends { key?: string; label: string | JSX.Element; value: string | number } = any,
>({ value: defaultValue, className, children, readOnly, onSave, ...props }: Props) {
  const [isBlurable, setIsBlurable] = useState(true);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const selectRef = useRef<any>(null);

  useEffect(() => {
    if (editing) {
      selectRef.current?.focus?.();
    }
  }, [editing]);

  const onClick = useCallback(() => {
    !readOnly && setEditing(true);
  }, [readOnly]);

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

  const onBlur = useCallback(() => {
    isBlurable && onCancel();
  }, [isBlurable, onCancel]);

  return (
    <div
      className={classNames('relative w-full rounded-sm', {
        'bg-black bg-opacity-5': editing,
      })}
    >
      <Select<ValueType>
        ref={selectRef}
        disabled={readOnly}
        showSearch
        showArrow={false}
        value={value}
        filterOption={onFilterOption}
        onChange={onChange}
        onClick={onClick}
        onBlur={onBlur}
        onDeselect={onDeselect}
        className={classNames(
          'editable-select transition-all duration-150',
          {
            'shadow-none hover:bg-black hover:bg-opacity-5': !editing,
            'bg-white bg-opacity-100 rounded-sm': editing,
          },
          className,
        )}
        {...props}
      >
        {children}
      </Select>
      <div
        onMouseEnter={() => setIsBlurable(false)}
        onMouseLeave={() => setIsBlurable(true)}
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
          onMouseDown={_onSave}
        />
        <IconButton
          shape="default"
          icon={<CloseOutlined />}
          className="rounded shadow"
          onMouseDown={onCancel}
        />
      </div>
    </div>
  );
}
