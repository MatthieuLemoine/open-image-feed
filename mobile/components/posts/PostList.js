import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container : {
    flex            : 1,
    justifyContent  : 'center',
    alignItems      : 'center',
    backgroundColor : 'transparent'
  }
});

const PostList = () =>
  <View style={styles.container}>
    <Text>
      PostList component
    </Text>
  </View>
  ;

export default PostList;
