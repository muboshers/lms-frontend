/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';

import './custom-checkbox.style.css';

export default function CustomCheckbox({
  htmlFor,
  onChange,
  color,
  checked,
  withoutDefaultChecked,
}) {
  const checkboxRef = useRef();

  const [inputProps, setInputProps] = useState({});

  const [isChecked, setIsChecked] = useState(false);

  const checkedBgColor = isChecked ? color : color;

  const checkedBrColor = isChecked ? color : '#ccc';

  useEffect(() => {
    checkboxRef.current.addEventListener('change', (event) => {
      setIsChecked(event.target.checked);
    });
  }, []);

  useEffect(() => {
    if (withoutDefaultChecked) {
      setInputProps({
        checked,
      });
    }
  }, [checked, withoutDefaultChecked]);

  return (
    <div className="round">
      <input
        type="checkbox"
        defaultChecked={checked}
        onChange={onChange}
        id={htmlFor}
        ref={checkboxRef}
        {...inputProps}
      />
      <label
        htmlFor={htmlFor}
        style={{
          backgroundColor: checkedBgColor,
          borderColor: checkedBrColor,
        }}
      />
    </div>
  );
}

CustomCheckbox.propTypes = {
  htmlFor: PropTypes.string,
  onChange: PropTypes.any,
  color: PropTypes.string,
  checked: PropTypes.bool,
  withoutDefaultChecked: PropTypes.bool,
};
