import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

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

class Splashscreen extends Component {
  componentDidMount() {
    if (this.props.loaded) {
      if (this.props.feedURL) {
        Actions.feed();
      } else {
        Actions.chooseFeed();
      }
    } else {
      this.props.loadState();
    }
  }
  componentDidUpdate() {
    if (this.props.loaded) {
      if (this.props.feedURL) {
        Actions.feed();
      } else {
        Actions.chooseFeed();
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Open Image Feed</Text>
      </View>
    );
  }
}

Splashscreen.propTypes = {
  loaded      : React.PropTypes.bool,
  redirect    : React.PropTypes.func,
  loadState   : React.PropTypes.func,
  feedURL     : React.PropTypes.string
};

export default Splashscreen;
