import React from 'react';
import Form from './Form';
import { Actions } from 'react-native-router-flux';
import styles from '../../styles/styles.js';

const ChooseFeed = ({
  connectToFeed
}) =>
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
          label    : 'Open Image Feed URL',
          required : true
        }
      ]}
      style={styles.container}
    />;

ChooseFeed.propTypes = {
  connectToFeed : React.PropTypes.func.isRequired
};

export default ChooseFeed;
