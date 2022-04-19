import { Select, Spin } from 'antd';
import { SelectProps } from 'antd/es/select';
import _ from 'lodash';
import { useCallback, useMemo, useRef, useState } from 'react';

interface Props<ValueType = any> extends Omit<SelectProps<ValueType>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

export function DebounceSelect<
  ValueType extends { key?: string; label: string | JSX.Element; value: string | number } = any,
>({ fetchOptions, debounceTimeout = 250, ...props }: Props) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return _.debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  const onFocus = useCallback(() => {
    if (_.isEmpty(options)) {
      debounceFetcher('');
    }
  }, [debounceFetcher, options]);

  const renderLoading = useCallback(() => {
    return fetching ? <Spin size="default" /> : null;
  }, [fetching]);

  return (
    <Select<ValueType>
      showSearch
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={renderLoading()}
      onFocus={onFocus}
      {...props}
      options={options}
    />
  );
}
