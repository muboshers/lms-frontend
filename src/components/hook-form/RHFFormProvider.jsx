import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { FormProvider as Form } from 'react-hook-form';

FormProvider.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  methods: PropTypes.object,
};

function FormProvider({ children, onSubmit, methods }) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}

export default memo(FormProvider);
