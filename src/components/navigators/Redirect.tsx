import React from 'react';
import { useNavigate } from 'react-router-dom';

type TRedirectProps = {
  to: string;
};

export const Redirect = (props: TRedirectProps) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(props.to);
  }, [navigate, props.to]);

  return null;
};
