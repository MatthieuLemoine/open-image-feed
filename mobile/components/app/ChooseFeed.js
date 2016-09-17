import React from 'react';
import { View, StyleSheet } from 'react-native';
import Form from './Form';
import { Actions } from 'react-native-router-flux';

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

const ChooseFeed = ({
  connectToFeed
}) =>
  <View style={styles.container}>
    <Form
      title="Connect to a feed"
      submit={(feed) => {
        connectToFeed(feed);
        Actions.feed();
      }}
      submitLabel="Connect"
      inputs={[
        {
          id       : 'feedUrl',
          type     : 'text',
          label    : 'Feed URL',
          required : true
        }
      ]}
      style={styles.container}
    />
  </View>;

ChooseFeed.propTypes = {
  connectToFeed : React.PropTypes.func.isRequired
};

export default ChooseFeed;
