import React from 'react';
import { View } from 'react-native';
import styles from '../../styles/styles';

const Application = ({ children }) =>
  <View style={styles.container}>
    {children}
  </View>;

Application.propTypes = {
  children : React.PropTypes.any
};

export default Application;
