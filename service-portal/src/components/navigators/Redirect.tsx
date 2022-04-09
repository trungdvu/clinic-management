import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  to: string;
};

export const Redirect = (props: Props) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(props.to);
  }, [navigate, props.to]);

  return null;
};
