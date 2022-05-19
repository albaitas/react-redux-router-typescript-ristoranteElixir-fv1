import React from 'react';

type FormikProps = {
  children?: string | null;
};

const FormikTextError: React.FC<FormikProps> = (props) => {
  return <div className='error'>{props.children}</div>;
};
export default FormikTextError;
