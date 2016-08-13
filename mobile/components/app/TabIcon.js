import React from 'react';
import { Text } from 'react-native';

const TabIcon = ({
  title,
  selected
}) =>
  <Text style={{ color : selected ? 'red' : 'black' }}>
    {title}
  </Text>;

TabIcon.propTypes = {
  title : React.PropTypes.string,
  selected : React.PropTypes.bool
};

export default TabIcon;
