import React from 'react';
import { Toolbar as MaterialToolbar } from 'react-native-material-design';
import { PRIMARY } from '../../styles/material.js';
import { View, StyleSheet } from 'react-native';
import { MKProgress } from 'react-native-material-kit';

const styles = StyleSheet.create({
  progress : {
    width : 150,
  }
});

const Toolbar = ({
  title,
  isFetching
}) => {
  const progress = isFetching ?
    <MKProgress.Indeterminate
      style={styles.progress}
    />
  : null;
  return (
    <View>
      <MaterialToolbar
        title={title}
        primary={PRIMARY}
      />
      {progress}
    </View>
  );
};

Toolbar.propTypes = {
  title : React.PropTypes.string.isRequired,
  isFetching : React.PropTypes.bool.isRequired
};

export default Toolbar;
