import React from 'react';
import { Toolbar as MaterialToolbar } from 'react-native-material-design';
import { PRIMARY } from '../../styles/material.js';

const Toolbar = ({
  title
}) => (
  <MaterialToolbar
    title={title}
    primary={PRIMARY}
  />
);

Toolbar.propTypes = {
  title : React.PropTypes.string.isRequired
};

export default Toolbar;
