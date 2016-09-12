import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container : {
    flex           : 1,
    flexDirection  : 'column',
    alignItems     : 'center',
    justifyContent : 'center'
  },
  title : {
    fontWeight : 'bold',
    fontSize  : 16,
    color : '#000000'
  }
});

const ChooseFeed = (
  feedURL = ''
) => (
  <View style={styles.container}>
    <Text style={styles.title}>{ `Feed URL : ${feedURL}` } </Text>
  </View>
);

ChooseFeed.propTypes = {
  feedURL  : React.PropTypes.string
};

export default ChooseFeed;
