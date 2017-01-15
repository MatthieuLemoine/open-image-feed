import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-material-design';
import { since } from '../../../common/utils/date';

const styles = StyleSheet.create({
  container : {
    flex          : 1,
    flexDirection : 'row',
  },
  primary : {
    flex          : 2,
    flexDirection : 'row',
    height        : 52
  },
  avatar : {
    height      : 40,
    marginRight : 5,
    width       : 40
  },
  author : {
    fontSize   : 15,
    lineHeight : 20,
    color      : 'rgba(0, 0, 0, 0.87)',
  },
  content : {
    fontSize   : 13,
    height     : 52,
    lineHeight : 18
  },
  secondary : {
    flex          : 1,
    flexDirection : 'column',
    flexWrap      : 'nowrap',
    alignItems    : 'flex-end',
    height        : 52,
    marginLeft    : 16
  },
  contentContainer : {
    flex          : 1,
    flexDirection : 'column'
  },
  since : {
    fontSize : 12
  },
  avatarContainer : {
    flexDirection : 'column',
    justifyContent : 'center'
  }
});

const Comment = ({
  comment
}) =>
  <View style={styles.container}>
    <View style={styles.primary}>
      <View style={styles.avatarContainer}>
        <Icon name="person" style={styles.avatar} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.author} >{comment.authorId}</Text>
        <Text style={styles.content} >{comment.content}</Text>
      </View>
    </View>
    <View style={styles.secondary}>
      <Text style={styles.since} >{since(comment.createdAt)}</Text>
    </View>
  </View>;

Comment.propTypes = {
  comment : React.PropTypes.object.isRequired
};

export default Comment;
