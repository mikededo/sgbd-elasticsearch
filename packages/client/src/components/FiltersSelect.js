import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Select } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const FiltersSelect = ({ label, placeholder, tagRender, values }) => (
  <>
    <Title level={5}>{label}</Title>

    <Select
      mode="multiple"
      placeholder={placeholder}
      style={{ width: '100%' }}
      tagRender={tagRender}
      allowClear
    >
      {values.map(([value, text]) => (
        <Option value={value}>{text}</Option>
      ))}
    </Select>
  </>
);

FiltersSelect.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  tagRender: PropTypes.func,
  values: PropTypes.arrayOf([PropTypes.string, PropTypes.string]).isRequired
};

FiltersSelect.defaultProps = { placeholder: null, tagRender: null };

export default FiltersSelect;
