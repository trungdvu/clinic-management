import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import TextArea, { TextAreaRef } from 'antd/lib/input/TextArea';
import classNames from 'classnames';
import { IconButton } from 'components/buttons';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  placeholder?: string;
  onSave: (text: string) => Promise<void>;
}

export const EditableParagrahp = memo(({ text, placeholder, onSave }: Props) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(text);
  const textAreaRef = useRef<TextAreaRef>(null);

  useEffect(() => {
    if (editing) {
      textAreaRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = useCallback(() => {
    setEditing((pre) => !pre);
  }, []);

  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  const _onSave = useCallback(() => {
    toggleEdit();
    onSave(value);
  }, [onSave, toggleEdit, value]);

  const onCancel = useCallback(() => {
    setValue(text);
    setEditing(false);
  }, [text]);

  return (
    <div className="relative">
      <TextArea
        placeholder={placeholder}
        readOnly={!editing}
        ref={textAreaRef}
        defaultValue={value}
        autoSize={{ minRows: 3 }}
        onChange={onChange}
        onClick={toggleEdit}
        onPressEnter={_onSave}
        onBlur={_onSave}
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
