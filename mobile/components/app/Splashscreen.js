import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MKSpinner } from 'react-native-material-kit';

const styles = StyleSheet.create({
  container : {
    flex           : 1,
    flexDirection  : 'column',
    alignItems     : 'center',
    justifyContent : 'center'
  },
  spinner : {
    width : 200,
    height : 200
  },
  title : {
    fontWeight : 'bold',
    fontSize  : 16,
    color : '#000000'
  }
});

const Splashscreen = ({
  loaded,
  redirect
}) => {
  if (loaded) {
    redirect();
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Open Image Feed</Text>
      <MKSpinner style={styles.spinner} />
    </View>
  );
};


Splashscreen.propTypes = {
  loaded : React.PropTypes.bool,
  redirect : React.PropTypes.func
};

export default Splashscreen;
