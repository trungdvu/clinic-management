import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import TextArea, { TextAreaRef } from 'antd/lib/input/TextArea';
import classNames from 'classnames';
import { IconButton } from 'components/buttons';
import { useOnClickOutside } from 'hooks';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  readOnly?: boolean;
  placeholder?: string;
  onSave: (text: string) => void | Promise<void>;
}

export const EditableParagraph = memo(({ text, placeholder, readOnly, onSave }: Props) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('');
  const textAreaRef = useRef<TextAreaRef>(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setValue(text);
  }, [text]);

  useEffect(() => {
    if (editing) {
      textAreaRef.current?.focus();
    }
  }, [editing]);

  useOnClickOutside(containerRef, () => onCancel());

  const onClick = useCallback(() => {
    !readOnly && setEditing(true);
  }, [readOnly]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  const _onSave = useCallback(() => {
    onSave(value);
    setEditing(false);
  }, [onSave, value]);

  const onCancel = useCallback(() => {
    setValue(text);
    setEditing(false);
  }, [text]);

  return (
    <div ref={containerRef} className="relative">
      <TextArea
        placeholder={placeholder}
        readOnly={!editing}
        ref={textAreaRef}
        value={value}
        autoSize={{ minRows: 3 }}
        onChange={onChange}
        onClick={onClick}
        onPressEnter={_onSave}
        className={classNames('border-transparent px-3 transition-all duration-150', {
          'shadow-none hover:bg-black hover:bg-opacity-5': !editing,
          'bg-white bg-opacity-100 shadow-current': editing,
        })}
      />
      <div
        className={classNames(
          'absolute transition-opacity duration-150 flex items-center gap-1 -mb-2 bottom-0 right-0 transform translate-y-full',
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
});
