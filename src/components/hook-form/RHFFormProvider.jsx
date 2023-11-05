import React from "react";
import PropTypes from "prop-types";
import { FormProvider as Form } from "react-hook-form";

FormProvider.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  methods: PropTypes.object,
};

export default function FormProvider({ children, onSubmit, methods }) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
