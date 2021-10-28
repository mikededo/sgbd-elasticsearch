import { Input } from 'antd';
import React from 'react';

/**
 * @param {import('antd').InputProps} props
 */
const RoundedInput = (props) => (
  <Input style={{ borderRadius: 4 }} {...props} />
);

export default RoundedInput;
