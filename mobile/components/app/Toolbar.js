import React from 'react';
import { Toolbar as MaterialToolbar } from 'react-native-material-design';
import { View, StyleSheet } from 'react-native';
import { MKProgress } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';
import { PRIMARY } from '../../styles/material';

const styles = StyleSheet.create({
  progress : {
    alignSelf : 'stretch',
    marginTop : 56,
    height    : 4,
    flex : 1
  },
  toolbar : {
    position      : 'absolute',
    top           : 0,
    left          : 0,
    right         : 0,
    flexDirection : 'row'
  }
});

const Toolbar = ({
  title,
  isFetching,
  isLogged,
  isAppLoaded
}) => {
  const progress = isFetching ? <MKProgress.Indeterminate style={styles.progress} /> : null;
  const actions = [];
  if (isAppLoaded) {
    const action = isLogged ? {
      icon : 'add',
      onPress : () => Actions.addPost()
    } : {
      icon : 'account-circle',
      onPress : () => Actions.login()
    };
    actions.push(action);
  }
  return (
    <View style={styles.toolbar}>
      <MaterialToolbar
        title={title}
        primary={PRIMARY}
        actions={actions}
      />
      {progress}
    </View>
  );
};

Toolbar.propTypes = {
  title : React.PropTypes.string.isRequired,
  isFetching : React.PropTypes.bool.isRequired,
  isLogged : React.PropTypes.bool.isRequired,
  isAppLoaded : React.PropTypes.bool.isRequired
};

export default Toolbar;
