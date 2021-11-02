import React from 'react';

import { Select, Typography } from 'antd';
import PropTypes from 'prop-types';

const { Title } = Typography;
const { Option } = Select;

const FiltersSelect = ({ label, placeholder, tagRender, values, onChange }) => (
  <>
    <Title level={5}>{label}</Title>

    <Select
      mode="multiple"
      placeholder={placeholder}
      style={{ width: '100%' }}
      onChange={onChange}
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
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func
};

FiltersSelect.defaultProps = {
  placeholder: null,
  tagRender: null,
  onChange: null
};

export default FiltersSelect;
